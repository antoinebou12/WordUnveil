import type { Prisma } from '@prisma/client'
import faker from 'faker'

type UserArgs = {
  username: string
  email: string
  languageCode: string
}

type WordArgs = {
  word: string
  size: number
  languageCode: string
}

type WordsBankArgs = {
  name: string
  languageCode: string
}

// Helper function to generate a user with associated settings and language
const createUser = ({ username, email, languageCode }: UserArgs) => ({
  create: {
    username,
    email,
    hashedPassword: faker.random.alphaNumeric(10),
    salt: faker.random.alphaNumeric(10),
    updatedAt: new Date().toISOString(),
    userSetting: {
      create: {
        updatedAt: new Date().toISOString(),
        Language: {
          create: {
            name: 'String',
            code: languageCode,
            updatedAt: new Date().toISOString(),
          },
        },
      },
    },
  },
})

// Helper function to generate a word with associated language
const createWord = ({ word, size, languageCode }: WordArgs) => ({
  create: {
    word,
    size,
    source: faker.random.word(),
    updatedAt: new Date().toISOString(),
    Language: {
      create: {
        name: 'String',
        code: languageCode,
        updatedAt: new Date().toISOString(),
      },
    },
  },
})

// Helper function to generate a wordsBank with associated language
const createWordsBank = ({ name, languageCode }: WordsBankArgs) => ({
  create: {
    name,
    updatedAt: new Date().toISOString(),
    Language: {
      create: {
        name: 'String',
        code: languageCode,
        updatedAt: new Date().toISOString(),
      },
    },
  },
})

export const standard = defineScenario<Prisma.GameCreateArgs>({
  game: {
    one: {
      data: {
        name: faker.random.word(),
        startedAt: new Date().toISOString(),
        correct: faker.random.boolean(),
        duration: faker.random.number({ min: 5000000, max: 10000000 }),
        updatedAt: new Date().toISOString(),
        user: createUser({
          username: faker.internet.userName(),
          email: faker.internet.email(),
          languageCode: faker.random.alphaNumeric(7),
        }),
        word: createWord({
          word: faker.random.word(),
          size: faker.random.number({ min: 5000000, max: 10000000 }),
          languageCode: faker.random.alphaNumeric(7),
        }),
        wordsBank: createWordsBank({
          name: faker.random.word(),
          languageCode: faker.random.alphaNumeric(7),
        }),
      },
    },
    two: {
      data: {
        name: faker.random.word(),
        startedAt: new Date().toISOString(),
        correct: faker.random.boolean(),
        duration: faker.random.number({ min: 5000000, max: 10000000 }),
        updatedAt: new Date().toISOString(),
        user: createUser({
          username: faker.internet.userName(),
          email: faker.internet.email(),
          languageCode: faker.random.alphaNumeric(7),
        }),
        word: createWord({
          word: faker.random.word(),
          size: faker.random.number({ min: 5000000, max: 10000000 }),
          languageCode: faker.random.alphaNumeric(7),
        }),
        wordsBank: createWordsBank({
          name: faker.random.word(),
          languageCode: faker.random.alphaNumeric(7),
        },
  },
})

export type StandardScenario = typeof standard
