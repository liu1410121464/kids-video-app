const { Jimp } = require('jimp')
const path = require('path')
const fs = require('fs')

const inputFile = path.join(__dirname, '..', 'static', 'icons', 'icon.png')
const outputDir = path.join(__dirname, '..', 'static', 'icons')

const sizes = [
  { name: 'icon-72x72.png', size: 72 },
  { name: 'icon-96x96.png', size: 96 },
  { name: 'icon-144x144.png', size: 144 },
  { name: 'icon-192x192.png', size: 192 },
]

async function main() {
  if (!fs.existsSync(inputFile)) {
    console.error('输入文件不存在:', inputFile)
    process.exit(1)
  }

  const image = await Jimp.read(inputFile)

  for (const { name, size } of sizes) {
    const outputFile = path.join(outputDir, name)
    const img = image.clone().resize({ w: size })
    await img.write(outputFile)
    const stat = fs.statSync(outputFile)
    console.log(
      `✓ 已生成: ${name} (${size}x${size}, ${(stat.size / 1024).toFixed(1)}KB)`,
    )
  }
}

main().catch(console.error)
