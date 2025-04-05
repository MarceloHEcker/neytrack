import getGame from './get'
import dynamoDb from '../dynamo/base'

jest.mock('../dynamo/base')

describe('Repositories - Games - Get', () => {

  const dynamoDbMock = jest.mocked(dynamoDb) as jest.Mocked<{
    send: jest.Mock;
  }>

  const mockGame = {
    id: '123',
    started: true,
    homeTeam: 'Santos',
    awayTeam: 'Palmeiras',
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return a game when it exists in the database', async () => {
    dynamoDbMock.send.mockResolvedValue({ Item: mockGame })

    const result = await getGame('123')

    expect(dynamoDbMock.send).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          TableName: 'neytrack-games-test',
          Key: { id: '123' },
        },
      })
    )
    expect(result).toEqual(mockGame)
  })

  it('should throw an error when the game does not exist', async () => {
    dynamoDbMock.send.mockResolvedValueOnce({ Item: undefined })

    await expect(getGame('456')).rejects.toThrow('Game with ID 456 not found')

    expect(dynamoDbMock.send).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          TableName: 'neytrack-games-test',
          Key: { id: '456' },
        },
      })
    )
  })

  it('should throw an error when there is an issue with DynamoDB', async () => {
    const error = new Error('DynamoDB error')
    dynamoDbMock.send.mockRejectedValueOnce(error)

    await expect(getGame('789')).rejects.toThrow('DynamoDB error')

    expect(dynamoDbMock.send).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          TableName: 'neytrack-games-test',
          Key: { id: '789' },
        },
      })
    )
  })
})