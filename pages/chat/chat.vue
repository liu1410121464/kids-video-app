<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-content">
        <view class="nav-back" @click="goBack">
          <text class="back-icon">←</text>
        </view>
        <text class="nav-title">智能学习助手</text>
        <view class="nav-placeholder"></view>
      </view>
    </view>

    <!-- 聊天区域 -->
    <scroll-view
      scroll-y
      class="chat-scroll"
      :scroll-into-view="scrollIntoView"
      scroll-with-animation
    >
      <!-- 欢迎消息 -->
      <view class="chat-message" v-if="messages.length === 0">
        <view class="avatar avatar-bot">
          <text class="avatar-emoji">🤖</text>
        </view>
        <view class="msg-bubble bot-bubble">
          <text class="msg-text">
            嗨，小朋友！我是小贝贝 🤖 不管你有什么问题，都可以问我哦~
            比如："为什么天空是蓝色的？"、"3+5等于几？"、"什么是恐龙？"
          </text>
        </view>
      </view>

      <!-- 聊天记录 -->
      <view
        v-for="(msg, index) in messages"
        :key="index"
        class="chat-message"
        :class="{ 'msg-user': msg.role === 'user' }"
      >
        <view v-if="msg.role === 'assistant'" class="avatar avatar-bot">
          <text class="avatar-emoji">🤖</text>
        </view>
        <view
          class="msg-bubble"
          :class="msg.role === 'user' ? 'user-bubble' : 'bot-bubble'"
        >
          <text class="msg-text">{{ msg.content }}</text>
        </view>
        <view v-if="msg.role === 'user'" class="avatar avatar-user">
          <text class="avatar-emoji">👶</text>
        </view>
      </view>

      <!-- 正在输入 -->
      <view class="chat-message" v-if="loading">
        <view class="avatar avatar-bot">
          <text class="avatar-emoji">🤖</text>
        </view>
        <view class="msg-bubble bot-bubble typing-bubble">
          <view class="typing-dot"></view>
          <view class="typing-dot"></view>
          <view class="typing-dot"></view>
        </view>
      </view>
      <view id="chat-bottom" style="height: 20rpx"></view>
    </scroll-view>

    <!-- 输入栏 -->
    <view class="input-bar">
      <input
        class="chat-input"
        v-model="inputText"
        placeholder="问问小贝贝..."
        placeholder-class="input-placeholder"
        confirm-type="send"
        @confirm="sendMessage"
        :disabled="loading"
      />
      <view
        class="send-btn"
        :class="{ disabled: loading }"
        @click="sendMessage"
      >
        <text class="send-text">发送</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { onReady } from '@dcloudio/uni-app'
import { chatAssistant } from '@/utils/aiService.js'

const statusBarHeight = ref(44)
const messages = ref([])
const inputText = ref('')
const loading = ref(false)
const scrollIntoView = ref('')
const selectedAge = ref(6)

onReady(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 44
})

function goBack () {
  uni.navigateBack()
}

async function sendMessage () {
  const text = inputText.value.trim()
  if (!text || loading.value) return

  messages.value.push({ role: 'user', content: text })
  inputText.value = ''
  loading.value = true
  scrollToBottom()

  try {
    const result = await chatAssistant(text, selectedAge.value)
    messages.value.push({ role: 'assistant', content: result.reply })
  } catch (err) {
    messages.value.push({
      role: 'assistant',
      content: '哎呀，我这边出了一点小问题，请再试一次哦 🙈'
    })
  } finally {
    loading.value = false
    scrollToBottom()
  }
}

function scrollToBottom () {
  nextTick(() => {
    scrollIntoView.value = 'chat-bottom'
  })
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #f8f4ff 0%, #eee6fa 100%);
}

/* 导航栏 */
.nav-bar {
  flex-shrink: 0;
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
  color: #9b6dff;
  font-weight: bold;
  line-height: 1;
}

.nav-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #3d2f5a;
}

.nav-placeholder {
  width: 64rpx;
}

/* 聊天区域 */
.chat-scroll {
  flex: 1;
  padding: 0 30rpx;
  box-sizing: border-box;
}

.chat-message {
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
  margin-bottom: 24rpx;
}

.msg-user {
  flex-direction: row-reverse;
}

.avatar {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-bot {
  background: linear-gradient(135deg, #9b6dff, #7b4fe0);
  box-shadow: 0 4rpx 12rpx rgba(155, 109, 255, 0.3);
}

.avatar-user {
  background: linear-gradient(135deg, #ffd166, #ffb84d);
  box-shadow: 0 4rpx 12rpx rgba(255, 177, 77, 0.3);
}

.avatar-emoji {
  font-size: 36rpx;
}

.msg-bubble {
  max-width: 70%;
  padding: 22rpx 26rpx;
  border-radius: 24rpx;
  font-size: 28rpx;
  line-height: 1.6;
  word-break: break-word;
}

.bot-bubble {
  background: #ffffff;
  color: #3d2f5a;
  border-top-left-radius: 6rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.user-bubble {
  background: linear-gradient(135deg, #9b6dff, #7b4fe0);
  color: #ffffff;
  border-top-right-radius: 6rpx;
  box-shadow: 0 4rpx 12rpx rgba(155, 109, 255, 0.25);
}

.msg-text {
  font-size: 28rpx;
}

/* 正在输入动画 */
.typing-bubble {
  display: flex;
  gap: 10rpx;
  align-items: center;
  padding: 28rpx 32rpx;
}

.typing-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: #9b6dff;
  animation: typing 1s infinite;
}

.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%,
  100% {
    opacity: 0.3;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(-6rpx);
  }
}

/* 输入栏 */
.input-bar {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 20rpx 30rpx;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  background: #ffffff;
  border-top: 2rpx solid #ede3fa;
  flex-shrink: 0;
}

.chat-input {
  flex: 1;
  background: #f6f2fc;
  border-radius: 40rpx;
  padding: 20rpx 30rpx;
  font-size: 28rpx;
  color: #3d2f5a;
}

.input-placeholder {
  color: #b8a9d6;
}

.send-btn {
  padding: 20rpx 40rpx;
  background: linear-gradient(135deg, #9b6dff, #7b4fe0);
  border-radius: 40rpx;
  box-shadow: 0 4rpx 12rpx rgba(155, 109, 255, 0.3);
  transition: all 0.2s;
}

.send-btn:active {
  transform: scale(0.95);
}

.send-btn.disabled {
  opacity: 0.5;
}

.send-text {
  font-size: 28rpx;
  font-weight: bold;
  color: #ffffff;
}
</style>