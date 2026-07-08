const base =
  'https://cloud2-1258683316.cos.ap-shanghai.myqcloud.com/%E8%B6%A3%E8%B6%A3%E7%9F%A5%E7%9F%A5%E9%B8%9F/'
const pad = (n) => String(n).padStart(2, '0')
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
    console.log(
      `        { id: ${id}, title: '${id}、趣趣知知鸟 ${season}-${pad(e)}集', videoUrl: '${url}', cover: '/static/covers/twirlywoos.png' },`,
    )
  }
}
