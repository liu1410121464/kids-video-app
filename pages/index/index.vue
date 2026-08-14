<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-content">
        <view class="nav-logo">
          <text class="logo-emoji">🐣</text>
          <text class="logo-text">宝宝大课堂</text>
        </view>
      </view>
    </view>

    <!-- 欢迎区域 -->
    <view class="welcome-section">
      <view class="welcome-card">
        <text class="welcome-title">👋 嗨，小朋友！</text>
        <text class="welcome-subtitle">今天想玩什么呢？</text>
      </view>
    </view>

    <!-- 功能卡片 -->
    <view class="feature-section">
      <view class="feature-card feature-main" @click="goStory">
        <view class="feature-icon">📖</view>
        <view class="feature-info">
          <text class="feature-title">AI 讲故事</text>
          <text class="feature-desc">输入关键词，AI 为你讲一个精彩的故事</text>
        </view>
        <view class="feature-arrow">→</view>
      </view>

      <view class="feature-card feature-coming">
        <view class="feature-icon">🎨</view>
        <view class="feature-info">
          <text class="feature-title">AI 画画</text>
          <text class="feature-desc">说出你想画的，AI 帮你画出来</text>
        </view>
        <view class="coming-badge">即将上线</view>
      </view>

      <view class="feature-card feature-coming">
        <view class="feature-icon">🤖</view>
        <view class="feature-info">
          <text class="feature-title">AI 学习助手</text>
          <text class="feature-desc">有问题就问 AI，它什么都知道</text>
        </view>
        <view class="coming-badge">即将上线</view>
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
  uni.navigateTo({
    url: '/pages/story/story'
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #fff8f0 0%, #fff0e6 100%);
  padding-bottom: 40rpx;
}

/* 导航栏 */
.nav-bar {
  background: transparent;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30rpx 20rpx;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.logo-emoji {
  font-size: 48rpx;
}

.logo-text {
  font-size: 40rpx;
  font-weight: bold;
  color: #ff6b35;
}

/* 欢迎区域 */
.welcome-section {
  padding: 20rpx 30rpx 30rpx;
}

.welcome-card {
  background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
  border-radius: 24rpx;
  padding: 36rpx 40rpx;
  box-shadow: 0 8rpx 24rpx rgba(255, 107, 53, 0.3);
}

.welcome-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #ffffff;
  display: block;
  margin-bottom: 8rpx;
}

.welcome-subtitle {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
}

/* 功能区域 */
.feature-section {
  padding: 0 30rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.feature-card {
  background: #ffffff;
  border-radius: 24rpx;
  padding: 32rpx 30rpx;
  display: flex;
  align-items: center;
  gap: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
  position: relative;
  transition: transform 0.2s;
}

.feature-card:active {
  transform: scale(0.98);
}

.feature-main {
  border: 3rpx solid #ff6b35;
  background: linear-gradient(135deg, #fff8f0 0%, #ffffff 100%);
}

.feature-coming {
  opacity: 0.7;
}

.feature-icon {
  font-size: 60rpx;
  width: 100rpx;
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff0e6;
  border-radius: 50%;
  flex-shrink: 0;
}

.feature-info {
  flex: 1;
}

.feature-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
  display: block;
  margin-bottom: 6rpx;
}

.feature-desc {
  font-size: 24rpx;
  color: #999999;
  line-height: 1.5;
}

.feature-arrow {
  font-size: 40rpx;
  color: #ff6b35;
  font-weight: bold;
}

.coming-badge {
  position: absolute;
  top: 16rpx;
  right: 16rpx;
  background: #f0f0f0;
  color: #999999;
  font-size: 20rpx;
  padding: 4rpx 12rpx;
  border-radius: 10rpx;
}

/* 底部提示 */
.footer-tip {
  padding: 40rpx 30rpx 0;
  text-align: center;
}

.tip-text {
  font-size: 24rpx;
  color: #cccccc;
}
</style>
