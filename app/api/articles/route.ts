import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/app/admin/actions"

// 获取文章列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    const where: any = {}
    
    if (category) {
      where.categoryId = category
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
      ]
    }

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: {
          category: true,
          author: true,
          _count: {
            select: { comments: true }
          }
        },
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.article.count({ where })
    ])

    return NextResponse.json({
      articles: articles.map(article => ({
        ...article,
        comments: article._count.comments
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error("Get articles error:", error)
    return NextResponse.json({ error: "获取文章列表失败" }, { status: 500 })
  }
}

// 创建文章
export async function POST(request: NextRequest) {
  try {
    const session = await requireAdmin()
    
    const body = await request.json()
    const { title, slug, content, excerpt, categoryId, status } = body

    if (!title) {
      return NextResponse.json({ error: "标题不能为空" }, { status: 400 })
    }

    // 生成 slug
    const finalSlug = slug || title
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    const article = await prisma.article.create({
      data: {
        title,
        content: content || "",
        excerpt: excerpt || content?.slice(0, 200) || "",
        categoryId: categoryId || null,
        authorId: session.user.id,
        slug: finalSlug,
        isPublished: status === 'PUBLISHED' || status === 'published',
      },
      include: {
        category: true,
        author: true,
      }
    })

    return NextResponse.json({ article })
  } catch (error) {
    console.error("Create article error:", error)
    return NextResponse.json({ error: "创建文章失败" }, { status: 500 })
  }
}

