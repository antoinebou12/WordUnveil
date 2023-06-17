import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        username: 'TestUser1',
        email: 'test1@example.com',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2023-06-17T00:00:00Z',
        userSetting: {
          create: {
            updatedAt: '2023-06-17T00:00:00Z',
            Language: {
              create: {
                name: 'English',
                code: 'ENG',
                updatedAt: '2023-06-17T00:00:00Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        username: 'TestUser2',
        email: 'test2@example.com',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2023-06-17T00:00:00Z',
        userSetting: {
          create: {
            updatedAt: '2023-06-17T00:00:00Z',
            Language: {
              create: {
                name: 'Spanish',
                code: 'ESP',
                updatedAt: '2023-06-17T00:00:00Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
