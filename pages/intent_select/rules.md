# 🤖 注册与意图选择 (Signup Flow / Intent Select)

> **页面定位**：新用户完整入口。先展示品牌 Splash，再进入注册流程（邮箱/社交登录 → 邮箱确认 → 密码 → 隐私与地区 → 昵称 → 教练选择），注册完成后展示意图选择（连设备 / 找课程 / 随便看看），根据选择分流到 device_connect、plan_create 或 just_explore，还原完整路径。

---

### 🌟 品牌 Splash `[intent_select_splash]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 页面加载 | Global | 自动进入注册流程 |

**📝 业务逻辑**：
* **展示**：全屏品牌红色背景 + Sunny Logo（白/红变体）渐显。
* **动作/路由**：展示结束后自动进入注册第一步（Social Login）。

---

### 📧 Step 1: 社交/邮箱登录 `[intent_select_step_social]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| Splash 结束后进入 | L1 核心 | 留屏，解锁后进入 Step 2 或跳过至 Step 4 |

**📝 业务逻辑**：
* **文案**：主标题 "Welcome to SunnyFit"；副标题 "Your personal fitness journey starts here"。
* **交互**：邮箱输入框 + "Continue with Email" 主按钮；未填有效邮箱时按钮 Disabled（透明度 40%）。底部 "or continue with" + Apple / Google / Facebook 社交登录。
* **状态控制**：邮箱格式需含 "@" 才可点击 "Continue with Email"。
* **动作/路由**：点击 "Continue with Email" `[intent_select_cta_continue_email]` 进入 Step 2（邮箱确认）；点击社交登录进入 Step 4（Privacy）。
* **页脚**：By continuing, you agree to our Terms and Privacy Policy。

---

### 📬 Step 2: 邮箱确认 `[intent_select_step_email]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| Step 1 点击 Continue with Email | L1 核心 | 返回 Step 1 / Continue → Step 3 |

**📝 业务逻辑**：
* **文案**：主标题 "Enter your email"；副标题 "We'll use this to create your account"；placeholder "your@email.com"。
* **动作/路由**：返回 → Step 1；Continue（有效邮箱）→ Step 3（Password）。

---

### 🔒 Step 3: 创建密码 `[intent_select_step_password]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| Step 2 点击 Continue | L1 核心 | 返回 Step 2 / Continue → Step 4 |

**📝 业务逻辑**：
* **文案**：主标题 "Create a password"；副标题 "Keep your account secure"；placeholder "Min 6 characters"。
* **状态控制**：至少 6 位字符时 Continue 可用；否则 Disabled（透明度 40%）。
* **动作/路由**：返回 → Step 2；Continue → Step 4（Privacy）。

---

### 🌐 Step 4: 隐私与地区 `[intent_select_step_privacy]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| Step 3 点击 Continue 或 Step 1 社交登录 | L1 核心 | 返回上一步 / Continue → Step 5 |

**📝 业务逻辑**：
* **文案**：主标题 "Privacy & Region"；副标题说明确认国家/地区以设置隐私选项。
* **交互**：Your region 展示当前国家（可点击打开底部 Sheet 选择）；Unit System 单选 Metric（kg/cm/km）或 Imperial（lb/ft/mi）。
* **动作/路由**：返回 → Step 3（或从社交登录进入时无上一步）；Continue → Step 5（Nickname）。

---

### 👤 Step 5: 昵称 `[intent_select_step_nickname]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| Step 4 点击 Continue | L1 核心 | 返回 Step 4 / Continue → Step 6 |

**📝 业务逻辑**：
* **文案**：主标题 "What should we call you?"；副标题 "This is how your coach will address you"；placeholder "Enter your nickname"。
* **状态控制**：昵称非空才可点击 Continue；最大长度 20。
* **动作/路由**：返回 → Step 4；Continue → Step 6（Coach Select）。

---

### 🧑‍🏫 Step 6: 教练选择 `[intent_select_step_coach]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| Step 5 点击 Continue | L1 核心 | 留屏，选教练后解锁 Start My Journey |

**📝 业务逻辑**：
* **文案**：问候 "Hi, [nickname]"；气泡文案 "Consistency is the only challenge. Who do you want by your side?"
* **交互**：三张教练卡片单选（Alex / Sarah / Max，含称号与口头禅），选中态边框与背景高亮。
* **状态控制**：未选教练时 "Start My Journey" 为 Disabled（透明度 40%）。
* **动作/路由**：点击 "Start My Journey" `[intent_select_cta_start_journey]` 进入意图选择全屏 `[intent_select_intentions]`（不跳转他页）。

---

### 🎯 意图选择（注册完成后）`[intent_select_intentions]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| Step 6 点击 Start My Journey | L1 核心 | 三选一 → device_connect / plan_create / just_explore |

**📝 业务逻辑**：
* **文案**：主标题 "Great! What do you want to start?"；副标题 "Let's do it first."。
* **数据**：点击任一选项前将 nickname + coach 写入 session（sunnyfit_user），供 plan_create、device_connect 等下游读取。
* **选项 1** `[intent_select_opt_device_connect]`：标题 "Connect Equipment"，副标题 "Connect your Sunny or JLL equipment" → `👉 device_connect`。
* **选项 2** `[intent_select_opt_plan_create]`：标题 "Find Workout Guide"，副标题 "Looking for workouts suit for me" → `👉 plan_create`。
* **选项 3** `[intent_select_opt_just_explore]`：标题 "Just Browsing"，副标题 "Looking for something fun" → `👉 just_explore`。

---

### 🔘 关键 CTA 与 Zone 对应

| Zone | 说明 |
| :--- | :--- |
| `intent_select_cta_continue_email` | Step 1「Continue with Email」 |
| `intent_select_cta_start_journey` | Step 6「Start My Journey」→ 显示意图选择 |
| `intent_select_opt_device_connect` | 意图「Connect Equipment」→ device_connect |
| `intent_select_opt_plan_create` | 意图「Find Workout Guide」→ plan_create |
| `intent_select_opt_just_explore` | 意图「Just Browsing」→ just_explore |

与 ui.html 中 `data-zone-id` / `data-prd-zone` 一致，供 PRD Viewer 双向高亮。
