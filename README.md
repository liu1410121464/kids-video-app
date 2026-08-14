# 宝宝大课堂 - AI 智能儿童故事启蒙小程序

基于 Vue3 + Uni-App 的 AI 儿童故事生成小程序，支持**微信小程序**和**安卓 APK** 双端。

## 🚀 功能特性

- 📖 **AI 讲故事**：输入关键词，AI 自动生成适合孩子年龄的有趣故事
- 🎨 **AI 画画**（即将上线）：描述想画的内容，AI 生成精美插图
- 🤖 **AI 学习助手**（即将上线）：孩子有任何问题都可以问 AI
- 🎲 **随机推荐**：不知道听什么故事？一键随机生成关键词
- 💾 **故事收藏**：喜欢的故事可以保存到本地

## 📁 项目结构

```
kids-video-app/
├── pages/
│   ├── index/
│   │   └── index.vue     # 首页（功能导航）
│   └── story/
│       └── story.vue     # AI 讲故事页面
├── config/
│   └── prompts.js        # AI 提示词与配置
├── utils/
│   └── aiService.js      # AI API 调用封装
├── ai-api/               # Vercel AI 代理层
│   ├── server.js         # 本地开发服务器
│   ├── vercel.json       # Vercel 部署配置
│   ├── .env.example      # 环境变量示例
│   └── api/
│       └── story.js      # AI 讲故事接口
├── static/
│   └── icons/
├── App.vue
├── main.js
├── pages.json
├── manifest.json
└── README.md
```

## 🔧 快速开始

### 1. 部署 AI 代理层（Vercel）

```bash
cd ai-api
npm install

# 本地开发
npm start

# 部署到 Vercel
vercel deploy
```

**环境变量配置**（在 Vercel Dashboard 中设置）：
```
SENSENOVA_API_KEY=your_api_key_here
```

### 2. 配置小程序端

打开 `utils/aiService.js`，将 `API_BASE` 改为你部署的 Vercel 域名：

```js
const API_BASE = 'https://your-app.vercel.app'
```

### 3. 运行小程序

用 HBuilderX 打开项目 → 运行 → 运行到小程序模拟器 → 微信开发者工具

## 📱 微信小程序配置

1. 打开 `manifest.json` → 微信小程序配置 → 填入你的 AppID
2. 在微信公众平台将小程序类目设置为：**教育 - 教育信息服务**
3. 提交审核

## 🤖 AI 模型说明

| 模型 | 用途 | 说明 |
|------|------|------|
| `sensenova-6.8-flash-lite` | 故事文本生成 | 快速、低成本，适合生成儿童故事 |
| `sensenova-u1-fast` | 故事配图生成 | 生成儿童绘本风格的插图 |

## 💰 成本估算

- **Vercel**：免费额度每月 100 万次请求
- **SenseNova API**：按量计费，flash-lite 非常便宜
- **日常使用**：每月估计不到 50 元

## 📋 后续规划

- [ ] AI 画画功能
- [ ] AI 学习助手
- [ ] 故事收藏/历史记录
- [ ] 每日推荐故事
- [ ] 多语言支持（英语故事）
