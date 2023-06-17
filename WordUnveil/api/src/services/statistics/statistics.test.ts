import {
  statistics,
  statistic,
  createStatistic,
  updateStatistic,
  deleteStatistic,
} from './statistics'
import type { StandardScenario } from './statistics.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('statistics', () => {

  // Test to check if all statistics are returned
  scenario('returns all statistics', async (scenario: StandardScenario) => {
    const result = await statistics()

    expect(result.length).toEqual(Object.keys(scenario.statistic).length)
  })

  // Test to check if a single statistic is returned
  scenario('returns a single statistic', async (scenario: StandardScenario) => {
    const result = await statistic({ id: scenario.statistic.one.id })

    expect(result).toEqual(scenario.statistic.one)
  })

  // Test to check if a statistic is created
  scenario('creates a statistic', async () => {
    const result = await createStatistic({
      input: { updatedAt: '2022-07-05T23:41:59Z' },
    })

    expect(result.updatedAt).toEqual('2022-07-05T23:41:59Z')
  })

  // Test to check if a statistic is updated
  scenario('updates a statistic', async (scenario: StandardScenario) => {
    const original = await statistic({ id: scenario.statistic.one.id })
    const result = await updateStatistic({
      id: original.id,
      input: { updatedAt: '2022-07-06T23:41:59Z' },
    })

    expect(result.updatedAt).toEqual('2022-07-06T23:41:59Z')
  })

  // Test to check if a statistic is deleted
  scenario('deletes a statistic', async (scenario: StandardScenario) => {
    const original = await deleteStatistic({ id: scenario.statistic.one.id })
    const result = await statistic({ id: original.id })

    expect(result).toEqual(null)
  })

  // Negative test scenario: tries to fetch a non-existing statistic
  scenario('fetches non-existing statistic', async () => {
    const result = await statistic({ id: 'non-existing-id' })

    expect(result).toEqual(null)
  })
})
