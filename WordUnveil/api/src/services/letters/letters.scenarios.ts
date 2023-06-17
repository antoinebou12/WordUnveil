import type { Prisma } from '@prisma/client'

const createLetterData = (username: string, email: string, word: string, size: number, name: string, code: string) => ({
  letter: 'String',
  createdAt: '2022-07-05T23:41:32Z',
  modifiedAt: '2022-07-05T23:41:32Z',
  tryRow: {
    create: {
      correct: true,
      updatedAt: '2022-07-05T23:41:32Z',
      game: {
        create: {
          name: 'String',
          startedAt: '2022-07-05T23:41:32Z',
          correct: true,
          duration: 9770944,
          updatedAt: '2022-07-05T23:41:32Z',
          user: {
            create: {
              username: username,
              email: email,
              hashedPassword: 'String',
              salt: 'String',
              updatedAt: '2022-07-05T23:41:32Z',
              userSetting: {
                create: {
                  updatedAt: '2022-07-05T23:41:32Z',
                  Language: {
                    create: {
                      name: 'String',
                      code: code,
                      updatedAt: '2022-07-05T23:41:32Z',
                    },
                  },
                },
              },
            },
          },
          word: {
            create: {
              word: word,
              size: size,
              source: 'String',
              updatedAt: '2022-07-05T23:41:32Z',
              Language: {
                create: {
                  name: 'String',
                  code: code,
                  updatedAt: '2022-07-05T23:41:32Z',
                },
              },
            },
          },
          wordsBank: {
            create: {
              name: name,
              updatedAt: '2022-07-05T23:41:32Z',
              Language: {
                create: {
                  name: 'String',
                  code: code,
                  updatedAt: '2022-07-05T23:41:32Z',
                },
              },
            },
          },
        },
      },
    },
  },
})

export const standard = defineScenario<Prisma.LetterCreateArgs>({
  letter: {
    one: {
      data: createLetterData('String9371451', 'String1385091', 'String9860349', 3285798, 'String8483236', 'String4456661'),
    },
    two: {
      data: createLetterData('String842827', 'String5041810', 'String9084817', 2830584, 'String7069418', 'String7214929'),
    },
  },
})

export type StandardScenario = typeof standard
