import { APIGatewayProxyEvent } from 'aws-lambda'

import main from './main'
import createGame from '~/repositories/games/create'

jest.mock('~/repositories/games/create')

describe('Controllers - Create - Main', () => {
  const createGameMock = jest.mocked(createGame)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 400 if request body is missing', async () => {
    const event = {
      body: null,
    } as unknown as APIGatewayProxyEvent

    const result = await main(event)

    expect(result.statusCode).toEqual(400)
    expect(result.body).toEqual(
      JSON.stringify({ message: 'Request body is required' })
    )
    expect(createGameMock).not.toHaveBeenCalled()
  })

  it('should return 400 if request body is invalid', async () => {
    const event = {
      pathParameters: { id: 'game1' },
      body: JSON.stringify({
        homeTeam: 'Team A',
        awayTeam: 'Team B',
        started: 'not-a-boolean',
      }),
    } as unknown as APIGatewayProxyEvent

    const result = await main(event)

    expect(result.statusCode).toEqual(400)
    expect(createGameMock).not.toHaveBeenCalled()
  })

  it('should create the game and return 201 on success', async () => {
    const event = {
      pathParameters: { id: 'game1' },
      body: JSON.stringify({
        id: 'game1',
        homeTeam: 'Team A',
        awayTeam: 'Team B',
        started: true,
      }),
    } as unknown as APIGatewayProxyEvent

    createGameMock.mockResolvedValueOnce(undefined)

    const result = await main(event)

    expect(result.statusCode).toEqual(201)
    expect(result.body).toEqual(
      JSON.stringify({ result: 'success', message: 'Game created successfully' })
    )
    expect(createGameMock).toHaveBeenCalledTimes(1)
    expect(createGameMock).toHaveBeenCalledWith({
      id: 'game1',
      homeTeam: 'Team A',
      awayTeam: 'Team B',
      started: true,
    })
  })
})
