import { NextResponse } from "next/server"
import { requireAdmin } from "@/app/admin/actions"
import fs from "fs"
import path from "path"
import archiver from "archiver"

export async function POST() {
  try {
    await requireAdmin()

    const backupDir = path.join(process.cwd(), 'backups')
    const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
    const publicDir = path.join(process.cwd(), 'public')

    // 确保备份目录存在
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true })
    }

    // 生成备份文件名: backup-full-YYYYMMDD-HHMMSS.zip
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
    const backupFilename = `backup-full-${timestamp}.zip`
    const backupPath = path.join(backupDir, backupFilename)

    // 创建写入流
    const output = fs.createWriteStream(backupPath)
    const archive = archiver('zip', {
      zlib: { level: 9 } // 最高压缩级别
    })

    return new Promise((resolve, reject) => {
      output.on('close', () => {
        resolve(NextResponse.json({
          success: true,
          filename: backupFilename,
          size: archive.pointer(),
          path: backupPath
        }))
      })

      archive.on('error', (err) => {
        reject(NextResponse.json({ error: "创建备份失败" }, { status: 500 }))
      })

      // 将输出流连接到归档器
      archive.pipe(output)

      // 添加数据库文件
      if (fs.existsSync(dbPath)) {
        archive.file(dbPath, { name: 'database/dev.db' })
      }

      // 添加public目录中的上传文件
      if (fs.existsSync(publicDir)) {
        archive.directory(publicDir, 'public')
      }

      // 完成归档
      archive.finalize()
    })
  } catch (error) {
    console.error("Full backup error:", error)
    return NextResponse.json({ error: "完整备份失败" }, { status: 500 })
  }
}

