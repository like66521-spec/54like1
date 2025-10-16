import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Eye, MessageCircle, ThumbsUp, Share2 } from "lucide-react"
import { Header } from "@/components/header"
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArticleContent } from "@/components/article-content"
import { CommentSection } from "@/components/comment-section"
import { mockArticles } from "@/lib/mock-data"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = mockArticles.find((a) => a.slug === params.slug)

  if (!article) {
    notFound()
  }
  
  // 解析 JSON 格式的图片数组
  const imageUrls = article.images ? JSON.parse(article.images) as string[] : []

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />

      <div className="flex max-w-[1224px] mx-auto pt-3">
        <SidebarLeft />
        
        <div className="w-2"></div>

        <main className="w-[700px] flex-shrink-0">
          {/* 文章卡片容器 */}
          <article className="bg-white rounded-lg border border-[#e0e0e0] overflow-hidden">
            <div className="p-4">
              {/* 分类标签 */}
              {article.category && (
                <div className="mb-3">
                  <Link href={`/category/${article.category.slug}`} className="text-xs text-[#4caf50] hover:underline">
                    {article.category.name}
                  </Link>
                </div>
              )}

              {/* 标题 */}
              <h1 className="text-2xl font-bold text-[#333333] leading-tight mb-4">{article.title}</h1>

              {/* 作者信息和发布时间 */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#f0f0f0]">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={article.author?.avatar || "/placeholder.svg"} alt={article.author?.name} />
                    <AvatarFallback className="text-xs bg-[#e0e0e0]">{article.author?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-[#333333]">{article.author?.name}</p>
                    <p className="text-xs text-[#999999]">
                      {new Date(article.publishedAt).toLocaleDateString("zh-CN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#999999]">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    {article.views >= 10000
                      ? `${(article.views / 10000).toFixed(1)}w`
                      : article.views >= 1000
                        ? `${(article.views / 1000).toFixed(1)}k`
                        : article.views}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-[13px] text-[#666666] leading-relaxed">
                  {article.excerpt.slice(0, 200)}
                  {article.excerpt.length > 200 ? "..." : ""}
                </p>
              </div>

              {/* 图片展示 */}
              {article.coverImage && (
                <div className="relative w-full h-[360px] rounded overflow-hidden bg-[#f5f5f5] mb-4">
                  <Image
                    src={article.coverImage || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {imageUrls.length > 0 && !article.coverImage && (
                <div className="flex gap-2 mb-4">
                  {imageUrls.slice(0, 3).map((image, index) => (
                    <div key={index} className="relative flex-1 h-[160px] rounded overflow-hidden bg-[#f5f5f5]">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${article.title} - ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* 文章内容 - 支持部分付费 */}
              <ArticleContent article={article} />

              {/* 底部互动栏 */}
              <div className="flex items-center justify-between pt-4 border-t border-[#f0f0f0]">
                <div className="flex items-center gap-4 text-xs text-[#999999]">
                  <button className="flex items-center gap-1 hover:text-[#4caf50] transition-colors">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    {article.likes}
                  </button>
                  <button className="flex items-center gap-1 hover:text-[#4caf50] transition-colors">
                    <MessageCircle className="h-3.5 w-3.5" />
                    {article.comments || 0}
                  </button>
                  <button className="flex items-center gap-1 hover:text-[#4caf50] transition-colors">
                    <Share2 className="h-3.5 w-3.5" />
                    分享
                  </button>
                </div>
              </div>
            </div>
          </article>

          <CommentSection />

          {/* 相关文章 */}
          <div className="mt-4">
            <h3 className="text-sm font-bold text-[#333333] mb-3 px-1">相关推荐</h3>
            <div className="grid grid-cols-3 gap-3">
              {mockArticles
                .filter((a) => a.id !== article.id && a.categoryId === article.categoryId)
                .slice(0, 3)
                .map((relatedArticle) => {
                  const relatedImageUrls = relatedArticle.images ? JSON.parse(relatedArticle.images) as string[] : []
                  const relatedImage = relatedImageUrls[0] || relatedArticle.coverImage
                  
                  return (
                    <Link
                      key={relatedArticle.id}
                      href={`/article/${relatedArticle.slug}`}
                      className="block bg-white rounded-lg border border-[#e0e0e0] overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {/* 图片 */}
                      <div className="relative w-full h-32 bg-[#f5f5f5]">
                        {relatedImage ? (
                          <Image
                            src={relatedImage || "/placeholder.svg"}
                            alt={relatedArticle.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#999999]">
                            <span className="text-xs">暂无图片</span>
                          </div>
                        )}
                      </div>
                      
                      {/* 内容 */}
                      <div className="p-3">
                        <h4 className="text-sm font-medium text-[#333333] mb-2 line-clamp-2 leading-snug">
                          {relatedArticle.title}
                        </h4>
                        <p className="text-xs text-[#666666] leading-relaxed line-clamp-3">
                          {relatedArticle.excerpt.slice(0, 100)}
                          {relatedArticle.excerpt.length > 100 ? "..." : ""}
                        </p>
                      </div>
                    </Link>
                  )
                })}
            </div>
          </div>
        </main>

        <div className="w-2"></div>

        <div className="w-[300px] flex-shrink-0 hidden xl:block">
          <SidebarRight />
        </div>
      </div>
    </div>
  )
}
