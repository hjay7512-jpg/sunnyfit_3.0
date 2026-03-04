# 🤖 注册与意图选择 (Signup Flow / Intent Select)

> **逻辑概述**：新用户注册入口。延用现有注册流程，视觉和交互上强化AI教练身份，增加意图判断以分流到不同的引导流程。

> **流程说明**：邮箱/社交登录→ 密码设置（三方登录无此步骤） → 隐私与地区 → 昵称 → 教练选择 → 意图选择（连设备 / 找课程 / 随便看看），根据选择分流到 device_connect、plan_create 或 just_explore。


---

### 📧 Step 1: 【现有逻辑】三方账号/邮箱登录 `[intent_select_step_social]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 用户选择注册新账号 | L1 核心 | 邮箱注册进入 Step 2，三方注册 Step 4 |

**📝 业务逻辑**：
* **交互**：邮箱输入框 + "Continue with Email" 主按钮；未填有效邮箱时按钮 Disabled, 点击toast对应提升。下方展示 "or continue with" + Apple / Google / Facebook 三方登录选项。
* **状态控制**：邮箱格式需校验含 "@" 。
* **动作/路由**：点击 "Continue with Email" `[intent_select_cta_continue_email]` 进入 Step 2（验证码验证）；点击社交登录进入 Step 4（Privacy）。
* **页脚**：By continuing, you agree to our Terms and Privacy Policy。

---

### 📬 Step 2: 【现有逻辑】验证码验证 `[intent_select_step_email]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| Step 1 点击 Continue with Email | L1 核心 | 返回 Step 1 / Continue → Step 3 |

**📝 业务逻辑**：
* **动作/路由**：返回 → Step 1； Resend → 重发验证码 ； Continue → Step 3（Password）。

---

### 【现有逻辑】🔒 Step 3: 创建密码 `[intent_select_step_password]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| Step 2 点击 Continue | L1 核心 | 返回 Step 1 / Continue → Step 4 |

**📝 业务逻辑**：

* **状态控制**：至少 6 位字符时 按钮 可用；否则 Disable。
* **动作/路由**：返回 → Step 2；Continue → 校验密码格式 ，通过则进入Step 4（Privacy）， 不符合规则则Toast对应提示。

---

### 【逻辑调整】🌐 Step 4: 隐私与地区 `[intent_select_step_privacy]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| Step 3 点击 Continue 或 Step 1 社交登录 | L1 核心 | 返回上一步 / Continue → Step 5 |

**📝 业务逻辑**：
* **国家/地区**： 通过用户服务请求IP信息反推其所在国家地区，作为默认值填入，点击弹窗进入手动修改。
* **公英制**： 根据手机OS Locale Region 解析为 US (美国)、MM (缅甸)、LR (利比里亚) 时，预设为英制 (Imperial)。其余所有区域，一律预设为公制 (Metric)。点击弹窗进入手动修改。
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
* **交互**：三张教练卡片单选（Alex / Sarah / Max，含称号与人物介绍），选中态边框与背景高亮。
* **状态控制**：未选教练时 "Start My Journey" 为 Disabled
* **动作/路由**：点击 "Start My Journey" `[intent_select_cta_start_journey]` 进入意图选择全屏 `[intent_select_intentions]`（不跳转他页）。

---

### 🎯 意图选择（注册完成后）`[intent_select_intentions]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| Step 6 点击 Start My Journey | L1 核心 | 三选一 → device_connect / plan_create / just_explore |

**📝 业务逻辑**：
* **文案**：主标题 "Great! What do you want to start?"；副标题 "Let's do it first."。
* **数据/状态**：进入下游页前，当前用户信息（昵称、所选教练）需可供下游页面（plan_create、device_connect、just_explore）使用。
* **选项 1** `[intent_select_opt_device_connect]`：标题 "Connect Equipment"，副标题 "Connect your Sunny or JLL equipment" → `👉 device_connect`。
* **选项 2** `[intent_select_opt_plan_create]`：标题 "Find Workout Guide"，副标题 "Looking for workouts suit for me" → `👉 plan_create`。
* **选项 3** `[intent_select_opt_just_explore]`：标题 "Just Browsing"，副标题 "Looking for something fun" → `👉 just_explore`。

---

### 🔘 关键 CTA 与 Zone 对应

| Zone | 说明 |
| :--- | :--- |
| `intent_select_cta_continue_email` | Step 1「Continue with Email」 |
| `intent_select_cta_start_journey` | Step 6「Start My Journey」→ 显示意图选择 |
| `intent_select_coach_alex` | Step 6 教练卡片 Alex |
| `intent_select_coach_sarah` | Step 6 教练卡片 Sarah |
| `intent_select_coach_max` | Step 6 教练卡片 Max |
| `intent_select_opt_device_connect` | 意图「Connect Equipment」→ device_connect |
| `intent_select_opt_plan_create` | 意图「Find Workout Guide」→ plan_create |
| `intent_select_opt_just_explore` | 意图「Just Browsing」→ just_explore |

与 ui.html 中 `data-zone-id` / `data-prd-zone` 一致，供 PRD Viewer 双向高亮。
