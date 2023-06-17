import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  UserResolvers,
} from 'types/graphql'

// Query resolvers
export const users: QueryResolvers['users'] = () => {
  // Fetch all users from the database
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  // Fetch a single user by ID from the database
  return db.user.findUnique({
    where: { id },
  })
}

// Mutation resolvers
export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  // Create a new user with provided data
  return db.user.create({
    data: input,
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  // Update an existing user by ID with provided data
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  // Remove an existing user by ID
  return db.user.delete({
    where: { id },
  })
}

// User type resolvers
export const User: UserResolvers = {
  userSetting: (_obj, { root }) =>
    // Resolve userSetting field for a User
    db.user.findUnique({ where: { id: root.id } }).userSetting(),
  Game: (_obj, { root }) =>
    // Resolve Game field for a User
    db.user.findUnique({ where: { id: root.id } }).Game(),
  Statistics: (_obj, { root }) =>
    // Resolve Statistics field for a User
    db.user.findUnique({ where: { id: root.id } }).Statistics(),
}
