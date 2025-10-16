import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 检查是否为占位符数据库
const isPlaceholderDB = process.env.DATABASE_URL?.includes('placeholder')

// 创建一个模拟的Prisma客户端，仅在占位符数据库时使用
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

// 仅在占位符数据库时使用模拟客户端，否则使用真实数据库
export const prisma = isPlaceholderDB 
  ? mockPrisma 
  : (globalForPrisma.prisma ?? new PrismaClient())

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma


