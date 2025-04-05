import { deleteGame } from './delete'
import { client } from '../dynamo/base'

jest.mock('../dynamo/base', () => ({
  client: {
    send: jest.fn(),
  },
}))

describe('Repositories - Games - Delete', () => {
  const gameId = 'test-game-id'

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { })
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should delete a game successfully', async () => {
    (client.send as jest.Mock).mockResolvedValueOnce({})

    await expect(deleteGame(gameId)).resolves.toBeUndefined()

    expect(client.send).toHaveBeenCalledTimes(1)
    expect(client.send).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          TableName: 'neytrack-games-test',
          Key: {
            id: { S: gameId },
          },
        },
      })
    )
  })

  it('should throw an error if deletion fails', async () => {
    const error = new Error('Deletion failed')
      ; (client.send as jest.Mock).mockRejectedValueOnce(error)

    await expect(deleteGame(gameId)).rejects.toThrow('Deletion failed')

    expect(client.send).toHaveBeenCalledTimes(1)
    expect(client.send).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          TableName: 'neytrack-games-test',
          Key: {
            id: { S: gameId },
          },
        },
      })
    )
  })
})