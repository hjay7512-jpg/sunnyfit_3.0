# 意图选择页 (Intent Select) 业务逻辑

## 1. 核心业务流程
[cite_start]作为新用户注册流程的第一站，摒弃传统的枯燥问卷。使用 AI 教练的口吻进行破冰问候，并提供三个直观的意图选项（连设备、找课程、随便看看）[cite: 229][cite_start]。根据用户的选择，将其精准分流到对应的个性化 Onboarding 体验链路中 [cite: 229]。

**触发条件与前置状态**：
* [cite_start]前置页面：用户在「登录/注册选择页」点击【Get Started】后触发进入此页面 [cite: 229]。
* [cite_start]状态清理：进入此页面时，需初始化或清空本地关于意图选择的缓存数据 [cite: 229]。

## 2. 交互节点详情

### [intent_page_header] 顶部与背景
* [cite_start]**全局布局**：全屏居中沉浸式布局，背景色为 `bg-bg-page` [cite: 229]。
* [cite_start]**交互逻辑**：左上角需补充一个【返回】按钮（`<Icons.ChevronLeft />`），悬浮在最上层 [cite: 229][cite_start]。点击后退出当前流程，退回到“登录/注册选择页” [cite: 229]。

### [intent_ai_greeting] AI 视觉与文案
* [cite_start]**视觉表现**：页面中上部展示 AI 动态 Logo，需带有缓慢呼吸动画（`animate-breathe`） [cite: 229]。
* [cite_start]**文案展示**：主标题为 "Hi, I'm your AI Coach." [cite: 230][cite_start]，副标题为 "What's our focus for today?" [cite: 229][cite_start]。文案需带有从下往上渐现的动画效果（`animate-fade-up`） [cite: 229]。

### [intent_card_equipment] 意图卡片：连接设备
* **模块层级**: L1 核心选项
* [cite_start]**卡片内容**: Icon: "🚲", 标题: "Start with Equipment", 副标题: "Connect your Sunny gear" [cite: 231]。
* [cite_start]**跳转去向**: => /pages/device_connect [cite: 231]

### [intent_card_course] 意图卡片：寻找课程
* **模块层级**: L1 核心选项
* [cite_start]**卡片内容**: Icon: "🔎", 标题: "Find a Course", 副标题: "Looking for guided workouts" [cite: 232]。
* [cite_start]**跳转去向**: => /pages/plan_create [cite: 232]

### [intent_card_explore] 意图卡片：随便看看
* **模块层级**: L1 核心选项
* [cite_start]**卡片内容**: Icon: "👀", 标题: "Just Browsing", 副标题: "I have no specific goal yet" [cite: 233]。
* [cite_start]**跳转去向**: => /pages/just_explore [cite: 233]

## 3. 异常处理与兜底
* [cite_start]**防止误触**：卡片在进场动画期间，应设置 `pointer-events: none` 防止用户在动画未完成时盲点导致路由错乱 [cite: 229]。
* [cite_start]**降级处理**：如果设备性能极差导致 CSS 动画卡顿，动画库需提供无动画的兜底显示，确保三个选项立即可见可点 [cite: 229]。