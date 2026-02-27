# 🔗 设备连接通用模块 (Device Connect)

> **页面定位**：Onboarding 场景下的设备连接流程。复用现有蓝牙连接能力，通过场景参数静默适配。针对不同硬件类型（标准器械、踏频器、体脂秤、心率带）实现精准分流，引导至注册转化。

---

### 🔙 顶部导航与返回 `[device_connect_header]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击返回按钮 | L1 核心 | 退回 intent_select |

**📝 业务逻辑**：
* **Onboarding 模式**：隐藏跳过/关闭按钮、去商城购买、固件升级等干扰项。
* **返回动作**：退回意图选择页。

---

### ⚡ Step 1: 权限获取（独立引导页）`[device_connect_permission]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 页面进入 | L1 核心 | Continue → 扫描 |

**📝 业务逻辑**：
* **独立引导页**：权限页为全屏独立引导，非弹窗。
* **权限卡片**：Bluetooth（已勾选）、Location（Open）、Nearby Devices（Open）。
* **确认授权**：点击 Continue 后进入扫描页。

---

### 📡 Step 2: 蓝牙雷达扫描 `[device_connect_scanning]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 蓝牙扫描 | Global | 发现设备 / 10s 超时 |

**📝 业务逻辑**：
* **扫描态**：雷达动效 + 放大镜图标，文案 "Scaning Equipments Nearby..."，"Please keep the device turned on"。
* **设备发现**：以底部弹窗展示设备列表，标题 "Add Equipment"，副标题 "Nearby devices have been searched"，每项带 "Add >" 按钮。
* **超时**：10s 未扫到设备 → 弹出扫描失败弹窗，提供型号校验入口。

---

### 📋 扫描结果弹窗 `[device_connect_scan_results]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 扫描到设备 | L1 核心 | Add → 连接 / Retry Search / X 关闭 |

**📝 业务逻辑**：
* **弹窗形式**：底部升起弹窗，覆盖扫描页背景。
* **设备列表**：Cadence / BMI Smart Scale / Elliptical / HR 等，每项 "Add >" 发起连接。
* **Retry Search**：重试扫描。**X**：关闭弹窗，留屏。

---

### ❌ 扫描失败与型号校验 `[device_connect_scan_failed]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 10s 超时 / 用户点击 Can't find device? | L1 核心 | 型号校验 / 重试 |

**📝 业务逻辑**：
* **弹窗**：展示注意事项与型号校验入口。
* **型号校验**：用户输入型号（如 SF-0001）。支持蓝牙型号 → 引导重连；不支持 → 降级至 plan_create。

---

### 📝 Step 3: 手动型号校验 `[device_connect_manual_entry]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 输入型号 + 点击 Verify Device | L1 核心 | check_bt / incompatible |

**📝 业务逻辑**：
* **输入框**：Model e.g. SF-0001。
* **校验**：支持型号（如 SF-0001）→ Model Supported! → 重试连接；不支持 → 降级至 plan_create。

---

### ✅ Step 4: 型号支持确认 `[device_connect_check_bt]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 型号校验通过 | L1 核心 | 重试连接（返回 scanning） |

**📝 业务逻辑**：
* **提示**：Model Supported! 绿勾动画。
* **检查项**：Check display console. Stay within 5m. Disconnect others.
* **动作**：Retry Connection → 返回扫描态。

---

### 📴 不支持型号降级 `[device_connect_incompatible]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 型号校验不通过 | L1 核心 | `👉 plan_create` |

**📝 业务逻辑**：
* **文案**：Your equipment is a manual model. Your effort always counts. Let's build a tailored plan...
* **路由**：Create My Plan → 转入 plan_create（软件计划向导）。

---

### 🚲 分支 A：标准器械连接成功 `[device_connect_branch_equipment]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 连接 Treadmill / Bike / Rower 等 | L1 核心 | `👉 workout_reminder` |

**📝 业务逻辑**：
* **动作**：醒目「连接成功」绿勾动画，保持设备连接状态。
* **路由**：直接进入首次锻炼引导页，下方【Start First Workout】→ workout_reminder / Free Mode。

---

### 🎯 分支 B：Cadence 踏频器绑定 `[device_connect_branch_cadence]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 连接 Cadence 后 | L1 核心 | 选型号 / Skip → workout |

**📝 业务逻辑**：
* **文案**："Great! Which classic Sunny bike/elliptical are you attaching it to?"
* **交互**：经典单车/椭圆机型号列表供点选。
* **跳过**：[Skip] 按钮，默认分配 Indoor Cycling 课程。
* **路由**：选定后 → 首次锻炼引导 → workout_reminder。

---

### ⚖️ 分支 C：体脂秤测量 `[device_connect_branch_scale]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 连接 Scale 后 | L1 核心 | 测量 → 注册拦截 |

**📝 业务逻辑**：
* **文案**："Please stand on the scale bare-footed." / "Please stand on the scale again and keep it light on."
* **展示**：仅清晰展示体重 (Weight)，体脂/BMI/骨骼肌等做高斯模糊/加锁。
* **拦截**：测量完成后弹窗 "Register to monitor more body data and unlock your full report." → 注册流程。

---

### 🔒 Scale 注册拦截弹窗 `[device_connect_scale_register]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| Scale 测量完成 | L1 核心 | Register Now → plan_create / Maybe Later → 留屏 |

**📝 业务逻辑**：
* **弹窗**：强转化卡片，主按钮 "Register Now" 进入注册/plan_create。
* **Maybe Later**：关闭弹窗，展示 Create My Plan 兜底 CTA。

---

### 💓 分支 D：心率臂带 `[device_connect_branch_hr]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 连接 HR 臂带后 | L1 核心 | `👉 workout_reminder` |

**📝 业务逻辑**：
* **动作**：屏幕中央展示带心跳动画的实时 BPM。
* **文案**："Heart rate secured. Let's get moving!"
* **路由**：推荐 10min 轻度 Cardio 或 Free Mode → workout_reminder。

---

### 🔘 底部 CTA 区 `[device_connect_cta]`

| 触发方式 | 🧩 模块层级 | 🔗 说明 |
| :--- | :--- | :--- |
| 按流程步骤 | Global | Can't find device? / Verify Device / Retry / Create My Plan / Start First Workout |
