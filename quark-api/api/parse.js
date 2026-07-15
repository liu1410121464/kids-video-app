/**
 * 夸克网盘直链解析 API - Vercel Serverless 版本
 *
 * 部署到 Vercel 后访问：
 *   https://你的域名.vercel.app/api/parse?url=https://pan.quark.cn/s/xxxx
 *
 * ⚠️ 部署前需要在 Vercel 环境变量中设置 QUARK_COOKIE
 */

const axios = require('axios')

async function apiGet(url, cookie) {
  const res = await axios.get(url, {
    headers: {
      Cookie: cookie,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
    timeout: 15000,
  })
  return res.data
}

async function apiPost(url, body, cookie) {
  const res = await axios.post(url, body, {
    headers: {
      Cookie: cookie,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Content-Type': 'application/json',
    },
    timeout: 15000,
  })
  return res.data
}

function formatSize(bytes) {
  if (!bytes) return '未知'
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  let size = bytes
  while (size >= 1024 && i < units.length - 1) { size /= 1024; i++ }
  return size.toFixed(1) + units[i]
}

module.exports = async (req, res) => {
  // 允许跨域（方便小程序/APK调用）
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const cookie = process.env.QUARK_COOKIE
  const { url, passcode } = req.query

  if (!url) {
    return res.json({ code: -1, message: '请提供夸克分享链接 url' })
  }
  if (!cookie) {
    return res.json({ code: -1, message: '夸克Cookie未配置，请在Vercel环境变量中设置 QUARK_COOKIE' })
  }

  try {
    const match = url.match(/pan\.quark\.cn\/s\/([a-zA-Z0-9]+)/)
    if (!match) {
      return res.json({ code: -1, message: '无效的夸克分享链接' })
    }
    const pwdId = match[1]

    // 1. 获取分享 token
    const tokenRes = await apiPost('https://pan.quark.cn/share/sharepage/token', { pwd_id: pwdId, passcode: passcode || '' }, cookie)
    const st = tokenRes?.data?.share_token
    if (!st) {
      return res.json({ code: -1, message: '获取share_token失败，Cookie可能已过期' })
    }

    // 2. 获取文件列表
    const listRes = await apiGet(`https://pan.quark.cn/share/sharepage/detail?pwd_id=${pwdId}&star=0&size=100&share_token=${st}`, cookie)
    const files = listRes?.data?.list || []

    // 3. 获取视频直链（最多取30个）
    const videos = []
    for (const f of files) {
      if (f.format_type !== 'video' && !/\.(mp4|mov|avi|mkv|webm)$/i.test(f.file_name)) continue
      if (videos.length >= 30) break
      try {
        const dlRes = await apiPost('https://pan.quark.cn/share/sharepage/download', { fids: [f.fid], pwd_id: pwdId, share_token: st }, cookie)
        const downloadUrl = dlRes?.data?.download_url || dlRes?.data?.downloadUrl || ''
        if (downloadUrl) {
          videos.push({
            fid: f.fid,
            title: f.file_name.replace(/\.[^.]+$/, ''),
            fileName: f.file_name,
            size: f.size,
            sizeText: formatSize(f.size),
            url: downloadUrl,
          })
        }
      } catch (e) {
        console.warn(`获取 ${f.file_name} 直链失败:`, e.message)
      }
    }

    return res.json({
      code: 0,
      data: { pwdId, shareToken, totalFiles: files.length, totalVideos: videos.length, videos },
    })
  } catch (err) {
    console.error('[夸克API] 解析失败:', err)
    res.json({ code: -1, message: err.message })
  }
}