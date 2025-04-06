import { APIGatewayProxyEvent } from 'aws-lambda'
import { z } from 'zod'

import updateGame from '~/repositories/games/update'
import logger from '~/utils/logger'

const schema = z.object({
  homeTeam: z.string(),
  awayTeam: z.string(),
  started: z.boolean().refine((val) => typeof val === 'boolean', {
    message: 'The "started" field is required and must be a boolean',
  }),
})

/**
 * Handles the update of a game resource.
 *
 * @param event - The API Gateway proxy event containing the request details.
 * @returns A promise that resolves to an API Gateway proxy result.
 *
 * @remarks
 * - If the `id` path parameter is missing, a 400 response is returned.
 * - If the request body is missing or invalid, a 400 response is returned.
 * - If the game is successfully updated, a 201 response is returned with a success message.
 *
 * @throws This function does not explicitly throw errors but relies on the behavior of `updateGame`.
 */
const updateGameHandler = async (event: APIGatewayProxyEvent) => {

  const { pathParameters } = event

  if (!pathParameters || !pathParameters.id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Path parameter "id" is required' }),
    }
  }

  const id = pathParameters.id

  logger.debug({
    message: 'Request to update game',
    id,
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

  const { started, homeTeam, awayTeam } = parsedBody

  await updateGame({
    gameId: id,
    updateData: {
      homeTeam,
      awayTeam,
      started
    }
  })

  logger.info({
    message: 'Response to update game',
    id,
  })

  const response = { result: 'success', message: 'Game updated correctly' }
  return { statusCode: 201, body: JSON.stringify(response) }
}

export default updateGameHandler