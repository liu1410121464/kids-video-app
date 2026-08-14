<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-content">
        <view class="nav-back" @click="goBack">
          <text class="back-icon">←</text>
        </view>
        <text class="nav-title">内容说明</text>
        <view class="nav-placeholder"></view>
      </view>
    </view>

    <scroll-view scroll-y class="content-scroll">
      <view class="policy-card">
        <!-- 头部 -->
        <view class="policy-header">
          <view class="header-icon">
            <text class="header-emoji">🤖</text>
          </view>
          <text class="policy-title">智能生成内容说明</text>
          <text class="policy-version">更新日期：2026年8月14日</text>
        </view>

        <!-- 重要提示 -->
        <view class="notice-box">
          <text class="notice-text">
            ⚠️
            温馨提示：本小程序中的故事、绘画、问答等内容均由智能算法自动生成，请家长陪同孩子一起使用，合理甄别内容。
          </text>
        </view>

        <!-- 一、生成内容说明 -->
        <view class="section">
          <text class="section-title">一、关于智能生成内容</text>
          <text class="section-text">
            1.
            本应用中「智能讲故事」、「智能画画」、「智能学习助手」等功能的输出内容，均由机器学习模型根据您输入的提示词自动生成。
          </text>
          <text class="section-text">
            2.
            生成内容仅基于算法对输入信息的理解，不代表任何组织的观点，也不构成专业建议。
          </text>
        </view>

        <!-- 二、内容准确性说明 -->
        <view class="section">
          <text class="section-title">二、内容准确性说明</text>
          <text class="section-text">
            1.
            智能生成的故事、画作和回答可能存在不准确、不完整或不符合预期的情况。
          </text>
          <text class="section-text">
            2. 对于智能学习助手的回答，建议家长与孩子共同查阅权威资料核实。
          </text>
          <text class="section-text">
            3. 生成内容仅供参考和娱乐，不应用于医疗、安全、法律等专业决策场景。
          </text>
        </view>

        <!-- 三、内容安全承诺 -->
        <view class="section">
          <text class="section-title">三、内容安全承诺</text>
          <text class="section-text">
            1.
            我们已对生成内容设置了安全过滤机制，尽量避免输出暴力、色情、违法及不适宜儿童的内容。
          </text>
          <text class="section-text">
            2. 我们持续优化模型提示词，引导生成积极向上、有益于儿童成长的内容。
          </text>
          <text class="section-text">
            3.
            如您在使用过程中发现任何不适宜的内容，欢迎通过「关于我们」中的联系方式反馈，我们将及时处理。
          </text>
        </view>

        <!-- 四、知识产权说明 -->
        <view class="section">
          <text class="section-title">四、知识产权说明</text>
          <text class="section-text">
            1. 由本应用生成的内容，其版权归您所有，您可以自由保存、分享和使用。
          </text>
          <text class="section-text">
            2. 请勿将生成内容用于任何违法或侵权的用途。
          </text>
        </view>

        <!-- 五、投诉举报 -->
        <view class="section">
          <text class="section-title">五、投诉与举报</text>
          <text class="section-text">
            如发现不当内容，可通过以下渠道反馈：
          </text>
          <text class="section-text contact"
            >📮 邮箱：support@baobaodaketang.com</text
          >
          <text class="section-text contact"
            >🕐 处理时长：我们将在 3 个工作日内响应</text
          >
        </view>

        <view style="height: 60rpx"></view>
      </view>
    </scroll-view>
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

function goBack () {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #f0f8ff 0%, #e4f1ff 100%);
}

.nav-bar {
  background: transparent;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12rpx 30rpx 20rpx;
  padding-right: 280rpx;
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

.content-scroll {
  height: calc(100vh - 162rpx);
  padding: 0 30rpx;
  box-sizing: border-box;
}

.policy-card {
  background: #ffffff;
  border-radius: 28rpx;
  padding: 40rpx 36rpx;
  box-shadow: 0 6rpx 24rpx rgba(0, 0, 0, 0.06);
  border: 2rpx solid #e0edfb;
}

.policy-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32rpx;
  padding-bottom: 24rpx;
  border-bottom: 2rpx solid #e8f2ff;
}

.header-icon {
  width: 110rpx;
  height: 110rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #8fc1ff, #5b9dff);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20rpx;
  box-shadow: 0 6rpx 16rpx rgba(91, 157, 255, 0.3);
}

.header-emoji {
  font-size: 56rpx;
}

.policy-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #2d4059;
  display: block;
}

.policy-version {
  font-size: 22rpx;
  color: #a8bdd4;
  margin-top: 10rpx;
  display: block;
}

.notice-box {
  background: #fff7e8;
  border: 2rpx solid #ffe0a8;
  border-radius: 16rpx;
  padding: 20rpx 24rpx;
  margin-bottom: 30rpx;
}

.notice-text {
  font-size: 24rpx;
  color: #8a6d3b;
  line-height: 1.7;
}

.section {
  margin-bottom: 30rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #5b9dff;
  display: block;
  margin-bottom: 14rpx;
}

.section-text {
  font-size: 26rpx;
  color: #3d5670;
  line-height: 1.8;
  display: block;
  margin-bottom: 10rpx;
}

.contact {
  color: #5b9dff;
  font-size: 26rpx;
  text-align: left;
}
</style>