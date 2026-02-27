# 🤖 AI 形象打招呼与意图选择页 (Intent Select)

> **页面定位**：新用户注册流程的第一站。摒弃枯燥问卷，用 AI 教练口吻破冰问候，提供三个直观意图选项（连设备、找课程、随便看看），根据选择精准分流到对应 Onboarding 链路。

---

### 🔙 顶部导航与返回 `[intent_select_header]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击返回按钮 | L1 核心 | `👉 auth_select` |

**📝 业务逻辑**：
* **布局**：左上角悬浮返回按钮（ChevronLeft），最上层 z-index。
* **动作/路由**：点击后退出当前流程，`👉 auth_select`（登录/注册选择页）。

---

### 🤖 AI 视觉与文案 `[intent_select_greeting]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 页面加载 | Global | 留屏 |

**📝 业务逻辑**：
* **AI 视觉**：页面中上部展示 AI 动态 Logo（SunnyLogo），带呼吸动画（animate-breathe）。
* **文案**：主标题 "Hi, I'm your AI Coach."，副标题 "What's our focus for today?"。文案使用从下往上渐现动画（animate-fade-up）。

---

### 🚲 意图选项 1：连接设备 `[intent_select_opt_device_connect]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击卡片 | L1 核心 | `👉 device_connect` |

**📝 业务逻辑**：
* **卡片内容**：Icon 🚲，标题 "Start with Equipment"，副标题 "Connect your Sunny gear"。
* **路由**：点击后进入设备连接流程（device_connect）。

---

### 🔎 意图选项 2：找课程 `[intent_select_opt_plan_create]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击卡片 | L1 核心 | `👉 plan_create` |

**📝 业务逻辑**：
* **卡片内容**：Icon 🔎，标题 "Find a Course"，副标题 "Looking for guided workouts"。
* **路由**：点击后进入计划流（plan_create）。

---

### 👀 意图选项 3：随便看看 `[intent_select_opt_just_explore]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击卡片 | L1 核心 | `👉 just_explore` |

**📝 业务逻辑**：
* **卡片内容**：Icon 👀，标题 "Just Browsing"，副标题 "I have no specific goal yet"。
* **路由**：点击后进入无目标状态选择流（just_explore）。

---

### ⚠️ 异常处理与兜底 `[intent_select_edge]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 入场动画期间 | Global | 留屏 |

**📝 业务逻辑**：
* **防止误触**：卡片进场动画（入场延迟）期间，设置 `pointer-events: none`，动画完成后再启用点击，避免盲点导致路由错乱。
* **降级**：若设备性能差导致 CSS 动画卡顿，确保三个选项立即可见可点（无动画兜底）。
