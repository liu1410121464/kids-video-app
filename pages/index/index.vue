<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-content">
        <view class="nav-logo">
          <view class="logo-icon">
            <text class="logo-emoji">🐣</text>
          </view>
          <text class="logo-text">宝宝大课堂</text>
        </view>
        <view class="nav-right">
          <view class="history-btn" @click="goHistory">
            <text class="history-icon">🕐</text>
            <text class="history-text">历史</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 欢迎区域 -->
    <view class="welcome-section">
      <view class="welcome-card">
        <view class="welcome-bubble bubble-1"></view>
        <view class="welcome-bubble bubble-2"></view>
        <view class="welcome-bubble bubble-3"></view>
        <text class="welcome-title">👋 嗨，小朋友！</text>
        <text class="welcome-subtitle">今天想玩点什么呀？</text>
      </view>
    </view>

    <!-- 功能卡片网格 -->
    <view class="feature-section">
      <!-- AI 讲故事（主功能） -->
      <view class="feature-card card-story" @click="goStory">
        <view class="card-glare"></view>
        <view class="card-icon-wrap icon-story">
          <text class="card-emoji">📖</text>
        </view>
        <text class="card-title">AI 讲故事</text>
        <text class="card-desc">输入关键词，AI 为你创作一个专属故事</text>
        <view class="card-badge">热门</view>
      </view>

      <!-- AI 画画 -->
      <view class="feature-card card-draw" @click="goDraw">
        <view class="card-glare"></view>
        <view class="card-icon-wrap icon-draw">
          <text class="card-emoji">🎨</text>
        </view>
        <text class="card-title">AI 画画</text>
        <text class="card-desc">说出你的想法，AI 帮你画出来</text>
      </view>

      <!-- AI 学习助手 -->
      <view class="feature-card card-chat" @click="goChat">
        <view class="card-glare"></view>
        <view class="card-icon-wrap icon-chat">
          <text class="card-emoji">🤖</text>
        </view>
        <text class="card-title">AI 学习助手</text>
        <text class="card-desc">有问题就问，AI 什么都知道</text>
      </view>
    </view>

    <!-- 底部提示 -->
    <view class="footer-tip">
      <text class="tip-text">✨ 每天一个 AI 故事，陪伴宝宝快乐成长</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onReady } from '@dcloudio/uni-app'

const statusBarHeight = ref(44)

onReady(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 44
})

function goStory () {
  uni.navigateTo({ url: '/pages/story/story' })
}

function goDraw () {
  uni.navigateTo({ url: '/pages/draw/draw' })
}

function goChat () {
  uni.navigateTo({ url: '/pages/chat/chat' })
}

function goHistory () {
  uni.navigateTo({ url: '/pages/favorites/favorites?tab=history' })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #fdf6ec 0%, #f7e8dc 100%);
  padding-bottom: 40rpx;
}

/* 导航栏 */
.nav-bar {
  background: transparent;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rpx 20rpx;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 14rpx;
}

.logo-icon {
  width: 72rpx;
  height: 72rpx;
  background: linear-gradient(135deg, #ffd166, #ff9e5e);
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(255, 158, 94, 0.35);
}

.logo-emoji {
  font-size: 40rpx;
}

.logo-text {
  font-size: 38rpx;
  font-weight: bold;
  color: #ff6b35;
}

.nav-right {
  display: flex;
  align-items: center;
}

.history-btn {
  display: flex;
  align-items: center;
  gap: 6rpx;
  padding: 12rpx 24rpx;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 30rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.history-icon {
  font-size: 26rpx;
}

.history-text {
  font-size: 24rpx;
  color: #7a6a5d;
  font-weight: 600;
}

/* 欢迎区域 */
.welcome-section {
  padding: 10rpx 30rpx 30rpx;
}

.welcome-card {
  background: linear-gradient(135deg, #ff9e5e 0%, #ff6b35 100%);
  border-radius: 32rpx;
  padding: 44rpx 40rpx;
  box-shadow: 0 12rpx 30rpx rgba(255, 107, 53, 0.35);
  position: relative;
  overflow: hidden;
}

.welcome-bubble {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
}

.bubble-1 {
  width: 160rpx;
  height: 160rpx;
  right: -30rpx;
  top: -40rpx;
}

.bubble-2 {
  width: 80rpx;
  height: 80rpx;
  right: 100rpx;
  bottom: -20rpx;
}

.bubble-3 {
  width: 40rpx;
  height: 40rpx;
  left: 200rpx;
  top: 20rpx;
}

.welcome-title {
  font-size: 42rpx;
  font-weight: bold;
  color: #ffffff;
  display: block;
  margin-bottom: 10rpx;
  position: relative;
}

.welcome-subtitle {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
  position: relative;
}

/* 功能卡片 */
.feature-section {
  padding: 0 30rpx;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.feature-card {
  border-radius: 28rpx;
  padding: 32rpx 28rpx;
  position: relative;
  overflow: hidden;
  transition: all 0.25s;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.08);
}

.feature-card:active {
  transform: scale(0.96);
}

.card-glare {
  position: absolute;
  top: 0;
  right: 0;
  width: 120rpx;
  height: 120rpx;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 0 0 0 100%;
}

/* 讲故事卡片（大卡片，占整行） */
.card-story {
  grid-column: 1 / -1;
  background: linear-gradient(135deg, #fff9f0 0%, #fff0e2 100%);
  border: 3rpx solid #ff9e5e;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 44rpx 40rpx;
}

.card-draw {
  background: linear-gradient(135deg, #f0f8ff 0%, #e4f1ff 100%);
  border: 3rpx solid #5b9dff;
}

.card-chat {
  background: linear-gradient(135deg, #f8f4ff 0%, #efe7fb 100%);
  border: 3rpx solid #9b6dff;
}

.card-icon-wrap {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20rpx;
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.08);
}

.icon-story {
  background: linear-gradient(135deg, #ffd166, #ff9e5e);
}

.icon-draw {
  background: linear-gradient(135deg, #8fc1ff, #5b9dff);
}

.icon-chat {
  background: linear-gradient(135deg, #b89bff, #9b6dff);
}

.card-emoji {
  font-size: 64rpx;
}

.card-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #3d3733;
  display: block;
  text-align: center;
}

.card-desc {
  font-size: 23rpx;
  color: #8a7a6d;
  margin-top: 8rpx;
  text-align: center;
  line-height: 1.5;
}

.card-badge {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  background: linear-gradient(135deg, #ff6b35, #ff9e5e);
  color: #ffffff;
  font-size: 20rpx;
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
  font-weight: bold;
}

/* 底部提示 */
.footer-tip {
  padding: 40rpx 30rpx 0;
  text-align: center;
}

.tip-text {
  font-size: 24rpx;
  color: #c0b2a4;
}
</style>