<template>
  <view class="container" v-if="story">
    <!-- 顶部导航栏 -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-content">
        <view class="nav-back" @click="goBack">
          <text class="back-icon">←</text>
        </view>
        <text class="nav-title">故事详情</text>
        <view class="nav-placeholder"></view>
      </view>
    </view>

    <scroll-view scroll-y class="detail-scroll">
      <!-- 故事配图 -->
      <view class="story-image-wrap" v-if="story.image">
        <image class="story-image" :src="story.image" mode="aspectFill" />
      </view>

      <!-- 故事标题 -->
      <view class="story-title-block">
        <view class="title-deco">✦</view>
        <text class="story-title">{{ story.title || '今天的故事' }}</text>
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
        <text class="story-text">{{ story.story }}</text>
      </view>

      <!-- 操作按钮 -->
      <view class="story-actions">
        <view class="action-btn action-save" @click="saveStory">
          <text class="action-text">❤️ 收藏</text>
        </view>
        <view class="action-btn action-list" @click="viewHistory">
          <text class="action-text">🕐 历史</text>
        </view>
      </view>
      <view style="height: 40rpx"></view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onReady } from '@dcloudio/uni-app'

const statusBarHeight = ref(44)
const story = ref(null)

// 从 URL 参数获取故事数据
onReady((options) => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 44

  // 从页面参数读取
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  if (currentPage.options && currentPage.options.view) {
    try {
      story.value = JSON.parse(decodeURIComponent(currentPage.options.view))
    } catch (e) {
      console.error('解析故事数据失败', e)
    }
  }

  // 如果没有传参，尝试从本地缓存找最近的一条
  if (!story.value) {
    const history = uni.getStorageSync('storyHistory') || []
    if (history.length > 0) {
      story.value = history[0]
    }
  }
})

const keywordList = computed(() => {
  if (!story.value) return []
  const kw = story.value.keywords || ''
  return kw.split(/[\s，,]+/).filter(Boolean)
})

function goBack () {
  uni.navigateBack()
}

function saveStory () {
  const saved = uni.getStorageSync('savedStories') || []
  const exists = saved.some(item => item.title === story.value.title)
  if (!exists) {
    saved.unshift(story.value)
    uni.setStorageSync('savedStories', saved)
    uni.showToast({ title: '已加入收藏 ❤️', icon: 'none' })
  } else {
    uni.showToast({ title: '这个故事已在收藏中', icon: 'none' })
  }
}

function viewHistory () {
  uni.navigateTo({ url: '/pages/favorites/favorites?tab=history' })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #fdf6ec 0%, #f7e8dc 100%);
}

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

.nav-placeholder {
  width: 64rpx;
}

.detail-scroll {
  height: calc(100vh - 140rpx);
  padding: 0 30rpx;
  box-sizing: border-box;
}

.story-image-wrap {
  width: 100%;
  height: 420rpx;
  border-radius: 28rpx;
  overflow: hidden;
  box-shadow: 0 12rpx 30rpx rgba(0, 0, 0, 0.12);
}

.story-image {
  width: 100%;
  height: 100%;
}

.story-title-block {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  margin: 24rpx 0 16rpx;
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
  margin-bottom: 24rpx;
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
  margin-top: 24rpx;
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
  color: #ffffff;
}
</style>