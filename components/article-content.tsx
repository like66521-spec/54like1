"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import { PaymentModal } from "@/components/payment-modal"
import type { Article } from "@/lib/types"

interface ArticleContentProps {
  article: Article
}

export function ArticleContent({ article }: ArticleContentProps) {
  const [hasPaid, setHasPaid] = useState(false)
  
  // 分割免费内容和付费内容
  const PAID_SEPARATOR = "<!--PAID_CONTENT-->"
  const hasPaidContent = article.content.includes(PAID_SEPARATOR)
  
  let freeContent = article.content
  let paidContent = ""
  
  if (hasPaidContent) {
    const parts = article.content.split(PAID_SEPARATOR)
    freeContent = parts[0]
    paidContent = parts[1] || ""
  }
  
  // 简单的 Markdown 转 HTML（实际项目中应使用专业的 Markdown 解析库）
  const renderMarkdown = (content: string) => {
    return content
      .split("\n")
      .map((line, index) => {
        // 标题
        if (line.startsWith("### ")) {
          return <h3 key={index} className="text-lg font-bold text-[#333333] mt-6 mb-3">{line.slice(4)}</h3>
        }
        if (line.startsWith("## ")) {
          return <h2 key={index} className="text-xl font-bold text-[#333333] mt-8 mb-4">{line.slice(3)}</h2>
        }
        if (line.startsWith("# ")) {
          return <h1 key={index} className="text-2xl font-bold text-[#333333] mt-8 mb-4">{line.slice(2)}</h1>
        }
        
        // 列表
        if (line.trim().startsWith("- ")) {
          return (
            <li key={index} className="text-[14px] text-[#333333] leading-relaxed ml-6 list-disc">
              {line.slice(2)}
            </li>
          )
        }
        
        // 空行
        if (line.trim() === "") {
          return <div key={index} className="h-2" />
        }
        
        // 加粗文本
        const boldText = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        
        // 普通段落
        return (
          <p 
            key={index} 
            className="text-[14px] text-[#333333] leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: boldText }}
          />
        )
      })
  }

  return (
    <div className="prose prose-sm max-w-none mb-6">
      {/* 免费内容 */}
      <div>{renderMarkdown(freeContent)}</div>
      
      {/* 付费内容 */}
      {hasPaidContent && (
        <>
          {hasPaid || !article.isPaid ? (
            // 已付费或文章不需要付费 - 显示完整内容
            <div>{renderMarkdown(paidContent)}</div>
          ) : (
            // 未付费 - 显示付费提示
            <div className="relative mt-8">
              {/* 模糊预览 */}
              <div className="relative overflow-hidden rounded-lg border border-[#e0e0e0]">
                <div className="blur-sm select-none pointer-events-none opacity-40">
                  {renderMarkdown(paidContent.slice(0, 500))}
                </div>
                
                {/* 渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
                
                {/* 解锁提示 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4 text-center border border-[#e0e0e0]">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 text-white mb-4">
                      <Lock className="h-8 w-8" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#333333] mb-2">解锁完整内容</h3>
                    <p className="text-sm text-[#666666] mb-4">
                      还有 <span className="font-bold text-[#ff9800]">{Math.ceil(paidContent.length / 100)}</span> 段核心内容
                    </p>
                    
                    <div className="bg-[#f5f5f5] rounded-lg p-4 mb-6 text-left">
                      <p className="text-xs text-[#666666] mb-2">解锁后你将获得：</p>
                      <ul className="text-xs text-[#333333] space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="text-[#4caf50] mt-0.5">✓</span>
                          <span>完整的实战策略和技巧</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#4caf50] mt-0.5">✓</span>
                          <span>真实案例和数据分析</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#4caf50] mt-0.5">✓</span>
                          <span>可下载的资源和模板</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#4caf50] mt-0.5">✓</span>
                          <span>永久访问权限</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-[#ff9800]">¥{article.price}</span>
                      <span className="text-xs text-[#999999] line-through">¥{(article.price || 0) * 2}</span>
                    </div>
                    
                    <PaymentModal article={article} onSuccess={() => setHasPaid(true)} />
                    
                    <p className="text-xs text-[#999999] mt-4">
                      支持微信、支付宝支付
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

