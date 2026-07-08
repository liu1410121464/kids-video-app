/**
 * 获取 COS 临时密钥的云函数
 *
 * 使用 STS（临时密钥）方式，避免在前端暴露永久密钥。
 * 前端调用此云函数获取临时 SecretId / SecretKey / Token，
 * 然后用临时密钥初始化 COS SDK 来签名视频 URL。
 */

const cloud = require('wx-server-sdk')
const COS = require('cos-nodejs-sdk-v5')

cloud.init()

// COS 永久密钥（仅保存在云函数中，不会泄露到前端）
const SECRET_ID = 'AKIDJlLz3DPesHf5TrIdxKUcvHczcEtTxRzT'
const SECRET_KEY = 'Y8d5MPE5m3Pdo5RoFmIpP9xpjgijndIx'
const BUCKET = 'cloud2-1258683316'
const REGION = 'ap-shanghai'

exports.main = async (event, context) => {
  // STS 临时密钥有效期为 30 分钟
  const expiresIn = 1800

  try {
    const cos = new COS({
      SecretId: SECRET_ID,
      SecretKey: SECRET_KEY,
    })

    const { credentials } = await new Promise((resolve, reject) => {
      cos.getSTS(
        {
          Bucket: BUCKET,
          Region: REGION,
          DurationSeconds: expiresIn,
        },
        (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        },
      )
    })

    return {
      code: 0,
      data: {
        tmpSecretId: credentials.tmpSecretId,
        tmpSecretKey: credentials.tmpSecretKey,
        sessionToken: credentials.sessionToken,
        startTime: Math.floor(Date.now() / 1000),
        expiredTime: Math.floor(Date.now() / 1000) + expiresIn,
        bucket: BUCKET,
        region: REGION,
      },
    }
  } catch (err) {
    console.error('[getCosSts] 获取临时密钥失败:', err)
    return {
      code: -1,
      message: err.message || '获取临时密钥失败',
    }
  }
}
