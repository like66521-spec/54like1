import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/app/admin/actions"

// 获取用户列表
export async function GET(request: NextRequest) {
  try {
    await requireAdmin()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search")

    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
      ]
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          role: true,
          coins: true,
          level: true,
          createdAt: true,
          _count: {
            select: { articles: true, comments: true }
          }
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.user.count({ where })
    ])

    return NextResponse.json({
      users: users.map((user: any) => ({
        ...user,
        articlesCount: user._count.articles,
        commentsCount: user._count.comments
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error("Get users error:", error)
    return NextResponse.json({ error: "获取用户列表失败" }, { status: 500 })
  }
}

// 创建用户
export async function POST(request: NextRequest) {
  try {
    await requireAdmin()
    
    const body = await request.json()
    const { email, password, name, role } = body

    if (!email || !password || !name) {
      return NextResponse.json({ error: "缺少必要字段" }, { status: 400 })
    }

    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
        role: role || "USER",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      }
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Create user error:", error)
    return NextResponse.json({ error: "创建用户失败" }, { status: 500 })
  }
}

