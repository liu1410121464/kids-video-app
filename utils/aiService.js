/**
 * AI 服务封装
 *
 * 小程序端统一调用 AI API 的入口
 *
 * 部署说明：
 * 1. 将 ai-api/ 目录部署到 Vercel
 * 2. 在下方 API_BASE 填入你的 Vercel 域名
 * 3. 本地开发时可改为 http://localhost:3000
 */

// ⚠️ 本地开发用 localhost，部署后改为你的 Vercel 域名
// 例如：https://your-app.vercel.app
const API_BASE = 'http://localhost:3000'

/**
 * 生成 AI 故事
 * @param {string} keywords - 故事关键词，如 "小兔子 月亮 蛋糕"
 * @param {number} age - 孩子年龄，默认 5
 * @param {string} style - 故事风格，默认 "温馨有趣"
 * @returns {Promise}
 */
export function generateStory(keywords, age = 5, style = '温馨有趣') {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${API_BASE}/api/story`,
      method: 'POST',
      data: { keywords, age, style },
      success: (res) => {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(new Error(res.data.message || '生成失败'))
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
