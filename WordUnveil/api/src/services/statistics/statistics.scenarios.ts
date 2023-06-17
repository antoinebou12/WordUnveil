import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.StatisticCreateArgs>({
  statistic: {
    one: {
      data: {
        updatedAt: new Date('2022-07-05T23:42:00Z'),
        user: {
          create: {
            username: 'testUser1',
            email: 'test1@example.com',
            hashedPassword: 'hashedPassword1',
            salt: 'salt1',
            updatedAt: new Date('2022-07-05T23:42:00Z'),
            userSetting: {
              create: {
                updatedAt: new Date('2022-07-05T23:42:00Z'),
                Language: {
                  create: {
                    name: 'English',
                    code: 'EN',
                    updatedAt: new Date('2022-07-05T23:42:00Z'),
                  },
                },
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: new Date('2022-07-05T23:42:00Z'),
        user: {
          create: {
            username: 'testUser2',
            email: 'test2@example.com',
            hashedPassword: 'hashedPassword2',
            salt: 'salt2',
            updatedAt: new Date('2022-07-05T23:42:00Z'),
            userSetting: {
              create: {
                updatedAt: new Date('2022-07-05T23:42:00Z'),
                Language: {
                  create: {
                    name: 'Spanish',
                    code: 'ES',
                    updatedAt: new Date('2022-07-05T23:42:00Z'),
                  },
                },
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
