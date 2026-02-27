# UI 与 Rules 生成/优化执行规范

> 基于 intent_select、plan_create、device_connect 等模块实践提炼的执行规范，供新增/优化页面时统一遵循。

---

## 一、rules.md 规范

### 1.1 文件结构

```markdown
# [模块名称] (Page Name)

> **页面定位**：一句话描述模块在整体流程中的角色与价值。

---

### [区块标题] `[zone_id]`

| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| [描述] | L1 核心 / Global | 留屏 / `👉 page_id` |

**📝 业务逻辑**：
* [要点 1]
* [要点 2]

---

（重复上述区块）
```

### 1.2 Zone ID 命名规则

| 类型 | 格式 | 示例 |
|------|------|------|
| 页面级区块 | `{page}_step_{name}` | `plan_create_step_goal` |
| 子元素/选项 | `{page}_opt_{id}` | `intent_select_opt_device_connect` |
| 分支流程 | `{page}_branch_{type}` | `device_connect_branch_equipment` |
| 通用区块 | `{page}_{name}` | `plan_create_cta_area`, `device_connect_header` |

**强制约束**：zone_id 必须与 ui.html 中 `data-zone-id` / `data-prd-zone` 完全一致，否则 PRD Viewer 双向高亮无法联动。

### 1.3 表格列说明

- **触发方式**：用户/系统如何进入该区块（点击、自动流转、超时等）
- **🧩 模块层级**：L1 核心 / Global 等
- **🔗 页面出口**：留屏 / `👉 target_page_id` / 具体动作描述

### 1.4 PRD Viewer 解析依赖

- 仅 **h3** 标题中的 `[zone_id]` 会被解析为 `data-zone` 供高亮使用
- 正则：`/\[([a-z0-9_]+)\]/i`，即 `[plan_create_step_goal]` 提取 `plan_create_step_goal`

### 1.5 业务逻辑描述规范（高质量输出保证）

#### 1.5.1 结构规范

业务逻辑采用 **粗体小标题 + 条文** 形式，便于开发直接实现：

```markdown
**📝 业务逻辑**：
* **交互规则**：单选/多选/排他逻辑的具体说明。
* **状态控制**：按钮/控件的启用/禁用条件，含具体数值（如 透明度 30%）。
* **路由/动作**：点击后的跳转目标 `👉 page_id` 或内部流转。
* **异常处理**：超时、失败、跳过时的兜底逻辑。
* **数据埋点**：（如适用）上报时机与数据项。
```

#### 1.5.2 常用分类标签

| 标签 | 适用场景 | 示例 |
|------|----------|------|
| **交互规则** | 单选、多选、排他、Toggle、Slider 等 | 「单选逻辑。用户必须在 4 个目标中选一项」 |
| **状态控制** | 按钮/控件的 enabled/disabled、可见性 | 「未选择时 Continue 为 Disabled (透明度 30%)」 |
| **布局** | 位置、层级、动画 | 「左上角悬浮返回按钮，z-index 最上层」 |
| **文案** | 主/副标题、提示语、按钮文案 | 「主标题 "Hi, I'm your AI Coach."」 |
| **动作/路由** | 点击后跳转、内部流转 | 「点击后进入 device_connect」 |
| **异常处理** | 超时、失败、网络错误 | 「10s 超时 → Toast 提示并退回 Step 3」 |
| **防误触** | 动画期间禁止点击 | 「入场动画期间 pointer-events: none」 |
| **降级** | 性能差、无设备、旧型号 | 「不支持蓝牙型号 → 推荐 10min 入门视频课」 |
| **数据埋点** | 上报时机、上报内容 | 「记录用户偏好标签，用于冷启动推荐」 |

#### 1.5.3 必写要素

| 要素 | 要求 | 反例 |
|------|------|------|
| 关键文案 | 主标题、副标题、按钮文案等需用引号写出 | 「展示主标题」 ❌ → 「主标题 "Hi, I'm your AI Coach."」 ✓ |
| 数值/阈值 | 时间、距离、数量、透明度等写清 | 「超时后提示」 ❌ → 「10s 未扫到 → 弹窗」 ✓ |
| 路由出口 | 明确 `👉 page_id` 或「留屏」「解锁按钮」 | 「进入下一页」 ❌ → 「`👉 plan_create`」 ✓ |
| 排他/互斥 | 多选场景需说明互斥逻辑 | 「可多选」 ❌ → 「选 None 时清空其他；选具体器材时取消 None」 ✓ |

#### 1.5.4 可实施性检查

每条业务逻辑应满足：

- **可量化**：含具体数字或枚举（3 days/week、5m、SF-0001、4 个目标）
- **可执行**：开发能据此写出 if/else 或状态机
- **无歧义**：避免「适当」「尽量」「必要时」等模糊表述

#### 1.5.5 示例对照

**低质量**：
```markdown
* 用户选择目标后可以继续。
* 失败时给出提示。
```

**高质量**：
```markdown
* **交互规则**：单选逻辑。用户必须在 4 个核心目标（Lose Weight / Build Muscle / Keep Fit / Improve Endurance）中选一项。
* **状态控制**：未选择时 Continue 为 Disabled (透明度 30%) 且不可点击；选中后按钮高亮可用。
* **异常处理**：若后端超时，10s 后出 Toast 并退回 Step 3。
```

#### 1.5.6 业务逻辑自检清单

撰写完每个 zone 的 **📝 业务逻辑** 后，逐项核对：

- [ ] 关键文案是否用引号写出？
- [ ] 时间/距离/数量/透明度是否写清？
- [ ] 路由出口是否明确（`👉 page_id` 或「留屏」）？
- [ ] 多选/排他场景是否说明互斥规则？
- [ ] 是否覆盖超时、失败、跳过等异常路径？
- [ ] 是否可据此写出可执行代码？

#### 1.5.7 【关键】业务逻辑 vs Demo 模拟逻辑 — 禁止混淆

**rules.md 描述的是「业务逻辑」，而非「Demo 实现」或「UI 技术细节」。**

| 类型 | 定义 | rules 应写 | 禁止写 |
|------|------|------------|--------|
| **业务逻辑** | 产品/业务层面的规则，与实现无关 | 用户目标、系统职责、数据约束、异常路径、路由出口 | — |
| **Demo 模拟逻辑** | 为演示而写的 mock 行为 | — | 定时器 2.5s、setTimeout、mock 数据、前端硬编码 |
| **实现细节** | 前端/后端技术实现 | — | 「定时器切换 3 句文案」「setState」「调用某 API」 |

**判断原则**：
- 写 **做什么**（What），不写 **怎么做**（How）
- 写 **真实业务要求**，不写 **Demo 的 mock 实现**
- 枚举（选项、文案）必须以 **权威来源** 为准（PRD / description.txt / 当前 ui.html），三者不一致时需注明来源

**示例 — 错误 vs 正确：**

| 错误（混入 Demo/实现） | 正确（纯业务逻辑） |
|------------------------|--------------------|
| 「假加载策略：前端强制设定 2.5 秒最小停留，定时器切换 3 句加载文案」 | 「加载态：调用计划生成接口，等待期间展示 Sunny Logo 与加载文案；接口超时 10s 则 Toast 并退回上一步」 |
| 「提供 Emma、David、Sarah 三种人设」（与实际 Demo 的 Alex/Sarah/Max 不符） | 以 PRD/description 为准写出人设；若 Demo 与 PRD 不同，写 PRD 内容并加 *注：Demo 中为 Alex/Sarah/Max* |
| 「排除日期：周六/周日 Toggle」（Demo 实际是 Exclude Exercises：Knee Pain 等） | 以实际业务为准；若 PRD 为周六日，Demo 为身体部位，应写 PRD 逻辑并注明 *Demo 当前展示 Exclude Exercises* |

#### 1.5.8 业务逻辑数据源优先级

| 优先级 | 来源 | 用途 |
|--------|------|------|
| 1 | description.txt / orgin_knowledge/*.txt | 业务规则、文案、枚举的主来源 |
| 2 | PRD / 产品文档 | 与 description 冲突时，以 PRD 为准 |
| 3 | 当前 ui.html | 仅用于校验一致性；若与 PRD 不符，rules 写 PRD，并注明 Demo 差异 |

**强制**：撰写 rules 前必须阅读 description / orgin_knowledge，禁止仅凭 ui.html 逆向推导业务逻辑。

#### 1.5.9 禁止表述清单

以下表述不得出现在 **📝 业务逻辑** 中：

- `前端强制设定 X 秒`、`定时器`、`setTimeout`
- `Mock Loading`、`假加载`（应写：加载态、等待接口返回）
- 与当前 Demo/PRD 不符的枚举（人设名、目标选项、器材列表等）
- 未在 description/PRD 中出现的交互（如「周六/周日排除」若 PRD 无则禁止写）
- `*注：当前 Demo 仅做收集*` 等模糊兜底（应明确真实业务要求，Demo 差异单独注明）

---

## 二、ui.html 规范

### 2.1 基础结构

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>SunnyFit: [Page Name] (SOP 2.0)</title>
    
    <!-- React + Tailwind + Babel -->
    <script>
        function navigateTo(targetPageId) { /* SOP 2.0 MapsTo 跨级路由 */ }
        if (typeof window !== 'undefined') window.navigateTo = navigateTo;
    </script>
    <script>
        tailwind.config = { /* 品牌色、动画等 */ };
    </script>
    <style>/* mobile-viewport 375/390×812/844, no-scrollbar */</style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        /* React 组件 */
    </script>
</body>
</html>
```

### 2.2 路由约定

- 使用 `window.navigateTo(targetPageId)` 做跨页跳转
- pageId 与 `global_state_machine.md` 中「页面标识」一致（如 `intent_select`, `plan_create`, `device_connect`, `plan_create`, `just_explore`, `workout_reminder`）
- 降级：无 Viewer 外壳时使用 `alert` 提示

### 2.3 Zone 埋点

| 属性 | 用途 | 必选 |
|------|------|------|
| `data-zone-id` | PRD Viewer 双向高亮（首选） | ✓ |
| `data-prd-zone` | 兼容旧逻辑 | 建议同时设置 |

**放置位置**：
- 步骤/区块的**最外层包裹 div**
- 可点击卡片、按钮等交互元素
- 底部 CTA 区域

**多 step 场景**：每个 step 的**根容器**需有 step 级 zone，以便「可见区域最大」时正确高亮右侧规则。

### 2.4 品牌与样式

- 品牌色：`brand: { red, blue, beige, green, darkRed, sky }`
- 背景：`bg: { page: #FFFBF7, card, neutral }`
- 字体：Montserrat
- 视口：mobile-viewport 390×844（或 375×812）

### 2.5 动画

- 入场：`animate-fade-up`，可搭配 `style={{ animationDelay: \`${idx * 0.1}s\` }}`
- Logo 呼吸：`animate-breathe`
- 防误触：入场动画期间 `pointer-events: none`，结束后再启用

### 2.6 国际化

- 页面文案默认使用英文
- 需翻译文案使用 `data-i18n-key` 或 `data-i18n`
- 示例：`<h1 data-i18n-key="intent_select_greeting">Hi, I'm your AI Coach.</h1>`

---

## 三、rules.md 与 ui.html 一致性检查清单

| 检查项 | 说明 |
|--------|------|
| zone_id 一一对应 | rules.md 中每个 `[zone_id]` 在 ui.html 均有对应 `data-zone-id` |
| 路由出口可落地 | rules 中 `👉 page_id` 在 global_state_machine 中存在 |
| 文案一致 | rules 中描述的主/副标题、枚举与 description/PRD 一致；若与 Demo 不同需注明 |
| 分支覆盖 | 规则中定义的分支（如 A/B/C/D）在 ui 中有实现或占位 |
| **业务逻辑非 Demo 模拟** | 无「2.5s 定时器」「Mock Loading」「setTimeout」等 Demo 实现；无与 PRD/description 不符的枚举 |

---

## 四、PRD Viewer 双向高亮机制简述

1. **规则 → UI**：hover 规则 h3 时，根据 `data-zone` 在 iframe 内查找 `[data-zone-id="${zoneId}"]` 或 `[data-prd-zone="${zoneId}"]`，匹配不到则用 `zoneId.replace('_step_', '_')` 做前缀匹配（如 `plan_create_step_goal` → `plan_create_goal_*`）
2. **UI → 规则**：轮询 iframe 内可见 zone，取「可见面积最大」者，在 rules 侧高亮对应 h3；支持 `plan_create_goal_fat_loss` → `plan_create_step_goal` 等前缀映射

---

## 五、新增/优化模块执行顺序

1. **前置（必做）**：阅读 `global_state_machine.md` 与 **业务描述**（`description.txt` / `orgin_knowledge/*.txt`），以业务描述为 rules 的主数据源，禁止仅凭 ui.html 逆向推导
2. **rules.md**：按 1.1 结构编写，zone_id 命名遵循 1.2；业务逻辑遵循 1.5.7–1.5.9，描述真实业务规则，禁止混入 Demo 模拟逻辑
3. **ui.html**：实现 Demo，关键区块按 2.3 埋点，zone 与 rules 一一对应
4. **校验**：在 prd_view.html 中打开该页，确认规则 ↔ Demo 双向高亮；逐条核对 rules 业务逻辑是否与 description/PRD 一致，无 Demo 实现表述
5. **收尾**：更新 global_state_machine 若有新增出口
