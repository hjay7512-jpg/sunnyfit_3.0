# 🏃 运动准备页 (Workout Prepare)

> **逻辑概述**：用户从计划创建「今日任务」或设备连接完成后进入。页面由上至下：标题栏、锻炼封面、设备连接区、模式设置入口、开始按钮。

---

## 页面布局（由上至下）

### 1.1 标题栏 `[workout_prepare_header]`
| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 返回按钮 + 页面标题 | Global | 点击返回进入上一页 |

* 返回按钮：`workout_prepare_header_back`；点击返回 plan_dashboard 等来源页。

---

### 1.2 锻炼封面 `[workout_prepare_cover]`
| 触发方式 | 说明 |
| :--- | :--- |
| 展示 | 1:1 比例图片，展示本次锻炼封面 |

---

### 1.3 设备连接按钮 `[workout_prepare_devices]`

| 区域 | Zone ID | 说明 |
| :--- | :--- | :--- |
| 左侧主设备 | `workout_prepare_device_main` | 进入页面后自动触发扫描，识别到已配对设备时自动连接。点击唤起半屏连接弹窗 |
| 右侧心率设备 | `workout_prepare_device_hr` | 展示心率图标，点击从底部唤起半屏连接弹窗进行设备扫描 |

**主设备弹窗** `[workout_prepare_modal_main]`：
* 设备列表，支持 Connect / Disconnect 操作。
* Demo：模拟自动扫描并连接成功；连接成功后展示设备图标 + 打钩。

**心率弹窗** `[workout_prepare_modal_hr]`：
* 设备列表，点击 Connect 进行连接。

---

### 1.4 模式设置入口 `[workout_prepare_mode]`
| 触发方式 | 🧩 模块层级 | 说明 |
| :--- | :--- | :--- |
| 左侧圆形入口 | L1 | 点击唤起模式选择弹窗 |

**模式弹窗** `[workout_prepare_modal_mode]`：
* **程序模式** `[workout_prepare_mode_program]`：展示程序模式列表（Manual / Fat Burn / Interval 等）。
* **自定义模式** `[workout_prepare_mode_custom]`：自定义时间 / 距离 / 卡路里及对应数值作为本次运动目标。

---

### 1.5 开始入口 `[workout_prepare_cta_start]`
| 触发方式 | 🧩 模块层级 | 🔗 页面出口 |
| :--- | :--- | :--- |
| 点击主按钮 | Global | 进入运动页面（如 free_mode） |
