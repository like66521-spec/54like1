import { Header } from "@/components/header"
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"
import { ArticleCard } from "@/components/article-card"
import { mockArticles } from "@/lib/mock-data"

export default function PremiumPage() {
  // 只显示付费文章
  const paidArticles = mockArticles.filter((article) => article.isPaid)

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />

      <div className="flex max-w-[1224px] mx-auto gap-3 pt-3">
        <SidebarLeft />

        <main className="w-[700px] flex-shrink-0 pb-8">
          <div className="bg-white rounded-lg border border-[#e0e0e0] p-4 mb-3">
            <h1 className="text-xl font-bold text-[#333333]">💎 付费内容</h1>
            <p className="text-sm text-[#666666] mt-1">精选优质付费内容</p>
          </div>

          <div className="space-y-3">
            {paidArticles.length > 0 ? (
              paidArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              <div className="bg-white rounded-lg border border-[#e0e0e0] p-12 text-center">
                <p className="text-[#999999]">暂无付费内容</p>
              </div>
            )}
          </div>
        </main>

        <div className="w-[300px] flex-shrink-0 hidden xl:block">
          <SidebarRight />
        </div>
      </div>
    </div>
  )
}

