<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-content">
        <view class="nav-back" @click="goBack">
          <text class="back-icon">←</text>
        </view>
        <text class="nav-title">AI 讲故事</text>
        <view class="nav-placeholder"></view>
      </view>
    </view>

    <!-- 输入区域 -->
    <view class="input-section" v-show="!showStory">
      <view class="section-title">
        <text class="title-emoji">✨</text>
        <text class="title-text">告诉 AI 你想听什么故事</text>
      </view>

      <!-- 关键词输入 -->
      <view class="input-card">
        <text class="input-label">故事关键词</text>
        <view class="input-row">
          <input
            class="keyword-input"
            v-model="keywords"
            placeholder="例如：小兔子 月亮 蛋糕"
            placeholder-class="input-placeholder"
            maxlength="50"
          />
          <view class="random-btn" @click="randomKeywords">
            <text class="random-icon">🎲</text>
          </view>
        </view>
        <text class="input-hint">输入 2-4 个关键词，AI 会围绕它们编故事</text>
      </view>

      <!-- 年龄选择 -->
      <view class="input-card">
        <text class="input-label">宝宝年龄</text>
        <view class="age-grid">
          <view
            v-for="age in ageGroups"
            :key="age.id"
            class="age-item"
            :class="{ active: selectedAge === age.id }"
            @click="selectedAge = age.id"
          >
            <text class="age-name">{{ age.name }}</text>
            <text class="age-desc">{{ age.desc }}</text>
          </view>
        </view>
      </view>

      <!-- 风格选择 -->
      <view class="input-card">
        <text class="input-label">故事风格</text>
        <view class="style-grid">
          <view
            v-for="style in storyStyles"
            :key="style.id"
            class="style-item"
            :class="{ active: selectedStyle === style.id }"
            @click="selectedStyle = style.id"
          >
            <text class="style-emoji">{{ style.emoji }}</text>
            <text class="style-name">{{ style.name }}</text>
          </view>
        </view>
      </view>

      <!-- 生成按钮 -->
      <view
        class="generate-btn"
        :class="{ loading: isLoading }"
        @click="handleGenerate"
      >
        <text v-if="!isLoading" class="btn-text">📖 开始讲故事</text>
        <text v-else class="btn-text">⏳ 正在创作中...</text>
      </view>
    </view>

    <!-- 故事展示区域 -->
    <view class="story-section" v-show="showStory">
      <!-- 故事配图 -->
      <view class="story-image-wrap" v-if="storyData.image">
        <image
          class="story-image"
          :src="storyData.image"
          mode="aspectFill"
          @error="onImageError"
        />
      </view>

      <!-- 故事标题 -->
      <view class="story-header">
        <text class="story-keywords">关键词：{{ storyData.keywords }}</text>
      </view>

      <!-- 故事正文 -->
      <view class="story-content">
        <text class="story-text">{{ storyData.story }}</text>
      </view>

      <!-- 操作按钮 -->
      <view class="story-actions">
        <view class="action-btn action-retry" @click="resetStory">
          <text class="action-icon">🔄</text>
          <text class="action-text">换一个</text>
        </view>
        <view class="action-btn action-save" @click="saveStory">
          <text class="action-icon">💾</text>
          <text class="action-text">保存</text>
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
import { generateStory } from '@/utils/aiService.js'
import { STORY_STYLES, AGE_GROUPS, getRandomKeywords } from '@/config/prompts.js'

const statusBarHeight = ref(44)
const keywords = ref('')
const selectedAge = ref(5)
const selectedStyle = ref('warm')
const isLoading = ref(false)
const showStory = ref(false)
const storyData = ref({})
const errorMessage = ref('')

const storyStyles = STORY_STYLES
const ageGroups = AGE_GROUPS

onReady(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 44
})

function goBack () {
  uni.navigateBack()
}

function randomKeywords () {
  keywords.value = getRandomKeywords()
}

function getStyleName (id) {
  const style = storyStyles.find(s => s.id === id)
  return style ? style.name : '温馨有趣'
}

async function handleGenerate () {
  if (!keywords.value.trim()) {
    uni.showToast({ title: '请输入故事关键词', icon: 'none' })
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const result = await generateStory(
      keywords.value.trim(),
      selectedAge.value,
      getStyleName(selectedStyle.value)
    )
    storyData.value = result
    showStory.value = true
  } catch (err) {
    errorMessage.value = err.message || '生成失败，请稍后重试'
  } finally {
    isLoading.value = false
  }
}

function resetStory () {
  showStory.value = false
  errorMessage.value = ''
  keywords.value = getRandomKeywords()
}

function saveStory () {
  // 保存到本地收藏
  const saved = uni.getStorageSync('savedStories') || []
  saved.unshift({
    ...storyData.value,
    time: new Date().toISOString()
  })
  uni.setStorageSync('savedStories', saved)
  uni.showToast({ title: '已保存到收藏', icon: 'success' })
}

function retry () {
  errorMessage.value = ''
  handleGenerate()
}

function onImageError () {
  // 图片加载失败，静默处理
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
  justify-content: space-between;
  padding: 0 30rpx 20rpx;
  height: 88rpx;
}

.nav-back {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 40rpx;
  color: #ff6b35;
  font-weight: bold;
}

.nav-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #333333;
}

.nav-placeholder {
  width: 60rpx;
}

/* 输入区域 */
.input-section {
  padding: 0 30rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10rpx;
  margin-bottom: 4rpx;
}

.title-emoji {
  font-size: 36rpx;
}

.title-text {
  font-size: 30rpx;
  font-weight: bold;
  color: #333333;
}

.input-card {
  background: #ffffff;
  border-radius: 20rpx;
  padding: 28rpx 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
}

.input-label {
  font-size: 26rpx;
  font-weight: bold;
  color: #666666;
  display: block;
  margin-bottom: 16rpx;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.keyword-input {
  flex: 1;
  background: #fff8f0;
  border-radius: 12rpx;
  padding: 20rpx 24rpx;
  font-size: 28rpx;
  color: #333333;
  border: 2rpx solid #ffe0cc;
}

.input-placeholder {
  color: #cccccc;
}

.random-btn {
  width: 80rpx;
  height: 80rpx;
  background: #ff6b35;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.random-icon {
  font-size: 36rpx;
}

.input-hint {
  font-size: 22rpx;
  color: #999999;
  margin-top: 12rpx;
  display: block;
}

/* 年龄选择 */
.age-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
}

.age-item {
  background: #fff8f0;
  border: 2rpx solid #ffe0cc;
  border-radius: 12rpx;
  padding: 16rpx 20rpx;
  text-align: center;
  transition: all 0.2s;
}

.age-item.active {
  background: #ff6b35;
  border-color: #ff6b35;
}

.age-name {
  font-size: 26rpx;
  font-weight: bold;
  color: #333333;
  display: block;
  margin-bottom: 4rpx;
}

.age-item.active .age-name {
  color: #ffffff;
}

.age-desc {
  font-size: 20rpx;
  color: #999999;
}

.age-item.active .age-desc {
  color: rgba(255, 255, 255, 0.8);
}

/* 风格选择 */
.style-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16rpx;
}

.style-item {
  background: #fff8f0;
  border: 2rpx solid #ffe0cc;
  border-radius: 12rpx;
  padding: 16rpx 12rpx;
  text-align: center;
  transition: all 0.2s;
}

.style-item.active {
  background: #ff6b35;
  border-color: #ff6b35;
}

.style-emoji {
  font-size: 32rpx;
  display: block;
  margin-bottom: 4rpx;
}

.style-name {
  font-size: 22rpx;
  color: #333333;
}

.style-item.active .style-name {
  color: #ffffff;
}

/* 生成按钮 */
.generate-btn {
  background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
  border-radius: 40rpx;
  padding: 32rpx;
  text-align: center;
  box-shadow: 0 8rpx 24rpx rgba(255, 107, 53, 0.4);
  margin-top: 12rpx;
  transition: all 0.2s;
}

.generate-btn:active {
  transform: scale(0.98);
}

.generate-btn.loading {
  opacity: 0.8;
}

.btn-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #ffffff;
}

/* 故事展示区域 */
.story-section {
  padding: 0 30rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.story-image-wrap {
  width: 100%;
  height: 400rpx;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
}

.story-image {
  width: 100%;
  height: 100%;
}

.story-header {
  background: #fff8f0;
  border-radius: 12rpx;
  padding: 16rpx 24rpx;
}

.story-keywords {
  font-size: 24rpx;
  color: #ff6b35;
  font-weight: bold;
}

.story-content {
  background: #ffffff;
  border-radius: 20rpx;
  padding: 32rpx 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
}

.story-text {
  font-size: 28rpx;
  color: #333333;
  line-height: 1.8;
  letter-spacing: 1rpx;
  white-space: pre-wrap;
}

.story-actions {
  display: flex;
  gap: 20rpx;
  margin-top: 12rpx;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  padding: 24rpx;
  border-radius: 40rpx;
  transition: all 0.2s;
}

.action-btn:active {
  transform: scale(0.96);
}

.action-retry {
  background: #fff0e6;
  border: 2rpx solid #ff6b35;
}

.action-save {
  background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
}

.action-icon {
  font-size: 28rpx;
}

.action-text {
  font-size: 28rpx;
  font-weight: bold;
}

.action-retry .action-text {
  color: #ff6b35;
}

.action-save .action-text {
  color: #ffffff;
}

/* 错误提示 */
.error-section {
  padding: 0 30rpx;
  margin-top: 40rpx;
}

.error-card {
  background: #fff0f0;
  border: 2rpx solid #ffcccc;
  border-radius: 20rpx;
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
  color: #cc3333;
}

.error-btn {
  background: #ff6b35;
  color: #ffffff;
  padding: 16rpx 48rpx;
  border-radius: 30rpx;
  font-size: 26rpx;
  font-weight: bold;
  margin-top: 12rpx;
}
</style>