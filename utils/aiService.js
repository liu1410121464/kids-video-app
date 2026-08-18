/**
 * AI 服务封装
 *
 * 方案：前端只调用微信云函数，API Key 保存在云函数环境变量中，
 * 不暴露到小程序前端。
 */

const CLOUD_FUNCTIONS = {
  story: 'story',
  draw: 'draw',
  chat: 'chat',
  adventure: 'adventure',
}

/**
 * 生成 AI 故事
 * @param {string} keywords - 故事关键词，如 "小兔子 月亮 蛋糕"
 * @param {number} age - 孩子年龄，默认 5
 * @param {string} style - 故事风格，默认 "温馨有趣"
 * @returns {Promise<{title, story, image, keywords}>}
 */
export function generateStory(keywords, age = 5, style = '温馨有趣') {
  return callCloudFunction(CLOUD_FUNCTIONS.story, { keywords, age, style })
}

/**
 * AI 画画
 * @param {string} prompt - 想画的内容描述
 * @returns {Promise<{image, prompt}>}
 */
export function generateDraw(prompt) {
  return callCloudFunction(CLOUD_FUNCTIONS.draw, { prompt })
}

/**
 * AI 学习助手对话
 * @param {string} message - 孩子的问题
 * @param {number} age - 孩子年龄
 * @returns {Promise<{reply}>}
 */
export function chatAssistant(message, age = 6) {
  return callCloudFunction(CLOUD_FUNCTIONS.chat, { message, age })
}

/**
 * 开始故事接龙
 * @param {string} keywords - 故事关键词
 * @param {number} age - 年龄
 * @param {string} style - 风格
 * @param {object|null} character - 专属角色 {name, animal, personality}
 * @returns {Promise<{scene, choices, round, maxRounds, finished}>}
 */
export function startAdventure(
  keywords,
  age = 5,
  style = '温馨有趣',
  character = null,
) {
  return callCloudFunction(CLOUD_FUNCTIONS.adventure, {
    action: 'start',
    keywords,
    age,
    style,
    character,
  })
}

/**
 * 继续故事接龙
 * @param {Array} history - 故事历史 [{scene, chosenText}]
 * @param {number} choiceIndex - 玩家选择的选项索引
 * @returns {Promise<{scene, choices, round, finished}>}
 */
export function continueAdventure(history, choiceIndex, character = null) {
  return callCloudFunction(CLOUD_FUNCTIONS.adventure, {
    action: 'choose',
    history,
    choiceIndex,
    character,
  })
}

/**
 * 通用云函数调用封装
 */
function callCloudFunction(name, data) {
  const timeoutMs = 9000

  return new Promise((resolve, reject) => {
    let finished = false

    const finish = (handler) => {
      if (finished) return
      finished = true
      clearTimeout(timeoutId)
      handler()
    }

    const timeoutId = setTimeout(() => {
      finish(() => {
        reject(new Error('AI 生成超时，请稍后再试'))
      })
    }, timeoutMs)

    if (!wx || !wx.cloud) {
      finish(() => {
        reject(new Error('当前环境未启用微信云开发'))
      })
      return
    }

    wx.cloud.callFunction({
      name,
      data,
      success: (res) => {
        finish(() => {
          const result = res.result || {}
          if (result.code === 0) {
            resolve(result.data)
          } else {
            reject(new Error(result.message || '请求失败'))
          }
        })
      },
      fail: (err) => {
        finish(() => {
          reject(
            new Error(
              err && err.message ? err.message : '云函数调用失败，请稍后重试',
            ),
          )
        })
      },
    })
  })
}

/**
 * 兼容旧逻辑：保留 request 入口，便于其他页面继续调用。
 */
function request(url, data) {
  return new Promise((resolve, reject) => {
    reject(
      new Error(
        '此版本已改为微信云函数模式，请使用 chatAssistant 等云函数封装',
      ),
    )
  })
}

/**
 * 获取 API 基础地址（供其他模块使用）
 */
export function getApiBase() {
  return 'wx-cloud-function'
}
