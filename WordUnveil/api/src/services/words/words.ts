import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  WordResolvers,
} from 'types/graphql'

// Error handling for word not found
async function findWordOrFail(id) {
  const word = await db.word.findUnique({ where: { id } })
  if (!word) {
    throw new Error(`Word with ID ${id} does not exist`)
  }
  return word
}

export const words: QueryResolvers['words'] = () => {
  return db.word.findMany()
}

export const word: QueryResolvers['word'] = async ({ id }) => {
  return await findWordOrFail(id)
}

export const findWord: QueryResolvers['findWord'] = ({ word }) => {
  return db.word.findUnique({
    where: {
      word: word
    },
  })
}

export const findWordByWordBankName: QueryResolvers['findWordByWordBankName'] = ({ name }) => {
  return db.word.findMany({
    where: {
      WordBank: {
        name: name
      }
    },
  })
}

export const createWord: MutationResolvers['createWord'] = ({ input }) => {
  return db.word.create({
    data: input,
  })
}

export const updateWord: MutationResolvers['updateWord'] = async ({ id, input }) => {
  await findWordOrFail(id)
  return db.word.update({
    data: input,
    where: { id },
  })
}

export const deleteWord: MutationResolvers['deleteWord'] = async ({ id }) => {
  await findWordOrFail(id)
  return db.word.delete({
    where: { id },
  })
}

export const Word: WordResolvers = {
  Language: (_obj, { root }) =>
    db.word.findUnique({ where: { id: root.id } }).Language(),
  Game: (_obj, { root }) =>
    db.word.findUnique({ where: { id: root.id } }).Game(),
  WordBank: (_obj, { root }) =>
    db.word.findUnique({ where: { id: root.id } }).WordBank(),
}
