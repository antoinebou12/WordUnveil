import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  LetterResolvers,
} from 'types/graphql'

const Query: QueryResolvers = {
  letters: () => db.letter.findMany(),
  letter: ({ id }) => db.letter.findUnique({ where: { id } }),
}

const Mutation: MutationResolvers = {
  createLetter: ({ input }) => db.letter.create({ data: input }),
  updateLetter: ({ id, input }) =>
    db.letter.update({
      data: input,
      where: { id },
    }),
  deleteLetter: ({ id }) => db.letter.delete({ where: { id } }),
}

const Letter: LetterResolvers = {
  tryRow: (_obj, { root }) => db.letter.findUnique({ where: { id: root.id } }).tryRow(),
}

export { Query, Mutation, Letter }
