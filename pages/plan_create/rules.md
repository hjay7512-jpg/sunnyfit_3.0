# 🤖 AI 计划生成向导 (Plan Create)

> **页面定位**：App 核心的新用户破冰与建档流程（Onboarding）。通过 8 步沉浸式对话式 UI，收集用户的身体目标、器材、水平、训练日、部位保护等，最终为其生成专属 AI 训练计划及教练人设。

---

### 🎯 Step 1: 核心目标选择 `[plan_create_step_goal]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击卡片单选 | L1 核心 | 留屏，解锁 Continue 按钮 |

**📝 业务逻辑**：
* **交互规则**：单选逻辑。用户必须在 4 个核心目标中选一项：Weight Loss / Build Muscle / Health & Vitality / Rehab & Stretch。
* **状态控制**：未选择时，底部 `Continue` 按钮为 Disabled (透明度 30%) 且不可点击；选中后按钮高亮可用。
* **动作/路由**：点击 Continue 进入 Step 2。
* **数据埋点**：记录用户初始偏好标签，用于冷启动推荐算法。

---

### 🚲 Step 2: 硬件器材收集 `[plan_create_step_equipment]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击卡片多选 / 点击 No Equipment | L1 核心 | 留屏，解锁 Continue 或直接进入 Step 3 |

**📝 业务逻辑**：
* **交互规则**：多选逻辑。用户可多选 Cardio Machines（Bike, Treadmill, Rower, Elliptical, Stepper, Row-N-Ride, Stair Climber）及 Accessories（Dumbbells, Bands, Yoga Ball）。
* **排他逻辑**：底部提供次级按钮 "No Equipment"。点击后清空所有已选器材，直接进入 Step 3（Current Level）。
* **状态控制**：选择具体器材时，至少选中一项才可点击 Continue；未选择时 Continue 为 Disabled (透明度 30%)。
* **动作/路由**：点击 Continue 进入 Step 3；点击 No Equipment 清空并进入 Step 3。

---

### 📊 Step 3: 确立起点 - Current Level `[plan_create_step_level]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击卡片单选 | L1 核心 | 留屏，解锁 Continue 按钮 |

**📝 业务逻辑**：
* **交互规则**：单选逻辑。用户必须在 3 个水平中选一项：Beginner (Just starting out) / Intermediate (I work out sometimes) / Advanced (Looking for a challenge)。
* **状态控制**：未选择时 Continue 为 Disabled (透明度 30%)；选中后按钮可用。
* **动作/路由**：点击 Continue 进入 Step 4。

---

### 📅 Step 4: 核心训练日 - Weekly Focus Days `[plan_create_step_focus_days]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击圆形气泡多选 | L1 核心 | 留屏，解锁 Continue 按钮 |

**📝 业务逻辑**：
* **文案**：主标题 "Select your Weekly Focus Days"；副标题 "3-4 days to push hard. I'll fill the rest with gentle recovery flows so you stay active every day."
* **交互规则**：7 个圆形气泡（M, T, W, T, F, S, S）横向排列，支持多选。推荐用户选择 3-4 天作为核心训练日。
* **状态控制**：可选 0 天或任意天数；选择后点击 Continue 进入 Step 5。
* **动作/路由**：点击 Continue 进入 Step 5。

---

### 🛡️ Step 5: 部位保护 - Body Quirks `[plan_create_step_body_quirks]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击胶囊按钮多选 | L1 核心 | `👉 触发 AI 生成状态` |

**📝 业务逻辑**：
* **文案**：主标题 "Any areas to protect?"（有什么需要保护的部位吗？）
* **交互规则**：多选胶囊按钮。选项：Knee Friendly (护膝) / Back Care (护腰) / Quiet / No Jump (静音防扰民)。可选 0 项或多项。
* **状态控制**：点击 "Generate My AI Plan" 后提交 Step 1-5 收集的所有表单数据，进入加载态。
* **动作/路由**：点击 Generate My AI Plan 后进入 plan_create_thinking。

---

### ⏳ AI 计算与生成动效 (中间态) `[plan_create_thinking]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 自动流转 | Global 全局 | `👉 自动进入 Step 6` |

**📝 业务逻辑**：
* **加载态**：调用计划生成接口，等待期间展示 Sunny Logo 与加载文案（如 "Analyzing fat loss goals..."、"Designing plan for [器材]..."）。
* **异常处理**：若后端接口超时或失败，10s 后出 Toast 提示并退回上一步。
* **动作/路由**：接口返回成功后自动进入 Step 6（策略展示）。

---

### 📊 Step 6: 策略展示 - The Vision & Commitment `[plan_create_step_vision]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 自动流转 | L1 核心 | 点击 "YES, I CAN DO THIS" 进入教练选择 |

**📝 业务逻辑**：
* **策略可视化**：展示代谢阶段柱状图（Wake Up / Burn / Shape / Habit）与 "One Final Question"。
* **文案**：主标题 "Your Strategy for Mastery"；副标题 "Weight loss isn't about a single workout; it's about a metabolic shift."；确认文案 "Are you ready to commit to this journey?"
* **动作/路由**：点击 "YES, I CAN DO THIS" 进入 Step 7。

---

### 🗣️ Step 7: 专属教练人设选择 - The Partnership `[plan_create_step_coach]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击卡片单选 | L1 核心 | 留屏，解锁 Confirm Coach 按钮 |

**📝 业务逻辑**：
* **文案**：主标题 "The Partnership"；副标题 "Consistency is the only challenge. Who do you want by your side?"
* **交互规则**：单选逻辑。提供 Alex (The Motivator)、Sarah (The Pro)、Max (Drill Sergeant) 三种人设，每张卡片展示头像、姓名、称号及口头禅。
* **状态控制**：必须选中一名教练，底部 `Confirm Coach` 按钮才可点击；未选中时按钮 Disabled (透明度 50%)。
* **动作/路由**：点击 Confirm Coach 进入 Step 8。

---

### 🚀 Step 8: 建档完成与首骑破冰 - The Ignition `[plan_create_ignition]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击 START NOW | L1 核心 | `👉 first_ride` |

**📝 业务逻辑**：
* **内容展示**：展示选中教练的人设切换（"Good choice. I'm [Name]."）、Phase 01 任务卡片（The Ignite Sequence、15-Min Power Rhythm、3 DAYS DURATION）。
* **注册拦截 (核心漏斗)**：在真实业务中，点击 `START NOW` 将唤起手机号/Apple/Google 的一键注册/登录弹窗。此时用户已被 AI 计划吸引，注册转化率达到峰值。
* **动作/路由**：点击 START NOW 跳转 `👉 first_ride`。
* **数据上报**：注册成功后，合并 Guest 态的 Device ID 与正式 User ID，将 Step 1-7 的建档数据持久化落库。

---

### 🔘 底部 CTA 区 `[plan_create_cta_area]`

| 触发方式 | 🧩 模块层级 | 🔗 说明 |
| :--- | :--- | :--- |
| 固定于底部 | Global | Continue / Generate My AI Plan / YES, I CAN DO THIS / Confirm Coach / START NOW 等按钮 |
