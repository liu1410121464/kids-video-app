<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-content">
        <view class="nav-back" @click="goBack">
          <text class="back-icon">←</text>
        </view>
        <text class="nav-title">我的故事</text>
        <view class="nav-placeholder"></view>
      </view>
    </view>

    <!-- 标签切换 -->
    <view class="tab-bar">
      <view
        class="tab-item"
        :class="{ active: currentTab === 'favorites' }"
        @click="switchTab('favorites')"
      >
        <text class="tab-text">❤️ 收藏 ({{ savedStories.length }})</text>
      </view>
      <view
        class="tab-item"
        :class="{ active: currentTab === 'history' }"
        @click="switchTab('history')"
      >
        <text class="tab-text">🕐 历史 ({{ historyStories.length }})</text>
      </view>
    </view>

    <!-- 故事列表 -->
    <view class="list-section">
      <!-- 空状态 -->
      <view class="empty-state" v-if="displayList.length === 0">
        <text class="empty-emoji">{{
          currentTab === 'favorites' ? '💭' : '📭'
        }}</text>
        <text class="empty-title">
          {{
            currentTab === 'favorites' ? '还没有收藏的故事' : '还没有听过的故事'
          }}
        </text>
        <text class="empty-sub">
          {{
            currentTab === 'favorites'
              ? '在讲故事的页面点击"保存"就会收藏在这里'
              : '去首页听一个故事吧'
          }}
        </text>
        <view class="empty-btn" @click="goHome">
          <text class="empty-btn-text">去听听故事</text>
        </view>
      </view>

      <!-- 故事卡片列表 -->
      <view
        v-for="(item, index) in displayList"
        :key="index"
        class="story-card"
        @click="viewDetail(item)"
      >
        <view class="card-left">
          <image
            v-if="item.image"
            class="card-image"
            :src="item.image"
            mode="aspectFill"
          />
          <view v-else class="card-image card-image-fallback">
            <text class="fallback-emoji">📖</text>
          </view>
        </view>
        <view class="card-right">
          <text class="card-title">{{ item.title || '今天的故事' }}</text>
          <text class="card-keywords">{{ item.keywords || '' }}</text>
          <text class="card-time">{{ formatTime(item.time) }}</text>
        </view>
        <!-- 删除按钮（收藏页） -->
        <view
          v-if="currentTab === 'favorites'"
          class="card-delete"
          @click.stop="removeFavorite(index)"
        >
          <text class="delete-text">✕</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onReady, onShow } from '@dcloudio/uni-app'

const statusBarHeight = ref(44)
const currentTab = ref('favorites')
const savedStories = ref([])
const historyStories = ref([])

const displayList = computed(() => {
  return currentTab.value === 'favorites' ? savedStories.value : historyStories.value
})

onReady((options) => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 44
  // 支持从 URL 参数切换到历史 tab
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  if (currentPage.options && currentPage.options.tab === 'history') {
    currentTab.value = 'history'
  }
})

onShow(() => {
  loadData()
})

function loadData () {
  savedStories.value = uni.getStorageSync('savedStories') || []
  historyStories.value = uni.getStorageSync('storyHistory') || []
}

function switchTab (tab) {
  currentTab.value = tab
}

function goBack () {
  uni.navigateBack()
}

function goHome () {
  uni.reLaunch({ url: '/pages/index/index' })
}

function formatTime (iso) {
  if (!iso) return ''
  const date = new Date(iso)
  const now = new Date()
  const diff = now - date
  // 少于1分钟
  if (diff < 60000) return '刚刚'
  // 少于1小时
  if (diff < 3600000) return `${Math.floor(diff / 60000)} 分钟前`
  // 少于24小时
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小时前`
  // 少于7天
  if (diff < 604800000) return `${Math.floor(diff / 86400000)} 天前`
  // 格式化日期
  const pad = (n) => (n < 10 ? '0' + n : n)
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function viewDetail (item) {
  uni.navigateTo({
    url: `/pages/story-detail/story-detail?view=${encodeURIComponent(JSON.stringify(item))}`
  })
}

function removeFavorite (index) {
  uni.showModal({
    title: '删除收藏',
    content: '确定要删除这个收藏的故事吗？',
    success: (res) => {
      if (res.confirm) {
        savedStories.value.splice(index, 1)
        uni.setStorageSync('savedStories', savedStories.value)
        uni.showToast({ title: '已删除', icon: 'success' })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #fdf6ec 0%, #f7e8dc 100%);
  padding-bottom: 60rpx;
}

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
  color: #ff6b35;
  font-weight: bold;
  line-height: 1;
}

.nav-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #4a3b32;
}

.nav-placeholder {
  width: 64rpx;
}

/* 标签栏 */
.tab-bar {
  display: flex;
  gap: 16rpx;
  padding: 0 30rpx;
  margin-bottom: 24rpx;
}

.tab-item {
  flex: 1;
  padding: 20rpx 0;
  text-align: center;
  background: #ffffff;
  border-radius: 40rpx;
  border: 2rpx solid #f0dfce;
  transition: all 0.25s;
}

.tab-item.active {
  background: linear-gradient(135deg, #ff9e5e, #ff6b35);
  border-color: #ff6b35;
  box-shadow: 0 4rpx 12rpx rgba(255, 107, 53, 0.25);
}

.tab-text {
  font-size: 26rpx;
  font-weight: bold;
  color: #7a6a5d;
}

.tab-item.active .tab-text {
  color: #ffffff;
}

/* 列表 */
.list-section {
  padding: 0 30rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

/* 空状态 */
.empty-state {
  padding: 100rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
}

.empty-emoji {
  font-size: 100rpx;
}

.empty-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #7a6a5d;
}

.empty-sub {
  font-size: 24rpx;
  color: #b0a294;
}

.empty-btn {
  margin-top: 20rpx;
  padding: 20rpx 60rpx;
  background: linear-gradient(135deg, #ff9e5e, #ff6b35);
  border-radius: 40rpx;
  box-shadow: 0 4rpx 16rpx rgba(255, 107, 53, 0.3);
}

.empty-btn-text {
  font-size: 28rpx;
  font-weight: bold;
  color: #ffffff;
}

/* 故事卡片 */
.story-card {
  display: flex;
  align-items: center;
  gap: 20rpx;
  background: #ffffff;
  border-radius: 24rpx;
  padding: 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
  border: 2rpx solid #f5e8da;
  position: relative;
  transition: all 0.25s;
}

.story-card:active {
  transform: scale(0.98);
}

.card-left {
  flex-shrink: 0;
}

.card-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 16rpx;
  overflow: hidden;
}

.card-image-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fff4ea, #ffe8d6);
}

.fallback-emoji {
  font-size: 48rpx;
}

.card-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6rpx;
  padding-right: 40rpx;
}

.card-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #4a3b32;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-keywords {
  font-size: 22rpx;
  color: #ff6b35;
}

.card-time {
  font-size: 20rpx;
  color: #b0a294;
}

.card-delete {
  position: absolute;
  top: 16rpx;
  right: 16rpx;
  width: 40rpx;
  height: 40rpx;
  background: #fff0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-text {
  font-size: 24rpx;
  color: #cc5555;
}
</style>