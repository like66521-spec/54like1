"use client"

import { useState } from "react"
import { MessageCircle, ThumbsUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Comment {
  id: number
  author: {
    name: string
    avatar: string
  }
  content: string
  likes: number
  createdAt: string
}

export function CommentSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: {
        name: "张三",
        avatar: "/author-avatar.png",
      },
      content: "非常有用的文章，感谢分享！",
      likes: 5,
      createdAt: "2024-01-15 10:30",
    },
    {
      id: 2,
      author: {
        name: "李四",
        avatar: "/author-avatar-2.jpg",
      },
      content: "请问有更详细的教程吗？",
      likes: 2,
      createdAt: "2024-01-15 11:20",
    },
  ])

  const handleWechatLogin = async () => {
    try {
      // 调用微信OAuth登录API
      const response = await fetch("/api/auth/wechat/login", {
        method: "POST",
      })
      const data = await response.json()

      if (data.authUrl) {
        // 重定向到微信授权页面
        window.location.href = data.authUrl
      }
    } catch (error) {
      console.error("微信登录失败:", error)
    }
  }

  const handleQQLogin = async () => {
    try {
      // 调用QQ OAuth登录API
      const response = await fetch("/api/auth/qq/login", {
        method: "POST",
      })
      const data = await response.json()

      if (data.authUrl) {
        // 重定向到QQ授权页面
        window.location.href = data.authUrl
      }
    } catch (error) {
      console.error("QQ登录失败:", error)
    }
  }

  return (
    <div id="comments" className="bg-white rounded-lg border border-[#e0e0e0] overflow-hidden mt-4">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="h-5 w-5 text-[#4caf50]" />
          <h3 className="text-base font-bold text-[#333333]">评论 ({comments.length})</h3>
        </div>

        {/* 评论输入区 */}
        {!isLoggedIn ? (
          <div className="bg-[#f9f9f9] rounded-lg p-6 text-center mb-4">
            <p className="text-sm text-[#666666] mb-4">登录后即可参与评论</p>
            <div className="flex items-center justify-center gap-3">
              <Button
                onClick={handleWechatLogin}
                className="bg-[#07c160] hover:bg-[#06ad56] text-white rounded-full px-6"
              >
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18z" />
                  <path d="M15.308 9.53c-1.315 0-2.54.443-3.501 1.18-.96.737-1.524 1.744-1.524 2.85 0 1.107.564 2.114 1.524 2.851.96.737 2.186 1.18 3.501 1.18.276 0 .543-.027.811-.05l1.903 1.114a.326.326 0 0 0 .167.054c.16 0 .29-.132.29-.295 0-.072-.029-.143-.048-.213l-.39-1.48a.59.59 0 0 1 .213-.665c1.832-1.347 3.002-3.338 3.002-5.55 0-4.054-3.891-7.342-8.691-7.342-.642 0-1.162.529-1.162 1.18a1.17 1.17 0 0 0 1.162 1.178c.642 0 1.162-.527 1.162-1.178z" />
                </svg>
                微信登录
              </Button>
              <Button onClick={handleQQLogin} className="bg-[#12b7f5] hover:bg-[#0fa8e3] text-white rounded-full px-6">
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.395 15.035a39.548 39.548 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.076 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a39.548 39.548 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771 0 0-.612 1.829-.612 2.506 0 .677.935.677.935 0 0-.677.917-2.506.917-2.506C9.592 23.202 11.139 24 12 24s2.408-.798 4.096-1.992c0 0 .917 1.829.917 2.506 0 .677.935.677.935 0 0-.677-.612-2.506-.612-2.506 1.638-1.384 2.394-3.302 2.394-4.771 0 0 1.563 2.537 2.103 2.472.252-.03.583-1.39-.438-4.673z" />
                </svg>
                QQ登录
              </Button>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <Textarea
              placeholder="写下你的评论..."
              className="min-h-[100px] resize-none border-[#e0e0e0] focus:border-[#4caf50] focus:ring-[#4caf50]"
            />
            <div className="flex justify-end mt-2">
              <Button className="bg-[#4caf50] hover:bg-[#45a049] text-white rounded-full px-6">发表评论</Button>
            </div>
          </div>
        )}

        {/* 评论列表 */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 pb-4 border-b border-[#f0f0f0] last:border-0">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                <AvatarFallback className="text-xs">{comment.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-[#333333]">{comment.author.name}</span>
                  <span className="text-xs text-[#999999]">{comment.createdAt}</span>
                </div>
                <p className="text-sm text-[#666666] leading-relaxed mb-2">{comment.content}</p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-xs text-[#999999] hover:text-[#4caf50] transition-colors">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    {comment.likes}
                  </button>
                  <button className="text-xs text-[#999999] hover:text-[#4caf50] transition-colors">回复</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
