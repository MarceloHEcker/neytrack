import { APIGatewayProxyEvent } from 'aws-lambda'
import { z } from 'zod'

import { Game } from '~/models/game'
import createGame from '~/repositories/games/create'
import logger from '~/utils/logger'

const schema = z.object({
  id: z.string().nonempty('The "id" field is required and must be a string'),
  homeTeam: z.string(),
  awayTeam: z.string(),
  started: z.boolean().refine((val) => typeof val === 'boolean', {
    message: 'The "started" field is required and must be a boolean',
  }),
})

/**
 * Handles the creation of a game resource.
 *
 * @param event - The API Gateway proxy event containing the request details.
 * @returns A promise that resolves to an API Gateway proxy result.
 *
 * @remarks
 * - If the request body is missing or invalid, a 400 response is returned.
 * - If the game is successfully created, a 201 response is returned with a success message.
 *
 * @throws This function does not explicitly throw errors but relies on the behavior of `createGame`.
 */
const createGameMain = async (event: APIGatewayProxyEvent) => {

  logger.debug({
    message: 'Request to create game',
  })

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Request body is required' }),
    }
  }

  let parsedBody
  try {
    parsedBody = schema.parse(JSON.parse(event.body))
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid request body' }),
    }
  }

  const { id, started, homeTeam, awayTeam } = parsedBody

  const game: Game = {
    id,
    homeTeam,
    awayTeam,
    started
  }

  await createGame(game)

  logger.info({
    message: 'Response to create game',
    id: game.id,
  })

  const response = { result: 'success', message: 'Game created successfully' }
  return { statusCode: 201, body: JSON.stringify(response) }
}

export default createGameMain