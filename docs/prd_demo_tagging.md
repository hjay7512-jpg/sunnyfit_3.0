# PRD Demo 标注军规 (SOP 3.0)

为使 PRD Viewer 能精准提取业务逻辑、埋点与多语言资产，每个核心可交互元素需按以下规范打上数据属性。本文档适用于所有 Demo 页面（如 `pages/*/ui.html`）。

---

## 一、三种锚点属性

| 属性 | 用途 | 绑定对象 | 示例 |
|------|------|----------|------|
| `data-zone-id` | 逻辑锚点，与 rules.md 中 `### [zone_id]` 一一对应 | 业务规则文档 | `data-zone-id="plan_create_goal_fat_loss"` |
| `data-i18n-key` | 多语言锚点，与 locales 表中的 key 一致 | 翻译表 (locales.json) | `data-i18n-key="plan_create_title_focus"` |
| `data-track-id` | 埋点事件名 | 神策/数据埋点表 | `data-track-id="click_goal_card"` |
| `data-track-params` | 埋点参数（JSON 字符串） | 同上 | `data-track-params='{"goal":"fat_loss"}'` |

可根据模块按需添加：至少保证可点击/可交互区域具备 `data-zone-id`；若该页需要多语言或埋点验收，则补充 `data-i18n-key`、`data-track-id`（及可选 `data-track-params`）。

---

## 二、命名约定

- **zone_id**：建议 `模块_页面_元素`，如 `plan_create_goal_fat_loss`、`intent_course_card`。需与 `rules.md` 中三级标题 `### [zone_id]` 完全一致。
- **i18n key**：建议 `页面_元素_文案`，如 `plan_create_title_focus`、`plan_create_cta_continue_label`。需与 `locales.json` 中的 key 一致。
- **track-id**：建议小写+下划线事件名，如 `click_goal_card`、`click_plan_create_continue`。与埋点表/数据团队约定保持一致。

---

## 三、HTML 示例

```html
<div class="card"
  data-zone-id="intent_course_card"
  data-i18n-key="intent_course_title"
  data-track-id="click_intent_course"
  data-track-params='{"source": "splash", "user_type": "new"}'>
  <h3>Find a Course</h3>
</div>
```

- 文案由多语言注入时：在需替换的文本节点（或其父容器）上写 `data-i18n-key`，Viewer 切换语言时会替换该节点文本。
- 仅容器可点击、文案在子节点：`data-zone-id` 与 `data-track-*` 打在可点击容器上，`data-i18n-key` 打在文案所在节点上。

---

## 四、与 PRD Viewer 的配合

- **双向高亮**：Viewer 通过 `data-zone-id` 建立左侧 Demo 与右侧 rules.md 的对应关系；点击/悬停 UI 会滚动并高亮文档，悬停文档会高亮 UI。
- **埋点清单 Tab**：Viewer 会遍历 iframe 内所有带 `data-track-id` 的节点，生成埋点表并支持一键复制 CSV。
- **语言切换**：Viewer 根据当前语言从 `locales.json` 取 value，替换带 `data-i18n-key` 的节点文本。

---

## 五、试点页面

以 **plan_create**（AI 计划生成向导）为试点，所有目标卡片、器材选项、频次、排除项、教练卡、底部 CTA 等均已按本军规补充上述属性，可作为其他页面的参考实现。
