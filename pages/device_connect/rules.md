# 🔗 设备连接通用模块 (Device Connect)
**逻辑概述**：优先让用户完成设备连接，并快速引导完善生理信息，开始完成首次锻炼。相比原设备添加流程，点击添加时保持连接状态。
> 特殊分支1：踏频器，需要进行主设备绑定。
> 特殊分支2：体脂称，点击连接后-> 引导完成完善对应的生理信息-> 进入测量流程，展示测量结果，关闭结果页，返回首页。
> 特殊分支3：心率臂带，连接后，与常规设备一样引导进行首次锻炼。

---

### 🔙 顶部导航与返回 `[device_connect_header]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击返回按钮 | Global | 按当前步骤返回上一状态 |

**📝 业务逻辑**：
* **返回逻辑**：permission → `👉 intent_select`；scanning → permission；manual_entry → scanning；check_bt / incompatible → manual_entry；body_stats 或 branch_* → scanning（并重置连接与分支状态）。
* **动作/路由**：Step 1 返回进入 `👉 intent_select`；其余步骤返回上一 Step。

---

### ⚡ Step 1: 权限获取 `[device_connect_permission]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 页面进入 | L1 核心 | 授权后进入扫描 |

**📝 业务逻辑**：
* **文案**：主标题 "Connect Equipment"；副标题 "We need you to provide the following permissions to discover and connect your equipment."
* **权限卡片**：Bluetooth（已勾选）、Location（Open）、Nearby Devices（Open）。
* **交互**：点击 Location 或 Nearby Devices 的 "Open" → 唤起系统权限弹窗；允许后进入 scanning。
* **动作/路由**：权限授权后发起蓝牙扫描；扫到设备则弹出 scan_results；10s 未扫到则弹出 scan_failed。

---

### 📡 Step 2: 蓝牙扫描 `[device_connect_scanning]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 权限授权后 | L1 核心 | 扫到设备 → 结果弹窗 / 10s 超时 → 失败弹窗 |

**📝 业务逻辑**：
* **主标题**："Scanning Equipments Nearby..."；副标题 "Please keep the device turned on"。
* **异常处理**：10s 未扫到设备 → 弹出 device_connect_scan_failed 弹窗。
* **动作/路由**：扫描到设备后弹出 device_connect_scan_results 弹窗。

---

### 📋 扫描结果弹窗 `[device_connect_scan_results]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 扫描到设备后 | L1 核心 | Add → 连接 / Retry Search / Can't find my device? |

**📝 业务逻辑**：
* **标题**："Add Equipment"；副标题 "Nearby devices have been searched"。
* **设备列表**：每项展示名称、型号与 "Add >"。点击 Add 后该行展示 loading；连接成功后关闭弹窗并进入对应分支。
* **分流**：连接 Cadence → branch_cadence；连接 Scale → branch_scale；连接 Elliptical 或 HR 臂带 → body_stats。
* **Retry Search** `[device_connect_scan_retry]`：关闭弹窗，重新发起蓝牙扫描。
* **Can't find my device?** `[device_connect_scan_manual]`：关闭弹窗，进入 manual_entry。

---

### ❌ 扫描失败弹窗 `[device_connect_scan_failed]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 10s 超时 | L1 核心 | Verify Model / Retry Scan |

**📝 业务逻辑**：
* **主标题**："Scan Failed"；副标题 "No device found within 10 seconds. Check that your equipment is powered on and within 5m."
* **Verify Model** `[device_connect_failed_verify]`：进入 manual_entry。
* **Retry Scan** `[device_connect_failed_retry]`：关闭弹窗，重新发起蓝牙扫描。

---

### 📝 手动型号校验 `[device_connect_manual_entry]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 从 scan_results 或 scan_failed 进入 | L1 核心 | Verify Device → check_bt / incompatible |

**📝 业务逻辑**：
* **主标题**："Verify Model"；输入框 placeholder "Model e.g. SF-0001"。
* **校验**：支持型号（如 SF-0001）→ check_bt；不支持，推荐同类型内容，引导发起锻炼。
* **CTA** `[device_connect_cta_verify]`："Verify Device" 按钮。

---

### ✅ 型号支持确认 `[device_connect_check_bt]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 型号校验通过 | L1 核心 | Retry Connection → scanning |

**📝 业务逻辑**：
* **主标题**："Model Supported!"；检查项：Check display console. / Stay within 5m. / Disconnect others.
* **CTA** `[device_connect_cta_retry]`："Retry Connection" → 返回 scanning，重新发起蓝牙扫描。

---

### 📴 不支持型号降级 `[device_connect_incompatible]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 型号校验不通过 | L1 核心 | `👉 plan_create` |

**📝 业务逻辑**：
* **课程推荐**：推荐同类型课程，引导快速进入锻炼，
* **CTA** `[device_connect_cta_create_plan]`："Start Now" → 对应运动准备页。

---

### 🎯 分支：踏频器型号选择 `[device_connect_branch_cadence]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 连接 Cadence 后 | L1 核心 | 选定型号 → body_stats |

**📝 业务逻辑**：
* **主标题**："Cadence Connected"；副标题 "Select your bike/elliptical"；文案 "Great! Which classic Sunny bike/elliptical are you attaching it to?"
* **交互**：单选，4 个型号（Sunny Bike SB-100/200、Sunny Elliptical SE-100/200）。选定后进入 body_stats。

---

### ⚖️ 分支：体脂秤测量 `[device_connect_branch_scale]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 连接 Scale 后 | L1 核心 | 测量完成 → Continue → body_stats |

**📝 业务逻辑**：
* **未测量**：主标题 "Connect Device"；副标题 "Please stand on the scale again and keep the scale lit up."；底部 "Scanning for nearby devices..." + loading。
* **已测量**：展示现有测量结果页
* **CTA** `[device_connect_cta_continue]`：

---

### 📋 生理信息填写 `[device_connect_body_stats]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 连接器械/心率带后直达，或 Cadence 选型后、Scale 测量后 Continue | L1 核心 | `👉 free_mode` |

**📝 业务逻辑**：
* **主标题**："Equipment is ready! Sync your body stats to track data accurately."
* **Apple Health 同步** `[device_connect_body_stats_sync]`：点击 "Quickly sync from Apple Health" 拉取生理数据；同步中展示 loading；成功后可展示 Toast "Data synced successfully!",并默认填入最新对应项数据。
* **表单**：Birthday、Gender（Male/Female）、Height (cm)、Weight (kg)；可先同步再编辑，保存时判断与最新一条记录数值是否相同，如果不同则记录为一条新记录。
* **CTA** `[device_connect_cta_start_workout]`："Start First Workout" → 保存数据并跳转当前器械类型的Free Mode运动页`👉 free_mode`。

---

### 🔘 底部 CTA 区 `[device_connect_cta]`

| 触发方式 | 🧩 模块层级 | 🔗 说明 |
| :--- | :--- | :--- |
| 按流程步骤 | Global | 按步骤展示对应主按钮 |

**📝 业务逻辑**：
* **manual_entry**：Verify Device `[device_connect_cta_verify]`。
* **check_bt**：Retry Connection `[device_connect_cta_retry]`。
* **incompatible**：Create My Plan `[device_connect_cta_create_plan]` → `👉 plan_create`。
* **branch_scale（已测量）**：Continue `[device_connect_cta_continue]` → body_stats。
* **body_stats**：Start First Workout `[device_connect_cta_start_workout]` → `👉 free_mode`。
