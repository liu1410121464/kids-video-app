const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const API_KEY = process.env.SENSENOVA_API_KEY || ''
const API_BASE =
  process.env.SENSENOVA_API_BASE || 'https://token.sensenova.cn/v1'
const TEXT_MODEL =
  process.env.SENSENOVA_TEXT_MODEL || 'sensenova-6.8-flash-lite'

const FALLBACK_STORIES = [
  {
    title: '月亮上的小兔子',
    story:
      '小兔子米米每晚都喜欢看月亮。它问妈妈：“月亮上会有什么呢？”妈妈笑着说：“去看看就知道。”\n\n米米沿着小路走到草地上，忽然看见一座小小的月亮梯子。它轻轻一跳，沿着梯子爬上了月亮。月亮上住着一只温柔的玉兔，玉兔说：“欢迎你来做客。”\n\n两只小动物一起吃月饼、看星星，米米还跟玉兔一起在月亮上种了一颗小草。回到地球后，米米发现草地上多了一片亮亮的月光。\n\n从那以后，米米每晚都会抬头看月亮，心里总觉得自己也变得勇敢又开心。',
  },
  {
    title: '彩虹桥的秘密',
    story:
      '雨停了，天边出现了一座彩虹桥。小姑娘朵朵瞪大眼睛，想知道桥的另一头是什么。她轻轻走上桥，桥边的风轻轻吹过，像在说：“快来，快来。”\n\n朵朵走到桥的尽头，看见一座白云做的城堡。城堡里有一只可爱的小精灵，它递给朵朵一个七彩铃铛。\n\n精灵说：“只要你勇敢面对困难，这个铃铛就会发出美妙的声音。”朵朵把铃铛挂在窗边，每次遇到烦恼，她都会轻轻摇一摇。\n\n后来，朵朵发现，原来最美的桥，不是去远方，而是把勇气和希望带回家。',
  },
  {
    title: '小刺猬找朋友',
    story:
      '小刺猬果果总觉得自己不受欢迎，因为身上的刺让小动物都远远地躲开。它低着头走在森林里，心里很难过。\n\n这一天，果果看见一只小松鼠在地上找坚果。它用尖尖的刺轻轻把松果拨到一边，帮助小松鼠捡回了许多食物。\n\n小松鼠开心地说：“谢谢你，果果，你真聪明！”\n\n后来，其他小动物也愿意和果果一起玩。果果明白了：原来自己也有用处。善良和帮助，才能让朋友越来越多。',
  },
]

async function generateText(messages) {
  const res = await axios.post(
    `${API_BASE}/chat/completions`,
    {
      model: TEXT_MODEL,
      messages,
      temperature: 0.7,
      top_p: 0.9,
      max_tokens: 500,
      reasoning_effort: 'none',
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      timeout: 9000,
    },
  )

  return res.data
}

function pickFallbackStory(keywords) {
  const clean = String(keywords || '').trim()
  if (!clean) return FALLBACK_STORIES[0]

  const lower = clean.toLowerCase()
  const matched = FALLBACK_STORIES.find(
    (story) =>
      lower.includes(
        story.title.toLowerCase().replace(/[^\u4e00-\u9fa5a-z]/g, ''),
      ) ||
      lower.includes('月亮') ||
      lower.includes('彩虹') ||
      lower.includes('刺猬'),
  )

  return (
    matched ||
    FALLBACK_STORIES[Math.floor(Math.random() * FALLBACK_STORIES.length)]
  )
}

exports.main = async (event) => {
  try {
    const { keywords, age = 5, style = '温馨有趣' } = event

    if (!keywords || !String(keywords).trim()) {
      return { code: -1, message: '请提供故事关键词' }
    }

    if (!API_KEY) {
      return { code: -1, message: '云函数环境变量 SENSENOVA_API_KEY 未配置' }
    }

    const ageHint =
      age <= 3
        ? '非常简单，3-5句，适合幼儿'
        : age <= 6
          ? '简单有趣，适合学龄前儿童'
          : '适当有情节，适合小学低年级'

    const storyMessages = [
      {
        role: 'system',
        content: `你是一个专业的儿童故事作家。请为${age}岁的孩子写一个${style}的故事。
要求：
1. 故事要${ageHint}
2. 字数控制在 180-260 字之间
3. 结构简单：开头、发展、结尾
4. 语言生动有趣，表达清晰
5. 结尾温暖积极
6. 直接输出标题和正文，只输出两部分，不要额外说明
7. 第一行用【】写标题，例如【月亮上的小兔子】，第二行开始正文`,
      },
      {
        role: 'user',
        content: `请用以下关键词创作一个儿童故事：${keywords}`,
      },
    ]

    let storyTitle = '今天的故事'
    let storyText = ''

    try {
      const storyRes = await generateText(storyMessages)
      storyText = storyRes?.choices?.[0]?.message?.content || ''

      if (!storyText) {
        throw new Error('空响应')
      }

      const titleMatch = storyText.match(/【([^】]+)】/)
      if (titleMatch && titleMatch[1]) {
        storyTitle = titleMatch[1]
        storyText = storyText.replace(/^.{0,5}【[^】]+】\s*\n?/, '')
      }

      storyText = storyText
        .replace(
          /【世界观设定】【角色设定】【故事梗概】【教育寓意】[\s\S]*?(?=\n\n|\n正文|$)/,
          '\n',
        )
        .split('\n')
        .filter(
          (line) =>
            !/^【(世界观设定|角色设定|故事梗概|教育寓意|正文)】/.test(
              line.trim(),
            ),
        )
        .join('\n')
        .trim()
    } catch (error) {
      const fallback = pickFallbackStory(keywords)
      storyTitle = fallback.title
      storyText = fallback.story
      console.warn('story ai timeout, use fallback:', error.message)
    }

    return {
      code: 0,
      data: {
        title: storyTitle,
        story: storyText,
        image: null,
        keywords: String(keywords),
        age,
      },
    }
  } catch (error) {
    const fallback = pickFallbackStory(keywords)
    console.error('story cloud function error:', error)
    return {
      code: 0,
      data: {
        title: fallback.title,
        story: fallback.story,
        image: null,
        keywords: String(keywords || ''),
        age: Number(event.age || 5),
      },
    }
  }
}
