/**
 * AI 学习助手接口
 *
 * POST /api/chat
 * Body: { message: string, age: number }
 *
 * 调用 SenseNova 文本模型回答儿童问题
 */

const axios = require('axios')

// ⚠️ 请在 Vercel 环境变量中配置 SENSENOVA_API_KEY
const API_KEY = process.env.SENSENOVA_API_KEY || ''
const API_BASE = 'https://token.sensenova.cn/v1'

// 文本生成模型
const TEXT_MODEL = 'sensenova-6.8-flash-lite'

/**
 * 调用文本生成 API
 */
async function generateText(messages) {
  const res = await axios.post(
    `${API_BASE}/chat/completions`,
    {
      model: TEXT_MODEL,
      messages: messages,
      temperature: 0.8,
      top_p: 0.95,
      max_tokens: 1500,
      reasoning_effort: 'none',
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      timeout: 30000,
    },
  )
  return res.data
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ code: -1, message: '仅支持 POST 请求' })
  }

  try {
    const { message, age = 6 } = req.body

    if (!message || !message.trim()) {
      return res.json({ code: -1, message: '请提出你的问题' })
    }

    if (!API_KEY) {
      return res.json({ code: -1, message: 'API Key 未配置' })
    }

    // 儿童友好的 system prompt
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
7. 直接回答，不要说"作为AI助手"之类的话`,
      },
      {
        role: 'user',
        content: message,
      },
    ]

    const chatRes = await generateText(messages)
    const reply = chatRes?.choices?.[0]?.message?.content || ''

    if (!reply) {
      return res.json({ code: -1, message: '回答生成失败，请稍后重试' })
    }

    res.json({
      code: 0,
      data: {
        reply: reply,
      },
    })
  } catch (error) {
    const detail = error.response?.data || error.message
    console.error('AI 学习助手错误:', JSON.stringify(detail))
    res.json({ code: -1, message: '服务暂时不可用，请稍后重试' })
  }
}
