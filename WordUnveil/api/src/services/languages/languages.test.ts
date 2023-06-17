import {
  languages,
  language,
  createLanguage,
  updateLanguage,
  deleteLanguage,
} from './languages'
import type { StandardScenario } from './languages.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('languages', () => {
  scenario('returns all languages', async (scenario: StandardScenario) => {
    const result = await languages()

    expect(result.length).toEqual(Object.keys(scenario.language).length)
    result.forEach(language => {
      expect(typeof language.name).toBe('string')
      expect(typeof language.code).toBe('string')
    })
  })

  scenario('returns a single language', async (scenario: StandardScenario) => {
    const result = await language({ id: scenario.language.one.id })

    expect(result).toEqual(scenario.language.one)
    expect(typeof result.name).toBe('string')
    expect(typeof result.code).toBe('string')
  })

  scenario('creates a language', async () => {
    const result = await createLanguage({
      input: {
        name: 'Test',
        code: 'TestCode',
        updatedAt: '2022-07-05T23:40:41Z',
      },
    })

    expect(result.name).toEqual('Test')
    expect(result.code).toEqual('TestCode')
    expect(result.updatedAt).toEqual('2022-07-05T23:40:41Z')
  })

  scenario('throws error when creating a language with invalid input', async () => {
    await expect(createLanguage({ input: { name: '' } })).rejects.toThrow()
  })

  scenario('updates a language', async (scenario: StandardScenario) => {
    const original = await language({ id: scenario.language.one.id })
    const result = await updateLanguage({
      id: original.id,
      input: { name: 'UpdatedName' },
    })

    expect(result.name).toEqual('UpdatedName')
  })

  scenario('throws error when updating a language that does not exist', async () => {
    await expect(updateLanguage({ id: 'nonexistent', input: { name: 'UpdatedName' } })).rejects.toThrow()
  })

  scenario('deletes a language', async (scenario: StandardScenario) => {
    const original = await deleteLanguage({ id: scenario.language.one.id })
    const result = await language({ id: original.id })

    expect(result).toEqual(null)
  })

  scenario('throws error when deleting a language that does not exist', async () => {
    await expect(deleteLanguage({ id: 'nonexistent' })).rejects.toThrow()
  })
})
