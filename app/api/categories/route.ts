import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/app/admin/actions"

// 获取分类列表
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
      include: {
        _count: {
          select: { articles: true }
        }
      }
    })

    return NextResponse.json({ categories })
  } catch (error) {
    console.error("Get categories error:", error)
    return NextResponse.json({ error: "获取分类列表失败" }, { status: 500 })
  }
}

// 创建分类
export async function POST(request: NextRequest) {
  try {
    await requireAdmin()
    
    const body = await request.json()
    const { name, slug, description, order } = body

    if (!name || !slug) {
      return NextResponse.json({ error: "缺少必要字段" }, { status: 400 })
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        order: order || 0,
      }
    })

    return NextResponse.json({ category })
  } catch (error) {
    console.error("Create category error:", error)
    return NextResponse.json({ error: "创建分类失败" }, { status: 500 })
  }
}

