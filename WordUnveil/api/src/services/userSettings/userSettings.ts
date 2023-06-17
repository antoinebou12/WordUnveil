import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  UserSettingResolvers,
} from 'types/graphql'

export const userSettings: QueryResolvers['userSettings'] = () => {
  return db.userSetting.findMany()
}

export const userSetting: QueryResolvers['userSetting'] = async ({ id }) => {
  const setting = await db.userSetting.findUnique({ where: { id } })
  if (!setting) {
    throw new Error(`UserSetting with ID ${id} not found`)
  }
  return setting
}

export const createUserSetting: MutationResolvers['createUserSetting'] = async ({ input }) => {
  return await db.userSetting.create({ data: input });
}

export const updateUserSetting: MutationResolvers['updateUserSetting'] = async ({ id, input }) => {
  return await db.userSetting.update({ data: input, where: { id } });
}

export const deleteUserSetting: MutationResolvers['deleteUserSetting'] = async ({ id }) => {
  return await db.userSetting.delete({ where: { id } });
}

export const UserSetting: UserSettingResolvers = {
  Language: async (_obj, { root }) => {
    return await db.userSetting.findUnique({ where: { id: root.id } }).Language()
  },
  User: async (_obj, { root }) => {
    return await db.userSetting.findUnique({ where: { id: root.id } }).User()
  },
}
