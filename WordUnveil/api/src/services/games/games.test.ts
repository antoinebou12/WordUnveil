import { games, game, createGame, updateGame, deleteGame } from './games'
import type { StandardScenario } from './games.scenarios'

describe('games', () => {
  scenario('should return all games', async (scenario: StandardScenario) => {
    const result = await games()

    expect(result.length).toEqual(Object.keys(scenario.game).length)
  })

  scenario('should return a specific game when given an id', async (scenario: StandardScenario) => {
    const result = await game({ id: scenario.game.one.id })

    expect(result).toEqual(scenario.game.one)
  })

  scenario('should create a new game with given details', async (scenario: StandardScenario) => {
    const result = await createGame({
      input: {
        name: 'String',
        startedAt: '2022-07-05T23:41:17Z',
        correct: true,
        duration: 6267650,
        userId: scenario.game.two.userId,
        wordId: scenario.game.two.wordId,
        wordsBankId: scenario.game.two.wordsBankId,
        statisticsId: scenario.game.two.statisticsId,
        updatedAt: '2022-07-05T23:41:17Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.startedAt).toEqual('2022-07-05T23:41:17Z')
    expect(result.correct).toEqual(true)
    expect(result.duration).toEqual(6267650)
    expect(result.userId).toEqual(scenario.game.two.userId)
    expect(result.wordId).toEqual(scenario.game.two.wordId)
    expect(result.wordsBankId).toEqual(scenario.game.two.wordsBankId)
    expect(result.statisticsId).toEqual(scenario.game.two.statisticsId)
    expect(result.updatedAt).toEqual('2022-07-05T23:41:17Z')
  })

  scenario('should update a game with new details', async (scenario: StandardScenario) => {
    const original = await game({ id: scenario.game.one.id })
    const result = await updateGame({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('should delete a game when given an id', async (scenario: StandardScenario) => {
    const original = await deleteGame({ id: scenario.game.one.id })
    const result = await game({ id: original.id })

    expect(result).toEqual(null)
  })
  scenario('should throw an error when trying to create a game with a name that already exists', async (scenario: StandardScenario) => {
    await expect(
      createGame({
        input: {
          name: scenario.game.one.name,
          startedAt: '2022-07-05T23:41:17Z',
          correct: true,
          duration: 6267650,
          userId: scenario.game.two.userId,
          wordId: scenario.game.two.wordId,
          wordsBankId: scenario.game.two.wordsBankId,
          statisticsId: scenario.game.two.statisticsId,
          updatedAt: '2022-07-05T23:41:17Z',
        },
      })
    ).rejects.toThrow('Game with the given name already exists')
  })
})
