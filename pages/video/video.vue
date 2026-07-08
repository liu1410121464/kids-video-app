<template>
  <view class="container">
    <!-- 视频播放器 -->
    <view class="player-wrap">
      <video
        v-if="videoUrl"
        id="myVideo"
        class="video-player"
        :src="videoUrl"
        :title="videoTitle"
        :controls="true"
        :autoplay="true"
        :show-fullscreen-btn="true"
        :show-play-btn="true"
        :show-center-play-btn="true"
        :enable-progress-gesture="true"
        object-fit="contain"
        :enable-casting="true"
        @error="onVideoError"
        @timeupdate="onTimeUpdate"
        @ended="onVideoEnded"
      ></video>

      <!-- 无视频时的提示 -->
      <view v-else class="no-video">
        <text>暂无视频资源</text>
        <text class="tip">请配置视频地址后重试</text>
      </view>
    </view>

    <!-- 系列标题 + 返回按钮 -->
    <view class="series-header">
      <view class="series-header-left">
        <view class="back-btn" @click="goBack">
          <text class="back-icon">‹</text>
        </view>
        <text class="series-title">{{ seriesTitle }}</text>
      </view>
      <text class="series-count"
        >{{ currentEpisodeIdx + 1 }} / {{ episodes.length }} 集</text
      >
    </view>

    <!-- 选集列表 -->
    <scroll-view scroll-y class="episode-scroll" :show-scrollbar="false">
      <view
        v-for="(ep, index) in episodes"
        :key="ep.id"
        class="episode-item"
        :class="{ active: ep.id === currentEpisodeId }"
        @click="switchEpisode(ep, index)"
      >
        <view class="episode-index">{{ index + 1 }}</view>
        <view class="episode-info">
          <text class="episode-title">{{ ep.title }}</text>
        </view>
        <view v-if="ep.id === currentEpisodeId" class="episode-playing"
          >播放中</view
        >
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import videoData from '@/config/videoData.js'
import { getSignedVideoUrl, isCOSUrl } from '@/utils/cosService.js'

const videoUrl = ref('')
const videoTitle = ref('')
const seriesTitle = ref('')
const loading = ref(false)

const episodes = ref([])
const currentEpisodeId = ref(null)
const currentEpisodeIdx = ref(0)

let videoContext = null

/** 解析视频地址并赋值给播放器 */
async function resolveAndPlay (rawUrl) {
  if (!rawUrl) {
    videoUrl.value = ''
    return
  }

  if (rawUrl.startsWith('cloud://')) {
    // 微信云存储 → wx.cloud.getTempFileURL
    const playUrl = await new Promise((resolve, reject) => {
      wx.cloud.getTempFileURL({
        fileList: [rawUrl],
        success: (res) => {
          if (res.fileList?.[0]?.status === 0 && res.fileList[0].tempFileURL) {
            resolve(res.fileList[0].tempFileURL)
          } else {
            reject(new Error(res.fileList?.[0]?.errMsg || '解析失败'))
          }
        },
        fail: reject,
      })
    })
    videoUrl.value = playUrl
  } else if (isCOSUrl(rawUrl)) {
    // COS 直链 → 签名后播放
    const signedUrl = await getSignedVideoUrl(rawUrl)
    videoUrl.value = signedUrl
  } else {
    // 普通直链
    videoUrl.value = rawUrl
  }
}

/** 切换选集 */
function switchEpisode (ep, index) {
  if (ep.id === currentEpisodeId.value && videoUrl.value) return
  currentEpisodeId.value = ep.id
  currentEpisodeIdx.value = index
  videoTitle.value = ep.title

  loading.value = true
  uni.showLoading({ title: '加载中...' })
  resolveAndPlay(ep.videoUrl)
    .catch((err) => {
      console.error('视频加载失败:', err)
      uni.showModal({
        title: '播放失败',
        content: err?.message || '视频加载失败',
        showCancel: false,
      })
    })
    .finally(() => {
      uni.hideLoading()
      loading.value = false
    })
}

onLoad(async (options) => {
  const { seriesId, episodeId, title } = options
  const series = videoData.series.find((s) => s.id == seriesId)
  if (!series) return

  seriesTitle.value = series.title
  episodes.value = series.episodes || []

  if (episodes.value.length === 0) return

  // 确定初始播放哪一集
  const targetIdx = episodes.value.findIndex((e) => e.id == episodeId)
  const startIdx = targetIdx >= 0 ? targetIdx : 0
  const startEp = episodes.value[startIdx]

  currentEpisodeId.value = startEp.id
  currentEpisodeIdx.value = startIdx
  videoTitle.value = decodeURIComponent(title || '') || startEp.title
  loading.value = true
  uni.showLoading({ title: '加载中...' })

  resolveAndPlay(startEp.videoUrl)
    .catch((err) => {
      console.error('视频加载失败:', err)
      uni.showModal({
        title: '播放失败',
        content: err?.message || '视频加载失败',
        showCancel: false,
      })
    })
    .finally(() => {
      uni.hideLoading()
      loading.value = false
    })

  // 创建 video 上下文
  setTimeout(() => {
    videoContext = uni.createVideoContext('myVideo')
  }, 200)
})

function onVideoError (e) {
  console.error('视频播放错误:', e)
  uni.showModal({
    title: '播放失败',
    content: '视频加载失败，请检查网络或视频地址是否有效',
    showCancel: false,
  })
}

function onTimeUpdate (e) {
  // 可记录播放进度
}

function onVideoEnded () {
  // 自动播放下⼀集
  const nextIdx = currentEpisodeIdx.value + 1
  if (nextIdx < episodes.value.length) {
    switchEpisode(episodes.value[nextIdx], nextIdx)
  }
}
/** 返回首页 */
function goBack () {
  uni.navigateBack()
}</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.player-wrap {
  width: 100%;
  background-color: #000;
}

.video-player {
  width: 100%;
  height: 420rpx;
  display: block;
}

.no-video {
  width: 100%;
  height: 420rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 32rpx;
  background-color: #000;

  .tip {
    margin-top: 20rpx;
    font-size: 26rpx;
    color: #666;
  }
}

.series-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 30rpx;
  border-bottom: 2rpx solid #f0f0f0;

  .series-header-left {
    display: flex;
    align-items: center;
    gap: 16rpx;
    min-width: 0;
    flex: 1;

    .back-btn {
      width: 56rpx;
      height: 56rpx;
      border-radius: 50%;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      &:active {
        background-color: #ddd;
      }

      .back-icon {
        font-size: 40rpx;
        color: #333;
        line-height: 1;
      }
    }

    .series-title {
      font-size: 32rpx;
      font-weight: 600;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .series-count {
    font-size: 26rpx;
    color: #999;
    flex-shrink: 0;
    margin-left: 16rpx;
  }
}

.episode-scroll {
  flex: 1;
  height: 0;
}

.episode-item {
  display: flex;
  align-items: center;
  padding: 24rpx 30rpx;
  border-bottom: 2rpx solid #f5f5f5;
  transition: background-color 0.2s;

  &:active {
    background-color: #f0f8ff;
  }

  &.active {
    background-color: #e8f4fd;
  }

  .episode-index {
    width: 56rpx;
    height: 56rpx;
    border-radius: 50%;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    color: #666;
    flex-shrink: 0;
  }

  &.active .episode-index {
    background-color: #4a90d9;
    color: #fff;
  }

  .episode-info {
    flex: 1;
    margin-left: 24rpx;
    min-width: 0;

    .episode-title {
      font-size: 28rpx;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .episode-playing {
    font-size: 22rpx;
    color: #4a90d9;
    flex-shrink: 0;
    margin-left: 16rpx;
  }
}
</style>
