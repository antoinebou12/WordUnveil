import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  TryRowResolvers,
} from 'types/graphql'

// Query resolvers
export const tryRows: QueryResolvers['tryRows'] = () => {
  // Fetches all rows from the TryRow table
  return db.tryRow.findMany()
}

export const tryRow: QueryResolvers['tryRow'] = ({ id }) => {
  // Fetches a unique row from the TryRow table by ID
  return db.tryRow.findUnique({
    where: { id },
  })
}

// Mutation resolvers
export const createTryRow: MutationResolvers['createTryRow'] = ({ input }) => {
  // Creates a new row in the TryRow table
  return db.tryRow.create({
    data: input,
  })
}

export const updateTryRow: MutationResolvers['updateTryRow'] = ({
  id,
  input,
}) => {
  // Updates a specific row in the TryRow table by ID
  return db.tryRow.update({
    data: input,
    where: { id },
  })
}

export const deleteTryRow: MutationResolvers['deleteTryRow'] = ({ id }) => {
  // Deletes a specific row from the TryRow table by ID
  return db.tryRow.delete({
    where: { id },
  })
}

// Resolver to fetch related data
export const TryRow: TryRowResolvers = {
  game: (_obj, { root }) =>
    // Fetches the game related to the row
    db.tryRow.findUnique({ where: { id: root.id } }).game(),
  letters: (_obj, { root }) =>
    // Fetches the letters related to the row
    db.tryRow.findUnique({ where: { id: root.id } }).letters(),
}
