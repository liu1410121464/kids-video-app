<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-content">
        <!-- 左侧：用户信息 / 登录 -->
        <view class="nav-left">
          <block v-if="isLogin">
            <image
              class="user-avatar"
              :src="userInfo.avatarUrl"
              mode="aspectFill"
            />
            <text class="user-name">{{ userInfo.nickName }}</text>
          </block>
          <view v-else class="login-btn" @click="handleLogin">
            <text class="login-text">登录</text>
          </view>
        </view>
        <!-- 右侧：标题 -->
        <view class="nav-title">Little Fox</view>
      </view>
    </view>

    <!-- 分类标签 -->
    <scroll-view scroll-x class="category-scroll" :show-scrollbar="false">
      <view class="category-list">
        <view
          v-for="cat in categories"
          :key="cat.id"
          class="category-item"
          :class="{ active: currentCategory === cat.id }"
          @click="switchCategory(cat.id)"
        >
          {{ cat.name }}
        </view>
      </view>
    </scroll-view>

    <!-- 视频卡片网格 -->
    <scroll-view scroll-y class="video-grid-scroll" :show-scrollbar="false">
      <view class="video-grid">
        <view
          v-for="item in filteredSeries"
          :key="item.id"
          class="video-card"
          @click="openSeries(item)"
        >
          <view class="card-cover-wrap">
            <image
              class="card-cover"
              :src="getCoverUrl(item.cover)"
              mode="aspectFill"
            />
            <view class="episode-badge">{{ item.episodeCount }}集</view>
          </view>
          <view class="card-title">{{ item.title }}</view>
        </view>
      </view>
      <!-- 底部占位 -->
      <view style="height: 40rpx"></view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onReady } from '@dcloudio/uni-app'
import videoData from '@/config/videoData.js'
import { isCOSUrl, getSignedVideoUrl } from '@/utils/cosService.js'

const statusBarHeight = ref(44)
const categories = ref(videoData.categories)
const allSeries = ref(videoData.series)
const currentCategory = ref('l0')
const isLogin = ref(false)
const userInfo = ref({})
const resolvedCovers = ref({}) // 已解析的封面 URL 缓存

// 读取 App 全局登录状态
const app = getApp()
if (app.globalData && app.globalData.isLogin) {
  isLogin.value = true
  userInfo.value = app.globalData.userInfo
}

onReady(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 44
  // 页面就绪后解析所有封面
  resolveAllCovers()
})

/** 解析所有系列的封面图 */
function resolveAllCovers () {
  allSeries.value.forEach((s) => {
    if (!s.cover) return
    const url = s.cover
    // 已缓存则跳过
    if (resolvedCovers.value[url]) return
    // 普通 HTTPS 直链直接使用
    if (!url.startsWith('cloud://') && !isCOSUrl(url)) {
      resolvedCovers.value[url] = url
      return
    }
    // cloud:// → 微信云存储解析
    if (url.startsWith('cloud://')) {
      wx.cloud.getTempFileURL({
        fileList: [url],
        success: (res) => {
          if (res.fileList?.[0]?.tempFileURL) {
            resolvedCovers.value[url] = res.fileList[0].tempFileURL
          }
        },
        fail: () => { },
      })
      return
    }
    // COS 私有桶直链 → COS SDK 签名
    if (isCOSUrl(url)) {
      getSignedVideoUrl(url).then((signed) => {
        resolvedCovers.value[url] = signed
      }).catch(() => { })
    }
  })
}

/** 获取封面 URL（优先读缓存） */
function getCoverUrl (url) {
  if (!url) return ''
  return resolvedCovers.value[url] || url
}

const filteredSeries = computed(() => {
  if (currentCategory.value === 'setting') return []
  return allSeries.value.filter((s) => s.categoryId === currentCategory.value)
})

function switchCategory (catId) {
  if (catId === 'setting') {
    uni.showToast({ title: '设置功能开发中', icon: 'none' })
    return
  }
  currentCategory.value = catId
}

function openSeries (item) {
  if (!item.episodes || item.episodes.length === 0) {
    uni.showToast({ title: '该系列视频资源整理中...', icon: 'none' })
    return
  }
  uni.navigateTo({
    url: `/pages/video/video?seriesId=${item.id}&episodeId=${item.episodes[0].id}&title=${encodeURIComponent(item.title)}`
  })
}

// 用户登录
function handleLogin () {
  uni.getUserProfile({
    desc: '用于展示您的头像和昵称',
    success: (res) => {
      const info = res.userInfo
      userInfo.value = info
      isLogin.value = true
      // 存入全局状态
      const app = getApp()
      app.globalData.userInfo = info
      app.globalData.isLogin = true
      // 持久化本地缓存
      uni.setStorageSync('userInfo', info)
      uni.showToast({ title: '登录成功', icon: 'success' })
    },
    fail: (err) => {
      console.log('用户取消登录', err)
    }
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #a8d5ba;
  display: flex;
  flex-direction: column;
}

// 导航栏
.nav-bar {
  background-color: transparent;
  padding-left: 30rpx;
  padding-right: 30rpx;

  .nav-content {
    height: 88rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .nav-left {
      display: flex;
      align-items: center;
      gap: 12rpx;
      flex-shrink: 0;

      .user-avatar {
        width: 56rpx;
        height: 56rpx;
        border-radius: 50%;
        border: 2rpx solid #fff;
      }

      .user-name {
        font-size: 26rpx;
        color: #333;
        max-width: 160rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .login-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10rpx 28rpx;
        border-radius: 30rpx;
        background-color: #ffc107;
        border: 2rpx solid #ffb300;

        .login-text {
          font-size: 26rpx;
          color: #333;
          font-weight: 600;
        }
      }
    }

    .nav-title {
      font-size: 34rpx;
      font-weight: bold;
      color: #333;
      flex-shrink: 0;
    }
  }
}

// 分类标签
.category-scroll {
  white-space: nowrap;
  padding: 16rpx 24rpx;
  background-color: transparent;

  .category-list {
    display: inline-flex;
    gap: 16rpx;

    .category-item {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 14rpx 32rpx;
      border-radius: 40rpx;
      font-size: 28rpx;
      color: #555;
      background-color: rgba(255, 255, 255, 0.7);
      border: 2rpx solid transparent;
      transition: all 0.2s;
      flex-shrink: 0;

      &.active {
        background-color: #ffc107;
        color: #333;
        font-weight: 600;
        border: 2rpx solid #ffb300;
      }
    }
  }
}

// 视频列表区域
.video-grid-scroll {
  flex: 1;
  padding: 20rpx 24rpx;
  height: calc(100vh - 200rpx);
}

.video-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.video-card {
  width: calc(50% - 10rpx);
  background-color: #fff;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);

  .card-cover-wrap {
    position: relative;
    width: 100%;
    height: 240rpx;

    .card-cover {
      width: 100%;
      height: 100%;
    }

    .episode-badge {
      position: absolute;
      top: 16rpx;
      right: 16rpx;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: 22rpx;
      padding: 4rpx 16rpx;
      border-radius: 20rpx;
    }
  }

  .card-title {
    padding: 16rpx;
    font-size: 26rpx;
    color: #333;
    text-align: center;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
