import { Game } from '~/models/game'
import createGame from '~/repositories/games/create'

export interface CreateGameParams {
  body: {
    id: string
    started: boolean
    homeTeam: string
    awayTeam: string
  }
}

const createGameHandler = async (event: CreateGameParams) => {
  const { id, started, homeTeam, awayTeam } =
    event.body

  const game: Game = {
    id,
    homeTeam,
    awayTeam,
    started
  }

  await createGame(game)

  const response = { result: 'success', message: 'game saved correctly' }
  return { statusCode: 201, body: JSON.stringify(response) }
}

export default createGameHandler