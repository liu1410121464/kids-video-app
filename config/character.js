/**
 * 角色系统配置
 *
 * 孩子可以创建专属角色，该角色会出现在所有故事中
 * 数据存储在 uni.getStorageSync('myCharacter')
 */

// 动物类型
export const ANIMAL_TYPES = [
  { id: 'rabbit', name: '小兔子', emoji: '🐰' },
  { id: 'cat', name: '小猫咪', emoji: '🐱' },
  { id: 'dog', name: '小狗狗', emoji: '🐶' },
  { id: 'panda', name: '小熊猫', emoji: '🐼' },
  { id: 'lion', name: '小狮子', emoji: '🦁' },
  { id: 'elephant', name: '小象', emoji: '🐘' },
  { id: 'fox', name: '小狐狸', emoji: '🦊' },
  { id: 'bear', name: '小熊', emoji: '🐻' },
  { id: 'monkey', name: '小猴子', emoji: '🐵' },
  { id: 'owl', name: '猫头鹰', emoji: '🦉' },
  { id: 'dragon', name: '小龙', emoji: '🐲' },
  { id: 'turtle', name: '小乌龟', emoji: '🐢' },
]

// 性格特征
export const PERSONALITIES = [
  { id: 'brave', name: '勇敢', emoji: '🦸', desc: '什么都不怕，喜欢冒险' },
  { id: 'kind', name: '善良', emoji: '💝', desc: '乐于助人，喜欢分享' },
  { id: 'curious', name: '好奇', emoji: '🔍', desc: '喜欢问为什么，爱探索' },
  { id: 'cheerful', name: '开朗', emoji: '😄', desc: '总是开开心心的' },
  { id: 'clever', name: '聪明', emoji: '🧠', desc: '鬼点子多，爱动脑筋' },
  { id: 'gentle', name: '温柔', emoji: '🌸', desc: '说话轻轻的，很温柔' },
]

// 颜色主题
export const COLOR_THEMES = [
  { id: 'orange', name: '橙色', color: '#FF6B35', bg: '#FFF0E6' },
  { id: 'blue', name: '蓝色', color: '#5B9DFF', bg: '#E8F2FF' },
  { id: 'pink', name: '粉色', color: '#FF6B9D', bg: '#FFE8F0' },
  { id: 'green', name: '绿色', color: '#4CAF92', bg: '#E8F8F0' },
  { id: 'purple', name: '紫色', color: '#9B6DFF', bg: '#F0E8FF' },
  { id: 'yellow', name: '黄色', color: '#FFD166', bg: '#FFF8E0' },
]

// 默认角色
export function getDefaultCharacter () {
  return {
    name: '',
    animalId: 'rabbit',
    personalityId: 'brave',
    colorId: 'orange',
    createdAt: null,
  }
}

// 获取当前角色（从本地存储）
export function getMyCharacter () {
  try {
    const data = uni.getStorageSync('myCharacter')
    if (data && data.name) return data
  } catch (e) { /* ignore */ }
  return null
}

// 保存角色
export function saveCharacter (character) {
  if (!character.createdAt) {
    character.createdAt = new Date().toISOString()
  }
  uni.setStorageSync('myCharacter', character)
}

// 获取角色的一句话描述（用于 AI 提示词）
export function getCharacterDescription (character) {
  if (!character || !character.name) return null
  const animal = ANIMAL_TYPES.find(a => a.id === character.animalId)
  const personality = PERSONALITIES.find(p => p.id === character.personalityId)
  return `${animal ? animal.emoji + animal.name : '小动物'}《${character.name}》${personality ? '性格' + personality.name : ''}`
}