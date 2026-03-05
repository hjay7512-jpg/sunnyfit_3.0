# 🤖 AI 个性化计划创建 (Plan Create)

> **逻辑概述**：当用户明确意图为希望寻求指导/课程时，进入计划创建流程，通过虚拟教练，逐步了解用户信息，生成个性化计划，并开始第一天的锻炼。

---

### ⬅️ 返回与页面步骤 `[plan_create_header_back]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击左上角返回按钮 | Global | Step 1 时 `👉 intent_select`；计划生成后，左上角切换为关闭按钮，点击直接进入首页；其余步骤为上一步 |

**📝 业务逻辑**：
* **动作/路由**：Step 1 点击返回进入 `👉 intent_select`；Step 2–8 点击返回回退到上一 Step。
* **防误触**：加载态（thinking）期间按钮隐藏或不可点击。
* **流程异常跳出**：本地记录当前用户所处步骤和已填写的信息，当App异常退出后，再次打开继续从上次的流程继续。

---

### 🎯 Step 1: 核心目标选择 `[plan_create_step_goal]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击卡片单选 | L1 核心 | 停留当前页面，解锁 Continue 按钮，进入下一步 |

**📝 业务逻辑**：
* **交互规则**：单选逻辑。用户必须在 4 个核心目标中选一项：Weight Loss / Build Muscle / Health & Vitality / Rehab & Stretch。
* **状态控制**：未选择时，底部 "Continue" 按钮为 Disabled 且不可点击；选中后按钮高亮可用。
* **动作/路由**：点击 Continue 进入 Step 2。返回时 Step 1 点击返回进入 `👉 intent_select`。
* **数据埋点**： 底部按钮：onboarding_plan_goal_click 。

---

### 🚲 Step 2: 硬件器材收集 `[plan_create_step_equipment]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击卡片多选 / 点击 No Equipment | L1 核心 | 留屏，解锁 Continue 或直接进入 Step 3 |

**📝 业务逻辑**：
* **交互规则**：多选逻辑。用户可多选 Cardio Machines（Bike, Treadmill, Rower, Elliptical, Stepper, Row-N-Ride, Stair Climber）及 Accessories（Dumbbells, Bands, Yoga Ball）。
* **排他逻辑**：底部提供次级按钮 "No Equipment"。点击后清空所有已选器材，直接进入 Step 3（Current Level）。
* **状态控制**：选择具体器材时，至少选中一项才可点击 Continue；未选择时 Continue 为 Disabled。
* **动作/路由**：点击 Continue 进入 Step 3；点击 No Equipment 清空并进入 Step 3。
* **数据埋点**： 底部按钮：onboarding_plan_equip_click 。

---

### 📊 Step 3: 确立起点 - Current Level `[plan_create_step_level]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击卡片单选 | L1 核心 | 留屏，解锁 Continue 按钮 |

**📝 业务逻辑**：
* **交互规则**：单选逻辑。用户必须在 3 个水平中选一项：Beginner (Just starting out) / Intermediate (I work out sometimes) / Advanced (Looking for a challenge)。
* **状态控制**：未选择时 Continue 为 Disabled；选中后按钮可用。
* **动作/路由**：点击 Continue 进入 Step 4。
* **数据埋点**： 底部按钮：onboarding_plan_level_click 。

---

### 📅 Step 4: 核心训练日 - Weekly Focus Days `[plan_create_step_focus_days]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击圆形气泡多选 | L1 核心 | 留屏，解锁 Continue 按钮 |

**📝 业务逻辑**：
* **文案**：主标题 "Select your Main Workout Days"；副标题 "3-4 days to push hard. I'll fill the rest with gentle recovery flows so you stay active every day."
* **交互规则**：7 个圆形气泡（M, T, W, T, F, S, S）横向排列，支持多选。推荐用户选择 3–4 天作为核心训练日。
* **状态控制**：可选 0 天或任意天数；选择后点击 Continue 进入 Step 5。
* **动作/路由**：点击 Continue 进入 Step 5。
* **数据埋点**： 底部按钮：onboarding_plan_day_click 。

---

### 🛡️ Step 5: 部位保护 - Body Quirks `[plan_create_step_body_quirks]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击胶囊按钮多选 | L1 核心 | 留屏，解锁 Continue 按钮 |

**📝 业务逻辑**：
* **文案**：主标题 "Anything I should keep in mind?"
* **交互规则**：多选胶囊按钮。选项：Knee-Friendly / Back Care / Wrist & Shoulder / No Jump / Standing Only / Pregnant。可选 0 项或多项。
* **状态控制**：Continue 始终可用；点击后进入 Step 6（生理信息）。
* **动作/路由**：点击 Continue 进入 Step 6。
* **数据埋点**： 底部按钮：onboarding_plan_quirk_click 。

---

### 📋 Step 6: 生理信息 - Body Stats `[plan_create_step_body_stats]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 填写或同步生理数据后点击主按钮 | L1 核心 | 留屏，解锁后进入加载态 |

**📝 业务逻辑**：
* **文案**：主标题 "Update your body stats to unlock your personalized workout plan"。
* **交互规则**：展示 4 项生理信息：Gender / Birthday / Weight / Height。支持从 Apple Health 一键同步；未同步时显示 "Select"。
* **状态控制**：底部主按钮 "Generate My AI Plan" 可用；点击后提交 Step 1–6 收集的表单与生理数据，进入加载态（plan_create_thinking）。
* **动作/路由**：点击 "Generate My AI Plan" 后进入 `[plan_create_thinking]`，成功后自动进入 Step 7。
* **数据**：生理信息与 Step 1–5 的选项一并写入 session/后端，供计划生成使用。
* **数据埋点**： 底部按钮：onboarding_plan_body_click / 三方同步按钮：onboarding_plan_body_sync_click。

---

### ⏳ AI 计算与生成动效（中间态）`[plan_create_thinking]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| Step 6 点击 Generate My AI Plan 后自动进入 | Global 全局 | 接口返回成功后自动进入 Step 7 |

**📝 业务逻辑**：
* **加载态**：调用计划生成接口，等待期间全屏展示 Sunny Logo 与加载文案（如 "Analyzing fat loss goals..."、"Designing plan for [器材]..."）。
* **异常处理**：若后端接口超时或失败，10s 后出 Toast 提示并退回上一步（Step 6）。
* **动作/路由**：接口返回成功后自动进入 Step 7（策略展示）。
* **防误触**：加载期间返回按钮隐藏避免中断请求。

---

### 📊 Step 7: 策略展示 - The Vision & Commitment `[plan_create_step_vision]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 自动流转（thinking 完成后） | L1 核心 | 点击 "See Today's Tasks" 进入 Step 8 |

**📝 业务逻辑**：
* **策略可视化**：展示代谢阶段柱状图（Wake Up / Burn / Shape / Habit）与 "One Final Question"。
* **文案**：主标题 "Your Strategy for Mastery"；副标题 "Weight loss isn't about a single workout; it's about a metabolic shift."；确认文案 "Are you ready to commit to this journey?"
* **动作/路由**：点击 "See Today's Tasks" 进入 Step 8（今日任务）。
* **数据埋点**： 底部按钮：onboarding_plan_overview_click 。 

---

### 📋 Step 8: 今日任务 - Today's Tasks `[plan_create_today_tasks]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| Step 7 点击 See Today's Tasks 后进入 | L1 核心 | 运动准备页 |

**📝 业务逻辑**：
* **内容展示**：展示教练问候卡片（教练信息来自上游 session，如 signup_flow 写入的 coach）、今日计划卡片（如 Ignite Sequence、时长、任务项）及数据预览（Calories / Intensity / Duration）。
* **动作/路由**：点击 "START WORKOUT" 进入对应的锻炼的运动准备页 。
* **数据埋点**： 底部按钮：onboarding_plan_start_click

---

### 🔘 底部 CTA 区 `[plan_create_cta_area]`

| 触发方式 | 🧩 模块层级 | 🔗 说明 |
| :--- | :--- | :--- |
| 固定于底部 | Global | 按步骤展示：Continue（Step 1–5）/ Generate My AI Plan（Step 6）/ See Today's Tasks（Step 7）/ START WORKOUT（Step 8）；Step 2 额外提供 No Equipment `[plan_create_equip_none]` |

**📝 业务逻辑**：
* **状态控制**：Step 1 未选目标、Step 2 未选器材、Step 3 未选水平时，对应 Continue 为 Disabled 。
* **Zone 与埋点**：主按钮使用 `plan_create_cta_continue` / `plan_create_cta_generate` / `plan_create_cta_see_tasks` / `plan_create_cta_start_workout`，与 ui.html 中 `data-zone-id` 一致，供 PRD Viewer 双向高亮。
