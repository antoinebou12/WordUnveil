import { users, user, createUser, updateUser, deleteUser } from './users'
import type { StandardScenario } from './users.scenarios'

describe('User Service Tests', () => {
  scenario('Returns all users', async (scenario: StandardScenario) => {
    const allUsers = await users()
    expect(allUsers.length).toEqual(Object.keys(scenario.user).length)
  })

  scenario('Returns a specific user', async (scenario: StandardScenario) => {
    const specificUser = await user({ id: scenario.user.one.id })
    expect(specificUser).toEqual(scenario.user.one)
  })

  scenario('Creates a new user', async (scenario: StandardScenario) => {
    const newUser = await createUser({
      input: {
        username: 'NewUser',
        email: 'newuser@example.com',
        hashedPassword: 'hashedpassword',
        salt: 'salt',
        userSettingId: scenario.user.two.userSettingId,
        updatedAt: '2023-06-17T00:00:00Z',
      },
    })

    expect(newUser).toEqual({
      username: 'NewUser',
      email: 'newuser@example.com',
      hashedPassword: 'hashedpassword',
      salt: 'salt',
      userSettingId: scenario.user.two.userSettingId,
      updatedAt: '2023-06-17T00:00:00Z',
    })
  })

  scenario('Updates an existing user', async (scenario: StandardScenario) => {
    const originalUser = await user({ id: scenario.user.one.id })
    const updatedUser = await updateUser({
      id: originalUser.id,
      input: { username: 'UpdatedUsername', email: 'updatedemail@example.com' },
    })

    expect(updatedUser.username).toEqual('UpdatedUsername')
    expect(updatedUser.email).toEqual('updatedemail@example.com')
  })

  scenario('Deletes a user', async (scenario: StandardScenario) => {
    const deletedUser = await deleteUser({ id: scenario.user.one.id })
    const result = await user({ id: deletedUser.id })

    expect(result).toBeNull()
  })
})
