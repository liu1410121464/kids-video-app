<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-content">
        <view class="nav-back" @click="goBack">
          <text class="back-icon">←</text>
        </view>
        <text class="nav-title">AI 讲故事</text>
        <view class="nav-link" @click="goFavorites">
          <text class="link-icon">❤️</text>
          <text class="link-text">收藏</text>
        </view>
      </view>
    </view>

    <!-- 输入区域 -->
    <view class="input-section" v-show="!showStory && !isLoading">
      <view class="section-title">
        <text class="title-text">✨ 告诉 AI 你想听什么故事</text>
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
      <view class="generate-btn" @click="handleGenerate">
        <text class="btn-text">📖 开始讲故事</text>
      </view>
    </view>

    <!-- 加载动画 -->
    <view class="loading-section" v-show="isLoading">
      <view class="loading-card">
        <view class="loading-animation">
          <view class="bubble b1"></view>
          <view class="bubble b2"></view>
          <view class="bubble b3"></view>
          <text class="loading-emoji">📖</text>
        </view>
        <text class="loading-text">AI 正在创作中...</text>
        <text class="loading-sub">编故事 + 画插图，需要一点时间哦</text>
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
        <view class="image-shine"></view>
      </view>

      <!-- 故事标题 -->
      <view class="story-title-block">
        <view class="title-deco">✦</view>
        <text class="story-title">{{ storyData.title || '今天的故事' }}</text>
        <view class="title-deco">✦</view>
      </view>

      <!-- 关键词标签 -->
      <view class="keyword-tags">
        <view class="tag" v-for="(kw, i) in keywordList" :key="i">
          <text class="tag-text">{{ kw }}</text>
        </view>
      </view>

      <!-- 故事正文 -->
      <view class="story-content">
        <text class="story-text">{{ storyData.story }}</text>
      </view>

      <!-- 操作按钮 -->
      <view class="story-actions">
        <view class="action-btn action-retry" @click="resetStory">
          <text class="action-text">🔄 换一个</text>
        </view>
        <view class="action-btn action-save" @click="saveStory">
          <text class="action-text">💾 保存</text>
        </view>
        <view class="action-btn action-list" @click="goFavorites">
          <text class="action-text">❤️ 收藏</text>
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
import { ref, computed } from 'vue'
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

// 关键词拆分为标签展示
const keywordList = computed(() => {
  const kw = storyData.value.keywords || keywords.value
  return kw.split(/[\s，,]+/).filter(Boolean)
})

onReady(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 44
})

function goBack () {
  uni.navigateBack()
}

function goFavorites () {
  uni.navigateTo({ url: '/pages/favorites/favorites' })
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
    // 记录历史
    addHistory(result)
    showStory.value = true
  } catch (err) {
    errorMessage.value = err.message || '生成失败，请稍后重试'
  } finally {
    isLoading.value = false
  }
}

function addHistory (story) {
  const history = uni.getStorageSync('storyHistory') || []
  history.unshift({
    ...story,
    time: new Date().toISOString()
  })
  // 最多保留 50 条
  if (history.length > 50) history.length = 50
  uni.setStorageSync('storyHistory', history)
}

function resetStory () {
  showStory.value = false
  errorMessage.value = ''
  keywords.value = getRandomKeywords()
}

function saveStory () {
  const saved = uni.getStorageSync('savedStories') || []
  // 去重：如果已存在相同标题则不重复添加
  const exists = saved.some(item => item.title === storyData.value.title)
  if (!exists) {
    saved.unshift({
      ...storyData.value,
      time: new Date().toISOString()
    })
    uni.setStorageSync('savedStories', saved)
    uni.showToast({ title: '已加入收藏 ❤️', icon: 'none' })
  } else {
    uni.showToast({ title: '这个故事已在收藏中', icon: 'none' })
  }
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
  background: linear-gradient(180deg, #fdf6ec 0%, #f7e8dc 100%);
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
  padding: 0 30rpx 20rpx;
  height: 88rpx;
}

.nav-back {
  width: 64rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
}

.back-icon {
  font-size: 34rpx;
  color: #ff6b35;
  font-weight: bold;
}

.nav-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #4a3b32;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6rpx;
  padding: 10rpx 20rpx;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 30rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
}

.link-icon {
  font-size: 24rpx;
}

.link-text {
  font-size: 24rpx;
  color: #ff6b35;
  font-weight: bold;
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
  color: #4a3b32;
}

.input-card {
  background: #ffffff;
  border-radius: 24rpx;
  padding: 28rpx 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  border: 2rpx solid #f5e8da;
}

.input-label {
  font-size: 26rpx;
  font-weight: bold;
  color: #7a6a5d;
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
  background: #fdf6ec;
  border-radius: 16rpx;
  padding: 20rpx 24rpx;
  font-size: 28rpx;
  color: #4a3b32;
  border: 2rpx solid #f0dfce;
}

.input-placeholder {
  color: #c4b5a5;
}

.random-btn {
  width: 84rpx;
  height: 84rpx;
  background: linear-gradient(135deg, #ff9e5e, #ff6b35);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4rpx 12rpx rgba(255, 107, 53, 0.3);
}

.random-icon {
  font-size: 38rpx;
}

.input-hint {
  font-size: 22rpx;
  color: #b0a294;
  margin-top: 16rpx;
  display: block;
}

/* 年龄选择 */
.age-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
}

.age-item {
  background: #fdf6ec;
  border: 2rpx solid #f0dfce;
  border-radius: 16rpx;
  padding: 16rpx 20rpx;
  text-align: center;
  transition: all 0.25s;
}

.age-item.active {
  background: linear-gradient(135deg, #4caf92, #3d9b80);
  border-color: #4caf92;
  box-shadow: 0 4rpx 12rpx rgba(76, 175, 146, 0.3);
}

.age-name {
  font-size: 26rpx;
  font-weight: bold;
  color: #4a3b32;
  display: block;
  margin-bottom: 4rpx;
}

.age-item.active .age-name {
  color: #ffffff;
}

.age-desc {
  font-size: 20rpx;
  color: #b0a294;
}

.age-item.active .age-desc {
  color: rgba(255, 255, 255, 0.85);
}

/* 风格选择 */
.style-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16rpx;
}

.style-item {
  background: #fdf6ec;
  border: 2rpx solid #f0dfce;
  border-radius: 16rpx;
  padding: 16rpx 12rpx;
  text-align: center;
  transition: all 0.25s;
}

.style-item.active {
  background: linear-gradient(135deg, #5b9dff, #4a8be8);
  border-color: #5b9dff;
  box-shadow: 0 4rpx 12rpx rgba(91, 157, 255, 0.3);
}

.style-emoji {
  font-size: 34rpx;
  display: block;
  margin-bottom: 6rpx;
}

.style-name {
  font-size: 22rpx;
  color: #4a3b32;
}

.style-item.active .style-name {
  color: #ffffff;
}

/* 生成按钮 */
.generate-btn {
  background: linear-gradient(135deg, #ff9e5e 0%, #ff6b35 100%);
  border-radius: 40rpx;
  padding: 34rpx;
  text-align: center;
  box-shadow: 0 8rpx 24rpx rgba(255, 107, 53, 0.35);
  margin-top: 12rpx;
  transition: all 0.2s;
}

.generate-btn:active {
  transform: scale(0.97);
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
  border: 2rpx solid #f5e8da;
}

.loading-animation {
  position: relative;
  width: 160rpx;
  height: 160rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40rpx;
}

.loading-emoji {
  font-size: 80rpx;
  animation: bounce 1.2s infinite;
}

.bubble {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffd166, #ff9e5e);
  opacity: 0.3;
}

.b1 {
  width: 40rpx;
  height: 40rpx;
  top: 0;
  left: 20rpx;
  animation: float 2.5s ease-in-out infinite;
}

.b2 {
  width: 24rpx;
  height: 24rpx;
  bottom: 10rpx;
  right: 10rpx;
  background: linear-gradient(135deg, #4caf92, #5b9dff);
  animation: float 2s ease-in-out infinite 0.3s;
}

.b3 {
  width: 30rpx;
  height: 30rpx;
  top: 30rpx;
  right: 0;
  background: linear-gradient(135deg, #5b9dff, #ffd166);
  animation: float 3s ease-in-out infinite 0.6s;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-16rpx);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-24rpx) scale(1.1);
  }
}

.loading-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #4a3b32;
}

.loading-sub {
  font-size: 24rpx;
  color: #b0a294;
  margin-top: 12rpx;
}

/* 故事展示区域 */
.story-section {
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

.story-image-wrap {
  width: 100%;
  height: 420rpx;
  border-radius: 28rpx;
  overflow: hidden;
  box-shadow: 0 12rpx 30rpx rgba(0, 0, 0, 0.12);
  position: relative;
}

.story-image {
  width: 100%;
  height: 100%;
}

.image-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: shine 3s ease-in-out infinite;
}

@keyframes shine {
  0% {
    left: -100%;
  }
  50% {
    left: 200%;
  }
  100% {
    left: 200%;
  }
}

.story-title-block {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  margin-top: 8rpx;
}

.title-deco {
  font-size: 28rpx;
  color: #ff9e5e;
}

.story-title {
  font-size: 38rpx;
  font-weight: bold;
  color: #4a3b32;
  text-align: center;
}

.keyword-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  justify-content: center;
}

.tag {
  background: rgba(255, 158, 94, 0.15);
  border: 2rpx solid rgba(255, 107, 53, 0.3);
  border-radius: 30rpx;
  padding: 8rpx 24rpx;
}

.tag-text {
  font-size: 22rpx;
  color: #ff6b35;
  font-weight: 600;
}

.story-content {
  background: #ffffff;
  border-radius: 24rpx;
  padding: 36rpx 32rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  border: 2rpx solid #f5e8da;
  border-left: 8rpx solid #ff9e5e;
}

.story-text {
  font-size: 30rpx;
  color: #4a3b32;
  line-height: 1.9;
  letter-spacing: 1rpx;
  white-space: pre-wrap;
}

.story-actions {
  display: flex;
  gap: 16rpx;
  margin-top: 8rpx;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 26rpx 0;
  border-radius: 40rpx;
  transition: all 0.2s;
}

.action-btn:active {
  transform: scale(0.96);
}

.action-retry {
  background: #fff4ea;
  border: 2rpx solid #ff9e5e;
}

.action-save {
  background: linear-gradient(135deg, #ff9e5e, #ff6b35);
  box-shadow: 0 4rpx 16rpx rgba(255, 107, 53, 0.3);
}

.action-list {
  background: linear-gradient(135deg, #ffd166, #ffb84d);
  box-shadow: 0 4rpx 16rpx rgba(255, 177, 77, 0.3);
}

.action-text {
  font-size: 26rpx;
  font-weight: bold;
}

.action-retry .action-text {
  color: #ff6b35;
}

.action-save .action-text,
.action-list .action-text {
  color: #ffffff;
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
  background: linear-gradient(135deg, #ff9e5e, #ff6b35);
  color: #ffffff;
  padding: 16rpx 48rpx;
  border-radius: 30rpx;
  font-size: 26rpx;
  font-weight: bold;
  margin-top: 12rpx;
}
</style>