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

### ⚡ Step 1: 准备与权限 `[device_connect_prep]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击 I'm Ready | L1 核心 | 弹权限请求 → 授权后进入扫描 |

**📝 业务逻辑**：
* **直达扫描**：跳过中间介绍，直接拉起权限请求。
* **权限文案**：iOS 蓝牙 / Android 蓝牙+附件+位置。「为了帮您找到专属的 Sunny 器械，我需要使用您的蓝牙权限」。
* **准备提示**：Power on your device，设备需在 5m 内并通电。

---

### 📡 Step 2: 蓝牙雷达扫描 `[device_connect_scanning]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 蓝牙扫描 | Global | 发现设备 / 10s 超时 |

**📝 业务逻辑**：
* **扫描态**：雷达动效 + 蓝牙图标，展示 Searching...
* **设备发现**：展示设备卡片（型号、信号），点击发起连接。
* **超时**：10s 未扫到设备 → 弹出扫描失败弹窗，提供型号校验入口。

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
* **文案**："Please stand on the scale again and keep it light on."
* **展示**：仅清晰展示体重 (Weight)，体脂/BMI/骨骼肌等做高斯模糊/加锁。
* **拦截**：弹窗 "Register to monitor more body data and unlock your full report." → 注册流程。

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
| 按流程步骤 | Global | I'm Ready / Can't find device? / Verify / Retry / Create My Plan / Start First Workout |
