import { NextResponse } from "next/server"
import { requireAdmin } from "@/app/admin/actions"
import fs from "fs"
import path from "path"

export async function POST() {
  try {
    await requireAdmin()

    const backupDir = path.join(process.cwd(), 'backups')
    const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')

    // 确保备份目录存在
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true })
    }

    // 检查数据库文件是否存在
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ error: "数据库文件不存在" }, { status: 404 })
    }

    // 生成备份文件名: backup-db-YYYYMMDD-HHMMSS.db
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
    const backupFilename = `backup-db-${timestamp}.db`
    const backupPath = path.join(backupDir, backupFilename)

    // 复制数据库文件
    fs.copyFileSync(dbPath, backupPath)

    return NextResponse.json({
      success: true,
      filename: backupFilename,
      size: fs.statSync(backupPath).size,
      path: backupPath
    })
  } catch (error) {
    console.error("Database backup error:", error)
    return NextResponse.json({ error: "数据库备份失败" }, { status: 500 })
  }
}

