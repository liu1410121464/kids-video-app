<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-content">
        <view class="nav-back" @click="goBack">
          <text class="back-icon">←</text>
        </view>
        <text class="nav-title">智能画画</text>
        <view class="nav-placeholder"></view>
      </view>
    </view>

    <!-- 描述输入 -->
    <view class="input-section" v-show="!loading && !showImage">
      <view class="section-title">
        <text class="title-text">🎨 说出你想画的</text>
      </view>

      <view class="input-card">
        <textarea
          class="draw-input"
          v-model="prompt"
          placeholder="比如：一只戴帽子的小猫在吃鱼、彩虹下的城堡、开火箭的宇航员..."
          placeholder-class="input-placeholder"
          maxlength="100"
          auto-height
        />
        <view class="input-footer">
          <text class="char-count">{{ prompt.length }}/100</text>
        </view>
      </view>

      <!-- 灵感推荐 -->
      <view class="inspire-section">
        <text class="inspire-label">💡 画点什么好呢？</text>
        <view class="inspire-tags">
          <view
            v-for="(idea, i) in ideas"
            :key="i"
            class="idea-tag"
            @click="selectIdea(idea)"
          >
            <text class="idea-text">{{ idea }}</text>
          </view>
        </view>
      </view>

      <!-- 生成按钮 -->
      <view class="draw-btn" :class="{ disabled: loading }" @click="handleDraw">
        <text class="btn-text">{{
          loading ? '⏳ 生成中...' : '✨ 开始画画'
        }}</text>
      </view>
    </view>

    <!-- 加载动画 -->
    <view class="loading-section" v-show="loading">
      <view class="loading-card">
        <view class="palette">
          <view class="dot d1"></view>
          <view class="dot d2"></view>
          <view class="dot d3"></view>
          <view class="dot d4"></view>
          <view class="brush">🖌️</view>
        </view>
        <text class="loading-text">正在生成画作...</text>
        <text class="loading-sub">把你的想象变成画，需要一点时间哦</text>
      </view>
    </view>

    <!-- 展示图片 -->
    <view class="result-section" v-show="showImage">
      <view class="result-image-wrap" @click="previewImage">
        <image
          class="result-image"
          :src="imageUrl"
          mode="widthFix"
          @error="onImageError"
        />
        <view class="image-preview-hint">
          <text class="hint-text">🔍 点击预览</text>
        </view>
      </view>

      <view class="result-prompt">
        <text class="prompt-text">🖌️ {{ prompt }}</text>
      </view>

      <!-- 操作按钮 -->
      <view class="result-actions">
        <view class="action-btn action-save" @click="saveImage">
          <text class="action-text">📥 保存到相册</text>
        </view>
        <view class="action-btn action-retry" @click="resetDraw">
          <text class="action-text">🔄 再画一张</text>
        </view>
      </view>
    </view>

    <!-- 错误提示 -->
    <view class="error-section" v-if="errorMessage">
      <view class="error-card">
        <text class="error-emoji">😅</text>
        <text class="error-text">{{ errorMessage }}</text>
        <view class="error-btn" @click="retry">
          <text>重试</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onReady } from '@dcloudio/uni-app'
import { generateDraw } from '@/utils/aiService.js'

const statusBarHeight = ref(44)
const prompt = ref('')
const loading = ref(false)
const showImage = ref(false)
const imageUrl = ref('')
const errorMessage = ref('')

const ideas = [
  '一只戴帽子的小猫在吃鱼 🐱',
  '彩虹下的梦幻城堡 🏰',
  '开火箭的小宇航员 🚀',
  '会魔法的小兔子 🐰',
  '海底世界的小鱼们 🐠',
  '森林里的小木屋 🌲',
]

onReady(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 44
})

function goBack () {
  uni.navigateBack()
}

function selectIdea (idea) {
  prompt.value = idea
}

async function handleDraw () {
  if (!prompt.value.trim()) {
    uni.showToast({ title: '先说说你想画什么', icon: 'none' })
    return
  }
  if (loading.value) return

  loading.value = true
  errorMessage.value = ''

  try {
    const result = await generateDraw(prompt.value.trim())
    imageUrl.value = result.image
    showImage.value = true
  } catch (err) {
    errorMessage.value = err.message || '生成失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

function resetDraw () {
  showImage.value = false
  errorMessage.value = ''
}

function saveImage () {
  uni.downloadFile({
    url: imageUrl.value,
    success: (res) => {
      if (res.statusCode === 200) {
        uni.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            uni.showToast({ title: '已保存到相册 🎉', icon: 'none' })
          },
          fail: () => {
            uni.showToast({ title: '保存失败，请检查相册权限', icon: 'none' })
          }
        })
      } else {
        uni.showToast({ title: '下载图片失败', icon: 'none' })
      }
    },
    fail: () => {
      uni.showToast({ title: '网络请求失败', icon: 'none' })
    }
  })
}

function retry () {
  if (loading.value) return
  errorMessage.value = ''
  handleDraw()
}

function onImageError () {
  // 静默处理
}

function previewImage () {
  if (!imageUrl.value) return
  uni.previewImage({
    urls: [imageUrl.value],
    current: imageUrl.value,
    indicator: 'none',
    loop: false
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #f4f9ff 0%, #e8f1fb 100%);
  padding-bottom: 60rpx;
}

/* 导航栏 */
.nav-bar {
  background: transparent;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12rpx 30rpx 20rpx;
  height: 110rpx;
}

.nav-back {
  width: 72rpx;
  height: 72rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
}

.back-icon {
  font-size: 40rpx;
  color: #5b9dff;
  font-weight: bold;
  line-height: 1;
}

.nav-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #2d4059;
}

.nav-placeholder {
  width: 64rpx;
}

/* 输入区域 */
.input-section {
  padding: 0 30rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.section-title {
  margin-bottom: 4rpx;
}

.title-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #2d4059;
}

.input-card {
  background: #ffffff;
  border-radius: 24rpx;
  padding: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  border: 2rpx solid #e0edfb;
}

.draw-input {
  width: 100%;
  min-height: 180rpx;
  font-size: 28rpx;
  color: #2d4059;
  line-height: 1.6;
}

.input-placeholder {
  color: #a8bdd4;
}

.input-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 8rpx;
}

.char-count {
  font-size: 22rpx;
  color: #a8bdd4;
}

/* 灵感推荐 */
.inspire-section {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.inspire-label {
  font-size: 26rpx;
  font-weight: bold;
  color: #2d4059;
}

.inspire-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.idea-tag {
  background: #ffffff;
  border: 2rpx solid #d0e4f8;
  border-radius: 30rpx;
  padding: 14rpx 24rpx;
  transition: all 0.2s;
}

.idea-tag:active {
  background: #e8f4ff;
  transform: scale(0.96);
}

.idea-text {
  font-size: 24rpx;
  color: #5b9dff;
}

/* 生成按钮 */
.draw-btn {
  background: linear-gradient(135deg, #5b9dff, #4a8be8);
  border-radius: 40rpx;
  padding: 34rpx;
  text-align: center;
  box-shadow: 0 8rpx 24rpx rgba(91, 157, 255, 0.35);
  margin-top: 12rpx;
  transition: all 0.2s;
}

.draw-btn:active {
  transform: scale(0.97);
}

.draw-btn.disabled {
  opacity: 0.6;
  pointer-events: none;
}

.btn-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #ffffff;
}

/* 加载动画 */
.loading-section {
  padding: 80rpx 30rpx;
  display: flex;
  justify-content: center;
}

.loading-card {
  width: 100%;
  background: #ffffff;
  border-radius: 30rpx;
  padding: 80rpx 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.06);
  border: 2rpx solid #e0edfb;
}

.palette {
  position: relative;
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 40rpx;
}

.dot {
  position: absolute;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}

.d1 {
  left: 0;
  top: 60rpx;
  background: #ff9e5e;
  animation: spin 3s ease-in-out infinite;
}

.d2 {
  left: 60rpx;
  top: 0;
  background: #5b9dff;
  animation: spin 3s ease-in-out infinite 0.5s;
}

.d3 {
  left: 120rpx;
  top: 60rpx;
  background: #4caf92;
  animation: spin 3s ease-in-out infinite 1s;
}

.d4 {
  left: 60rpx;
  top: 120rpx;
  background: #ffd166;
  animation: spin 3s ease-in-out infinite 1.5s;
}

.brush {
  position: absolute;
  left: 65rpx;
  top: 65rpx;
  font-size: 70rpx;
  animation: bounce 1s infinite;
}

@keyframes spin {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12rpx);
  }
}

.loading-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #2d4059;
}

.loading-sub {
  font-size: 24rpx;
  color: #8fa8c4;
  margin-top: 12rpx;
}

/* 结果展示 */
.result-section {
  padding: 0 30rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-image-wrap {
  background: #ffffff;
  border-radius: 28rpx;
  overflow: hidden;
  box-shadow: 0 12rpx 30rpx rgba(0, 0, 0, 0.12);
  border: 2rpx solid #e0edfb;
  position: relative;
}

.image-preview-hint {
  position: absolute;
  bottom: 16rpx;
  right: 16rpx;
  background: rgba(0, 0, 0, 0.55);
  border-radius: 20rpx;
  padding: 8rpx 16rpx;
  display: flex;
  align-items: center;
}

.hint-text {
  font-size: 20rpx;
  color: #ffffff;
}

.result-image {
  width: 100%;
  display: block;
}

.result-prompt {
  background: rgba(91, 157, 255, 0.1);
  border-radius: 16rpx;
  padding: 16rpx 24rpx;
}

.prompt-text {
  font-size: 24rpx;
  color: #4a8be8;
}

.result-actions {
  display: flex;
  gap: 16rpx;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28rpx 0;
  border-radius: 40rpx;
  transition: all 0.2s;
}

.action-btn:active {
  transform: scale(0.96);
}

.action-save {
  background: linear-gradient(135deg, #5b9dff, #4a8be8);
  box-shadow: 0 4rpx 16rpx rgba(91, 157, 255, 0.3);
}

.action-retry {
  background: #ffffff;
  border: 2rpx solid #5b9dff;
}

.action-text {
  font-size: 28rpx;
  font-weight: bold;
}

.action-save .action-text {
  color: #ffffff;
}

.action-retry .action-text {
  color: #4a8be8;
}

/* 错误提示 */
.error-section {
  padding: 0 30rpx;
  margin-top: 40rpx;
}

.error-card {
  background: #fff5f5;
  border: 2rpx solid #ffd4d4;
  border-radius: 24rpx;
  padding: 40rpx 30rpx;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
}

.error-emoji {
  font-size: 60rpx;
}

.error-text {
  font-size: 26rpx;
  color: #cc5555;
}

.error-btn {
  background: linear-gradient(135deg, #5b9dff, #4a8be8);
  color: #ffffff;
  padding: 16rpx 48rpx;
  border-radius: 30rpx;
  font-size: 26rpx;
  font-weight: bold;
  margin-top: 12rpx;
}
</style>