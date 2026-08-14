/**
 * 本地开发服务器
 *
 * 用于本地调试 AI 接口，部署到 Vercel 时使用 api/*.js
 *
 * 启动：npm start
 * 访问：http://localhost:3000/api/story
 */

// 加载 .env 环境变量（本地开发用）
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// 代理 AI 接口
app.post('/api/story', require('../api/story'))
app.post('/api/draw', require('../api/draw'))
app.post('/api/chat', require('../api/chat'))
app.post('/api/adventure', require('../api/adventure'))

app.listen(PORT, () => {
  console.log(`🚀 AI API 服务已启动: http://localhost:${PORT}`)
  console.log(`📖 讲故事接口: POST http://localhost:${PORT}/api/story`)
  console.log(`🎨 画画接口: POST http://localhost:${PORT}/api/draw`)
  console.log(`🤖 学习助手接口: POST http://localhost:${PORT}/api/chat`)
  console.log(`🎭 故事接龙接口: POST http://localhost:${PORT}/api/adventure`)
  console.log(`🎭 故事接龙接口: POST http://localhost:${PORT}/api/adventure`)
})
