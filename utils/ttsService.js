/**
 * 语音朗读服务
 *
 * 使用 Web Speech API 将文字转为语音朗读
 * 支持暂停、继续、停止控制
 *
 * 兼容性：Android WebView / H5 / 浏览器
 * 小程序端：回退到复制文字提示
 */

let utterance = null
let isSpeaking = false
let isPaused = false

/**
 * 检测是否支持语音合成
 */
export function isTTSSupported () {
  return typeof window !== 'undefined' && typeof window.speechSynthesis !== 'undefined'
}

/**
 * 朗读文字
 * @param {string} text - 要朗读的文本
 * @param {object} options - 可选参数
 * @param {number} options.rate - 语速 0.1~10，默认 1.2（儿童稍慢）
 * @param {number} options.pitch - 音调 0~2，默认 1.1
 * @param {number} options.volume - 音量 0~1，默认 1
 * @param {string} options.lang - 语言，默认 'zh-CN'
 * @param {function} options.onStart - 开始回调
 * @param {function} options.onEnd - 结束回调
 * @param {function} options.onError - 错误回调
 * @returns {boolean} 是否成功启动朗读
 */
export function speak (text, options = {}) {
  if (!text || !isTTSSupported()) {
    // 不支持时，复制到剪贴板并提示
    try {
      uni.setClipboardData({
        data: text,
        showToast: false
      })
      uni.showToast({ title: '已复制到剪贴板', icon: 'none' })
    } catch (e) {
      /* ignore */
    }
    return false
  }

  // 停止当前朗读
  stop()

  const {
    rate = 1.2,
    pitch = 1.1,
    volume = 1,
    lang = 'zh-CN',
    onStart,
    onEnd,
    onError
  } = options

  utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = rate
  utterance.pitch = pitch
  utterance.volume = volume
  utterance.lang = lang

  // 尝试选择中文语音
  const voices = window.speechSynthesis.getVoices()
  const zhVoice = voices.find(v => v.lang.startsWith('zh'))
  if (zhVoice) utterance.voice = zhVoice

  utterance.onstart = () => {
    isSpeaking = true
    isPaused = false
    if (onStart) onStart()
  }

  utterance.onend = () => {
    isSpeaking = false
    isPaused = false
    utterance = null
    if (onEnd) onEnd()
  }

  utterance.onerror = (e) => {
    isSpeaking = false
    isPaused = false
    utterance = null
    if (onError) onError(e)
  }

  window.speechSynthesis.speak(utterance)
  return true
}

/**
 * 暂停朗读
 */
export function pause () {
  if (isSpeaking && !isPaused && window.speechSynthesis) {
    window.speechSynthesis.pause()
    isPaused = true
  }
}

/**
 * 继续朗读
 */
export function resume () {
  if (isSpeaking && isPaused && window.speechSynthesis) {
    window.speechSynthesis.resume()
    isPaused = false
  }
}

/**
 * 停止朗读
 */
export function stop () {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
  isSpeaking = false
  isPaused = false
  utterance = null
}

/**
 * 获取当前朗读状态
 * @returns {{ isSpeaking: boolean, isPaused: boolean }}
 */
export function getStatus () {
  return { isSpeaking, isPaused }
}

/**
 * 朗读一段文本，并在完成后自动收起
 * 简化的便捷调用
 * @param {string} text
 * @param {function} onEnd
 */
export function readAloud (text, onEnd) {
  return speak(text, {
    rate: 1.2,
    pitch: 1.1,
    onEnd
  })
}