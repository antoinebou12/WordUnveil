import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  StatisticResolvers,
} from 'types/graphql'

// Query resolvers
export const statistics: QueryResolvers['statistics'] = () => {
  return db.statistic.findMany()
}

export const statistic: QueryResolvers['statistic'] = ({ id }) => {
  return db.statistic.findUnique({
    where: { id },
  })
}

// Mutation resolvers
export const createStatistic: MutationResolvers['createStatistic'] = ({ input }) => {
  return db.statistic.create({ data: input })
}

export const updateStatistic: MutationResolvers['updateStatistic'] = ({ id, input }) => {
  return db.statistic.update({
    data: input,
    where: { id },
  })
}

export const deleteStatistic: MutationResolvers['deleteStatistic'] = ({ id }) => {
  return db.statistic.delete({ where: { id } })
}

// Other resolvers
export const Statistic: StatisticResolvers = {
  user: (_obj, { root }) => db.statistic.findUnique({ where: { id: root.id } }).user(),
  game: (_obj, { root }) => db.statistic.findUnique({ where: { id: root.id } }).game(),  // 'Game' changed to 'game'
}
