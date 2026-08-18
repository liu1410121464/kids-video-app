const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const API_KEY = process.env.SENSENOVA_API_KEY || ''
const API_BASE =
  process.env.SENSENOVA_API_BASE || 'https://token.sensenova.cn/v1'
const TEXT_MODEL =
  process.env.SENSENOVA_TEXT_MODEL || 'sensenova-6.8-flash-lite'

const FALLBACK_QA = {
  default:
    '天空之所以看起来是蓝色的，是因为太阳光穿过空气时，蓝光被散射得更多，所以我们看起来更蓝。你也可以想象成：光线像很多小小彩球，在空气里跳来跳去，蓝色的球跳得更厉害。',
  天空: '天空之所以看起来是蓝色的，是因为太阳光里有很多颜色，蓝光在空气里更容易散开，所以它更容易到达我们的眼睛。',
  星星: '星星不是真的会眨眼，它是因为大气在不停地晃动，光线在穿过空气时会变动，看起来像在眨眼。',
  恐龙: '恐龙大约在6500万年前灭绝了，科学家认为是一颗大石头撞到了地球，造成了很多变化，很多恐龙没能生存下来。',
  猫: '小猫发出“喵喵”声，通常是在表达想要吃东西、想玩或者感到舒服。它也会用声音和人类沟通。',
}

async function generateText(messages) {
  const res = await axios.post(
    `${API_BASE}/chat/completions`,
    {
      model: TEXT_MODEL,
      messages,
      temperature: 0.8,
      top_p: 0.95,
      max_tokens: 300,
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

function pickFallbackReply(message) {
  const text = String(message || '').trim()
  if (!text) return FALLBACK_QA.default
  const lower = text.toLowerCase()
  for (const key of Object.keys(FALLBACK_QA)) {
    if (key !== 'default' && lower.includes(key.toLowerCase())) {
      return FALLBACK_QA[key]
    }
  }
  return FALLBACK_QA.default
}

exports.main = async (event) => {
  try {
    const message = String(event.message || '').trim()
    const age = Number(event.age || 6)

    if (!message) {
      return { code: -1, message: '请提出你的问题' }
    }

    if (!API_KEY) {
      return { code: -1, message: '云函数环境变量 SENSENOVA_API_KEY 未配置' }
    }

    const messages = [
      {
        role: 'system',
        content: `你是一个耐心的儿童学习助手小贝贝，专门回答${age}岁小朋友的问题。
要求：
1. 用简单易懂、生动有趣的语言回答
2. 多用比喻和例子，让小朋友容易理解
3. 回答控制在 150 字以内
4. 语气亲切温暖，可以用一些可爱的语气词
5. 如果小朋友提出危险或不合适的问题，温柔地引导到安全的方向
6. 内容积极正面，传播正能量
7. 直接回答，不要说“作为AI助手”之类的话`,
      },
      { role: 'user', content: message },
    ]

    let reply = ''

    try {
      const chatRes = await generateText(messages)
      reply = chatRes?.choices?.[0]?.message?.content || ''
    } catch (error) {
      console.warn('chat ai timeout, use fallback:', error.message)
      reply = pickFallbackReply(message)
    }

    if (!reply) {
      reply = pickFallbackReply(message)
    }

    return { code: 0, data: { reply } }
  } catch (error) {
    console.error('chat cloud function error:', error)
    return {
      code: 0,
      data: {
        reply: pickFallbackReply(String(event.message || '')),
      },
    }
  }
}
