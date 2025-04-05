import { mock } from 'jest-mock-extended'
import { APIGatewayProxyEvent } from 'aws-lambda'


import main from './main'
import { Game } from '~/models/game'
import deleteGame from '~/repositories/games/delete'
import getGame from '~/repositories/games/get'

jest.mock('~/repositories/games/delete')
jest.mock('~/repositories/games/get')

describe('Controllers - Delete - Main', () => {

  const deleteGameMock = jest.mocked(deleteGame)
  const getGameMock = jest.mocked(getGame)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should delete a game', async () => {

    const game1 = mock<Game>({
      id: 'game1',
    })
    getGameMock.mockResolvedValue(game1)

    deleteGameMock.mockResolvedValue()

    const event = mock<APIGatewayProxyEvent>({
      pathParameters: {
        id: 'game1',
      },
    })

    const result = await main(event)
    expect(result.statusCode).toEqual(204)


    expect(getGameMock).toHaveBeenCalledTimes(1)
    expect(getGameMock).toHaveBeenCalledWith('game1')

    expect(deleteGameMock).toHaveBeenCalledTimes(1)
    expect(deleteGameMock).toHaveBeenCalledWith('game1')
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
    expect(deleteGameMock).not.toHaveBeenCalled()
  })

  it('should return 404 if game is not found', async () => {

    getGameMock.mockResolvedValue(undefined as unknown as Game)
    deleteGameMock.mockResolvedValue()

    const event = mock<APIGatewayProxyEvent>({
      pathParameters: {
        id: 'game1',
      },
    })

    const result = await main(event)
    expect(result.statusCode).toEqual(404)
    expect(result.body).toEqual(JSON.stringify({ message: 'Game not found' }))

    expect(getGameMock).toHaveBeenCalledTimes(1)
    expect(getGameMock).toHaveBeenCalledWith('game1')

    expect(deleteGameMock).not.toHaveBeenCalled()
  })


})