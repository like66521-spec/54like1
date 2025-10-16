"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Save, Eye, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Category {
  id: string
  name: string
  slug: string
}

interface EditClientProps {
  categories: Category[]
  article?: {
    id: string
    title: string
    slug: string
    excerpt: string | null
    content: string
    categoryId: string | null
    isPublished: boolean
  }
}

export function EditClient({ categories, article }: EditClientProps) {
  const router = useRouter()
  const [title, setTitle] = useState(article?.title || "")
  const [slug, setSlug] = useState(article?.slug || "")
  const [excerpt, setExcerpt] = useState(article?.excerpt || "")
  const [content, setContent] = useState(article?.content || "")
  const [categoryId, setCategoryId] = useState(article?.categoryId || "")
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(
    article?.isPublished ? "PUBLISHED" : "DRAFT"
  )
  const [isSaving, setIsSaving] = useState(false)

  const handleInsertPaidSeparator = () => {
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const before = content.substring(0, start)
    const after = content.substring(end)
    
    const separator = "\n\n<!--PAID_CONTENT-->\n\n"
    const newContent = before + separator + after
    
    setContent(newContent)
    
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(
        start + separator.length,
        start + separator.length
      )
    }, 0)
  }

  const handleSave = async (saveStatus: "DRAFT" | "PUBLISHED") => {
    if (!title.trim()) {
      alert('请输入文章标题')
      return
    }

    setIsSaving(true)
    try {
      const url = article 
        ? `/api/articles/${article.id}` 
        : '/api/articles'
      
      const response = await fetch(url, {
        method: article ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
          excerpt,
          content,
          categoryId: categoryId || null,
          status: saveStatus
        })
      })

      if (response.ok) {
        alert(saveStatus === 'PUBLISHED' ? '文章已发布!' : '文章已保存为草稿!')
        router.push('/admin/articles')
        router.refresh()
      } else {
        const data = await response.json()
        alert(data.error || '保存失败')
      }
    } catch (error) {
      alert('保存失败')
    } finally {
      setIsSaving(false)
    }
  }

  const hasPaidContent = content.includes("<!--PAID_CONTENT-->")

  // 自动生成slug
  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!article) {
      const autoSlug = value
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-\u4e00-\u9fa5]+/g, '')
      setSlug(autoSlug)
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* 顶部操作栏 */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{article ? '编辑文章' : '新建文章'}</h1>
            <p className="text-muted-foreground mt-1">创建或编辑文章内容</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => handleSave('DRAFT')}
            disabled={isSaving}
          >
            <Save className="h-4 w-4 mr-2" />
            保存草稿
          </Button>
          <Button 
            onClick={() => handleSave('PUBLISHED')}
            disabled={isSaving}
          >
            <Eye className="h-4 w-4 mr-2" />
            {isSaving ? '发布中...' : '发布文章'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 主要内容区 */}
        <div className="col-span-2 space-y-6">
          {/* 基本信息 */}
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
              <CardDescription>填写文章的标题和摘要</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">文章标题 *</Label>
                <Input
                  id="title"
                  placeholder="输入文章标题..."
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="mt-1.5"
                />
              </div>
              
              <div>
                <Label htmlFor="slug">URL别名</Label>
                <Input
                  id="slug"
                  placeholder="自动生成"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="mt-1.5 font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  留空将自动根据标题生成
                </p>
              </div>
              
              <div>
                <Label htmlFor="excerpt">文章摘要</Label>
                <Textarea
                  id="excerpt"
                  placeholder="输入文章摘要..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  className="mt-1.5"
                />
              </div>
            </CardContent>
          </Card>

          {/* 文章内容 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>文章内容</CardTitle>
                  <CardDescription>使用 Markdown 格式编写文章</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleInsertPaidSeparator}
                  className="gap-2"
                >
                  <DollarSign className="h-4 w-4" />
                  插入付费分隔线
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {hasPaidContent && (
                <Alert className="mb-4 border-amber-200 bg-amber-50">
                  <DollarSign className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    检测到付费内容标记。分隔线上方的内容为免费预览，下方内容需要付费才能查看。
                  </AlertDescription>
                </Alert>
              )}
              
              <Textarea
                id="content-editor"
                placeholder="输入文章内容... 

提示：支持 Markdown 格式
- # 大标题
- ## 小标题  
- **粗体文字**
- - 列表项

点击上方「插入付费分隔线」按钮，可以设置部分内容为付费"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                className="font-mono text-sm"
              />
              
              <div className="mt-2 text-xs text-muted-foreground">
                字数统计：{content.length} 字符
                {hasPaidContent && (
                  <span className="ml-4 text-amber-600 font-medium">
                    · 包含付费内容
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 侧边栏设置 */}
        <div className="space-y-6">
          {/* 发布设置 */}
          <Card>
            <CardHeader>
              <CardTitle>发布设置</CardTitle>
              <CardDescription>文章状态和分类</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">状态</Label>
                <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">草稿</SelectItem>
                    <SelectItem value="PUBLISHED">已发布</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category">分类</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* 使用说明 */}
          <Card>
            <CardHeader>
              <CardTitle>使用说明</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p className="font-medium text-foreground">Markdown 语法:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li># 一级标题</li>
                <li>## 二级标题</li>
                <li>**粗体** *斜体*</li>
                <li>[链接](url)</li>
                <li>![图片](url)</li>
              </ul>
              
              <p className="text-xs mt-4">
                💡 点击「插入付费分隔线」可设置部分内容为付费
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

