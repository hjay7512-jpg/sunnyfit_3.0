# 设备连接页 (Device Connect) 业务逻辑

## 1. 核心业务流程
[cite_start]复用 App 现有的设备连接底层能力，通过传入场景参数对其进行“静默改造”，以适应新用户极简的 Onboarding 流程 [cite: 226][cite_start]。针对不同类型的硬件实现精准体验分流，以最快速度交付核心价值并引导注册转化 [cite: 226]。

**触发条件与前置状态**：
* [cite_start]**前置页面**：用户在意图选择页点击 "Start with Equipment" 进入本流程 [cite: 226]。

**全局 UI 与场景降级 (is_onboarding === true)**：
* [cite_start]**直达扫描**：跳过非必要介绍页，直接拉起系统权限请求（文案定制：“为了帮您找到专属的 Sunny 器械，我需要使用您的蓝牙权限”）[cite: 226][cite_start]。授权后立即进入雷达扫描态 [cite: 226]。

**公共设备连接模块复用**：
* [cite_start]优先判断是否已授权（iOS 蓝牙，Android 蓝牙+附件设备+位置）[cite: 226]。
* [cite_start]扫描前静默请求服务端型号列表用于判断 [cite: 226]。
* [cite_start]扫描具备 10 秒超时判断逻辑 [cite: 226]。

## 2. 交互节点详情 (多设备路由分发流)

### [device_branch_equipment] 蓝牙器械分支
* [cite_start]**适用设备**：Treadmill / Indoor Bike / Rower / Row-N-Ride / Stepper / Elliptical 等 [cite: 226]。
* [cite_start]**视觉动作**：屏幕出现“连接成功”绿勾动画，保持连接状态 [cite: 226]。
* [cite_start]**路由跳转**：直接跳转进入首次锻炼引导页，随机展示社区用户运动分享 [cite: 226][cite_start]。点击下方【Start First Workout】按钮进入对应器械的【Free Mode】[cite: 226]。

### [device_branch_cadence] 踏频器配件 (Cadence) 分支
* [cite_start]**视觉动作**：连接成功后弹出绑定面板 [cite: 226]。
* [cite_start]**AI 文案**： "Great! Which classic Sunny bike/elliptical are you attaching it to?" [cite: 231]
* [cite_start]**交互逻辑**：提供不支持蓝牙的经典单车/椭圆机型号列表供点选 [cite: 226][cite_start]。若用户不想绑定，可提供 [Skip] 按钮，默认分配通用的 Indoor Cycling 课程 [cite: 226]。
* [cite_start]**路由跳转**：选定并上报数据后，跳转首次锻炼引导页 [cite: 226][cite_start]。点击【Start First Workout】进入【Free Mode】[cite: 226]。

### [device_branch_scale] 智能体脂秤 (Scale) 分支 (强转化)
* [cite_start]**视觉动作**：进入专属测量页 [cite: 226]。
* [cite_start]**AI 文案**："Please stand on the scale again and keep it light on.." [cite: 226]
* [cite_start]**交互逻辑**：测量完成后，UI 仅清晰展示“体重 (Weight)”结果，将体脂率、BMI 等高阶数据做高斯模糊/加锁图标处理 [cite: 226]。
* [cite_start]**路由跳转 (拦截)**：弹出强转化卡片："Register to monitor more body data and unlock your full report." [cite: 232][cite_start]。点击主按钮直接进入注册流程 [cite: 226]。

### [device_branch_hr] 心率臂带 (HR) 分支
* [cite_start]**视觉动作**：屏幕中央展示带有心跳动画的实时 BPM 数字 [cite: 226]。
* [cite_start]**AI 文案**："Heart rate secured. Let's get moving!" [cite: 233]
* [cite_start]**路由跳转**：底部卡片直接推荐一节【10min 的轻度 Cardio (心肺) 训练】或引导进入 Free Mode 发起锻炼 [cite: 226]。

## 3. 异常处理与兜底
* [cite_start]**扫描失败**：如果 10s 未扫到设备，弹出扫描失败弹窗，展示注意事项和型号校验入口 [cite: 226]。
* [cite_start]**型号校验降级**：若用户选择型号校验并输入了不支持蓝牙的型号，平滑过渡至“推荐该器械 10min 入门视频课”的降级路线 [cite: 226]。