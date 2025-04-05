import { UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import updateGame from './update'
import { client } from '../dynamo/base'

jest.mock('@aws-sdk/client-dynamodb', () => ({
  UpdateItemCommand: jest.fn(),
}))

jest.mock('../dynamo/base', () => ({
  client: {
    send: jest.fn(),
  },
}))

describe('Repositories - Games - Update', () => {
  const mockGameId = 'game123'
  const mockUpdateData = {
    started: true,
    homeTeam: 'Team A',
    awayTeam: 'Team B',
  }

  const mockParams = {
    TableName: 'neytrack-games-test',
    Key: {
      id: { S: mockGameId },
    },
    UpdateExpression: 'SET #started = :started, #homeTeam = :homeTeam, #awayTeam = :awayTeam',
    ExpressionAttributeNames: {
      '#started': 'started',
      '#homeTeam': 'homeTeam',
      '#awayTeam': 'awayTeam',
    },
    ExpressionAttributeValues: {
      ':started': { BOOL: mockUpdateData.started },
      ':homeTeam': { S: mockUpdateData.homeTeam },
      ':awayTeam': { S: mockUpdateData.awayTeam },
    },
  }

  const clientMock = jest.mocked(client)

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call UpdateItemCommand with correct parameters and send the command', async () => {

    await updateGame({ gameId: mockGameId, updateData: mockUpdateData })

    expect(UpdateItemCommand).toHaveBeenCalledWith(mockParams)
    expect(clientMock.send).toHaveBeenCalledWith(expect.any(UpdateItemCommand))
    expect(clientMock.send).toHaveBeenCalledTimes(1)
  })

  it('should throw an error if client.send fails', async () => {
    const mockError = new Error('DynamoDB error')
    clientMock.send.mockRejectedValue(mockError as never)

    await expect(updateGame({ gameId: mockGameId, updateData: mockUpdateData })).rejects.toThrow(
      'DynamoDB error'
    )

    expect(UpdateItemCommand).toHaveBeenCalledWith(mockParams)
    expect(client.send).toHaveBeenCalledWith(expect.any(UpdateItemCommand))
  })
})