// src/lib/db.ts
import { PrismaClient } from "@prisma/client"

// Global alanda prisma değişkenini tanımlıyoruz (Development'ta çoklu bağlantıyı önlemek için)
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const db = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db