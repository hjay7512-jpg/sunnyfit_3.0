# 🔗 设备连接通用模块 (Device Connect)

> **页面定位**：Onboarding 场景下的设备连接流程。入口即权限引导，授权后进入扫描；扫描结果以底部弹窗展示；连接中在弹窗内展示 loading；针对不同硬件类型（标准器械、踏频器、体脂秤、心率带）实现精准分流，引导至注册转化。

---

### 🔙 顶部导航与返回 `[device_connect_header]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击返回按钮 | L1 核心 | 依次返回上一状态 |

**📝 业务逻辑**：
* **返回逻辑**：permission → intent_select；scanning → permission；manual_entry → scanning；check_bt / incompatible → manual_entry；branch_* → scanning（并重置 connState、branchState、selectedDevice、scaleMeasured）。
* **Onboarding 模式**：隐藏跳过/去商城购买、固件升级等干扰项。

---

### ⚡ Step 1: 权限获取（独立引导页）`[device_connect_permission]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 页面进入 | L1 核心 | Open 授权 → 扫描 |

**📝 业务逻辑**：
* **独立引导页**：全屏独立引导，非弹窗。无底部 Continue 按钮。
* **主标题**："Connect Equipment"。
* **副标题**："We need you to provide the following permissions to discover and connect your equipment."
* **权限卡片**：Bluetooth（已勾选）、Location（Open）、Nearby Devices（Open）。
* **交互**：点击 Location 或 Nearby Devices 的 "Open" → 唤起系统权限弹窗；拒绝 → 留屏；允许 → 进入 scanning。
* **动作/路由**：权限授权后发起蓝牙扫描，扫描到设备则弹出 scan_results 弹窗；10s 未扫到则进入 scan_failed 弹窗。

---

### 📡 Step 2: 蓝牙雷达扫描 `[device_connect_scanning]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 权限授权后 | L1 核心 | 扫描到设备 → 结果弹窗 / 10s 超时 → 失败弹窗 |

**📝 业务逻辑**：
* **扫描态**：雷达动效 + 放大镜图标。
* **主标题**："Scanning Equipments Nearby..."。
* **副标题**："Please keep the device turned on"。
* **异常处理**：10s 未扫到设备 → 弹出 device_connect_scan_failed 弹窗。
* **动作/路由**：蓝牙扫描接口返回设备列表后，弹出 device_connect_scan_results 弹窗。

---

### 📋 扫描结果弹窗 `[device_connect_scan_results]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 扫描到设备后 | L1 核心 | Add → 连接 / Retry Search / Can't find my device? |

**📝 业务逻辑**：
* **弹窗形式**：底部升起弹窗，无右上角关闭按钮。
* **标题**："Add Equipment"。
* **副标题**："Nearby devices have been searched"。
* **设备列表**：Cadence (SF-E3955)、BMI Smart Scale (SF-E3955)、Elliptical (SF-T723007)、Elite Interactive Se... (SF-RBE420049)，每项右侧 "Add >"。
* **连接中**：点击 Add 后弹窗保持打开，该设备行展示 loading 图标；连接成功后关闭弹窗并进入对应分支页。
* **Retry Search**：关闭弹窗，重新发起蓝牙扫描。
* **Can't find my device?**：关闭弹窗，进入 manual_entry。

---

### ❌ 扫描失败弹窗 `[device_connect_scan_failed]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 10s 超时 | L1 核心 | Verify Model / Retry Scan |

**📝 业务逻辑**：
* **主标题**："Scan Failed"。
* **副标题**："No device found within 10 seconds. Check that your equipment is powered on and within 5m."
* **Verify Model**：进入 manual_entry。
* **Retry Scan**：关闭弹窗，重新发起蓝牙扫描。

---

### 📝 Step 3: 手动型号校验 `[device_connect_manual_entry]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 从 scan_results 或 scan_failed 进入 | L1 核心 | Verify Device → check_bt / incompatible |

**📝 业务逻辑**：
* **主标题**："Verify Model"。
* **输入框**：placeholder "Model e.g. SF-0001"。
* **校验**：支持型号（SF-0001）→ check_bt；不支持 → incompatible。
* **CTA**："Verify Device" 按钮。

---

### ✅ Step 4: 型号支持确认 `[device_connect_check_bt]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 型号校验通过 | L1 核心 | Retry Connection → scanning |

**📝 业务逻辑**：
* **主标题**："Model Supported!" 绿勾动画。
* **检查项**：Check display console. Stay within 5m. Disconnect others.
* **CTA**："Retry Connection" → 返回 scanning，重新发起蓝牙扫描。

---

### 📴 不支持型号降级 `[device_connect_incompatible]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 型号校验不通过 | L1 核心 | `👉 plan_create` |

**📝 业务逻辑**：
* **主标题**："Your equipment is a manual model"。
* **副标题**："Your effort always counts. Let's build a tailored plan to track every calorie you burn."
* **CTA**："Create My Plan" → plan_create。

---

### 🚲 分支 A：标准器械 / Cadence 选定后 `[device_connect_branch_equipment]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 连接 Elliptical / 或 Cadence 选定型号后 | L1 核心 | `👉 workout_reminder` |

**📝 业务逻辑**：
* **主标题**："Connected!" 绿勾动画。
* **副标题**："Your equipment is ready." / "Start your journey with SunnyFams"。
* **社区卡片**：UserPostCard，展示用户锻炼分享（头像、昵称、文案、课程），单张展示，5s 自动切换下一张。
* **CTA**："Start First Workout" → workout_reminder。

---

### 🎯 分支 B：Cadence 踏频器绑定 `[device_connect_branch_cadence]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 连接 Cadence 后 | L1 核心 | 选型号 → branch_equipment |

**📝 业务逻辑**：
* **主标题**："Cadence Connected"。
* **副标题**："Select your bike/elliptical"。
* **文案**："Great! Which classic Sunny bike/elliptical are you attaching it to?"
* **交互**：单选，4 个型号（Sunny Bike SB-100/200、Sunny Elliptical SE-100/200）。无 Skip。
* **路由**：选定后 → branch_equipment（展示社区卡片 + Start First Workout）。

---

### ⚖️ 分支 C：体脂秤测量 `[device_connect_branch_scale]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 连接 Scale 后 | L1 核心 | 2s 自动测量 → 结果页 → 注册引导 |

**📝 业务逻辑**：
* **引导阶段（未测量）**：主标题 "Connect Device"；副标题 "Please stand on the scale again and keep the scale lit up."；体重秤示意（87.7）；底部 "Scanning for nearby devices..." + loading。
* **自动测量**：调用体脂秤测量接口，测量完成后 scaleMeasured=true。
* **结果阶段（已测量）**：主标题 "Measurement Complete"；体重 87.7 kg 清晰展示；Body Fat %、BMI、Skeletal Muscle 高斯模糊/加锁。
* **注册引导**：非弹窗，底部固定按钮 "Register to unlock full report" → plan_create。

---

### 💓 分支 D：心率臂带 `[device_connect_branch_hr]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 连接 HR 臂带后 | L1 核心 | `👉 workout_reminder` |

**📝 业务逻辑**：
* **主标题**：屏幕中央 BPM 数字（带心跳动画，模拟 68～75 波动）。
* **副标题**："Heart rate secured." / "Let's get moving!"。
* **课程卡片**：CourseCard，布局 [配图 | 标题 | 描述]，单张展示，5s 自动切换（10min Light Cardio、Heart Rate HIIT、Cardio Blast 等）。
* **CTA**："Start First Workout" → workout_reminder。

---

### 🔘 底部 CTA 区 `[device_connect_cta]`

| 触发方式 | 🧩 模块层级 | 🔗 说明 |
| :--- | :--- | :--- |
| 按流程步骤 | Global | Verify Device / Retry Connection / Create My Plan / Start First Workout / Register to unlock full report |

**📝 业务逻辑**：
* **manual_entry**：Verify Device 按钮。
* **check_bt**：Retry Connection 按钮。
* **incompatible**：Create My Plan 按钮。
* **branch_equipment / branch_hr**：Start First Workout 按钮。
* **branch_scale（已测量）**：Register to unlock full report 按钮。
