const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const API_KEY = process.env.SENSENOVA_API_KEY || ''
const API_BASE =
  process.env.SENSENOVA_API_BASE || 'https://token.sensenova.cn/v1'
const IMAGE_MODEL = process.env.SENSENOVA_IMAGE_MODEL || 'sensenova-u1-fast'

async function generateImage(prompt) {
  const res = await axios.post(
    `${API_BASE}/images/generations`,
    {
      model: IMAGE_MODEL,
      prompt,
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

exports.main = async (event) => {
  try {
    const prompt = String(event.prompt || '').trim()

    if (!prompt) {
      return { code: -1, message: '请描述你想画的内容' }
    }

    if (!API_KEY) {
      return { code: -1, message: '云函数环境变量 SENSENOVA_API_KEY 未配置' }
    }

    const imagePrompt = `儿童插画风格，卡通可爱，🌈色彩鲜艳明亮，画面温暖治愈，适合小朋友欣赏。画面内容：${prompt}。高质量，细节丰富，无文字水印`
    const imageRes = await generateImage(imagePrompt)
    const imageUrl =
      imageRes?.data?.[0]?.url || imageRes?.data?.[0]?.b64_json || null

    if (!imageUrl) {
      return { code: -1, message: '图片生成失败，请稍后重试' }
    }

    return {
      code: 0,
      data: {
        image: imageUrl,
        prompt,
      },
    }
  } catch (error) {
    console.error('draw cloud function error:', error)
    return {
      code: -1,
      message: '服务暂时不可用，请稍后重试',
    }
  }
}
