<template>
  <view class="container">
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-content">
        <view class="nav-back" @click="goBack"><text class="back-icon">←</text></view>
        <text class="nav-title">故事接龙</text>
        <view class="nav-link" @click="goCharacter">
          <text class="link-icon">⭐</text>
          <text class="link-text">{{ myChar ? myChar.name : '创建角色' }}</text>
        </view>
      </view>
    </view>

    <!-- 开始界面 -->
    <view class="start-section" v-if="!started && !loading">
      <view class="section-title">
        <text class="title-text">🎭 互动故事接龙</text>
        <text class="title-desc">你来选择故事的走向，每次选择都会开启不同的冒险！</text>
      </view>

      <view class="char-card" @click="goCharacter">
        <view class="char-avatar" :style="{ background: charColor }">
          <text class="char-emoji">{{ charEmoji }}</text>
        </view>
        <view class="char-info">
          <text class="char-label">我的角色</text>
          <text class="char-name">{{ myChar ? myChar.name : '未创建' }}</text>
        </view>
        <text class="char-arrow">→</text>
      </view>

      <view class="input-card">
        <text class="input-label">故事关键词</text>
        <input class="keyword-input" v-model="keywords" placeholder="例如：森林 宝藏 魔法"
          placeholder-class="input-ph" />
        <text class="input-hint">输入 2-3 个关键词，开启冒险</text>
      </view>

      <view class="start-btn" @click="startAdventure">
        <text class="start-text">🎬 开始冒险</text>
      </view>
    </view>

    <!-- 加载 -->
    <view class="loading-section" v-if="loading">
      <view class="loading-card">
        <text class="loading-emoji">📖</text>
        <text class="loading-text">故事正在展开...</text>
        <text class="loading-sub">你的选择会改变故事的走向</text>
      </view>
    </view>

    <!-- 故事进行中 -->
    <scroll-view scroll-y class="story-scroll" v-if="started && !loading" :scroll-into-view="'bottom'">
      <view class="round-badge"><text class="round-text">第 {{ currentRound }} / {{ maxRounds }} 幕</text></view>

      <view class="scene-list">
        <view v-for="(item, i) in storyHistory" :key="i" class="scene-card" :class="{ 'scene-last': i === storyHistory.length - 1 }">
          <view class="scene-number">{{ i + 1 }}</view>
          <text class="scene-text">{{ item.scene }}</text>
          <view v-if="i < storyHistory.length - 1" class="chosen-tag">
            <text class="chosen-text">→ {{ item.chosenText }}</text>
          </view>
        </view>
      </view>

      <!-- 选择分支 -->
      <view v-if="!finished && currentChoices.length > 0" class="choices-section">
        <text class="choices-label">接下来怎么办？</text>
        <view v-for="(choice, i) in currentChoices" :key="i" class="choice-btn" @click="makeChoice(i)">
          <text class="choice-icon">{{ ['A', 'B', 'C'][i] }}</text>
          <text class="choice-text">{{ choice }}</text>
        </view>
      </view>

      <!-- 结局 -->
      <view v-if="finished" class="ending-section">
        <text class="ending-emoji">🏆</text>
        <text class="ending-title">故事结束</text>
        <text class="ending-sub">你已经完成了这段冒险！</text>
        <view class="ending-actions">
          <view class="action-btn action-save" @click="saveStory"><text>💾 保存故事</text></view>
          <view class="action-btn action-retry" @click="resetAll"><text>🔄 重新开始</text></view>
        </view>
      </view>
      <view id="bottom" style="height:40rpx"></view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onReady } from '@dcloudio/uni-app'
import { startAdventure, continueAdventure } from '@/utils/aiService.js'

const statusBarHeight = ref(44)
const keywords = ref('')
const started = ref(false)
const loading = ref(false)
const finished = ref(false)
const currentRound = ref(1)
const maxRounds = ref(5)
const currentChoices = ref([])
const storyHistory = ref([])

const myChar = ref(null)
const charEmoji = computed(() => {
  const animals = { cat: '🐱', dog: '🐶', rabbit: '🐰', bear: '🐻', fox: '🦊', panda: '🐼', lion: '🦁', owl: '🦉' }
  return myChar.value ? animals[myChar.value.animalId] || '🐱' : '⭐'
})
const charColor = computed(() => {
  const colors = { cat: '#FF9E5E', dog: '#5B9DFF', rabbit: '#FFD166', bear: '#4CAF92', fox: '#FF6B35', panda: '#333', lion: '#FFB84D', owl: '#9B6DFF' }
  return myChar.value ? colors[myChar.value.animalId] || '#FF9E5E' : '#E0E0E0'
})

onReady(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 44
  const saved = uni.getStorageSync('myCharacter')
  if (saved) myChar.value = saved
})

function goBack() { uni.navigateBack() }
function goCharacter() { uni.navigateTo({ url: '/pages/character/character' }) }

async function startAdventureFn() {
  if (!keywords.value.trim()) { uni.showToast({ title: '请输入故事关键词', icon: 'none' }); return }
  loading.value = true
  try {
    let charData = null
    if (myChar.value) {
      const animals = { cat: '小猫', dog: '小狗', rabbit: '小兔', bear: '小熊', fox: '小狐狸', panda: '熊猫', lion: '小狮子', owl: '猫头鹰' }
      const traits = { brave: '勇敢', kind: '善良', smart: '聪明', curious: '好奇', funny: '幽默', gentle: '温柔' }
      charData = {
        name: myChar.value.name,
        animal: animals[myChar.value.animalId] || '小动物',
        personality: traits[myChar.value.traitId] || '勇敢',
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
  } finally { loading.value = false }
}

async function makeChoice(index) {
  loading.value = true
  try {
    const result = await continueAdventure(storyHistory.value, index)
    storyHistory.value[storyHistory.value.length - 1].chosenText = currentChoices.value[index] || ''
    storyHistory.value.push({ scene: result.scene, chosenText: '' })
    currentChoices.value = result.choices || []
    currentRound.value = result.round
    finished.value = result.finished
  } catch (err) {
    uni.showToast({ title: err.message || '继续失败', icon: 'none' })
  } finally { loading.value = false }
}

function resetAll() {
  started.value = false; loading.value = false; finished.value = false
  currentRound.value = 1; currentChoices.value = []; storyHistory.value = []; keywords.value = ''
}

function saveStory() {
  const fullStory = storyHistory.value.map((h, i) => `第${i+1}幕：${h.scene}`).join('\n\n')
  const saved = uni.getStorageSync('savedStories') || []
  const title = `互动故事 - ${keywords.value}`
  if (!saved.some(s => s.title === title)) {
    saved.unshift({ title, story: fullStory, keywords: keywords.value, time: new Date().toISOString(), image: null })
    uni.setStorageSync('savedStories', saved)
    uni.showToast({ title: '已保存 ❤️', icon: 'none' })
  } else { uni.showToast({ title: '已存在收藏中', icon: 'none' }) }
}
</script>

<style lang="scss" scoped>
.container { min-height: 100vh; background: linear-gradient(180deg, #f4f0ff, #eae3f8); padding-bottom: 60rpx; }
.nav-bar { background: transparent; }
.nav-content { display: flex; align-items: center; justify-content: space-between; padding: 0 30rpx 20rpx; height: 88rpx; }
.nav-back { width: 64rpx; height: 64rpx; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.8); border-radius: 50%; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.06); }
.back-icon { font-size: 34rpx; color: #7B4FE0; font-weight: bold; }
.nav-title { font-size: 34rpx; font-weight: bold; color: #3D2F5A; }
.nav-link { display: flex; align-items: center; gap: 6rpx; padding: 10rpx 20rpx; background: rgba(255,255,255,0.8); border-radius: 30rpx; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.06); }
.link-icon { font-size: 24rpx; }
.link-text { font-size: 24rpx; color: #7B4FE0; font-weight: bold; }

.start-section { padding: 0 30rpx; display: flex; flex-direction: column; gap: 24rpx; }
.section-title { margin-bottom: 4rpx; }
.title-text { font-size: 32rpx; font-weight: bold; color: #3D2F5A; }
.title-desc { font-size: 24rpx; color: #8A7A6D; margin-top: 8rpx; line-height: 1.5; }

.char-card { display: flex; align-items: center; gap: 16rpx; background: #fff; border-radius: 20rpx; padding: 20rpx; box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05); }
.char-avatar { width: 80rpx; height: 80rpx; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.char-emoji { font-size: 40rpx; }
.char-info { flex: 1; }
.char-label { font-size: 20rpx; color: #B0A294; }
.char-name { font-size: 28rpx; font-weight: bold; color: #3D2F5A; }
.char-arrow { font-size: 32rpx; color: #B0A294; }

.input-card { background: #fff; border-radius: 20rpx; padding: 28rpx; box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05); }
.input-label { font-size: 24rpx; font-weight: bold; color: #7A6A5D; display: block; margin-bottom: 12rpx; }
.keyword-input { background: #F8F4FF; border-radius: 12rpx; padding: 20rpx 24rpx; font-size: 28rpx; color: #3D2F5A; border: 2rpx solid #EDE3FA; }
.input-ph { color: #C4B5A5; }
.input-hint { font-size: 22rpx; color: #B0A294; margin-top: 12rpx; display: block; }

.start-btn { background: linear-gradient(135deg, #9B6DFF, #7B4FE0); border-radius: 40rpx; padding: 32rpx; text-align: center; box-shadow: 0 8rpx 24rpx rgba(123,79,224,0.35); margin-top: 12rpx; }
.start-text { font-size: 32rpx; font-weight: bold; color: #fff; }

.loading-section { padding: 120rpx 30rpx; display: flex; justify-content: center; }
.loading-card { background: #fff; border-radius: 30rpx; padding: 80rpx 40rpx; display: flex; flex-direction: column; align-items: center; box-shadow: 0 8rpx 30rpx rgba(0,0,0,0.06); }
.loading-emoji { font-size: 80rpx; animation: bounce 1.2s infinite; }
@keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-20rpx); } }
.loading-text { font-size: 32rpx; font-weight: bold; color: #3D2F5A; margin-top: 24rpx; }
.loading-sub { font-size: 24rpx; color: #B0A294; margin-top: 12rpx; }

.story-scroll { height: calc(100vh - 140rpx); padding: 0 30rpx; }
.round-badge { background: linear-gradient(135deg, #9B6DFF, #7B4FE0); border-radius: 30rpx; padding: 10rpx 24rpx; display: inline-block; margin-bottom: 20rpx; }
.round-text { font-size: 24rpx; color: #fff; font-weight: bold; }

.scene-list { display: flex; flex-direction: column; gap: 20rpx; }
.scene-card { background: #fff; border-radius: 20rpx; padding: 28rpx; box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05); position: relative; border-left: 6rpx solid #9B6DFF; }
.scene-number { position: absolute; top: -12rpx; right: 20rpx; width: 40rpx; height: 40rpx; background: linear-gradient(135deg, #9B6DFF, #7B4FE0); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.scene-number::after { content: attr(data-num); font-size: 22rpx; color: #fff; font-weight: bold; }
.scene-text { font-size: 28rpx; color: #3D2F5A; line-height: 1.8; white-space: pre-wrap; }
.chosen-tag { margin-top: 12rpx; padding: 8rpx 16rpx; background: #FFF4EA; border-radius: 10rpx; display: inline-block; }
.chosen-text { font-size: 22rpx; color: #FF6B35; font-weight: 600; }

.choices-section { margin-top: 20rpx; }
.choices-label { font-size: 28rpx; font-weight: bold; color: #3D2F5A; margin-bottom: 16rpx; }
.choice-btn { display: flex; align-items: center; gap: 16rpx; background: #fff; border: 2rpx solid #D8C8F0; border-radius: 20rpx; padding: 24rpx; margin-bottom: 12rpx; transition: all 0.2s; }
.choice-btn:active { transform: scale(0.97); border-color: #7B4FE0; }
.choice-icon { width: 50rpx; height: 50rpx; border-radius: 50%; background: linear-gradient(135deg, #9B6DFF, #7B4FE0); display: flex; align-items: center; justify-content: center; font-size: 26rpx; color: #fff; font-weight: bold; flex-shrink: 0; }
.choice-text { font-size: 28rpx; color: #3D2F5A; flex: 1; }

.ending-section { text-align: center; padding: 40rpx 0; }
.ending-emoji { font-size: 80rpx; }
.ending-title { font-size: 36rpx; font-weight: bold; color: #3D2F5A; margin-top: 16rpx; }
.ending-sub { font-size: 24rpx; color: #8A7A6D; margin-top: 8rpx; }
.ending-actions { display: flex; gap: 16rpx; margin-top: 24rpx; }
.action-btn { flex: 1; padding: 24rpx; border-radius: 40rpx; text-align: center; font-size: 26rpx; font-weight: bold; }
.action-save { background: linear-gradient(135deg, #9B6DFF, #7B4FE0); color: #fff; }
.action-retry { background: #fff; border: 2rpx solid #7B4FE0; color: #7B4FE0; }
</style>