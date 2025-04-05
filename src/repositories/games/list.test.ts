import listGames from './list'
import dynamoDb from '../dynamo/base'
import { Game } from '~/models/game'
import { mock } from 'jest-mock-extended'

jest.mock('../dynamo/base')

describe('Repositories - Games - List', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  const dynamoDbMock = jest.mocked(dynamoDb) as jest.Mocked<{
    send: jest.Mock;
  }>

  it('should return a list of games when DynamoDB returns items', async () => {

    const game1 = mock<Game>({})
    const game2 = mock<Game>({})

    const mockGames: Game[] = [
      game1,
      game2,
    ]

    dynamoDbMock.send.mockResolvedValueOnce({ Items: mockGames })

    const result = await listGames()

    expect(dynamoDb.send).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          TableName: 'neytrack-games-test',
        },
      })
    )
    expect(dynamoDb.send).toHaveBeenCalledTimes(1)
    expect(result).toEqual(mockGames)
  })

  it('should return an empty array when DynamoDB returns no items', async () => {
    dynamoDbMock.send.mockResolvedValueOnce({ Items: undefined })

    const result = await listGames()

    expect(dynamoDb.send).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          TableName: 'neytrack-games-test',
        },
      })
    )
    expect(dynamoDb.send).toHaveBeenCalledTimes(1)
    expect(result).toEqual([])
  })

  it('should throw an error when DynamoDB throws an error', async () => {
    const mockError = new Error('DynamoDB error')

    dynamoDbMock.send.mockRejectedValueOnce(mockError)

    await expect(listGames()).rejects.toThrow('Could not fetch games')

    expect(dynamoDb.send).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          TableName: 'neytrack-games-test',
        },
      })
    )
    expect(dynamoDb.send).toHaveBeenCalledTimes(1)
  })
})