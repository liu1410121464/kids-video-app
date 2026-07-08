# 儿童英语视频学习应用

基于 Vue3 + Uni-App 的儿童英语视频学习应用，支持**微信小程序**和**安卓 APK** 双端。

## 项目结构

```
kids-video-app/
├── config/
│   └── videoData.js      # 视频数据配置（分类、系列、剧集地址）
├── pages/
│   ├── index/
│   │   └── index.vue     # 首页（分类标签 + 视频卡片）
│   └── video/
│       └── video.vue     # 视频播放页
├── static/
│   ├── covers/           # 封面图片
│   └── videos/           # 本地视频文件（安卓APP模式）
├── App.vue
├── main.js
├── pages.json
├── manifest.json
└── README.md
```

## 一、编译安卓 APK

### 1. HBuilderX 打开项目
用 HBuilderX 打开本项目文件夹

### 2. 准备视频文件
将 mp4 视频文件放入 `static/videos/` 目录，然后在 `config/videoData.js` 中配置路径：
```js
videoUrl: '/static/videos/视频文件名.mp4'
```

### 3. 准备应用图标
将以下尺寸的图标放入 `static/icons/` 目录（可暂时跳过，使用默认图标）：
- `icon-72x72.png`（hdpi）
- `icon-96x96.png`（xhdpi）
- `icon-144x144.png`（xxhdpi）
- `icon-192x192.png`（xxxhdpi）

### 4. 原生 APP 云打包
HBuilderX → 发行 → 原生APP-云打包 → 选择 Android → 打包

### 5. 本地离线打包（可选）
如需自定义更多原生功能，参考 [Uni-App 离线SDK文档](https://nativesupport.dcloud.net.cn/)

### 6. 安装 APK
打包完成后将 `.apk` 文件传输到手机安装即可

---

## 二、运行微信小程序

### 1. 安装依赖
```bash
npm install @vant/weapp
```

### 2. 配置小程序 AppID
打开 `manifest.json` → 微信小程序配置 → 填入你的 AppID

### 3. 配置视频地址
在线模式需将视频上传到腾讯云 COS / 阿里云 OSS 获取直链：
```js
videoUrl: 'https://xxx.cos.ap-guangzhou.myqcloud.com/xxx.mp4'
```

### 4. 运行
HBuilderX → 运行 → 运行到小程序模拟器 → 微信开发者工具

---

## 关于夸克网盘资源

**核心结论：夸克分享链接不能直接在小程序或 APP 中使用。**

原因：
- 夸克有防盗链和 UA 检测
- 分享链接可能过期
- 需要登录态

**解决方案：**
1. **本地视频（安卓APP）** — 下载视频放到 `static/videos/`，零流量离线播放
2. **腾讯云 COS / 阿里云 OSS** — 获取标准 HTTPS 直链，小程序和 APP 通用
3. **微信云存储** — 与小程序深度集成
