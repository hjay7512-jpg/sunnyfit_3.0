# 📋 计划详情页 (Plan Dashboard)

> **页面定位**：用户进入已有 AI 训练计划后的核心落地页，展示计划进度、系统阶段、今日/未来训练安排，支持快速调整与计划管理。

---

### ⬅️ 页头与导航 `[plan_dashboard_header]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击返回 / 点击更多 | Global | `👉 home_page` / 打开 Action Sheet |

**📝 业务逻辑**：
* **布局**：左侧返回按钮、居中计划标题与副标题（器材、训练天数）、右侧更多按钮。
* **动作/路由**：点击返回进入 `👉 home_page`；点击更多打开 Action Sheet（Adjust Plan / Swap Plan / End Current Plan）。
* **文案**：主标题展示计划名称（如 "12 lbs to ideal weight"）；副标题展示器材与周训练天数。

---

### 📊 系统阶段追踪 `[plan_dashboard_step_system_track]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 自动展示 | L1 核心 | 留屏 |

**📝 业务逻辑**：
* **内容展示**：展示计划代谢阶段（如 Awakening / Ignition / Shift）进度条、当前阶段名称与描述、下一里程碑提示。
* **状态控制**：当前阶段高亮，未达成阶段灰度展示；进度条百分比由后端数据驱动。
* **文案**：当前阶段标签 "Current: [阶段名]"；状态角标 "In Progress"；下一里程碑 "Next Milestone: [描述]"。

---

### 🎯 今日/未来训练 `[plan_dashboard_step_up_next]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 自动展示 / 点击 Adjust | L1 核心 | 留屏 / 打开 Coach AI Chat |

**📝 业务逻辑**：
* **布局**：区块标题 "Up Next"；训练类型图例（Cardio / Strength / Recover）；教练气泡文案；今日训练卡片；Start Session / Adjust 按钮。
* **动作/路由**：点击 "Start Session" 进入 `👉 workout_prepare`；点击 "Adjust" 打开 Coach AI Chat 浮层。

---

### 📅 训练周历滚动窗 `[plan_dashboard_rolling_window]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 自动展示 | L1 核心 | 留屏 |

**📝 业务逻辑**：
* **交互规则**：展示昨日 / 今日 / 明日及后续 2 天的训练类型（Cardio / Strength / Recovery / Rest）。
* **状态控制**：昨日为完成态（✓）；今日为当前态（高亮、可操作）；未来日为锁定态（🔒）；休息日显示 "-"。
* **类型配色**：Cardio 红、Strength 蓝、Recovery 绿、Rest 灰。

---

### 🏋️ 今日训练卡片 `[plan_dashboard_workout_card]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 自动展示 | L1 核心 | 留屏 |

**📝 业务逻辑**：
* **内容展示**：训练封面图、类型标签（Cardio / Strength / Recovery / Rest）、时长、标题。
* **智能调整**：用户通过 Coach AI 调整后（如改为 Yoga、Skip），卡片内容实时更新并带 "🪄" 标签。
* **Recovery 态**：若为 Recovery 类型，卡片边框与按钮使用品牌绿强调。

---

### 🔘 主操作区 `[plan_dashboard_cta_area]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击 Start Session / Adjust | L1 核心 | `👉 workout_prepare` / 打开 Coach AI Chat |

**📝 业务逻辑**：
* **主按钮 "Start Session"**：进入 `👉 workout_prepare`；Recovery 日为绿色，其他日为红色。
* **次按钮 "Adjust"**：打开 Coach AI Chat 浮层，支持快速调整（如 Prefer Yoga、Skip completely）。
* **Zone 与埋点**：`plan_dashboard_cta_start`、`plan_dashboard_cta_adjust` 与 ui.html 中 `data-zone-id` 一致，供 PRD Viewer 双向高亮。

---

### 📋 Action Sheet 菜单 `[plan_dashboard_menu]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击页头更多按钮 | Global | 打开设置 / 打开计划库 / 终止计划 / 关闭 |

**📝 业务逻辑**：
* **Adjust Plan** `[plan_dashboard_menu_adjust]`：打开 Plan Settings 浮层，修改强度、训练日、器材等。
* **Swap Plan** `[plan_dashboard_menu_swap]`：进入计划库选择其他计划。
* **End Current Plan** `[plan_dashboard_menu_end]`：危险操作，需二次确认；确认后终止当前计划并退回 `👉 home_page`。
* **Cancel**：关闭 Action Sheet。

---

### ⚙️ 计划设置 `[plan_dashboard_settings]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| Action Sheet 点击 Adjust Plan | L1 核心 | 关闭并触发 AI 重算 / 关闭 |

**📝 业务逻辑**：
* **交互规则**：Intensity 单选（Beginner / Intermediate / Advanced）；Main Workout Days 多选（Mon–Sun）；Available Equipment 多选（Home Bike / Treadmill / Rowing Machine / Dumbbells / Bodyweight Only）。
* **状态控制**：Days 至少选 1 天；Equipment 至少选 1 项。
* **动作/路由**：点击 "Save & Recalculate" 提交新配置，触发 AI 重算计划；重算期间展示全屏加载态；完成后 Toast 提示并关闭。
* **异常处理**：重算接口超时 10s 则 Toast 提示并保持设置浮层可再次提交。

---

### 💬 Coach AI Chat `[plan_dashboard_chat]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击 Adjust 按钮 | L1 核心 | 关闭并更新今日训练 / 关闭 |

**📝 业务逻辑**：
* **交互规则**：展示对话历史；底部快捷按钮（如 "Prefer Yoga"、"Skip completely"）可一键发送并触发 AI 调整。
* **动作/路由**：用户选择快捷调整或输入文本后，AI 返回调整结果并更新今日训练卡片；调整完成后可自动关闭 Chat。
* **文案**：快捷按钮 "🧘 Prefer Yoga"、"🛋️ Skip completely" 等，以 PRD/业务描述为准。
