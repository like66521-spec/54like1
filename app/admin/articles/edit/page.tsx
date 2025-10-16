import prisma from "@/lib/prisma"
import { EditClient } from "./edit-client"

export default async function EditArticlePage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const params = await searchParams
  
  const categories = await prisma.category.findMany({
    select: { id: true, name: true, slug: true },
    orderBy: { name: 'asc' }
  })

  let article = undefined
  if (params.id) {
    const foundArticle = await prisma.article.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        categoryId: true,
        isPublished: true,
      }
    })
    article = foundArticle || undefined
  }

  return <EditClient categories={categories} article={article} />
}
