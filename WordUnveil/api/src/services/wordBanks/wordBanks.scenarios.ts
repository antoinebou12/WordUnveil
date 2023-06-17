import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.WordBankCreateArgs>({
  wordBank: {
    english: {
      data: {
        name: 'English Word Bank',
        updatedAt: new Date().toISOString(),
        Language: {
          create: {
            name: 'English',
            code: 'en-US',
            updatedAt: new Date().toISOString(),
          },
        },
      },
    },
    spanish: {
      data: {
        name: 'Spanish Word Bank',
        updatedAt: new Date().toISOString(),
        Language: {
          create: {
            name: 'Spanish',
            code: 'es-ES',
            updatedAt: new Date().toISOString(),
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
