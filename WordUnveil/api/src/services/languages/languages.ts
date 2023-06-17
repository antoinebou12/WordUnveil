import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  LanguageResolvers,
} from 'types/graphql'

// A helper function to validate input data
const validateInput = (input: any) => {
  if (!input) {
    throw new Error('Input data is required')
  }
}

export const languages: QueryResolvers['languages'] = async () => {
  return await db.language.findMany()
}

export const language: QueryResolvers['language'] = async ({ id }) => {
  if (!id) {
    throw new Error('Language ID is required')
  }

  const language = await db.language.findUnique({
    where: { id },
  })

  if (!language) {
    throw new Error(`Language with ID ${id} not found`)
  }

  return language
}

export const createLanguage: MutationResolvers['createLanguage'] = async ({ input }) => {
  validateInput(input)
  return await db.language.create({ data: input })
}

export const updateLanguage: MutationResolvers['updateLanguage'] = async ({ id, input }) => {
  if (!id) {
    throw new Error('Language ID is required')
  }
  validateInput(input)
  
  const updatedLanguage = await db.language.update({
    data: input,
    where: { id },
  })

  if (!updatedLanguage) {
    throw new Error(`Could not update Language with ID ${id}`)
  }

  return updatedLanguage
}

export const deleteLanguage: MutationResolvers['deleteLanguage'] = async ({ id }) => {
  if (!id) {
    throw new Error('Language ID is required')
  }

  const deletedLanguage = await db.language.delete({ where: { id } })

  if (!deletedLanguage) {
    throw new Error(`Could not delete Language with ID ${id}`)
  }

  return deletedLanguage
}

export const Language: LanguageResolvers = {
  UserSettings: async (_obj, { root }) =>
    await db.language.findUnique({ where: { id: root.id } }).UserSettings(),
  Word: async (_obj, { root }) =>
    await db.language.findUnique({ where: { id: root.id } }).Word(),
  WordBank: async (_obj, { root }) =>
    await db.language.findUnique({ where: { id: root.id } }).WordBank(),
}