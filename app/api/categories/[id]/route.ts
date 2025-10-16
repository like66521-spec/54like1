import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/app/admin/actions"

// 更新分类
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin()
    
    const { id } = await params
    const body = await request.json()
    const { name, slug, description } = body

    if (!name || !slug) {
      return NextResponse.json({ error: "缺少必要字段" }, { status: 400 })
    }

    const category = await prisma.category.update({
      where: { id },
      data: { name, slug, description }
    })

    return NextResponse.json({ category })
  } catch (error) {
    console.error("Update category error:", error)
    return NextResponse.json({ error: "更新分类失败" }, { status: 500 })
  }
}

// 删除分类
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin()

    const { id } = await params
    // 检查是否有文章使用此分类
    const articlesCount = await prisma.article.count({
      where: { categoryId: id }
    })

    if (articlesCount > 0) {
      // 将这些文章的分类设为null
      await prisma.article.updateMany({
        where: { categoryId: id },
        data: { categoryId: null }
      })
    }

    // 删除分类
    await prisma.category.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete category error:", error)
    return NextResponse.json({ error: "删除分类失败" }, { status: 500 })
  }
}

