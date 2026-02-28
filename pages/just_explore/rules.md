# 🤖 Just Explore · 情绪驱动轻量推荐 (Just Browsing)

> **页面定位**：在用户漫无目的时，通过情绪进行驱动，根据用户当前的状态，推荐轻量化的全身性有氧/拉伸训练。降低决策成本，建立即时信任，单节体验课即达即练。

---

## 🎯 核心业务目标

- **场景**：用户选择「随便看看 / Just Browsing」，无明确训练目标。
- **驱动**：以**情绪/身体状态**为入口，而非目标/器材。
- **产出**：为当前状态匹配**单节**轻量化课程（有氧/拉伸/放松），时长控制在 5–10 分钟，零门槛、低负担。

---

### 🧩 Step 1: 情绪/状态选择 `[just_explore_step1_mood]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击情绪卡片 | L1 核心 | 留屏，进入 Step 2（共情对话 + 推荐课程） |

**📝 业务逻辑**：
* **主文案**：标题 "No pressure. Just flow."；副标题 "Whether you want to sweat or just breathe, let's start with how your body feels right now."
* **交互规则**：四选一情绪卡片，且仅能选一项：**Stressed** / **Tired** / **Stiff** / **Energetic**。点击后立即进入 Step 2，无「确认」步骤。
* **状态控制**：选中即跳转，不保留「未选」态。
* **动作/路由**：选择后进入 Step 2，并带入当前场景配置（对话文案、推荐课程、图片等）。

**📐 UI 规范**：
* 2×2 网格，每卡片含：情绪 icon（大号 emoji）、英文 label。
* 卡片圆角 24px，白底、轻阴影，点击态 scale 0.95。

---

### 🧩 Step 2: 共情对话 + 推荐课程 `[just_explore_step2_recommend]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 自动展示 | L1 核心 | 底部 CTA「Start Session」→ first_ride |

**📝 业务逻辑**：
* **结构**：上方共情对话（标题 + 正文）→ 分割线 "Recommended For You" → 推荐课程卡片（封面图 + 课程名 + 标签 + 播放按钮）→ 底部固定 CTA「Start Session」。
* **对话语气**：需具备共情能力 (Empathy first)，针对当前情绪给出简短、安抚或鼓励的句子，再自然引出「为你选了这节课」。
* **推荐课程**：单节、轻量，根据场景 ID 从配置中读取（课程标题、标签、封面图 URL）。
* **动作/路由**：点击「Start Session」跳转 `👉 first_ride`；点击左上角返回回到 Step 1。

**📐 UI 规范**：
* 课程卡片圆角 28px，封面区域约 160px 高，底部渐变遮罩；下方展示 courseTag（如 "Yoga • 🧘 Low Impact"）与播放图标。
* 底部 CTA 全宽、品牌红、圆角 16px，固定于底部安全区上方。

---

### 📋 场景配置与规则 (Scenes)

每个情绪对应一套：`dialogueTitle`、`dialogueBody`、`courseTitle`、`courseTag`、`image`，以及该场景下的**业务规则**（用于文案/推荐策略约束）。

---

#### 😫 Stressed

| 字段 | 示例/约束 |
| :--- | :--- |
| dialogueTitle | 共情开场，如 "I hear you. It's been a long day, right?" |
| dialogueBody | 强调轻量、呼吸、无器械；时长 ≤10 分钟。 |
| courseTitle | 示例："8-Min Stress Relief Flow" |
| courseTag | 示例："Yoga • 🧘 Low Impact" |
| **业务规则** | 对话语气需具备共情能力 (Empathy first)；推荐课程时长不得超过 10 分钟；禁止推荐高强度 (HIIT) 课程。 |

---

#### 🥱 Tired

| 字段 | 示例/约束 |
| :--- | :--- |
| dialogueTitle | 接纳低能量，如 "Low energy? That's okay. We can work with that." |
| dialogueBody | 强调无汗、拉伸、助眠；可提「Pajama Routine」等睡前场景。 |
| courseTitle | 示例："5-Min Bedtime Stretch" |
| courseTag | 示例："Stretch • 🌙 Relax" |
| **业务规则** | 强调 'No Sweat' (无汗) 属性；图片需传达宁静、昏暗氛围；适用场景文案需包含 'Bedtime'。 |

---

#### 🤕 Stiff

| 字段 | 示例/约束 |
| :--- | :--- |
| dialogueTitle | 针对久坐/办公，如 "Office shoulders? Let's fix that." |
| dialogueBody | 强调肩颈/背部针对性，可床边完成。 |
| courseTitle | 示例："Neck & Shoulder Release" |
| courseTag | 示例："Mobility • 💆 Relief" |
| **业务规则** | 针对久坐/办公人群优化文案；推荐课程必须专注于肩颈或背部；强调 'Relief' (缓解) 效果。 |

---

#### 🔥 Energetic

| 字段 | 示例/约束 |
| :--- | :--- |
| dialogueTitle | 积极、挑战口吻，如 "Love the energy! Let's put it to good use." |
| dialogueBody | 强调高效、自重、零器械、短时燃脂。 |
| courseTitle | 示例："10-Min Full Body Tone" |
| courseTag | 示例："HIIT • ⚡ High Intensity" |
| **业务规则** | 文案风格需积极、挑战性 (Challenge)；推荐课程应为 HIIT 或力量训练；图片需展示动态张力。 |

---

### 🔘 底部 CTA 区 `[just_explore_cta]`

| 触发方式 | 🧩 模块层级 | 🔗 说明 |
| :--- | :--- | :--- |
| 仅 Step 2 显示 | Global | 「Start Session」→ first_ride；返回按钮仅 Step 2 可见，回到 Step 1。 |

---

### 🔗 页面入口与出口

| 入口 | 出口 |
| :--- | :--- |
| intent_select 选择「Just Browsing」进入本页 | Step 1 返回 → intent_select；Step 2「Start Session」→ first_ride |

---

### 📌 与 Plan Create 的差异

| 维度 | Just Explore | Plan Create |
| :--- | :--- | :--- |
| 用户意图 | 无明确目标，随便看看 | 有目标（减脂/增肌/健康/康复等） |
| 驱动维度 | 情绪/身体状态（4 选 1） | 目标 → 器材 → 水平 → 训练日 → 部位保护 |
| 产出 | 单节体验课，即选即练 | 多步建档 + AI 计划 + 教练人设 |
| 时长 | 单步选择 + 单步推荐，共 2 步 | 8 步沉浸式对话 |
