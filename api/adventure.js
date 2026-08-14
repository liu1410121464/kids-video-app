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
 *   history?: [{ scene, selected }],              // 故事历史
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
const MAX_ROUNDS = 5

async function generateText(messages) {
  const res = await axios.post(
    `${API_BASE}/chat/completions`,
    {
      model: TEXT_MODEL,
      messages,
      temperature: 0.9,
      top_p: 0.95,
      max_tokens: 2500,
      reasoning_effort: 'none',
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      timeout: 40000,
    },
  )
  return res.data
}

/** 尝试解析 AI 返回的 JSON（支持 markdown 代码块） */
function tryParseJSON(str) {
  if (!str) return null
  // 去掉 markdown 代码块标记
  let cleaned = str
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .trim()
  // 尝试直接解析
  try {
    return JSON.parse(cleaned)
  } catch (e) { /* 继续尝试 */ }
  // 尝试提取大括号内容
  const match = cleaned.match(/\{[\s\S]*\}/)
  if (match) {
    try {
      return JSON.parse(match[0])
    } catch (e) { /* 失败 */ }
  }
  return null
}

/** 构建角色描述 */
function buildCharDesc(character) {
  if (!character || !character.name) return ''
  return `故事的主角是${character.animal || '小动物'}《${character.name}》，它性格${character.personality || '勇敢'}。`
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') {
    return res.status(405).json({ code: -1, message: '仅支持 POST 请求' })
  }

  try {
    const { action, keywords, age = 5, style = '温馨有趣', character, history, choiceIndex } = req.body

    if (!API_KEY) return res.json({ code: -1, message: 'API Key 未配置' })

    const charDesc = buildCharDesc(character)
    const ageHint =
      age <= 3
        ? '非常简单，句子短，重复多，适合幼儿'
        : age <= 6
          ? '简单有趣，有教育意义，适合学龄前儿童'
          : '有情节起伏，适合小学低年级'

    // ===== 开始新故事 =====
    if (action === 'start') {
      if (!keywords || !keywords.trim()) {
        return res.json({ code: -1, message: '请提供故事关键词' })
      }

      const sysMsg = `你是一个互动儿童故事创作AI，请为${age}岁的孩子创作一个${style}的互动故事。
要求：
1. 故事要${ageHint}
2. 语言生动有趣，多用拟声词和比喻
3. ${charDesc}
4. 故事要有悬念，最后停留在关键时刻
5. 严格按以下格式输出 JSON，不要输出任何其他内容：
{"scene":"故事正文（100-150字）","choices":["选项A（20字以内）","选项B（20字以内）","选项C（20字以内）"]}`

      const messages = [
        { role: 'system', content: sysMsg },
        { role: 'user', content: `请用以下关键词开始一个互动故事：${keywords}` },
      ]

      const aiRes = await generateText(messages)
      const content = aiRes?.choices?.[0]?.message?.content || ''
      const parsed = tryParseJSON(content)

      if (!parsed || !parsed.scene || !parsed.choices || parsed.choices.length < 2) {
        console.error('故事开头解析失败:', content.slice(0, 300))
        return res.json({ code: -1, message: '故事生成失败，请重试' })
      }

      return res.json({
        code: 0,
        data: {
          scene: parsed.scene,
          choices: parsed.choices.slice(0, 3),
          round: 1,
          maxRounds: MAX_ROUNDS,
          finished: false,
        },
      })
    }

    // ===== 孩子选择分支继续 =====
    if (action === 'choose') {
      if (!history || !history.length || choiceIndex === undefined) {
        return res.json({ code: -1, message: '缺少故事历史或选择' })
      }

      const currentRound = history.length + 1
      const isLastRound = currentRound >= MAX_ROUNDS

      // 从历史提取故事文本
      const historyText = history
        .map((h, i) => {
          // 兼容 chosenText / selected 两种字段
          const lastChoice = h.selected || h.chosenText || ''
          return `第${i + 1}段：${h.scene}\n${lastChoice ? `（孩子选择了：${lastChoice}）` : ''}`
        })
        .join('\n\n')

      const sysMsg = isLastRound
        ? `你是一个互动儿童故事创作AI，请为${age}岁的孩子完成故事的最终结局。
要求：
1. 故事要${ageHint}
2. 语言生动有趣，多用拟声词和比喻
3. ${charDesc}
4. 这是最后一轮，请给出一个温暖、积极、圆满的结局
5. 严格按以下格式输出 JSON，不要输出任何其他内容：
{"scene":"故事结局（150-250字）"}`
        : `你是一个互动儿童故事创作AI，请为${age}岁的孩子继续这个故事。
要求：
1. 故事要${ageHint}
2. 语言生动有趣，多用拟声词和比喻
3. ${charDesc}
4. 故事要有悬念，最后停留在关键时刻
5. 严格按以下格式输出 JSON，不要输出任何其他内容：
{"scene":"故事正文（100-150字）","choices":["选项A（20字以内）","选项B（20字以内）","选项C（20字以内）"]}`

      const messages = [
        { role: 'system', content: sysMsg },
        { role: 'user', content: `这是之前的故事：\n${historyText}\n\n孩子选择了第${choiceIndex + 1}个选项，请继续故事。` },
      ]

      const aiRes = await generateText(messages)
      const content = aiRes?.choices?.[0]?.message?.content || ''
      const parsed = tryParseJSON(content)

      if (!parsed || !parsed.scene) {
        console.error('故事续写解析失败:', content.slice(0, 300))
        return res.json({ code: -1, message: '故事续写失败，请重试' })
      }

      return res.json({
        code: 0,
        data: {
          scene: parsed.scene,
          choices: parsed.choices ? parsed.choices.slice(0, 3) : [],
          round: currentRound + 1,
          maxRounds: MAX_ROUNDS,
          finished: isLastRound || !parsed.choices || parsed.choices.length === 0,
        },
      })
    }

    return res.json({ code: -1, message: '未知操作' })
  } catch (error) {
    const detail = error.response?.data || error.message
    console.error('故事接龙错误:', JSON.stringify(detail))
    res.json({ code: -1, message: '服务暂时不可用，请稍后重试' })
  }
}