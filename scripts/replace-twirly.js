const fs = require('fs')
const path = require('path')

// 生成趣趣知知鸟100集数据
const base =
  'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/'
const pad = (n) => String(n).padStart(2, '0')
const episodes = []

for (let s = 1; s <= 2; s++) {
  for (let e = 1; e <= 50; e++) {
    const url =
      base +
      '01.%20%E7%AC%AC' +
      s +
      '%E5%AD%A3%20%E7%AC%AC' +
      pad(e) +
      '%E9%9B%86.mp4'
    const id = (s - 1) * 50 + e
    const season = s === 1 ? '第一季' : '第二季'
    episodes.push({
      id,
      title: `${id}、趣趣知知鸟 ${season}-${pad(e)}集`,
      videoUrl: url,
      cover: '/static/covers/twirlywoos.png',
    })
  }
}

// 读取 videoData.js
const filePath = path.join(__dirname, '..', 'config', 'videoData.js')
let content = fs.readFileSync(filePath, 'utf-8')

// 构建新的系列对象
const episodesStr = episodes
  .map((ep, i) => {
    const comma = i < episodes.length - 1 ? ',' : ''
    return `        { id: ${ep.id}, title: '${ep.title}', videoUrl: '${ep.videoUrl}', cover: '${ep.cover}' }${comma}`
  })
  .join('\n')

const newSeries = `    {
      id: 4,
      title: '趣趣知知鸟',
      cover: '/static/covers/twirlywoos.png',
      episodeCount: 100,
      categoryId: 'l0',
      episodes: [
${episodesStr}
      ],
    },`

// 替换 ABC 字母拼读 部分
const oldPattern =
  /{\s*id:\s*4,[^}]*title:\s*'ABC\s*字母拼读'[^}]*episodes:\s*\[\s*\],?\s*},?/
const match = content.match(oldPattern)

if (match) {
  content = content.replace(oldPattern, newSeries)
  fs.writeFileSync(filePath, content, 'utf-8')
  console.log('替换成功！已将 ABC 字母拼读 替换为 趣趣知知鸟（100集）')
} else {
  console.log('未找到 ABC 字母拼读 的匹配模式，尝试精确匹配...')
  // 精确匹配
  const exactSearch = `id: 4,
      title: 'ABC 字母拼读',
      cover: '/static/covers/abc.png',
      episodeCount: 24,
      categoryId: 'l0',
      episodes: [],`

  if (content.includes(exactSearch)) {
    const newExact = `id: 4,
      title: '趣趣知知鸟',
      cover: '/static/covers/twirlywoos.png',
      episodeCount: 100,
      categoryId: 'l0',
      episodes: [
${episodesStr}
      ],`
    content = content.replace(exactSearch, newExact)
    fs.writeFileSync(filePath, content, 'utf-8')
    console.log('替换成功！已将 ABC 字母拼读 替换为 趣趣知知鸟（100集）')
  } else {
    console.log('无法找到匹配的文本，请检查文件内容')
  }
}
