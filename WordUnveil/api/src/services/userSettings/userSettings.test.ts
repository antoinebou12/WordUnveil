import {
  userSettings,
  userSetting,
  createUserSetting,
  updateUserSetting,
  deleteUserSetting,
} from './userSettings'
import type { StandardScenario } from './userSettings.scenarios'

describe('User Settings Service', () => {
  scenario('Fetch all user settings', async (scenario: StandardScenario) => {
    const result = await userSettings()
    expect(result.length).toEqual(Object.keys(scenario.userSetting).length)
  })

  scenario(
    'Fetch a specific user setting',
    async (scenario: StandardScenario) => {
      const result = await userSetting({ id: scenario.userSetting.one.id })
      expect(result).toEqual(scenario.userSetting.one)
    }
  )

  scenario('Create a new user setting', async (scenario: StandardScenario) => {
    const newSetting = {
      input: {
        languageId: scenario.userSetting.two.languageId,
        updatedAt: new Date('2022-07-05T23:40:22Z'),
      },
    }

    const result = await createUserSetting(newSetting)
    expect(result.languageId).toEqual(newSetting.input.languageId)
    expect(new Date(result.updatedAt)).toEqual(newSetting.input.updatedAt)
  })

  scenario('Update a user setting', async (scenario: StandardScenario) => {
    const original = await userSetting({ id: scenario.userSetting.one.id })
    const updatedSetting = {
      id: original.id,
      input: { updatedAt: new Date('2022-07-06T23:40:22Z') },
    }

    const result = await updateUserSetting(updatedSetting)
    expect(new Date(result.updatedAt)).toEqual(updatedSetting.input.updatedAt)
  })

  scenario('Delete a user setting', async (scenario: StandardScenario) => {
    const deletedSetting = await deleteUserSetting({
      id: scenario.userSetting.one.id,
    })

    const result = await userSetting({ id: deletedSetting.id })
    expect(result).toBeNull()
  })
})
