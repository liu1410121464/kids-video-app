const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const API_KEY = process.env.SENSENOVA_API_KEY || ''
const API_BASE =
  process.env.SENSENOVA_API_BASE || 'https://token.sensenova.cn/v1'
const TEXT_MODEL =
  process.env.SENSENOVA_TEXT_MODEL || 'sensenova-6.8-flash-lite'
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

function tryParseJSON(str) {
  if (!str) return null
  let cleaned = str
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .trim()

  try {
    return JSON.parse(cleaned)
  } catch (e) {}

  const match = cleaned.match(/\{[\s\S]*\}/)
  if (match) {
    try {
      return JSON.parse(match[0])
    } catch (e) {}
  }

  return null
}

function buildCharDesc(character) {
  if (!character || !character.name) return ''
  return `故事的主角是${character.animal || '小动物'}《${character.name}》，它性格${character.personality || '勇敢'}。`
}

exports.main = async (event) => {
  try {
    const {
      action,
      keywords,
      age = 5,
      style = '温馨有趣',
      character,
      history,
      choiceIndex,
    } = event

    if (!API_KEY) {
      return { code: -1, message: '云函数环境变量 SENSENOVA_API_KEY 未配置' }
    }

    const charDesc = buildCharDesc(character)
    const ageHint =
      age <= 3
        ? '非常简单，句子短，重复多，适合幼儿'
        : age <= 6
          ? '简单有趣，有教育意义，适合学龄前儿童'
          : '有情节起伏，适合小学低年级'

    if (action === 'start') {
      if (!keywords || !String(keywords).trim()) {
        return { code: -1, message: '请提供故事关键词' }
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
        {
          role: 'user',
          content: `请用以下关键词开始一个互动故事：${keywords}`,
        },
      ]

      const aiRes = await generateText(messages)
      const content = aiRes?.choices?.[0]?.message?.content || ''
      const parsed = tryParseJSON(content)

      if (
        !parsed ||
        !parsed.scene ||
        !parsed.choices ||
        parsed.choices.length < 2
      ) {
        return { code: -1, message: '故事生成失败，请重试' }
      }

      return {
        code: 0,
        data: {
          scene: parsed.scene,
          choices: parsed.choices.slice(0, 3),
          round: 1,
          maxRounds: MAX_ROUNDS,
          finished: false,
        },
      }
    }

    if (action === 'choose') {
      if (!history || !history.length || choiceIndex === undefined) {
        return { code: -1, message: '缺少故事历史或选择' }
      }

      const currentRound = history.length + 1
      const isLastRound = currentRound >= MAX_ROUNDS
      const historyText = history
        .map((h, i) => {
          const lastChoice = h.selected || h.chosenText || ''
          return `第${i + 1}段：${h.scene}\n${lastChoice ? `（孩子选择了：${lastChoice}）` : ''}`
        })
        .join('\n\n')

      const sysMsg = isLastRound
        ? `你是一个互动儿童故事创作AI，请为${age}岁的孩子完成故事的最终结局。
要求：
1. 必须严格延续已有故事的情节和角色设定
2. 故事要${ageHint}
3. 语言生动有趣，多用拟声词和比喻
4. ${charDesc}
5. 这是最后一轮，请给出一个温暖、积极、圆满的结局
6. 严格按以下格式输出 JSON，不要输出任何其他内容：
{"scene":"故事结局（150-250字）"}`
        : `你是一个互动儿童故事创作AI，请为${age}岁的孩子继续这个故事。
要求：
1. 必须严格延续已有故事的情节和角色设定，绝不可另起炉灶
2. 故事要${ageHint}
3. 语言生动有趣，多用拟声词和比喻
4. ${charDesc}
5. 故事要有悬念，最后停留在关键时刻
6. 严格按以下格式输出 JSON，不要输出任何其他内容：
{"scene":"故事正文（100-150字）","choices":["选项A（20字以内）","选项B（20字以内）","选项C（20字以内）"]}`

      const messages = [
        { role: 'system', content: sysMsg },
        {
          role: 'user',
          content: `这是完整的故事历史，你必须严格延续这个故事，保持角色和情节一致：\n${historyText}\n\n孩子选择了第${choiceIndex + 1}个选项，请延续这段冒险。`,
        },
      ]

      const aiRes = await generateText(messages)
      const content = aiRes?.choices?.[0]?.message?.content || ''
      const parsed = tryParseJSON(content)

      if (!parsed || !parsed.scene) {
        return { code: -1, message: '故事续写失败，请重试' }
      }

      if (isLastRound) {
        return {
          code: 0,
          data: {
            scene: parsed.scene,
            choices: [],
            round: currentRound,
            maxRounds: MAX_ROUNDS,
            finished: true,
          },
        }
      }

      return {
        code: 0,
        data: {
          scene: parsed.scene,
          choices: parsed.choices || [],
          round: currentRound,
          maxRounds: MAX_ROUNDS,
          finished: false,
        },
      }
    }

    return { code: -1, message: '无效动作' }
  } catch (error) {
    console.error('adventure cloud function error:', error)
    return {
      code: -1,
      message: '服务暂时不可用，请稍后重试',
    }
  }
}
