import { Game } from '~/models/game'
import listGames from '~/repositories/games/list'

const listGamesMain = async (): Promise<Game[]> => {
  const games = await listGames()
  return games
}

export default listGamesMain