import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.LanguageCreateArgs>({
  language: {
    one: {
      data: {
        name: 'String',
        code: 'String5529454',
        updatedAt: '2022-07-05T23:40:41Z',
      },
    },
    two: {
      data: {
        name: 'String',
        code: 'String4047400',
        updatedAt: '2022-07-05T23:40:41Z',
      },
    },
    three: {
      data: {
        name: '',
        code: 'String9876543',
        updatedAt: '2022-07-05T23:40:41Z',
      },
    },
    four: {
      data: {
        name: 'String',
        code: 'String'.repeat(200), // exceeds expected length
        updatedAt: '2022-07-05T23:40:41Z',
      },
    },
    five: {
      data: {
        name: 'String123',
        code: 'String456@#$', // includes numbers and special characters
        updatedAt: '2023-07-05T23:40:41Z', // future date
      },
    },
  },
})

export type StandardScenario = typeof standard

