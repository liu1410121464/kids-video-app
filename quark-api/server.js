/**
 * 夸克网盘直链解析 HTTP API 服务
 *
 * 部署到任意 Node.js 服务器（腾讯云 SCF / 阿里云 FC / VPS / Railway 等）
 *
 * 前端 APK 通过 HTTP 调用：
 *   GET /api/parse?url=https://pan.quark.cn/s/xxxxx
 *
 * 返回：
 *   { code: 0, data: { pwdId, shareToken, totalFiles, videos: [{ fid, title, fileName, size, url }] } }
 */

const express = require('express')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 3000

// ⚠️ 重要：请将你的夸克 Cookie 设置到环境变量 QUARK_COOKIE 中
// 获取方法：浏览器登录 pan.quark.cn → F12 → Network → 复制 Cookie
const QUARK_COOKIE = process.env.QUARK_COOKIE || ''

app.use(express.json())

// 夸克 API 调用
async function apiGet(url) {
  const res = await axios.get(url, {
    headers: {
      Cookie: QUARK_COOKIE,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
    timeout: 15000,
  })
  return res.data
}

async function apiPost(url, body) {
  const res = await axios.post(url, body, {
    headers: {
      Cookie: QUARK_COOKIE,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Content-Type': 'application/json',
    },
    timeout: 15000,
  })
  return res.data
}

// 解析夸克分享链接
// GET /api/parse?url=https://pan.quark.cn/s/xxxx&passcode=可选提取码
app.get('/api/parse', async (req, res) => {
  try {
    const { url, passcode } = req.query

    if (!url) {
      return res.json({ code: -1, message: '请提供夸克分享链接 url' })
    }
    if (!QUARK_COOKIE) {
      return res.json({ code: -1, message: '夸克Cookie未配置' })
    }

    const match = url.match(/pan\.quark\.cn\/s\/([a-zA-Z0-9]+)/)
    if (!match) {
      return res.json({ code: -1, message: '无效的夸克分享链接' })
    }
    const pwdId = match[1]

    // 1. 获取分享 token
    const tokenRes = await apiPost('https://pan.quark.cn/share/sharepage/token', {
      pwd_id: pwdId,
      passcode: passcode || '',
    })
    const st = tokenRes?.data?.share_token
    if (!st) {
      return res.json({ code: -1, message: '获取share_token失败，Cookie可能已过期' })
    }

    // 2. 获取文件列表
    const listRes = await apiGet(
      `https://pan.quark.cn/share/sharepage/detail?pwd_id=${pwdId}&star=0&size=100&share_token=${st}`,
    )
    const files = listRes?.data?.list || []

    // 3. 获取视频直链
    const videos = []
    for (const f of files) {
      if (f.format_type !== 'video' && !/\.(mp4|mov|avi|mkv|webm)$/i.test(f.file_name)) continue
      try {
        const dlRes = await apiPost('https://pan.quark.cn/share/sharepage/download', {
          fids: [f.fid],
          pwd_id: pwdId,
          share_token: st,
        })
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
      data: {
        pwdId,
        shareToken,
        totalFiles: files.length,
        totalVideos: videos.length,
        videos,
      },
    })
  } catch (err) {
    console.error('[夸克API] 解析失败:', err)
    res.json({ code: -1, message: err.message })
  }
})

// 健康检查
app.get('/api/ping', (req, res) => res.json({ code: 0, message: 'pong', cookieOk: !!QUARK_COOKIE }))

function formatSize(bytes) {
  if (!bytes) return '未知'
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  let size = bytes
  while (size >= 1024 && i < units.length - 1) { size /= 1024; i++ }
  return size.toFixed(1) + units[i]
}

app.listen(PORT, () => {
  console.log(`夸克解析 API 已启动: http://localhost:${PORT}`)
  console.log(`Cookie 状态: ${QUARK_COOKIE ? '已配置' : '未配置'}`)
  console.log(`示例: GET http://localhost:${PORT}/api/parse?url=https://pan.quark.cn/s/xxxxx`)
})