import listGamesMain from './main'
import listGames from '~/repositories/games/list'
import { Game } from '~/models/game'

import { mock } from 'jest-mock-extended'

jest.mock('~/repositories/games/list')

describe('Controllers - List - Main', () => {
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
    ];

    (listGames as jest.Mock).mockResolvedValue(mockGames)

    const result = await listGamesMain()

    expect(listGames).toHaveBeenCalledTimes(1)
    expect(result).toEqual(mockGames)
  })
})