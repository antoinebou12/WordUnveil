import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  WordBankResolvers,
} from 'types/graphql'

// Error handling for WordBank not found
async function findWordBankOrFail(id) {
  const wordBank = await db.wordBank.findUnique({ where: { id } })
  if (!wordBank) {
    throw new Error(`WordBank with ID ${id} does not exist`)
  }
  return wordBank
}

export const wordBanks: QueryResolvers['wordBanks'] = () => {
  return db.wordBank.findMany()
}

export const wordBank: QueryResolvers['wordBank'] = async ({ id }) => {
  return await findWordBankOrFail(id)
}

export const findWordBankbyName: QueryResolvers['findWordBankByName'] = ({ name }) => {
  return db.wordBank.findUnique({
    where: {
      name: name
    },
  })
}

export const createWordBank: MutationResolvers['createWordBank'] = ({
  input,
}) => {
  return db.wordBank.create({
    data: input,
  })
}

export const updateWordBank: MutationResolvers['updateWordBank'] = async ({
  id,
  input,
}) => {
  await findWordBankOrFail(id)
  return db.wordBank.update({
    data: input,
    where: { id },
  })
}

export const deleteWordBank: MutationResolvers['deleteWordBank'] = async ({ id }) => {
  await findWordBankOrFail(id)
  return db.wordBank.delete({
    where: { id },
  })
}

export const WordBank: WordBankResolvers = {
  Language: (_obj, { root }) =>
    db.wordBank.findUnique({ where: { id: root.id } }).Language(),
  Word: (_obj, { root }) =>
    db.wordBank.findUnique({ where: { id: root.id } }).Word(),
  Game: (_obj, { root }) =>
    db.wordBank.findUnique({ where: { id: root.id } }).Game(),
}
