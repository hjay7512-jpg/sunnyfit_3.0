require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// 从 .env 文件中读取配置
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY;

if (!FIGMA_TOKEN || !FILE_KEY) {
    console.error("❌ 错误：请确保在 .env 文件中配置了 FIGMA_TOKEN 和 FIGMA_FILE_KEY！");
    process.exit(1);
}

// 设置请求头
const figmaAPI = axios.create({
    baseURL: 'https://api.figma.com/v1',
    headers: { 'X-Figma-Token': FIGMA_TOKEN }
});

// 递归查找所有带有 👉zone: 标记的图层
function findHotspots(node, hotspots = []) {
    if (node.name && node.name.includes('👉zone:')) {
        // 提取 zone_id，例如 "👉zone:plan_create_step_goal" 提取出 "plan_create_step_goal"
        const zoneId = node.name.split('👉zone:')[1].trim();
        if (node.absoluteBoundingBox) {
            hotspots.push({
                id: zoneId,
                x: node.absoluteBoundingBox.x,
                y: node.absoluteBoundingBox.y,
                width: node.absoluteBoundingBox.width,
                height: node.absoluteBoundingBox.height
            });
        }
    }
    
    if (node.children) {
        node.children.forEach(child => findHotspots(child, hotspots));
    }
    return hotspots;
}

async function extractPRD() {
    console.log("🚀 正在连接 Figma API...");
    try {
        // 1. 获取整个文件的数据树
        const response = await figmaAPI.get(`/files/${FILE_KEY}`);
        const document = response.data.document;
        
        console.log(`✅ 成功读取文件: ${response.data.name}`);
        
        // 2. 查找热区
        console.log("🔍 正在全网搜寻带有 👉zone: 标记的图层...");
        const hotspots = findHotspots(document);
        
        if (hotspots.length === 0) {
            console.log("⚠️ 没有找到任何带有 👉zone: 标记的图层。请先去 Figma 里改一下图层名字哦！");
            return;
        }

        console.log(`🎯 找到了 ${hotspots.length} 个交互热区！`);

        // 3. 为了准确计算相对位置，我们需要找到主画板的起点 (这里取第一个热区所在的画板近似计算，实际业务中可更精确)
        // 简单起见，我们假设导出的设计图是从 (0,0) 开始的，或者直接使用绝对坐标。
        // 这里提供一段生成 HTML 的模板代码：
        
        let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>自动生成的 UI 热区</title>
    <style>
        body { margin: 0; background: #f0f0f0; display: flex; justify-content: center; }
        .mockup-container {
            position: relative;
            width: 390px; /* 请根据你实际 Figma 画板宽度修改 */
            height: 844px; /* 请根据你实际 Figma 画板高度修改 */
            /* 记得把下面这张图换成你真正从 Figma 导出的背景图！ */
            background-image: url('请替换成你的UI底图.png'); 
            background-size: 100% auto;
            background-repeat: no-repeat;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            overflow-y: auto;
        }
        .hotspot {
            position: absolute;
            cursor: pointer;
            background-color: rgba(238, 67, 67, 0.2); /* 默认显示浅红色，方便你确认位置 */
            border: 1px dashed red;
            transition: 0.2s;
        }
        .hotspot:hover { background-color: rgba(238, 67, 67, 0.5); }
    </style>
</head>
<body>
    <div class="mockup-container">
`;

        // 注入热区 div
        hotspots.forEach(spot => {
            // 注意：如果你的 Figma 画布不是从 x:0, y:0 开始的，你可能需要减去画板的起点坐标 (boardX, boardY)
            // 这里直接使用了 Figma 的绝对坐标
            htmlContent += `
        <div class="hotspot" 
             style="left: ${spot.x}px; top: ${spot.y}px; width: ${spot.width}px; height: ${spot.height}px;" 
             data-zone-id="${spot.id}">
        </div>`;
        });

        htmlContent += `
    </div>

    <script>
        // 自动注入的联动代码
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-zone-id]');
            if (target) {
                const zoneId = target.getAttribute('data-zone-id');
                window.parent.postMessage({ type: 'ZONE_CLICK', zoneId: zoneId }, '*');
            }
        });
    </script>
</body>
</html>
`;

        // 4. 将生成的 HTML 写入文件
        const outputPath = path.join(__dirname, 'ui_generated.html');
        fs.writeFileSync(outputPath, htmlContent, 'utf8');
        
        console.log(`🎉 大功告成！已成功生成热区文件: ${outputPath}`);
        console.log(`💡 下一步：把 ui_generated.html 里的背景图换成你真实的截图，然后把它改名为 ui.html 放到 pages 对应的目录里！`);

    } catch (error) {
        console.error("❌ 提取失败：", error.response ? error.response.data : error.message);
    }
}

extractPRD();