import { APIGatewayProxyResult } from 'aws-lambda'

import listGames from '~/repositories/games/list'
import logger from '~/utils/logger'


/**
 * Handles the listing of game resources.
 *
 * @returns A promise that resolves to an API Gateway proxy result.
 *
 * @remarks
 * - This function does not take any parameters.
 * - It fetches all games from the database and returns them in the response body.
 * - If an error occurs during the fetch operation, a 500 response is returned.
 */
const listGamesMain = async (): Promise<APIGatewayProxyResult> => {

  logger.debug({
    message: 'Request to list games',
  })

  const games = await listGames()

  logger.info({
    message: 'Response to list games',
  })

  return {
    statusCode: 200,
    body: JSON.stringify(games),
  }
}

export default listGamesMain