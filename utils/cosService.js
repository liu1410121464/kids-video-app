/**
 * 腾讯云 COS 预览服务
 *
 * 将 COS 上的视频文件生成签名临时链接，直接传给 <video> 标签播放，
 * 无需下载到本地，即点即播。
 *
 * 支持两种地址格式：
 *   1. cloud:// 文件 ID — 自动解析为 COS Key，签名后返回可播放链接
 *   2. COS 直链（https://{bucket}.cos.{region}.myqcloud.com/{Key}）— 直接提取 Key 签名
 *
 * 使用示例：
 *   import { getSignedVideoUrl } from '@/utils/cosService.js'
 *   const playUrl = await getSignedVideoUrl('https://cloud2-xxx.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/A.mp4')
 *   videoUrl.value = playUrl
 */

import CosCloud from 'cos-wx-sdk-v5'
import {
  COS_SECRET_ID,
  COS_SECRET_KEY,
  COS_BUCKET,
  COS_REGION,
  COS_URL_EXPIRES,
} from './cosConfig.js'

let cosInstance = null

/**
 * 获取 COS SDK 单例
 */
function getCOSInstance() {
  if (cosInstance) return cosInstance
  cosInstance = new CosCloud({
    SecretId: COS_SECRET_ID,
    SecretKey: COS_SECRET_KEY,
  })
  return cosInstance
}

/**
 * 将 COS 域名直链转换为对象键（Key）
 *
 * 输入示例：
 *   'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/A.mp4'
 *   转换为：'LetteroftheDay/mp4/A.mp4'
 *
 * 如果不是 COS 域名格式，返回原字符串
 */
function parseCOSKey(url) {
  const cosUrlMatch = url.match(
    /^https?:\/\/[^/]+\.cos\.[^/]+\.myqcloud\.com\/(.+)/,
  )
  if (cosUrlMatch) {
    // 解码已编码的中文路径，防止 COS SDK 再次编码导致双重编码（%E5 -> %25E5）
    return decodeURIComponent(cosUrlMatch[1])
  }
  return url
}

/** 判断一个 URL 是否是 COS 域名直链 */
export function isCOSUrl(url) {
  if (!url) return false
  return /^https?:\/\/[^/]+\.cos\.[^/]+\.myqcloud\.com\//.test(url)
}

/**
 * 使用 COS SDK 获取临时下载链接
 */
function getCOSObjectUrl(cosKey) {
  return new Promise((resolve, reject) => {
    const cos = getCOSInstance()
    cos.getObjectUrl(
      {
        Bucket: COS_BUCKET,
        Region: COS_REGION,
        Key: cosKey,
        Sign: true,
        Expires: COS_URL_EXPIRES,
      },
      (err, data) => {
        if (err) {
          console.error('[COS SDK] getObjectUrl 失败:', err)
          reject(err)
          return
        }
        console.log('[COS SDK] getObjectUrl 成功:', data.Url)
        resolve(data.Url)
      },
    )
  })
}

/**
 * 获取 COS 视频的签名播放链接
 * 直接返回签名后的临时 URL，无需下载，<video> 标签可直接播放
 *
 * @param {string} fileUrl - cloud:// 文件ID 或 COS 直链
 * @returns {Promise<string>} - 签名后的可播放 URL
 */
export function getSignedVideoUrl(fileUrl) {
  return new Promise(async (resolve, reject) => {
    try {
      const cosKey = parseCOSKey(fileUrl)
      console.log('[COS SDK] 解析 Key:', cosKey)

      const signedUrl = await getCOSObjectUrl(cosKey)
      console.log('[COS SDK] 签名播放链接:', signedUrl)

      resolve(signedUrl)
    } catch (err) {
      console.error('[COS SDK] 签名失败:', err)
      reject(err)
    }
  })
}

export default {
  getSignedVideoUrl,
}

/**
 * 将 COS 域名直链转换为对象键（Key）
 *
 * 输入示例：
 *   'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/LetteroftheDay/mp4/A.mp4'
 *   转换为：'LetteroftheDay/mp4/A.mp4'
 *
 * 如果不是 COS 域名格式，返回原字符串
 */
function parseCOSKey(url) {
  const cosUrlMatch = url.match(
    /^https?:\/\/[^/]+\.cos\.[^/]+\.myqcloud\.com\/(.+)/,
  )
  if (cosUrlMatch) {
    // 解码已编码的中文路径，防止 COS SDK 再次编码导致双重编码（%E5 -> %25E5）
    return decodeURIComponent(cosUrlMatch[1])
  }
  return url
}

/** 判断一个 URL 是否是 COS 域名直链 */
export function isCOSUrl(url) {
  if (!url) return false
  return /^https?:\/\/[^/]+\.cos\.[^/]+\.myqcloud\.com\//.test(url)
}

/**
 * 使用 COS SDK 获取临时下载链接
 * 适用于小文件或需要直接获取链接的场景
 */
function getCOSObjectUrl(cosKey) {
  return new Promise((resolve, reject) => {
    const cos = getCOSInstance()
    cos.getObjectUrl(
      {
        Bucket: COS_BUCKET,
        Region: COS_REGION,
        Key: cosKey,
        Sign: true,
        Expires: COS_URL_EXPIRES,
      },
      (err, data) => {
        if (err) {
          console.error('[COS SDK] getObjectUrl 失败:', err)
          reject(err)
          return
        }
        console.log('[COS SDK] getObjectUrl 成功:', data.Url)
        resolve(data.Url)
      },
    )
  })
}

/**
 * 获取 COS 视频的签名播放链接
 * 直接返回签名后的临时 URL，无需下载，<video> 标签可直接播放
 *
 * @param {string} fileUrl - cloud:// 文件ID 或 COS 直链
 * @returns {Promise<string>} - 签名后的可播放 URL
 */
export function getSignedVideoUrl(fileUrl) {
  return new Promise(async (resolve, reject) => {
    try {
      const cosKey = parseCOSKey(fileUrl)
      console.log('[COS SDK] 解析 Key:', cosKey)

      const signedUrl = await getCOSObjectUrl(cosKey)
      console.log('[COS SDK] 签名播放链接:', signedUrl)

      resolve(signedUrl)
    } catch (err) {
      console.error('[COS SDK] 签名失败:', err)
      reject(err)
    }
  })
}

export default {
  getSignedVideoUrl,
}
