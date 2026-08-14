/**
 * AI 提示词与配置
 *
 * 集中管理所有 AI 相关的提示词、风格选项、年龄配置等
 */

// 故事风格选项
export const STORY_STYLES = [
  { id: 'warm', name: '温馨有趣', emoji: '🌟' },
  { id: 'adventure', name: '冒险探险', emoji: '🗺️' },
  { id: 'science', name: '科普知识', emoji: '🔬' },
  { id: 'fairy', name: '童话故事', emoji: '🧚' },
  { id: 'humor', name: '幽默搞笑', emoji: '😄' },
  { id: 'moral', name: '品德教育', emoji: '💝' },
]

// 年龄分组
export const AGE_GROUPS = [
  { id: 2, name: '2-3岁', desc: '简单重复，适合幼儿' },
  { id: 4, name: '4-5岁', desc: '有趣生动，适合学龄前' },
  { id: 6, name: '6-7岁', desc: '情节丰富，适合小学低年级' },
  { id: 8, name: '8-10岁', desc: '稍有深度，适合小学中高年级' },
]

// 推荐关键词（按主题分类）
export const KEYWORD_CATEGORIES = [
  {
    name: '动物世界',
    emoji: '🐾',
    keywords: [
      '小兔子',
      '小猫咪',
      '小狗狗',
      '小熊猫',
      '小猴子',
      '小松鼠',
      '小乌龟',
      '小鸭子',
    ],
  },
  {
    name: '自然风景',
    emoji: '🌈',
    keywords: ['月亮', '星星', '彩虹', '大海', '森林', '花朵', '云朵', '雪花'],
  },
  {
    name: '食物美食',
    emoji: '🍰',
    keywords: [
      '蛋糕',
      '冰淇淋',
      '糖果',
      '苹果',
      '西瓜',
      '饼干',
      '果汁',
      '巧克力',
    ],
  },
  {
    name: '交通工具',
    emoji: '🚀',
    keywords: [
      '火箭',
      '飞机',
      '火车',
      '小汽车',
      '轮船',
      '热气球',
      '自行车',
      '飞船',
    ],
  },
  {
    name: '职业角色',
    emoji: '👨‍🚀',
    keywords: [
      '宇航员',
      '医生',
      '消防员',
      '警察',
      '老师',
      '厨师',
      '画家',
      '科学家',
    ],
  },
  {
    name: '魔法奇幻',
    emoji: '✨',
    keywords: [
      '魔法棒',
      '龙',
      '城堡',
      '精灵',
      '宝藏',
      '魔法书',
      '水晶',
      '仙女',
    ],
  },
]

// 随机推荐关键词组合
export function getRandomKeywords() {
  const categories = KEYWORD_CATEGORIES
  const numCategories = 2 + Math.floor(Math.random() * 2) // 随机选 2-3 个分类
  const selected = []

  for (let i = 0; i < numCategories; i++) {
    const cat = categories[Math.floor(Math.random() * categories.length)]
    const kw = cat.keywords[Math.floor(Math.random() * cat.keywords.length)]
    selected.push(kw)
  }

  return selected.join(' ')
}
