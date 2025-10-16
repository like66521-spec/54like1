import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/app/admin/actions"

// 获取单个文章
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        author: true,
        comments: {
          include: {
            user: true,
            replies: {
              include: {
                user: true
              }
            }
          },
          orderBy: { createdAt: "desc" }
        }
      }
    })

    if (!article) {
      return NextResponse.json({ error: "文章不存在" }, { status: 404 })
    }

    // 增加浏览量
    await prisma.article.update({
      where: { id: params.id },
      data: { views: { increment: 1 } }
    })

    return NextResponse.json({ article })
  } catch (error) {
    console.error("Get article error:", error)
    return NextResponse.json({ error: "获取文章失败" }, { status: 500 })
  }
}

// 更新文章
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()
    
    const body = await request.json()
    const { title, slug, content, excerpt, categoryId, status } = body

    if (!title) {
      return NextResponse.json({ error: "标题不能为空" }, { status: 400 })
    }

    const article = await prisma.article.update({
      where: { id: params.id },
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
        content,
        excerpt,
        categoryId: categoryId || null,
        status: status || 'DRAFT',
        updatedAt: new Date(),
      },
      include: {
        category: true,
        author: true,
      }
    })

    return NextResponse.json({ article })
  } catch (error) {
    console.error("Update article error:", error)
    return NextResponse.json({ error: "更新文章失败" }, { status: 500 })
  }
}

// 删除文章
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()
    
    await prisma.article.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete article error:", error)
    return NextResponse.json({ error: "删除文章失败" }, { status: 500 })
  }
}

