import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserSettingCreateArgs>({
  userSetting: {
    one: {
      data: {
        updatedAt: new Date('2022-07-05T23:40:22Z'),
        Language: {
          create: {
            name: 'English',
            code: 'EN',
            updatedAt: new Date('2022-07-05T23:40:22Z'),
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: new Date('2022-07-05T23:40:22Z'),
        Language: {
          create: {
            name: 'Spanish',
            code: 'ES',
            updatedAt: new Date('2022-07-05T23:40:22Z'),
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
