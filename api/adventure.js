/**
 * 故事接龙 API
 *
 * POST /api/adventure
 * Body: {
 *   action: 'start' | 'choose',
 *   keywords?: string,
 *   age?: number,
 *   style?: string,
 *   character?: { name, animal, personality },  // 专属角色
 *   history?: [{ scene, choices }],              // 故事历史
 *   choiceIndex?: number,                        // 玩家选择
 * }
 *
 * 流程：
 * 1. start: 用关键词生成故事开头 + 3 个选择分支
 * 2. choose: 根据玩家选择继续故事 + 新的 3 个选择
 * 3. 最多 5 轮后自动结束
 */

const axios = require('axios')

const API_KEY = process.env.SENSENOVA_API_KEY || ''
const API_BASE = 'https://token.sensenova.cn/v1'
const TEXT_MODEL = 'sensenova-6.8-flash-lite'

async function generateText(messages) {
  const res = await axios.post(
    `${API_BASE}/chat/completions`,
    {
      model: TEXT_MODEL,
      messages,
      temperature: 0.9,
      top_p: 0.95,
      max_tokens: 2000,
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

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ code: -1, message: '仅支持 POST' })

  try {
    const { action, keywords, age = 5, style = '温馨有趣', character, history, choiceIndex } = req.body

    if (!API_KEY) return res.json({ code: -1, message: 'API Key 未配置' })

    // 构建角色描述
    let charDesc = ''
    if (character && character.name) {
      charDesc = `故事的主角是${character.animal || '小动物'}《${character.name}》，它${character.personality || '很勇敢'}。`
    }

    const ageHint = age <= 3
      ? '非常简单，句子短，重复多'
      : age <= 6
        ? '简单有趣，适合学龄前儿童'
        : '略有情节起伏，适合小学低年级'

    const maxRounds = 5

    if (action === 'start') {
      if (!keywords || !keywords.trim()) {
        return res.json({ code: -1, message: '请提供故事关键词' })
      }

      const sysMsg = `你是一个互动儿童故事创作AI。请为${age}岁的孩子创作一个${style}的互动故事。

要求：
1. 故事要${ageHint}
2. 语言生动有趣，多用拟声词和比喻
3. ${charDesc}
4. 严格按以下JSON格式输出，不要输出其他内容：
{
  "scene": "故事正文（100-150字）",
  "choices": [
    "选项1（10字以内）",
    "选项2（10字以内）",
    "选项3（10字以内）"
  ]
}`

      const messages = [
        { role: 'system', content: sysMsg },
        { role: 'user', content: `请用这些关键词开始一个故事：${keywords}` },
      ]

      const aiRes = await generateText(messages)
      let content = aiRes?.choices?.[0]?.message?.content || ''

      // 尝试解析 JSON（支持 markdown 代码块包裹）
      let parsed = tryParseJSON(content)
      if (!parsed) {
        // 去掉 markdown 代码块标记
        const cleaned = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim()
        parsed = tryParseJSON(cleaned)
      }
      if (!parsed) {
        // 尝试提取大括号内容
        const jsonMatch = content.match(/\{[\s\S]*\}/)
        if (jsonMatch) parsed = tryParseJSON(jsonMatch[0])
      }
      if (!parsed || !parsed.scene || !parsed.choices || parsed.choices.length < 2) {
        console.error('start parse fail:', content)
        return res.json({ code: -1, message: '故事生成失败，请重试' })
      }

      res.json({
        code: 0,
        data: {
          scene: parsed.scene,
          choices: parsed.choices.slice(0, 3),
          round: 1,
          maxRounds,
          finished: false,
        }
      })
    } else if (action === 'choose') {
      if (!history || !history.length || choiceIndex === undefined) {
        return res.json({ code: -1, message: '缺少故事历史或选择' })
      }

      const currentRound = history.length + 1
      const isLastRound = currentRound >= maxRounds

      const historyText = history.map((h, i) =>
        `第${i + 1}段：${h.scene}\n当时的选择：${h.choices[choiceIndex] || '（你做了选择）'}`
      ).join('\n\n')

      const sysMsg = isLastRound
        ? `你是一个互动儿童故事创作AI。请为${age}岁的孩子完成故事的最终结局。

要求：
1. 故事要${ageHint}
2. 语言生动有趣
3. ${charDesc}
4. 这是故事的最后一轮，请给出一个温暖、积极的结局
5. 严格按以下JSON格式输出，不要输出其他内容：
{
  "scene": "故事结局正文（120-180字）",
  "choices": []
}`
        : `你是一个互动儿童故事创作AI。请为${age}岁的孩子继续创作故事。

要求：
1. 故事要${ageHint}
2. 语言生动有趣，多用拟声词和比喻
3. ${charDesc}
4. 严格按以下JSON格式输出，不要输出其他内容：
{
  "scene": "故事正文（100-150字）",
  "choices": [
    "选项1（10字以内）",
    "选项2（10字以内）",
    "选项3（10字以内）"
  ]
}`

      const userMsg = `这是之前的故事内容：\n${historyText}\n\n孩子选择了第${choiceIndex + 1}个选项，请继续故事。`

      const messages = [
        { role: 'system', content: sysMsg },
        { role: 'user', content: userMsg },
      ]

      const aiRes = await generateText(messages)
      let content = aiRes?.choices?.[0]?.message?.content || ''

      let parsed = tryParseJSON(content)
      if (!parsed) {
        const cleaned = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim()
        parsed = tryParseJSON(cleaned)
      }
      if (!parsed) {
        const jsonMatch = content.match(/\{[\s\S]*\}/)
        if (jsonMatch) parsed = tryParseJSON(jsonMatch[0])
      }
      if (!parsed || !parsed.scene) {
        console.error('choose parse fail:', content)
        return res.json({ code: -1, message: '故事续写失败，请重试' })
      }

      res.json({
        code: 0,
        data: {
          scene: parsed.scene,
          choices: parsed.choices || [],
          round: currentRound + 1,
          maxRounds,
          finished: isLastRound || !parsed.choices || parsed.choices.length === 0,
        }
      })
    } else {
      res.json({ code: -1, message: '未知操作' })
    }
  } catch (error) {
    const detail = error.response?.data || error.message
    console.error('故事接龙错误:', JSON.stringify(detail))
    res.json({ code: -1, message: '服务暂时不可用，请稍后重试' })
  }
}

function tryParseJSON(str) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return null
  }
}