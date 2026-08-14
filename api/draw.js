/**
 * AI 画画接口
 *
 * POST /api/draw
 * Body: { prompt: string }
 *
 * 调用 SenseNova 生图模型生成图片
 */

const axios = require('axios')

// ⚠️ 请在 Vercel 环境变量中配置 SENSENOVA_API_KEY
const API_KEY = process.env.SENSENOVA_API_KEY || ''
const API_BASE = 'https://token.sensenova.cn/v1'

// 生图模型
const IMAGE_MODEL = 'sensenova-u1-fast'

/**
 * 调用生图 API
 */
async function generateImage(prompt) {
  const res = await axios.post(
    `${API_BASE}/images/generations`,
    {
      model: IMAGE_MODEL,
      prompt: prompt,
      n: 1,
      size: '2048x2048',
      watermark: false,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      timeout: 60000,
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
    const { prompt } = req.body

    if (!prompt || !prompt.trim()) {
      return res.json({ code: -1, message: '请描述你想画的内容' })
    }

    if (!API_KEY) {
      return res.json({ code: -1, message: 'API Key 未配置' })
    }

    // 儿童风格绘画提示词
    const imagePrompt = `儿童插画风格，卡通可爱，🌈色彩鲜艳明亮，画面温暖治愈，适合小朋友欣赏。画面内容：${prompt}。高质量，细节丰富，无文字水印`

    const imageRes = await generateImage(imagePrompt)
    const imageUrl =
      imageRes?.data?.[0]?.url || imageRes?.data?.[0]?.b64_json || null

    if (!imageUrl) {
      return res.json({ code: -1, message: '图片生成失败，请稍后重试' })
    }

    res.json({
      code: 0,
      data: {
        image: imageUrl,
        prompt: prompt,
      },
    })
  } catch (error) {
    const detail = error.response?.data || error.message
    console.error('AI 画画错误:', JSON.stringify(detail))
    res.json({ code: -1, message: '服务暂时不可用，请稍后重试' })
  }
}
