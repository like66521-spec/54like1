import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { Header } from "@/components/header"
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"
import { ArticleCard } from "@/components/article-card"

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await prisma.category.findUnique({
    where: { slug }
  })

  if (!category) {
    notFound()
  }

  const articles = await prisma.article.findMany({
    where: {
      categoryId: category.id,
      isPublished: true
    },
    include: {
      author: true,
      category: true,
      _count: {
        select: { comments: true }
      }
    },
    orderBy: { publishedAt: "desc" },
    take: 8
  })

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
      
      <div className="flex max-w-[1224px] mx-auto pt-3">
        <SidebarLeft />
        
        <div className="w-2"></div>
        
        <main className="w-[700px] flex-shrink-0 pb-8">
          <div className="bg-white rounded-lg border border-[#e0e0e0] p-4 mb-3">
            <h1 className="text-2xl font-bold text-[#333333] mb-2">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-[#666666] text-sm">
                {category.description}
              </p>
            )}
          </div>

          <div className="space-y-3">
            {articles.map((article) => (
              <ArticleCard 
                key={article.id} 
                article={{
                  ...article,
                  comments: article._count.comments,
                  coverImage: article.coverImage || undefined,
                  category: {
                    ...article.category,
                    description: article.category.description || undefined
                  },
                  author: {
                    ...article.author,
                    avatar: article.author.avatar || undefined,
                    bio: article.author.bio || undefined
                  },
                  price: article.price || undefined
                }} 
              />
            ))}
          </div>

          {articles.length === 0 && (
            <div className="bg-white rounded-lg border border-[#e0e0e0] p-8 text-center">
              <p className="text-[#666666]">该分类下暂无文章</p>
            </div>
          )}
        </main>
        
        <div className="w-2"></div>

        <div className="w-[300px] flex-shrink-0 hidden xl:block">
          <SidebarRight />
        </div>
      </div>
    </div>
  )
}