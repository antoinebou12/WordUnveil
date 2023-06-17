import {
  wordBanks,
  wordBank,
  createWordBank,
  updateWordBank,
  deleteWordBank,
} from './wordBanks'
import type { StandardScenario } from './wordBanks.scenarios'

describe('wordBanks', () => {
  scenario('returns all wordBanks', async (scenario: StandardScenario) => {
    const result = await wordBanks()

    expect(result.length).toEqual(Object.keys(scenario.wordBank).length)
    expect(result[0]).toHaveProperty('id')
    expect(result[0]).toHaveProperty('name')
    expect(result[0]).toHaveProperty('Language')
  })

  scenario('returns a single wordBank', async (scenario: StandardScenario) => {
    const result = await wordBank({ id: scenario.wordBank.english.id })

    expect(result).toEqual(scenario.wordBank.english)
  })

  scenario('creates a wordBank', async (scenario: StandardScenario) => {
    const newWordBank = {
      name: 'French Word Bank',
      languageId: scenario.wordBank.spanish.languageId,
      updatedAt: new Date().toISOString(),
    }

    const result = await createWordBank({ input: newWordBank })

    expect(result.name).toEqual(newWordBank.name)
    expect(result.languageId).toEqual(newWordBank.languageId)
    expect(new Date(result.updatedAt)).toBeInstanceOf(Date)
  })

  scenario('updates a wordBank', async (scenario: StandardScenario) => {
    const original = await wordBank({ id: scenario.wordBank.english.id })
    const updatedName = 'Updated English Word Bank'

    const result = await updateWordBank({
      id: original.id,
      input: { name: updatedName },
    })

    expect(result.name).toEqual(updatedName)
  })

  scenario('deletes a wordBank', async (scenario: StandardScenario) => {
    const original = await deleteWordBank({ id: scenario.wordBank.english.id })
    const result = await wordBank({ id: original.id })

    expect(result).toEqual(null)
  })
})
