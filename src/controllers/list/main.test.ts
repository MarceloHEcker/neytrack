import listGamesMain from './main'
import listGames from '~/repositories/games/list'
import { Game } from '~/models/game'

import { mock } from 'jest-mock-extended'

jest.mock('~/repositories/games/list')

describe('Controllers - List - Main', () => {

  const listGamesMock = jest.mocked(listGames)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return a list of games', async () => {

    const game1 = mock<Game>({
      id: 'game1',
    })

    const game2 = mock<Game>({
      id: 'game2',
    })

    const mockGames: Game[] = [
      game1,
      game2,
    ]

    listGamesMock.mockResolvedValue(mockGames)

    const result = await listGamesMain()
    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual(JSON.stringify(mockGames))

    expect(listGames).toHaveBeenCalledTimes(1)
    expect(listGames).toHaveBeenCalledWith()
  })
})