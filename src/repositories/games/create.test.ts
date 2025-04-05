import { PutItemCommand } from '@aws-sdk/client-dynamodb'
import { client } from '../dynamo/base'
import createGame from './create'
import { Game } from '~/models/game'

jest.mock('@aws-sdk/client-dynamodb', () => ({
  PutItemCommand: jest.fn()
}))

jest.mock('../dynamo/base', () => ({
  client: {
    send: jest.fn()
  }
}))

jest.mock('@aws-sdk/client-dynamodb')
jest.mock('../dynamo/base')

describe('Repositories - Games - Create', () => {
  const clientMock = jest.mocked(client)

  const mockGame: Game = {
    id: 'game-123',
    started: false,
    homeTeam: 'Team A',
    awayTeam: 'Team B'
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should successfully insert an item into DynamoDB', async () => {
    clientMock.send.mockResolvedValue(undefined as never)

    await expect(createGame(mockGame)).resolves.toBeUndefined()

    expect(PutItemCommand).toHaveBeenCalledWith({
      TableName: 'neytrack-games-test',
      Item: {
        id: { S: mockGame.id },
        started: { BOOL: mockGame.started },
        homeTeam: { S: mockGame.homeTeam },
        awayTeam: { S: mockGame.awayTeam }
      }
    })
    expect(client.send).toHaveBeenCalledTimes(1)
  })

  it('should throw an error if DynamoDB insertion fails', async () => {
    const mockError = new Error('DynamoDB error')
    clientMock.send.mockRejectedValueOnce(mockError as never)

    await expect(createGame(mockGame)).rejects.toThrow('DynamoDB error')

    expect(PutItemCommand).toHaveBeenCalledWith({
      TableName: 'neytrack-games-test',
      Item: {
        id: { S: mockGame.id },
        started: { BOOL: mockGame.started },
        homeTeam: { S: mockGame.homeTeam },
        awayTeam: { S: mockGame.awayTeam }
      }
    })

    expect(client.send).toHaveBeenCalledTimes(1)
  })
})