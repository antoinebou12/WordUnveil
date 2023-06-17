import { letters, letter, createLetter, updateLetter, deleteLetter } from './letters'
import type { StandardScenario } from './letters.scenarios'

const createInput = (letterString: string, scenario: StandardScenario) => ({
  input: {
    letter: letterString,
    tryRowId: scenario.letter.two.tryRowId,
    createdAt: '2022-07-05T23:41:32Z',
    modifiedAt: '2022-07-05T23:41:32Z',
  },
})

describe('letters', () => {
  let scenario: StandardScenario

  beforeEach(() => {
    scenario = /* add code to initialize your scenario */
  })

  it('should return all letters', async () => {
    const result = await letters()
    expect(result.length).toEqual(Object.keys(scenario.letter).length)
  })

  it('should return a single letter', async () => {
    const result = await letter({ id: scenario.letter.one.id })
    expect(result).toEqual(scenario.letter.one)
  })

  it('should create a letter', async () => {
    const result = await createLetter(createInput('String', scenario))
    expect(result).toEqual(createInput('String', scenario).input)
  })

  it('should update a letter', async () => {
    const original = await letter({ id: scenario.letter.one.id })
    const result = await updateLetter({ id: original.id, input: { letter: 'String2' } })
    expect(result.letter).toEqual('String2')
  })

  it('should delete a letter', async () => {
    const original = await deleteLetter({ id: scenario.letter.one.id })
    const result = await letter({ id: original.id })
    expect(result).toEqual(null)
  })
})
