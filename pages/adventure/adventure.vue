<template>
  <view class="container">
    <!-- 导航栏 -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-content">
        <view class="nav-back" @click="goBack">
          <text class="back-icon">←</text>
        </view>
        <text class="nav-title">故事接龙</text>
        <view class="nav-link" @click="goCharacter">
          <text class="link-icon">⭐</text>
          <text class="link-text">{{ myChar ? myChar.name : '创建角色' }}</text>
        </view>
      </view>
    </view>

    <!-- 开始界面 -->
    <view class="start-section" v-if="!started">
      <view class="section-title">
        <text class="title-text">🎭 互动故事接龙</text>
        <text class="title-desc"
          >你来选择故事的走向，每次选择都会开启不同的冒险！</text
        >
      </view>

      <!-- 角色展示 -->
      <view class="char-card" @click="goCharacter">
        <view class="char-avatar" :style="{ background: charColor }">
          <text class="char-emoji">{{ charEmoji }}</text>
        </view>
        <view class="char-info">
          <text class="char-label">你的专属角色</text>
          <text class="char-name">{{
            myChar ? myChar.name : '还没有创建，点击创建 ➜'
          }}</text>
        </view>
      </view>

      <!-- 关键词输入 -->
      <view class="input-card">
        <text class="input-label">故事关键词</text>
        <view class="input-row">
          <input
            class="keyword-input"
            v-model="keywords"
            placeholder="比如：森林 宝藏 魔法"
            placeholder-class="ph"
            maxlength="50"
          />
          <view class="random-btn" @click="randomKw">
            <text class="random-icon">🎲</text>
          </view>
        </view>
      </view>

      <!-- 开始按钮 -->
      <view class="start-btn" @click="handleStart">
        <text class="start-btn-text">🚀 开始冒险</text>
      </view>
    </view>

    <!-- 加载界面 -->
    <view class="loading-section" v-if="loading">
      <view class="loading-card">
        <view class="loading-book">
          <text class="book-emoji">📖</text>
          <view class="page-turn p1"></view>
          <view class="page-turn p2"></view>
        </view>
        <text class="loading-text">故事正在展开...</text>
        <text class="loading-sub">你的选择会改变故事的走向</text>
      </view>
    </view>

    <!-- 故事进行中 -->
    <scroll-view
      scroll-y
      class="story-scroll"
      v-if="started && !loading"
      :scroll-into-view="'bottom'"
    >
      <!-- 轮次指示 -->
      <view class="round-badge">
        <text class="round-text"
          >第 {{ currentRound }} / {{ maxRounds }} 幕</text
        >
      </view>

      <!-- 所有历史场景 -->
      <view class="scene-list">
        <view
          v-for="(item, i) in storyHistory"
          :key="i"
          class="scene-card"
          :class="{ 'scene-last': i === storyHistory.length - 1 }"
        >
          <view class="scene-number">{{ i + 1 }}</view>
          <text class="scene-text">{{ item.scene }}</text>
          <!-- 历史选择 -->
          <view v-if="i < storyHistory.length - 1" class="chosen-tag">
            <text class="chosen-text">→ 选择了「{{ item.chosenText }}」</text>
          </view>
        </view>
      </view>

      <!-- 选择分支 (当前轮) -->
      <view
        class="choices-section"
        v-if="!finished && currentChoices.length > 0"
      >
        <text class="choices-label">👇 接下来怎么办？</text>
        <view
          v-for="(choice, i) in currentChoices"
          :key="i"
          class="choice-btn"
          @click="makeChoice(i)"
        >
          <text class="choice-index">{{ ['A', 'B', 'C'][i] }}</text>
          <text class="choice-text">{{ choice }}</text>
          <text class="choice-arrow">→</text>
        </view>
      </view>

      <!-- 结局 -->
      <view class="ending-section" v-if="finished">
        <view class="ending-card">
          <text class="ending-emoji">🎉</text>
          <text class="ending-title">故事结束！</text>
          <text class="ending-text"
            >你完成了 {{ storyHistory.length }} 幕的冒险故事</text
          >
        </view>
        <view class="ending-actions">
          <view class="end-action end-retry" @click="resetAll">
            <text class="end-text">🔄 再来一次</text>
          </view>
          <view class="end-action end-save" @click="saveStory">
            <text class="end-text">💾 保存故事</text>
          </view>
        </view>
      </view>

      <view id="bottom" style="height: 40rpx"></view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onReady } from '@dcloudio/uni-app'
import { startAdventure, continueAdventure } from '@/utils/aiService.js'
import { getMyCharacter, ANIMAL_TYPES, COLOR_THEMES } from '@/config/character.js'

const statusBarHeight = ref(44)
const keywords = ref('')
const loading = ref(false)
const started = ref(false)
const finished = ref(false)
const currentRound = ref(1)
const maxRounds = ref(5)
const currentChoices = ref([])
const storyHistory = ref([])
const myChar = ref(null)

const charEmoji = computed(() => {
  if (!myChar.value) return '🐰'
  const animal = ANIMAL_TYPES.find(a => a.id === myChar.value.animalId)
  return animal ? animal.emoji : '🐰'
})
const charColor = computed(() => {
  if (!myChar.value) return '#FF6B35'
  const theme = COLOR_THEMES.find(c => c.id === myChar.value.colorId)
  return theme ? theme.color : '#FF6B35'
})

onReady(() => {
  const info = uni.getSystemInfoSync()
  statusBarHeight.value = info.statusBarHeight || 44
  myChar.value = getMyCharacter()
})

function goBack () { uni.navigateBack() }
function goCharacter () { uni.navigateTo({ url: '/pages/character/character' }) }

function randomKw () {
  const words = ['森林 魔法 宝藏', '海洋 美人鱼 珍珠', '太空 火箭 外星人', '城堡 骑士 龙', '花园 蝴蝶 仙子', '草原 小马 彩虹']
  keywords.value = words[Math.floor(Math.random() * words.length)]
}

async function handleStart () {
  if (!keywords.value.trim()) {
    uni.showToast({ title: '输入故事关键词', icon: 'none' })
    return
  }
  loading.value = true
  try {
    let charData = null
    if (myChar.value) {
      const animal = ANIMAL_TYPES.find(a => a.id === myChar.value.animalId)
      charData = {
        name: myChar.value.name,
        animal: animal ? animal.emoji + animal.name : '小动物',
        personality: '性格' + (myChar.value.personalityId || '勇敢'),
      }
    }
    const result = await startAdventure(keywords.value.trim(), 5, '温馨有趣', charData)
    storyHistory.value = [{ scene: result.scene, chosenText: '' }]
    currentChoices.value = result.choices
    currentRound.value = result.round
    maxRounds.value = result.maxRounds
    finished.value = result.finished
    started.value = true
  } catch (err) {
    uni.showToast({ title: err.message || '启动失败', icon: 'none' })
  } finally {
    loading.value = false
  }
}

async function makeChoice (index) {
  loading.value = true
  try {
    // 构建角色上下文，保持故事连贯
    let charData = null
    if (myChar.value) {
      const animal = ANIMAL_TYPES.find(a => a.id === myChar.value.animalId)
      charData = {
        name: myChar.value.name,
        animal: animal ? animal.emoji + animal.name : '小动物',
        personality: '性格' + (myChar.value.personalityId || '勇敢'),
      }
    }
    const result = await continueAdventure(storyHistory.value, index, charData)
    // 更新最后一条记录的选择文本
    storyHistory.value[storyHistory.value.length - 1].chosenText = currentChoices.value[index] || ''

    storyHistory.value.push({ scene: result.scene, chosenText: '' })
    currentChoices.value = result.choices || []
    currentRound.value = result.round
    finished.value = result.finished
  } catch (err) {
    uni.showToast({ title: err.message || '继续失败', icon: 'none' })
  } finally {
    loading.value = false
  }
}

function resetAll () {
  started.value = false
  loading.value = false
  finished.value = false
  currentRound.value = 1
  currentChoices.value = []
  storyHistory.value = []
  keywords.value = ''
}

function saveStory () {
  const fullStory = storyHistory.value.map((h, i) => `第${i + 1}幕：${h.scene}`).join('\n\n')
  const saved = uni.getStorageSync('savedStories') || []
  const title = `互动故事 - ${keywords.value}`
  const exists = saved.some(s => s.title === title)
  if (!exists) {
    saved.unshift({
      title,
      story: fullStory,
      keywords: keywords.value,
      time: new Date().toISOString(),
      image: null,
    })
    uni.setStorageSync('savedStories', saved)
    uni.showToast({ title: '已保存 ❤️', icon: 'none' })
  } else {
    uni.showToast({ title: '已存在收藏中', icon: 'none' })
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #f4f0ff 0%, #eae3f8 100%);
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
  color: #7b4fe0;
  font-weight: bold;
  line-height: 1;
}
.nav-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #3d2f5a;
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
  font-size: 22rpx;
}
.link-text {
  font-size: 22rpx;
  color: #7b4fe0;
  font-weight: bold;
  max-width: 120rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 开始界面 */
.start-section {
  padding: 0 30rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}
.section-title {
  margin-bottom: 4rpx;
}
.title-text {
  font-size: 34rpx;
  font-weight: bold;
  color: #3d2f5a;
  display: block;
}
.title-desc {
  font-size: 24rpx;
  color: #8a7a9d;
  margin-top: 8rpx;
}

.char-card {
  display: flex;
  align-items: center;
  gap: 20rpx;
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  border: 2rpx solid #e0d4f0;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}
.char-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}
.char-emoji {
  font-size: 44rpx;
}
.char-info {
  flex: 1;
}
.char-label {
  font-size: 22rpx;
  color: #8a7a9d;
  display: block;
}
.char-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #3d2f5a;
}

.input-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 28rpx 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  border: 2rpx solid #e0d4f0;
}
.input-label {
  font-size: 26rpx;
  font-weight: bold;
  color: #7a6a8d;
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
  background: #f6f2fc;
  border-radius: 16rpx;
  padding: 20rpx 24rpx;
  font-size: 28rpx;
  color: #3d2f5a;
  border: 2rpx solid #ede3fa;
}
.ph {
  color: #b8a9d6;
}
.random-btn {
  width: 84rpx;
  height: 84rpx;
  background: linear-gradient(135deg, #9b6dff, #7b4fe0);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(123, 79, 224, 0.3);
}
.random-icon {
  font-size: 38rpx;
}

.start-btn {
  background: linear-gradient(135deg, #9b6dff, #7b4fe0);
  border-radius: 40rpx;
  padding: 34rpx;
  text-align: center;
  box-shadow: 0 8rpx 24rpx rgba(123, 79, 224, 0.35);
}
.start-btn-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #fff;
}

/* 加载 */
.loading-section {
  padding: 100rpx 30rpx;
  display: flex;
  justify-content: center;
}
.loading-card {
  width: 100%;
  background: #fff;
  border-radius: 30rpx;
  padding: 80rpx 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.06);
  border: 2rpx solid #e0d4f0;
}
.loading-book {
  position: relative;
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 40rpx;
}
.book-emoji {
  font-size: 100rpx;
}
.page-turn {
  position: absolute;
  width: 20rpx;
  height: 30rpx;
  background: #9b6dff;
  border-radius: 4rpx;
  opacity: 0.3;
  animation: pageFlip 1.5s ease-in-out infinite;
}
.p1 {
  left: 30rpx;
  top: 20rpx;
}
.p2 {
  left: 60rpx;
  top: 20rpx;
  animation-delay: 0.3s;
}
@keyframes pageFlip {
  0%,
  100% {
    transform: rotateY(0deg);
    opacity: 0.3;
  }
  50% {
    transform: rotateY(180deg);
    opacity: 0;
  }
}
.loading-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #3d2f5a;
}
.loading-sub {
  font-size: 24rpx;
  color: #8a7a9d;
  margin-top: 12rpx;
}

/* 故事场景 */
.story-scroll {
  padding: 0 30rpx;
  height: calc(100vh - 162rpx);
  box-sizing: border-box;
}
.round-badge {
  display: flex;
  justify-content: center;
  margin: 16rpx 0;
}
.round-text {
  background: linear-gradient(135deg, #9b6dff, #7b4fe0);
  color: #fff;
  font-size: 24rpx;
  font-weight: bold;
  padding: 10rpx 32rpx;
  border-radius: 30rpx;
}
.scene-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
.scene-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 28rpx 24rpx;
  border: 2rpx solid #e0d4f0;
  position: relative;
  animation: fadeIn 0.4s ease-out;
}
.scene-last {
  border-color: #9b6dff;
  box-shadow: 0 4rpx 20rpx rgba(123, 79, 224, 0.1);
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(16rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.scene-number {
  position: absolute;
  top: -14rpx;
  left: 24rpx;
  background: #9b6dff;
  color: #fff;
  font-size: 20rpx;
  font-weight: bold;
  width: 40rpx;
  height: 28rpx;
  line-height: 28rpx;
  text-align: center;
  border-radius: 20rpx;
}
.scene-text {
  font-size: 28rpx;
  color: #3d2f5a;
  line-height: 1.7;
}
.chosen-tag {
  margin-top: 12rpx;
}
.chosen-text {
  font-size: 22rpx;
  color: #7b4fe0;
  font-weight: 600;
}

/* 选择 */
.choices-section {
  margin: 24rpx 0;
}
.choices-label {
  font-size: 26rpx;
  font-weight: bold;
  color: #7a6a8d;
  display: block;
  margin-bottom: 16rpx;
}
.choice-btn {
  display: flex;
  align-items: center;
  gap: 16rpx;
  background: #fff;
  border: 2rpx solid #d0c0e8;
  border-radius: 20rpx;
  padding: 24rpx 20rpx;
  margin-bottom: 12rpx;
  transition: all 0.2s;
}
.choice-btn:active {
  transform: scale(0.98);
  background: #f6f2fc;
}
.choice-index {
  width: 44rpx;
  height: 44rpx;
  line-height: 44rpx;
  text-align: center;
  background: #9b6dff;
  color: #fff;
  font-weight: bold;
  font-size: 22rpx;
  border-radius: 50%;
  flex-shrink: 0;
}
.choice-text {
  flex: 1;
  font-size: 28rpx;
  color: #3d2f5a;
}
.choice-arrow {
  font-size: 28rpx;
  color: #7b4fe0;
}

/* 结局 */
.ending-section {
  margin: 24rpx 0;
}
.ending-card {
  background: linear-gradient(135deg, #f8f4ff, #f0e8ff);
  border: 2rpx solid #d0c0e8;
  border-radius: 28rpx;
  padding: 40rpx;
  text-align: center;
}
.ending-emoji {
  font-size: 80rpx;
  display: block;
  margin-bottom: 16rpx;
}
.ending-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #3d2f5a;
  display: block;
}
.ending-text {
  font-size: 24rpx;
  color: #8a7a9d;
  margin-top: 8rpx;
  display: block;
}
.ending-actions {
  display: flex;
  gap: 16rpx;
  margin-top: 20rpx;
}
.end-action {
  flex: 1;
  padding: 26rpx;
  text-align: center;
  border-radius: 40rpx;
  transition: all 0.2s;
}
.end-retry {
  background: #fff;
  border: 2rpx solid #9b6dff;
}
.end-save {
  background: linear-gradient(135deg, #9b6dff, #7b4fe0);
  box-shadow: 0 4rpx 16rpx rgba(123, 79, 224, 0.3);
}
.end-text {
  font-size: 26rpx;
  font-weight: bold;
}
.end-retry .end-text {
  color: #7b4fe0;
}
.end-save .end-text {
  color: #fff;
}
</style>