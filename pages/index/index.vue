<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-content">
        <view class="nav-logo">
          <view class="logo-icon">
            <text class="logo-emoji">🐣</text>
          </view>
          <text class="logo-text">宝宝大课堂</text>
        </view>
        <view class="nav-right">
          <view class="history-btn" @click="goHistory">
            <text class="history-icon">🕐</text>
            <text class="history-text">历史</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 欢迎区域 -->
    <view class="welcome-section">
      <view class="welcome-card">
        <view class="welcome-bubble bubble-1"></view>
        <view class="welcome-bubble bubble-2"></view>
        <view class="welcome-bubble bubble-3"></view>
        <text class="welcome-title">👋 嗨，小朋友！</text>
        <text class="welcome-subtitle">今天想玩点什么呀？</text>
      </view>
    </view>

    <!-- 我的角色 -->
    <view class="char-section" v-if="myChar" :key="'char-' + charVersion">
      <view
        class="char-card"
        :class="{ 'char-bounce': charAnimating }"
        @click="interactWithChar"
      >
        <view class="char-avatar" :style="{ background: charColor }">
          <text class="char-emoji">{{ charEmoji }}</text>
        </view>
        <view class="char-info">
          <text class="char-name">{{ myChar.name }}</text>
          <text class="char-desc"
            >{{ charPersonality }} · {{ charAnimal }}</text
          >
        </view>
        <view class="char-tap-hint">
          <text class="tap-icon">👆</text>
        </view>
        <!-- 互动气泡 -->
        <view class="char-bubble" v-if="charMessage">
          <text class="bubble-text">{{ charMessage }}</text>
        </view>
      </view>
    </view>

    <!-- 功能卡片网格 -->
    <view class="feature-section">
      <!-- 智能讲故事（主功能） -->
      <view class="feature-card card-story" @click="goStory">
        <view class="card-glare"></view>
        <view class="card-icon-wrap icon-story">
          <text class="card-emoji">📖</text>
        </view>
        <text class="card-title">智能讲故事</text>
        <text class="card-desc">输入关键词，为你创作一个专属故事</text>
        <view class="card-badge">热门</view>
      </view>

      <!-- 智能画画 -->
      <view class="feature-card card-draw" @click="goDraw">
        <view class="card-glare"></view>
        <view class="card-icon-wrap icon-draw">
          <text class="card-emoji">🎨</text>
        </view>
        <text class="card-title">智能画画</text>
        <text class="card-desc">说出你的想法，帮你画出来</text>
      </view>

      <!-- 智能学习助手 -->
      <view class="feature-card card-chat" @click="goChat">
        <view class="card-glare"></view>
        <view class="card-icon-wrap icon-chat">
          <text class="card-emoji">🤖</text>
        </view>
        <text class="card-title">智能学习助手</text>
        <text class="card-desc">有问题就问，什么都知道</text>
      </view>

      <!-- 故事接龙 - 新功能区 -->
      <view class="feature-card card-adventure" @click="goAdventure">
        <view class="card-glare"></view>
        <view class="card-icon-wrap icon-adventure">
          <text class="card-emoji">🎭</text>
        </view>
        <text class="card-title">故事接龙</text>
        <text class="card-desc">你来选剧情，每次不同结局</text>
        <view class="card-badge card-badge-new">NEW</view>
      </view>

      <!-- 创建角色 -->
      <view
        class="feature-card card-character"
        @click="goCharacter"
        :key="'card-' + charVersion"
      >
        <view class="card-glare"></view>
        <view class="card-icon-wrap icon-character">
          <text class="card-emoji">{{ myChar ? charEmoji : '⭐' }}</text>
        </view>
        <text class="card-title">{{ myChar ? myChar.name : '我的角色' }}</text>
        <text class="card-desc">{{
          myChar ? '点击查看角色' : '创建专属角色，出现在故事中'
        }}</text>
      </view>
    </view>

    <!-- 底部提示 -->
    <view class="footer-tip">
      <text class="tip-text">✨ 每天一个好故事，陪伴宝宝快乐成长</text>
    </view>

    <!-- 底部链接 -->
    <view class="footer-links">
      <text class="footer-link" @click="goPrivacy">隐私政策</text>
      <text class="link-divider">·</text>
      <text class="footer-link" @click="goDisclaimer">内容说明</text>
      <text class="link-divider">·</text>
      <text class="footer-link" @click="goHistory">我的历史</text>
    </view>

    <!-- 浮动宠物 -->
    <view class="pet-layer" v-if="myChar">
      <view
        class="pet-container"
        :key="'pet-' + charVersion"
        :class="[petState]"
        :style="petStyle"
        @touchstart="onPetTouchStart"
        @touchmove="onPetTouchMove"
        @touchend="onPetTouchEnd"
      >
        <view class="pet-body" :style="{ background: charColor }">
          <text class="pet-emoji">{{ charEmoji }}</text>
        </view>
        <view class="pet-bubble" v-if="petMessage">
          <text class="pet-bubble-text">{{ petMessage }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onReady, onShow, onHide } from '@dcloudio/uni-app'
import { getMyCharacter, ANIMAL_TYPES, PERSONALITIES, COLOR_THEMES } from '@/config/character.js'

const statusBarHeight = ref(44)
const myChar = ref(null)
const charAnimating = ref(false)
const charMessage = ref('')

const charEmoji = computed(() => {
  if (!myChar.value) return ''
  const a = ANIMAL_TYPES.find(x => x.id === myChar.value.animalId)
  return a ? a.emoji : '🐰'
})
const charAnimal = computed(() => {
  if (!myChar.value) return ''
  const a = ANIMAL_TYPES.find(x => x.id === myChar.value.animalId)
  return a ? a.name : ''
})
const charPersonality = computed(() => {
  if (!myChar.value) return ''
  const p = PERSONALITIES.find(x => x.id === myChar.value.personalityId)
  return p ? p.name : ''
})
const charColor = computed(() => {
  if (!myChar.value) return '#FF6B35'
  const c = COLOR_THEMES.find(x => x.id === myChar.value.colorId)
  return c ? c.color : '#FF6B35'
})

const charMessages = [
  '来和我一起玩吧！🎮',
  '今天想听什么故事呀？📖',
  '我在这里哦～✨',
  '嘿嘿，你回来啦！😊',
  '要不要去冒险？🗺️',
  '我能画一幅画送给你！🎨',
]

// 角色版本号，修改角色后递增，强制刷新宠物渲染
const charVersion = ref(0)

// 浮动宠物
const petState = ref('idle')
const petMessage = ref('')
const petX = ref(40)
const petY = ref(0)
const petViewW = ref(375)
const petViewH = ref(700)
const petSize = 120
let dragStartX = 0
let dragStartY = 0
let petStartX = 0
let petStartY = 0
let petTimer = null
let walkTimer = null

const petStyle = computed(() => ({
  left: petX.value + 'px',
  top: petY.value + 'px',
}))

const petMessages = [
  '嘿嘿～👋', '啦啦啦～🎵', '好无聊呀🥱',
  '你想去哪里？🚶', '我在这里！✨', '嗯？😊',
  '来找我玩呀！🎮', '今天真开心！🌟',
]

onShow(() => {
  const newChar = getMyCharacter()
  if (JSON.stringify(newChar) !== JSON.stringify(myChar.value)) {
    myChar.value = newChar
    charVersion.value++
    stopPetWandering()
    if (myChar.value) startPetWandering()
  }
})

onHide(() => {
  stopPetWandering()
})

onReady(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 44
  petViewW.value = systemInfo.windowWidth
  petViewH.value = systemInfo.windowHeight
  petX.value = petViewW.value - petSize - 30
  petY.value = petViewH.value - petSize - 300
})

function startPetWandering () {
  stopPetWandering()
  walkTimer = setInterval(() => {
    if (petState.value === 'dragging') return
    const maxX = petViewW.value - petSize - 10
    const maxY = petViewH.value - petSize - 150
    const newX = Math.max(10, Math.min(maxX, 10 + Math.random() * (maxX - 10)))
    const newY = Math.max(80, Math.min(maxY, 80 + Math.random() * (maxY - 80)))
    petState.value = 'walking'
    petX.value = newX
    petY.value = newY
    clearTimeout(petTimer)
    petTimer = setTimeout(() => { petState.value = 'idle' }, 800)
  }, 4000 + Math.random() * 3000)
}

function stopPetWandering () {
  if (walkTimer) { clearInterval(walkTimer); walkTimer = null }
  clearTimeout(petTimer)
}

function onPetTouchStart (e) {
  stopPetWandering()
  petState.value = 'dragging'
  const touch = e.touches[0]
  dragStartX = touch.clientX
  dragStartY = touch.clientY
  petStartX = petX.value
  petStartY = petY.value
}

function onPetTouchMove (e) {
  if (petState.value !== 'dragging') return
  const touch = e.touches[0]
  const dx = touch.clientX - dragStartX
  const dy = touch.clientY - dragStartY
  const maxX = petViewW.value - petSize - 10
  const maxY = petViewH.value - petSize - 150
  petX.value = Math.max(10, Math.min(maxX, petStartX + dx))
  petY.value = Math.max(80, Math.min(maxY, petStartY + dy))
}

function onPetTouchEnd () {
  if (petState.value !== 'dragging') return
  petState.value = 'happy'
  petMessage.value = petMessages[Math.floor(Math.random() * petMessages.length)]
  setTimeout(() => {
    petMessage.value = ''
    petState.value = 'idle'
    startPetWandering()
  }, 1500)
}

function interactWithChar () {
  if (charAnimating.value) return
  charAnimating.value = true
  charMessage.value = charMessages[Math.floor(Math.random() * charMessages.length)]
  setTimeout(() => {
    charMessage.value = ''
    charAnimating.value = false
  }, 2500)
}

function goStory () {
  uni.navigateTo({ url: '/pages/story/story' })
}

function goDraw () {
  uni.navigateTo({ url: '/pages/draw/draw' })
}

function goChat () {
  uni.navigateTo({ url: '/pages/chat/chat' })
}

function goAdventure () {
  uni.navigateTo({ url: '/pages/adventure/adventure' })
}

function goCharacter () {
  uni.navigateTo({ url: '/pages/character/character' })
}

function goHistory () {
  uni.navigateTo({ url: '/pages/favorites/favorites?tab=history' })
}

function goPrivacy () {
  uni.navigateTo({ url: '/pages/privacy/privacy' })
}

function goDisclaimer () {
  uni.navigateTo({ url: '/pages/disclaimer/disclaimer' })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #fdf6ec 0%, #f7e8dc 100%);
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
  padding-right: 280rpx;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 14rpx;
}

.logo-icon {
  width: 72rpx;
  height: 72rpx;
  background: linear-gradient(135deg, #ffd166, #ff9e5e);
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(255, 158, 94, 0.35);
}

.logo-emoji {
  font-size: 40rpx;
}

.logo-text {
  font-size: 38rpx;
  font-weight: bold;
  color: #ff6b35;
}

.nav-right {
  display: flex;
  align-items: center;
}

.history-btn {
  display: flex;
  align-items: center;
  gap: 6rpx;
  padding: 12rpx 24rpx;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 30rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.history-icon {
  font-size: 26rpx;
}

.history-text {
  font-size: 24rpx;
  color: #7a6a5d;
  font-weight: 600;
}

/* 欢迎区域 */
.welcome-section {
  padding: 10rpx 30rpx 30rpx;
}

.welcome-card {
  background: linear-gradient(135deg, #ff9e5e 0%, #ff6b35 100%);
  border-radius: 32rpx;
  padding: 44rpx 40rpx;
  box-shadow: 0 12rpx 30rpx rgba(255, 107, 53, 0.35);
  position: relative;
  overflow: hidden;
}

.welcome-bubble {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
}

.bubble-1 {
  width: 160rpx;
  height: 160rpx;
  right: -30rpx;
  top: -40rpx;
}

.bubble-2 {
  width: 80rpx;
  height: 80rpx;
  right: 100rpx;
  bottom: -20rpx;
}

.bubble-3 {
  width: 40rpx;
  height: 40rpx;
  left: 200rpx;
  top: 20rpx;
}

.welcome-title {
  font-size: 42rpx;
  font-weight: bold;
  color: #ffffff;
  display: block;
  margin-bottom: 10rpx;
  position: relative;
}

.welcome-subtitle {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
  position: relative;
}

/* 我的角色 */
.char-section {
  padding: 0 30rpx 20rpx;
}

.char-card {
  display: flex;
  align-items: center;
  gap: 24rpx;
  background: #ffffff;
  border-radius: 28rpx;
  padding: 24rpx 30rpx;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.06);
  border: 3rpx solid #f0e6d8;
  position: relative;
  transition: all 0.3s;
}

.char-card:active {
  transform: scale(0.97);
}

.char-bounce {
  animation: charBounce 0.5s ease;
}

@keyframes charBounce {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.08);
  }
  50% {
    transform: scale(0.95);
  }
  70% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
}

.char-avatar {
  width: 90rpx;
  height: 90rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.char-emoji {
  font-size: 48rpx;
}

.char-info {
  flex: 1;
  min-width: 0;
}

.char-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #3d3733;
  display: block;
}

.char-desc {
  font-size: 24rpx;
  color: #8a7a6d;
  margin-top: 4rpx;
  display: block;
}

.char-tap-hint {
  width: 52rpx;
  height: 52rpx;
  background: #fdf6ec;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: hintPulse 2s ease-in-out infinite;
}

@keyframes hintPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.15);
    opacity: 1;
  }
}

.tap-icon {
  font-size: 28rpx;
}

.char-bubble {
  position: absolute;
  top: -40rpx;
  right: 30rpx;
  background: #ff6b35;
  border-radius: 20rpx;
  padding: 10rpx 20rpx;
  animation: bubbleIn 0.3s ease-out;
  z-index: 10;
}

.char-bubble::after {
  content: '';
  position: absolute;
  bottom: -12rpx;
  right: 30rpx;
  width: 0;
  height: 0;
  border-left: 12rpx solid transparent;
  border-right: 12rpx solid transparent;
  border-top: 14rpx solid #ff6b35;
}

@keyframes bubbleIn {
  from {
    opacity: 0;
    transform: translateY(10rpx) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.bubble-text {
  font-size: 24rpx;
  color: #ffffff;
  font-weight: 600;
  white-space: nowrap;
}

/* 功能卡片 */
.feature-section {
  padding: 0 30rpx;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.feature-card {
  border-radius: 28rpx;
  padding: 32rpx 28rpx;
  position: relative;
  overflow: hidden;
  transition: all 0.25s;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.08);
}

.feature-card:active {
  transform: scale(0.96);
}

.card-glare {
  position: absolute;
  top: 0;
  right: 0;
  width: 120rpx;
  height: 120rpx;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 0 0 0 100%;
}

/* 讲故事卡片（大卡片，占整行） */
.card-story {
  grid-column: 1 / -1;
  background: linear-gradient(135deg, #fff9f0 0%, #fff0e2 100%);
  border: 3rpx solid #ff9e5e;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 44rpx 40rpx;
}

.card-draw {
  background: linear-gradient(135deg, #f0f8ff 0%, #e4f1ff 100%);
  border: 3rpx solid #5b9dff;
}

.card-chat {
  background: linear-gradient(135deg, #f8f4ff 0%, #efe7fb 100%);
  border: 3rpx solid #9b6dff;
}

.card-icon-wrap {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20rpx;
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.08);
}

.icon-story {
  background: linear-gradient(135deg, #ffd166, #ff9e5e);
}

.icon-draw {
  background: linear-gradient(135deg, #8fc1ff, #5b9dff);
}

.icon-chat {
  background: linear-gradient(135deg, #b89bff, #9b6dff);
}

.card-emoji {
  font-size: 64rpx;
}

.card-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #3d3733;
  display: block;
  text-align: center;
}

.card-desc {
  font-size: 23rpx;
  color: #8a7a6d;
  margin-top: 8rpx;
  text-align: center;
  line-height: 1.5;
}

.card-badge {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  background: linear-gradient(135deg, #ff6b35, #ff9e5e);
  color: #ffffff;
  font-size: 20rpx;
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
  font-weight: bold;
}

/* 故事接龙卡片 */
.card-adventure {
  background: linear-gradient(135deg, #f4f0ff 0%, #eae3f8 100%);
  border: 3rpx solid #9b6dff;
}

.icon-adventure {
  background: linear-gradient(135deg, #c9b0ff, #9b6dff);
}

/* 角色卡片 */
.card-character {
  background: linear-gradient(135deg, #fffbf0 0%, #fff3dc 100%);
  border: 3rpx solid #ffd166;
}

.icon-character {
  background: linear-gradient(135deg, #ffe082, #ffd166);
}

.card-badge-new {
  background: linear-gradient(135deg, #9b6dff, #7b4fe0);
}

/* 底部提示 */
.footer-tip {
  padding: 40rpx 30rpx 0;
  text-align: center;
}

.tip-text {
  font-size: 24rpx;
  color: #c0b2a4;
}

/* 底部链接 */
.footer-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  margin-top: 16rpx;
  padding-bottom: 20rpx;
}

.footer-link {
  font-size: 22rpx;
  color: #a08e7e;
  padding: 8rpx 12rpx;
}

.footer-link:active {
  color: #ff6b35;
}

.link-divider {
  font-size: 22rpx;
  color: #d0c2b4;
}

/* 浮动宠物 */
.pet-layer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 999;
  overflow: hidden;
}

.pet-container {
  position: absolute;
  width: 120rpx;
  height: 120rpx;
  pointer-events: auto;
  z-index: 999;
  transition: left 0.8s ease, top 0.8s ease;
}

.pet-container.dragging {
  transition: none;
  z-index: 1000;
}

.pet-container.idle .pet-body {
  animation: petIdle 2s ease-in-out infinite;
}

.pet-container.walking .pet-body {
  animation: petWalk 0.4s ease-in-out infinite alternate;
}

.pet-container.happy .pet-body {
  animation: petHappy 0.5s ease;
}

.pet-container.dragging .pet-body {
  transform: scale(1.12);
}

@keyframes petIdle {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8rpx);
  }
}

@keyframes petWalk {
  0% {
    transform: translateX(-6rpx) rotate(-5deg);
  }
  100% {
    transform: translateX(6rpx) rotate(5deg);
  }
}

@keyframes petHappy {
  0% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.15) rotate(-10deg);
  }
  50% {
    transform: scale(1.15) rotate(10deg);
  }
  75% {
    transform: scale(1.15) rotate(-5deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

.pet-body {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
  position: relative;
}

.pet-emoji {
  font-size: 64rpx;
}

.pet-bubble {
  position: absolute;
  top: -60rpx;
  left: 50%;
  transform: translateX(-50%);
  background: #ff6b35;
  border-radius: 20rpx;
  padding: 8rpx 18rpx;
  white-space: nowrap;
  z-index: 1001;
  animation: petBubbleIn 0.3s ease-out;
}

.pet-bubble::after {
  content: '';
  position: absolute;
  bottom: -12rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 12rpx solid transparent;
  border-right: 12rpx solid transparent;
  border-top: 14rpx solid #ff6b35;
}

@keyframes petBubbleIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(8rpx) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

.pet-bubble-text {
  font-size: 22rpx;
  color: #ffffff;
  font-weight: 600;
}
</style>