import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.WordCreateArgs>({
  word: {
    one: {
      data: {
        word: 'ExampleWord1',
        size: 1256503,
        source: 'Document1',
        updatedAt: new Date().toISOString(),
        Language: {
          create: {
            name: 'English',
            code: 'EN',
            updatedAt: new Date().toISOString(),
          },
        },
      },
    },
    two: {
      data: {
        word: 'ExampleWord2',
        size: 1329344,
        source: 'Document2',
        updatedAt: new Date().toISOString(),
        Language: {
          create: {
            name: 'Spanish',
            code: 'ES',
            updatedAt: new Date().toISOString(),
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
