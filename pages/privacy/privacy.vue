<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-content">
        <view class="nav-back" @click="goBack">
          <text class="back-icon">←</text>
        </view>
        <text class="nav-title">隐私政策</text>
        <view class="nav-placeholder"></view>
      </view>
    </view>

    <scroll-view scroll-y class="content-scroll">
      <view class="policy-card">
        <!-- 版本信息 -->
        <view class="policy-header">
          <text class="policy-title">📋 隐私政策</text>
          <text class="policy-version">更新日期：2026年8月14日</text>
        </view>

        <!-- 引言 -->
        <view class="section">
          <text class="section-title">一、引言</text>
          <text class="section-text">
            欢迎使用「宝宝大课堂」。我们深知个人信息对您和您孩子的重要性，我们将按照法律法规的规定，保护您和您孩子的个人信息及隐私安全。本政策将帮助您了解我们收集、使用、存储和共享信息的方式。
          </text>
        </view>

        <!-- 我们收集的信息 -->
        <view class="section">
          <text class="section-title">二、我们收集的信息</text>
          <text class="section-text">
            1.
            您主动提交的信息：您在使用故事创作、AI绘画等功能时提交的关键词、描述文字等输入内容；您创建的角色名称和角色设置。
          </text>
          <text class="section-text">
            2.
            设备信息：为了保障服务的正常运行，我们可能会收集您的设备型号、操作系统版本、网络状态等基本信息。
          </text>
          <text class="section-text">
            3.
            本地存储信息：您收藏的故事、历史记录、角色信息仅保存在您的设备本地，我们不会上传这些数据。
          </text>
        </view>

        <!-- 信息的使用 -->
        <view class="section">
          <text class="section-title">三、信息的使用</text>
          <text class="section-text">
            1.
            您输入的创作关键词和描述仅用于向您提供对应的故事生成、绘画生成等服务。
          </text>
          <text class="section-text">
            2. 我们不会将您的个人信息用于与提供服务无关的用途。
          </text>
          <text class="section-text">
            3. 我们不会向任何第三方出售您的个人信息。
          </text>
        </view>

        <!-- 信息共享 -->
        <view class="section">
          <text class="section-title">四、信息的共享与披露</text>
          <text class="section-text">
            我们不会与任何公司、组织和个人共享您的个人信息，除非存在以下情形：
          </text>
          <text class="section-text"> 1. 获得您的明确同意； </text>
          <text class="section-text">
            2.
            根据法律法规的规定、诉讼争议解决需要，或行政、司法等政府部门依法提出的要求；
          </text>
          <text class="section-text">
            3.
            与提供基础技术服务（如云服务、AI模型调用）的合作伙伴共享必要信息，但会要求其遵守保密义务。
          </text>
        </view>

        <!-- 信息存储 -->
        <view class="section">
          <text class="section-title">五、信息的存储与保护</text>
          <text class="section-text">
            1.
            您的收藏、历史、角色等数据存储于您的设备本地，如需清除可直接在小程序设置中清除缓存。
          </text>
          <text class="section-text">
            2.
            我们采取合理的技术措施保护您的信息安全，防止信息遭到未经授权的访问、公开披露、使用或修改。
          </text>
        </view>

        <!-- 儿童个人信息保护 -->
        <view class="section">
          <text class="section-title">六、儿童个人信息保护</text>
          <text class="section-text">
            「宝宝大课堂」是为儿童提供教育娱乐服务的应用。我们特别重视儿童个人信息的保护。由于本应用的服务对象包含未成年人，我们建议父母或监护人指导孩子使用本应用。
          </text>
          <text class="section-text">
            我们不会主动收集儿童的可识别身份信息。如您发现我们在未获监护人同意的情况下收集了儿童的个人信息，请及时与我们联系，我们将尽快删除相关信息。
          </text>
        </view>

        <!-- 政策变更 -->
        <view class="section">
          <text class="section-title">七、政策变更</text>
          <text class="section-text">
            我们可能会适时对本隐私政策进行更新。当本政策发生重大变更时，我们会在本页面向您提示变更内容。您继续使用本应用即视为您接受修改后的政策。
          </text>
        </view>

        <!-- 联系我们 -->
        <view class="section">
          <text class="section-title">八、联系我们</text>
          <text class="section-text">
            如您对本隐私政策有任何疑问、意见或建议，可通过以下方式与我们联系：
          </text>
          <text class="section-text contact"
            >📮 邮箱：support@baobaodaketang.com</text
          >
          <text class="section-text contact"
            >🕐 工作时间：周一至周五 9:00-18:00</text
          >
          <text class="section-text">
            我们将在收到您的问题后 15 个工作日内予以回复。
          </text>
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
  background: linear-gradient(180deg, #fdf6ec 0%, #f7e8dc 100%);
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
  border: 2rpx solid #f0e6d8;
}

.policy-header {
  margin-bottom: 32rpx;
  padding-bottom: 24rpx;
  border-bottom: 2rpx solid #f5e8da;
}

.policy-title {
  font-size: 38rpx;
  font-weight: bold;
  color: #3d3733;
  display: block;
}

.policy-version {
  font-size: 22rpx;
  color: #b0a294;
  margin-top: 10rpx;
  display: block;
}

.section {
  margin-bottom: 30rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #ff6b35;
  display: block;
  margin-bottom: 14rpx;
}

.section-text {
  font-size: 26rpx;
  color: #5a4e44;
  line-height: 1.8;
  display: block;
  margin-bottom: 10rpx;
}

.contact {
  color: #7b6a5d;
  font-size: 26rpx;
  text-align: left;
}
</style>