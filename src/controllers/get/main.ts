import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import getGame from '~/repositories/games/get'
import logger from '~/utils/logger'

/**
 * Handles the retrieval of a game resource.
 *
 * @param event - The API Gateway proxy event containing the request details.
 * @returns A promise that resolves to an API Gateway proxy result.
 *
 * @remarks
 * - If the `id` path parameter is missing, a 400 response is returned.
 * - If the game with the specified `id` is not found, a 404 response is returned.
 * - If the game is successfully retrieved, a 200 response is returned with the game data.
 *
 * @throws This function does not explicitly throw errors but relies on the behavior of `getGame`.
 */
const getGameHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const { pathParameters } = event

  if (!pathParameters || !pathParameters.id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Path parameter "id" is required' }),
    }
  }

  const id = pathParameters.id

  logger.debug({
    message: 'Request to get game',
    id,
  })

  const game = await getGame(id)

  if (!game) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Game not found' }),
    }
  }

  logger.info({
    message: 'Response to get game',
  })

  return {
    statusCode: 200,
    body: JSON.stringify(game),
  }
}

export default getGameHandler