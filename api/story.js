/**
 * AI 讲故事接口
 *
 * POST /api/story
 * Body: { keywords: string, age: number, style: string }
 *
 * 流程：
 * 1. 调用 SenseNova 文本模型生成故事
 * 2. 调用 SenseNova 生图模型生成故事配图
 * 3. 返回故事文本 + 图片 URL
 */

// 加载环境变量（本地开发时从 ai-api 目录启动，不需要在此加载）
const axios = require('axios')

// ⚠️ 请在 Vercel 环境变量中配置 SENSENOVA_API_KEY
const API_KEY = process.env.SENSENOVA_API_KEY || ''
const API_BASE = 'https://token.sensenova.cn/v1'

// 文本生成模型
const TEXT_MODEL = 'sensenova-6.8-flash-lite'
// 生图模型
const IMAGE_MODEL = 'sensenova-u1-fast'

/**
 * 调用文本生成 API
 */
async function generateText(messages) {
  const res = await axios.post(
    `${API_BASE}/chat/completions`,
    {
      model: TEXT_MODEL,
      messages: messages,
      temperature: 0.9,
      top_p: 0.95,
      max_tokens: 4000,
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

/**
 * 根据故事内容提取生图 prompt
 */
function buildImagePrompt(keywords, storyPreview) {
  return `儿童绘本插画风格，温馨可爱，色彩明亮柔和，适合${keywords}主题，画面内容：${storyPreview.substring(0, 100)}，高质量，细节丰富，无文字`
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
    const { keywords, age = 5, style = '温馨有趣' } = req.body

    if (!keywords || !keywords.trim()) {
      return res.json({ code: -1, message: '请提供故事关键词' })
    }

    if (!API_KEY) {
      return res.json({ code: -1, message: 'API Key 未配置' })
    }

    // 年龄适配的提示词
    const ageHint =
      age <= 3
        ? '非常简单，句子短，重复多，适合幼儿'
        : age <= 6
          ? '简单有趣，有教育意义，适合学龄前儿童'
          : '稍微复杂一些，有情节起伏，适合小学低年级'

    // Step 1: 生成故事
    const storyMessages = [
      {
        role: 'system',
        content: `你是一个专业的儿童故事作家。请为${age}岁的孩子写一个${style}的故事。
要求：
1. 故事要${ageHint}
2. 字数控制在 350-500 字之间
3. 故事要有开头、发展、结尾，结构完整
4. 语言生动有趣，多用拟声词和比喻
5. 结尾要有积极正面的寓意
6. 直接输出故事正文，第一行用【】写一个简短有趣的故事标题，例如【月亮上的小兔子】，然后换行开始正文
7. 严禁输出"世界观设定"、"角色设定"、"故事梗概"、"教育寓意"等额外说明，只输出标题和正文`,
      },
      {
        role: 'user',
        content: `请用以下关键词创作一个儿童故事：${keywords}`,
      },
    ]

    const storyRes = await generateText(storyMessages)
    let storyText = storyRes?.choices?.[0]?.message?.content || ''

    if (!storyText) {
      console.error('故事生成返回为空:', JSON.stringify(storyRes))
      return res.json({ code: -1, message: '故事生成失败，请稍后重试' })
    }

    // 提取故事标题（第一行【】内的内容）
    const titleMatch = storyText.match(/【([^】]+)】/)
    let storyTitle = '今天的故事'
    if (titleMatch && titleMatch[1]) {
      storyTitle = titleMatch[1]
      // 移除标题行
      storyText = storyText.replace(/^.{0,5}【[^】]+】\s*\n?/, '')
    }
    // 清理多余结构说明
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

    // Step 2: 生成配图（异步，不阻塞返回）
    let imageUrl = null
    try {
      const imagePrompt = buildImagePrompt(keywords, storyText)
      const imageRes = await generateImage(imagePrompt)
      imageUrl =
        imageRes?.data?.[0]?.url || imageRes?.data?.[0]?.b64_json || null
    } catch (imgErr) {
      const detail = imgErr.response?.data || imgErr.message
      console.error('生图失败:', JSON.stringify(detail))
      // 生图失败不影响故事返回
    }

    res.json({
      code: 0,
      data: {
        title: storyTitle,
        story: storyText,
        image: imageUrl,
        keywords: keywords,
        age: age,
      },
    })
  } catch (error) {
    const detail = error.response?.data || error.message
    console.error('AI 讲故事错误:', JSON.stringify(detail))
    res.json({ code: -1, message: '服务暂时不可用，请稍后重试' })
  }
}
