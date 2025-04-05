import { mock } from 'jest-mock-extended'

import main from './main'
import getGame from '~/repositories/games/get'
import { Game } from '~/models/game'
import { APIGatewayProxyEvent } from 'aws-lambda'

jest.mock('~/repositories/games/get')

describe('Controllers - Get - Main', () => {

  const getGameMock = jest.mocked(getGame)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return a game', async () => {

    const game1 = mock<Game>({
      id: 'game1',
    })

    getGameMock.mockResolvedValue(game1)

    const event = mock<APIGatewayProxyEvent>({
      pathParameters: {
        id: 'game1',
      },
    })

    const result = await main(event)
    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual(JSON.stringify(game1))

    expect(getGameMock).toHaveBeenCalledTimes(1)
    expect(getGameMock).toHaveBeenCalledWith('game1')
  })

  it('should return 400 if param is not informed', async () => {

    const event = mock<APIGatewayProxyEvent>({
      pathParameters: {
        id: undefined,
      },
    })

    const result = await main(event)
    expect(result.statusCode).toEqual(400)
    expect(result.body).toEqual(JSON.stringify({ message: 'Path parameter "id" is required' }))

    expect(getGameMock).not.toHaveBeenCalled()
  })

  it('should return 404 if game is not found', async () => {

    const event = mock<APIGatewayProxyEvent>({
      pathParameters: {
        id: 'game1',
      },
    })

    getGameMock.mockResolvedValue(undefined as unknown as Game)

    const result = await main(event)
    expect(result.statusCode).toEqual(404)
    expect(result.body).toEqual(JSON.stringify({ message: 'Game not found' }))

    expect(getGameMock).toHaveBeenCalledTimes(1)
    expect(getGameMock).toHaveBeenCalledWith('game1')
  })


})