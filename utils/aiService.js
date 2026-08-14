/**
 * AI 服务封装
 *
 * 小程序端统一调用 AI API 的入口
 *
 * 部署说明：
 * 1. 将 api/ 目录部署到 Vercel
 * 2. 在下方 API_BASE 填入你的 Vercel 域名
 * 3. 本地开发时可改为 http://localhost:3000
 */

// ⚠️ 已部署到 Vercel，本地开发时可改为 http://localhost:3000
const API_BASE = 'https://kids-video-app.vercel.app'

/**
 * 生成 AI 故事
 * @param {string} keywords - 故事关键词，如 "小兔子 月亮 蛋糕"
 * @param {number} age - 孩子年龄，默认 5
 * @param {string} style - 故事风格，默认 "温馨有趣"
 * @returns {Promise<{title, story, image, keywords}>}
 */
export function generateStory(keywords, age = 5, style = '温馨有趣') {
  return request('/api/story', { keywords, age, style })
}

/**
 * AI 画画
 * @param {string} prompt - 想画的内容描述
 * @returns {Promise<{image, prompt}>}
 */
export function generateDraw(prompt) {
  return request('/api/draw', { prompt })
}

/**
 * AI 学习助手对话
 * @param {string} message - 孩子的问题
 * @param {number} age - 孩子年龄
 * @returns {Promise<{reply}>}
 */
export function chatAssistant(message, age = 6) {
  return request('/api/chat', { message, age })
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
  return request('/api/adventure', {
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
  return request('/api/adventure', {
    action: 'choose',
    history,
    choiceIndex,
    character,
  })
}

/**
 * 统一请求封装
 */
function request(url, data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${API_BASE}${url}`,
      method: 'POST',
      data,
      success: (res) => {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(new Error(res.data.message || '请求失败'))
        }
      },
      fail: (err) => {
        reject(new Error('网络请求失败，请检查网络连接'))
      },
    })
  })
}

/**
 * 获取 API 基础地址（供其他模块使用）
 */
export function getApiBase() {
  return API_BASE
}
