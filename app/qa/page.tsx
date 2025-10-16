import { Header } from "@/components/header"
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"

export default function QAPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />

      <div className="flex max-w-[1224px] mx-auto gap-3 pt-3">
        <SidebarLeft />

        <main className="w-[700px] flex-shrink-0">
          <div className="bg-white rounded-lg border border-[#e0e0e0] p-8 text-center">
            <div className="text-6xl mb-4">💬</div>
            <h1 className="text-2xl font-bold text-[#333333] mb-2">问答社区</h1>
            <p className="text-[#666666] mb-6">提出问题，分享知识，互帮互助</p>
            <button className="px-6 py-2 bg-[#4caf50] text-white rounded-full hover:bg-[#45a049] transition-colors">
              提问
            </button>
          </div>
        </main>

        <SidebarRight />
      </div>
    </div>
  )
}

