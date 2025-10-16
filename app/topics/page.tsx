import { Header } from "@/components/header"
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"

export default function TopicsPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />

      <div className="flex max-w-[1224px] mx-auto gap-3 pt-3">
        <SidebarLeft />

        <main className="w-[700px] flex-shrink-0">
          <div className="bg-white rounded-lg border border-[#e0e0e0] p-8 text-center">
            <div className="text-6xl mb-4">#️⃣</div>
            <h1 className="text-2xl font-bold text-[#333333] mb-2">话题广场</h1>
            <p className="text-[#666666] mb-6">发现热门话题，关注感兴趣的内容</p>
            <div className="flex flex-wrap gap-2 justify-center mt-8">
              {["跨境电商", "数字营销", "AI工具", "副业赚钱", "内容创作"].map((topic) => (
                <span
                  key={topic}
                  className="px-4 py-2 bg-[#e8f5e9] text-[#4caf50] rounded-full text-sm hover:bg-[#4caf50] hover:text-white transition-colors cursor-pointer"
                >
                  #{topic}
                </span>
              ))}
            </div>
          </div>
        </main>

        <SidebarRight />
      </div>
    </div>
  )
}

