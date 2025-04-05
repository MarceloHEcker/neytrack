import { APIGatewayProxyEvent } from 'aws-lambda'
import { z } from 'zod'

import { Game } from '~/models/game'
import createGame from '~/repositories/games/create'

// Definindo o esquema de validação com Zod
const schema = z.object({
  id: z.string().nonempty('The "id" field is required and must be a string'),
  homeTeam: z.string().optional(),
  awayTeam: z.string().optional(),
  started: z.boolean().refine((val) => typeof val === 'boolean', {
    message: 'The "started" field is required and must be a boolean',
  }),
})

const createGameHandler = async (event: APIGatewayProxyEvent) => {

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Request body is required' }),
    }
  }

  const parsedBody = schema.parse(JSON.parse(event.body))


  const { id, started, homeTeam, awayTeam } = parsedBody

  const game: Game = {
    id,
    homeTeam,
    awayTeam,
    started
  }

  console.log('game', game)

  await createGame(game)

  const response = { result: 'success', message: 'Game saved correctly' }
  return { statusCode: 201, body: JSON.stringify(response) }
}

export default createGameHandler