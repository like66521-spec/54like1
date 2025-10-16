"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"
import { ArticleCard } from "@/components/article-card"
import { Button } from "@/components/ui/button"
import { mockArticles } from "@/lib/mock-data"

export default function HotPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 10
  
  // 按浏览量排序
  const hotArticles = [...mockArticles].sort((a, b) => b.views - a.views)
  
  const totalPages = Math.ceil(hotArticles.length / articlesPerPage)
  const startIndex = (currentPage - 1) * articlesPerPage
  const endIndex = startIndex + articlesPerPage
  const currentArticles = hotArticles.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />

      <div className="flex max-w-[1224px] mx-auto pt-3">
        <SidebarLeft />
        
        <div className="w-2"></div>

        <main className="w-[700px] flex-shrink-0">
          <div className="bg-white rounded-lg border border-[#e0e0e0] p-4 mb-3">
            <h1 className="text-xl font-bold text-[#333333]">🔥 热门文章</h1>
            <p className="text-sm text-[#666666] mt-1">根据浏览量排序的热门内容</p>
          </div>

          <div className="space-y-3">
            {currentArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {/* 分页按钮 */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6 mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4"
              >
                上一页
              </Button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 p-0 ${
                      currentPage === page ? "bg-[#4caf50] text-white" : ""
                    }`}
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4"
              >
                下一页
              </Button>
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

