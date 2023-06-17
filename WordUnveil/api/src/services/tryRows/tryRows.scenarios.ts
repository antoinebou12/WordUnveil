import type { Prisma } from '@prisma/client'

const createGame = (username, email, languageCode, word, wordsBankName, size, duration) => ({
  name: 'String',
  startedAt: '2022-07-05T23:41:46Z',
  correct: true,
  duration,
  updatedAt: '2022-07-05T23:41:46Z',
  user: {
    create: {
      username,
      email,
      hashedPassword: 'String',
      salt: 'String',
      updatedAt: '2022-07-05T23:41:46Z',
      userSetting: {
        create: {
          updatedAt: '2022-07-05T23:41:46Z',
          Language: {
            create: {
              name: 'String',
              code: languageCode,
              updatedAt: '2022-07-05T23:41:46Z',
            },
          },
        },
      },
    },
  },
  word: {
    create: {
      word,
      size,
      source: 'String',
      updatedAt: '2022-07-05T23:41:46Z',
      Language: {
        create: {
          name: 'String',
          code: languageCode,
          updatedAt: '2022-07-05T23:41:46Z',
        },
      },
    },
  },
  wordsBank: {
    create: {
      name: wordsBankName,
      updatedAt: '2022-07-05T23:41:46Z',
      Language: {
        create: {
          name: 'String',
          code: languageCode,
          updatedAt: '2022-07-05T23:41:46Z',
        },
      },
    },
  },
})

export const standard = defineScenario<Prisma.TryRowCreateArgs>({
  // This will create two standard scenarios for the TryRow table
  tryRow: {
    one: {
      data: {
        correct: true,
        updatedAt: '2022-07-05T23:41:46Z',
        game: {
          create: createGame('String6882083', 'String1051092', 'String8999275', 'String4496406', 'String3259119', 4617978, 859707),
        },
      },
    },
    two: {
      data: {
        correct: true,
        updatedAt: '2022-07-05T23:41:46Z',
        game: {
          create: createGame('String9901147', 'String2287038', 'String8406440', 'String5284813', 'String7792161', 5691741, 3403028),
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
