import { PrismaClient } from "@/prisma/generated/prisma"

export const prisma = new PrismaClient()


async function main() {
  
}
main()
  .then(async () => {
    console.dir('Conexão com o banco iniciada!')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('Erro ao conectar com o banco:', e)
    await prisma.$disconnect()
    process.exit(1)
  })