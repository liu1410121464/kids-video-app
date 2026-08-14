<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-content">
        <view class="nav-back" @click="goBack">
          <text class="back-icon">←</text>
        </view>
        <text class="nav-title">{{ isEdit ? '我的角色' : '创建角色' }}</text>
        <view class="nav-placeholder"></view>
      </view>
    </view>

    <!-- 角色展示 -->
    <view class="showcase" :style="{ background: currentThemeBg }">
      <view class="showcase-card">
        <view
          class="showcase-avatar"
          :style="{ background: currentThemeColor }"
        >
          <text class="showcase-emoji">{{ currentAnimalEmoji }}</text>
        </view>
        <text class="showcase-name" v-if="charData.name">{{
          charData.name
        }}</text>
        <text class="showcase-name placeholder" v-else>请输入名字</text>
        <text class="showcase-type"
          >{{ currentAnimalName }} · {{ currentPersonalityName }}</text
        >
      </view>
    </view>

    <scroll-view scroll-y class="form-scroll">
      <!-- 名字 -->
      <view class="form-section">
        <text class="section-label">给它起个名字</text>
        <view class="input-wrap">
          <input
            class="name-input"
            v-model="charData.name"
            placeholder="输入名字，比如：团团、小橘子..."
            placeholder-class="ph"
            maxlength="10"
          />
        </view>
      </view>

      <!-- 动物选择 -->
      <view class="form-section">
        <text class="section-label">它是哪种动物？</text>
        <view class="animal-grid">
          <view
            v-for="a in animalTypes"
            :key="a.id"
            class="animal-item"
            :class="{ active: charData.animalId === a.id }"
            @click="charData.animalId = a.id"
          >
            <text class="animal-emoji">{{ a.emoji }}</text>
            <text class="animal-name">{{ a.name }}</text>
          </view>
        </view>
      </view>

      <!-- 性格选择 -->
      <view class="form-section">
        <text class="section-label">它的性格是？</text>
        <view class="personality-list">
          <view
            v-for="p in personalities"
            :key="p.id"
            class="personality-item"
            :class="{ active: charData.personalityId === p.id }"
            @click="charData.personalityId = p.id"
          >
            <text class="p-emoji">{{ p.emoji }}</text>
            <view class="p-info">
              <text class="p-name">{{ p.name }}</text>
              <text class="p-desc">{{ p.desc }}</text>
            </view>
            <view
              class="p-check"
              :class="{ checked: charData.personalityId === p.id }"
            >
              <text class="check-icon">✓</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 颜色主题 -->
      <view class="form-section">
        <text class="section-label">选择主题色</text>
        <view class="color-row">
          <view
            v-for="c in colorThemes"
            :key="c.id"
            class="color-dot"
            :style="{ background: c.color }"
            :class="{ active: charData.colorId === c.id }"
            @click="charData.colorId = c.id"
          ></view>
        </view>
      </view>

      <!-- 保存按钮 -->
      <view class="save-btn" @click="handleSave">
        <text class="save-text">✅ 保存角色</text>
      </view>

      <!-- 删除 -->
      <view class="delete-btn" v-if="isEdit" @click="handleDelete">
        <text class="delete-text">删除角色</text>
      </view>

      <view style="height: 60rpx"></view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onReady } from '@dcloudio/uni-app'
import {
  ANIMAL_TYPES, PERSONALITIES, COLOR_THEMES,
  getDefaultCharacter, getMyCharacter, saveCharacter,
} from '@/config/character.js'

const statusBarHeight = ref(44)
const isEdit = ref(false)
const buttonText = ref('')
const charData = ref(getDefaultCharacter())

const animalTypes = ANIMAL_TYPES
const personalities = PERSONALITIES
const colorThemes = COLOR_THEMES

const currentAnimal = computed(() => animalTypes.find(a => a.id === charData.value.animalId) || animalTypes[0])
const currentAnimalEmoji = computed(() => currentAnimal.value.emoji)
const currentAnimalName = computed(() => currentAnimal.value.name)
const currentPersonalityName = computed(() => {
  const p = personalities.find(p => p.id === charData.value.personalityId)
  return p ? p.name : '勇敢'
})
const currentTheme = computed(() => colorThemes.find(c => c.id === charData.value.colorId) || colorThemes[0])
const currentThemeColor = computed(() => currentTheme.value.color)
const currentThemeBg = computed(() => currentTheme.value.bg)

onReady(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 44
  const existing = getMyCharacter()
  if (existing) {
    isEdit.value = true
    charData.value = { ...existing }
  }
})

function goBack () {
  uni.navigateBack()
}

function handleSave () {
  if (!charData.value.name.trim()) {
    uni.showToast({ title: '请给角色起个名字', icon: 'none' })
    return
  }
  saveCharacter({ ...charData.value })
  uni.showToast({ title: '角色已保存 🎉', icon: 'none' })
  setTimeout(() => uni.navigateBack(), 1000)
}

function handleDelete () {
  uni.showModal({
    title: '删除角色',
    content: '确定要删除吗？删除后你的角色故事也会消失哦',
    success: (res) => {
      if (res.confirm) {
        uni.removeStorageSync('myCharacter')
        uni.showToast({ title: '已删除', icon: 'success' })
        setTimeout(() => uni.navigateBack(), 1000)
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #fdf6ec;
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

/* 展示区 */
.showcase {
  padding: 40rpx 30rpx;
  display: flex;
  justify-content: center;
  transition: background 0.3s;
}
.showcase-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
}
.showcase-avatar {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
  transition: background 0.3s;
}
.showcase-emoji {
  font-size: 80rpx;
}
.showcase-name {
  font-size: 36rpx;
  font-weight: bold;
  color: #4a3b32;
}
.showcase-name.placeholder {
  color: #c0b2a4;
}
.showcase-type {
  font-size: 24rpx;
  color: #8a7a6d;
}

/* 表单 */
.form-scroll {
  padding: 0 30rpx;
  box-sizing: border-box;
}
.form-section {
  margin-bottom: 32rpx;
}
.section-label {
  font-size: 26rpx;
  font-weight: bold;
  color: #7a6a5d;
  display: block;
  margin-bottom: 16rpx;
}
.input-wrap {
  background: #fff;
  border-radius: 20rpx;
  padding: 20rpx 24rpx;
  border: 2rpx solid #f0dfce;
}
.name-input {
  font-size: 30rpx;
  color: #4a3b32;
  height: 50rpx;
}
.ph {
  color: #c0b2a4;
}

/* 动物 */
.animal-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16rpx;
}
.animal-item {
  background: #fff;
  border: 2rpx solid #f0dfce;
  border-radius: 20rpx;
  padding: 16rpx 8rpx;
  text-align: center;
  transition: all 0.2s;
}
.animal-item.active {
  border-color: #ff6b35;
  background: #fff0e6;
  box-shadow: 0 4rpx 12rpx rgba(255, 107, 53, 0.2);
}
.animal-emoji {
  font-size: 44rpx;
  display: block;
  margin-bottom: 4rpx;
}
.animal-name {
  font-size: 20rpx;
  color: #4a3b32;
}

/* 性格 */
.personality-list {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}
.personality-item {
  display: flex;
  align-items: center;
  gap: 16rpx;
  background: #fff;
  border: 2rpx solid #f0dfce;
  border-radius: 20rpx;
  padding: 20rpx;
  transition: all 0.2s;
}
.personality-item.active {
  border-color: #ff6b35;
  background: #fff8f0;
}
.p-emoji {
  font-size: 40rpx;
}
.p-info {
  flex: 1;
}
.p-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #4a3b32;
  display: block;
}
.p-desc {
  font-size: 22rpx;
  color: #8a7a6d;
}
.p-check {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  border: 2rpx solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}
.p-check.checked {
  background: #ff6b35;
  border-color: #ff6b35;
}
.check-icon {
  font-size: 24rpx;
  color: #fff;
  font-weight: bold;
}

/* 颜色 */
.color-row {
  display: flex;
  gap: 24rpx;
}
.color-dot {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  border: 4rpx solid transparent;
  transition: all 0.2s;
}
.color-dot.active {
  border-color: #4a3b32;
  box-shadow: 0 0 0 6rpx rgba(74, 59, 50, 0.1);
  transform: scale(1.15);
}

/* 按钮 */
.save-btn {
  background: linear-gradient(135deg, #ff9e5e, #ff6b35);
  border-radius: 40rpx;
  padding: 30rpx;
  text-align: center;
  box-shadow: 0 8rpx 24rpx rgba(255, 107, 53, 0.35);
}
.save-text {
  font-size: 30rpx;
  font-weight: bold;
  color: #fff;
}

.delete-btn {
  margin-top: 20rpx;
  padding: 20rpx;
  text-align: center;
}
.delete-text {
  font-size: 24rpx;
  color: #cc9999;
}
</style>