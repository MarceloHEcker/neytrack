import updateGameHandler from '../update/main'
import updateGame from '~/repositories/games/update'
import { APIGatewayProxyEvent } from 'aws-lambda'

jest.mock('~/repositories/games/update')

describe('Controllers - Update - Main', () => {
  const updateGameMock = jest.mocked(updateGame)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 400 if path parameter "id" is missing', async () => {
    const event = {
      pathParameters: null,
      body: JSON.stringify({
        homeTeam: 'Team A',
        awayTeam: 'Team B',
        started: true,
      }),
    } as unknown as APIGatewayProxyEvent

    const result = await updateGameHandler(event)

    expect(result.statusCode).toEqual(400)
    expect(result.body).toEqual(
      JSON.stringify({ message: 'Path parameter "id" is required' })
    )
    expect(updateGame).not.toHaveBeenCalled()
  })

  it('should return 400 if request body is missing', async () => {
    const event = {
      pathParameters: { id: 'game1' },
      body: null,
    } as unknown as APIGatewayProxyEvent

    const result = await updateGameHandler(event)

    expect(result.statusCode).toEqual(400)
    expect(result.body).toEqual(
      JSON.stringify({ message: 'Request body is required' })
    )
    expect(updateGame).not.toHaveBeenCalled()
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

    const result = await updateGameHandler(event)

    expect(result.statusCode).toEqual(400)
    expect(updateGame).not.toHaveBeenCalled()
  })

  it('should update the game and return 201 on success', async () => {
    const event = {
      pathParameters: { id: 'game1' },
      body: JSON.stringify({
        homeTeam: 'Team A',
        awayTeam: 'Team B',
        started: true,
      }),
    } as unknown as APIGatewayProxyEvent

    updateGameMock.mockResolvedValueOnce(undefined)

    const result = await updateGameHandler(event)

    expect(result.statusCode).toEqual(201)
    expect(result.body).toEqual(
      JSON.stringify({ result: 'success', message: 'Game updated correctly' })
    )
    expect(updateGame).toHaveBeenCalledTimes(1)
    expect(updateGame).toHaveBeenCalledWith({
      gameId: 'game1',
      updateData: {
        homeTeam: 'Team A',
        awayTeam: 'Team B',
        started: true,
      },
    })
  })
})
