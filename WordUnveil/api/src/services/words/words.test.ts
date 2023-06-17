import { words, word, createWord, updateWord, deleteWord } from './words'
import type { StandardScenario } from './words.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('word service', () => {
  scenario('fetches all words', async (scenario: StandardScenario) => {
    const result = await words()

    expect(result.length).toEqual(Object.keys(scenario.word).length)
  })

  scenario('fetches a single word by ID', async (scenario: StandardScenario) => {
    const result = await word({ id: scenario.word.one.id })

    expect(result).toEqual(scenario.word.one)
  })

  scenario('creates a word with valid inputs', async (scenario: StandardScenario) => {
    const newWord = {
      word: 'TestWord',
      size: 123456,
      source: 'TestSource',
      languageId: scenario.word.two.languageId,
      updatedAt: new Date().toISOString(),
    }

    const result = await createWord({ input: newWord })

    expect(result.word).toEqual(newWord.word)
    expect(result.size).toEqual(newWord.size)
    expect(result.source).toEqual(newWord.source)
    expect(result.languageId).toEqual(newWord.languageId)
    expect(new Date(result.updatedAt)).toEqual(new Date(newWord.updatedAt))
  })

  scenario('updates a word with valid ID and inputs', async (scenario: StandardScenario) => {
    const original = await word({ id: scenario.word.one.id })
    const result = await updateWord({
      id: original.id,
      input: { word: 'UpdatedTestWord' },
    })

    expect(result.word).toEqual('UpdatedTestWord')
  })

  scenario('deletes a word with valid ID', async (scenario: StandardScenario) => {
    const original = await deleteWord({ id: scenario.word.one.id })
    const result = await word({ id: original.id })

    expect(result).toEqual(null)
  })
  
  // You could also add some failure scenarios
  scenario('fails to fetch a word with invalid ID', async () => {
    await expect(word({ id: 'invalid' })).rejects.toThrow()
  })

  scenario('fails to create a word with invalid inputs', async () => {
    const invalidWord = {
      word: '', // empty string
      size: -123, // negative number
      source: '', // empty string
      languageId: 'invalid', // invalid language ID
      updatedAt: 'invalid date', // invalid date
    }
    
    await expect(createWord({ input: invalidWord })).rejects.toThrow()
  })
})

