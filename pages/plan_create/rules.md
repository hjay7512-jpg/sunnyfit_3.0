# plan_create 业务逻辑

> 按步骤/模块整理，关联 zone 用于 UI 双向联动。

---

## Step1 目标选择（四选一）

**交互：** 点击目标卡片

**逻辑：**
- 四选一：fat_loss | muscle | vitality | rehab
- 用户点击后记录至状态机 `selections.goal = '{value}'`
- 被选中卡片呈现 `border-brand-red`、`bg-brand-red/5` 高亮
- 未选目标时底部 `plan_create_cta_continue` 保持 disabled

**关联 zone：** `plan_create_goal_fat_loss` \| `plan_create_goal_muscle` \| `plan_create_goal_vitality` \| `plan_create_goal_rehab`

---

## Step2 器材选择

**交互：** 点击器材卡片 / 无器材

**逻辑：**
- **无器材**：点击后 `selections.equip = ['None']`，与所有有器材选项互斥
- **有氧/配件**：多选，记录至 `selections.equip`；若当前含 `None` 则选择具体器材时移除 `None`
- 选中项显示 Check 图标

**关联 zone：** `plan_create_equip_none` \| `plan_create_equip_cardio_accessories`

---

## Step3 频次（三选一）

**交互：** 点击频次选项

**逻辑：**
- 单选，`selections.freq = '{3|4|5}'`
- 3/4/5 天/周 对应标签 Newbie / Pro / Elite

**关联 zone：** `plan_create_freq_3` \| `plan_create_freq_4` \| `plan_create_freq_5`

---

## Step3 排除项（多选）

**交互：** 点击排除项

**逻辑：**
- Knee Pain、Back Pain、No Jumping、Heart/BP 多选
- 记录至 `selections.health`，用于生成计划时排除对应动作

**关联 zone：** `plan_create_exclude_health`

---

## Step3 CTA - AI 分析中

**交互：** 点击「Generate My AI Plan」后

**逻辑：**
- 先展示 2.5s 全屏 thinking 动效（selections.goal / equip 相关文案 + 三点跳动）
- 完成后 `setStep(4)`

**关联 zone：** `plan_create_thinking`

---

## Step5 教练选择（三选一）

**交互：** 点击教练卡片

**逻辑：**
- 三选一，`selectedCoach = { id: '{alex|sarah|max}', ... }`
- 选中卡片 `scale-[1.02]`、`border-brand-red`

**关联 zone：** `plan_create_coach_alex` \| `plan_create_coach_sarah` \| `plan_create_coach_max`

---

## 底部 CTA 组

| zone | 显示时机 | 逻辑 |
|------|----------|------|
| `plan_create_cta_continue` | Step1/2 | 需 `selections.goal` 已选(Step1) 才可点；点击 `setStep(step+1)` |
| `plan_create_cta_generate` | Step3 且 !thinking | 点击后 `setThinking(true)`，2.5s 后 `setStep(4)` |
| `plan_create_cta_yes` | Step4 | 点击 `setStep(5)` |
| `plan_create_cta_confirm_coach` | Step5 | 需 `selectedCoach` 已选；点击 `setStep(6)` |
| `plan_create_cta_start_now` | Step6 | 点击后 `navigateTo('first_ride')` |
