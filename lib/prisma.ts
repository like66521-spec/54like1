import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 检查是否在构建环境中且没有真实的数据库URL
const isBuildTime = process.env.NODE_ENV === "production" && !process.env.DATABASE_URL
const isPlaceholderDB = process.env.DATABASE_URL?.includes('placeholder')

// 创建一个模拟的Prisma客户端，避免数据库连接
const mockPrisma = {
  article: {
    findMany: () => Promise.resolve([]),
    findUnique: () => Promise.resolve(null),
    create: () => Promise.resolve({}),
    update: () => Promise.resolve({}),
    delete: () => Promise.resolve({}),
    count: () => Promise.resolve(0),
  },
  category: {
    findMany: () => Promise.resolve([]),
    findUnique: () => Promise.resolve(null),
    create: () => Promise.resolve({}),
    update: () => Promise.resolve({}),
    delete: () => Promise.resolve({}),
    count: () => Promise.resolve(0),
  },
  user: {
    findMany: () => Promise.resolve([]),
    findUnique: () => Promise.resolve(null),
    create: () => Promise.resolve({}),
    update: () => Promise.resolve({}),
    delete: () => Promise.resolve({}),
    count: () => Promise.resolve(0),
  },
  comment: {
    findMany: () => Promise.resolve([]),
    findUnique: () => Promise.resolve(null),
    create: () => Promise.resolve({}),
    update: () => Promise.resolve({}),
    delete: () => Promise.resolve({}),
    count: () => Promise.resolve(0),
  },
} as any

// 在构建时或占位符数据库时，使用模拟的Prisma客户端
export const prisma = (isBuildTime || isPlaceholderDB) 
  ? mockPrisma 
  : (globalForPrisma.prisma ?? new PrismaClient())

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma


