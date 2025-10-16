import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 检查数据库URL是否为占位符
const isPlaceholderDB = process.env.DATABASE_URL?.includes('placeholder')

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  // 如果是占位符数据库，禁用连接
  datasources: isPlaceholderDB ? {
    db: {
      url: "file:./dev.db" // 使用SQLite作为占位符
    }
  } : undefined
})

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma


