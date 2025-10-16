import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/app/admin/actions"
import fs from "fs"
import path from "path"

export async function GET(request: NextRequest) {
  try {
    await requireAdmin()

    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('file')

    if (!filename) {
      return NextResponse.json({ error: "缺少文件名参数" }, { status: 400 })
    }

    // 安全检查: 防止路径遍历攻击
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return NextResponse.json({ error: "非法文件名" }, { status: 400 })
    }

    const backupDir = path.join(process.cwd(), 'backups')
    const filePath = path.join(backupDir, filename)

    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "文件不存在" }, { status: 404 })
    }

    // 读取文件
    const fileBuffer = fs.readFileSync(filePath)

    // 返回文件
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': fileBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error("Download backup error:", error)
    return NextResponse.json({ error: "下载失败" }, { status: 500 })
  }
}

