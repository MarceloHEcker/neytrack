import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import deleteGame from '~/repositories/games/delete'
import getGame from '~/repositories/games/get'
import logger from '~/utils/logger'

/**
 * Handles the deletion of a game resource.
 *
 * @param event - The API Gateway proxy event containing the request details.
 * @returns A promise that resolves to an API Gateway proxy result.
 *
 * @remarks
 * - If the `id` path parameter is missing, a 400 response is returned.
 * - If the game with the specified `id` is not found, a 404 response is returned.
 * - If the game is successfully deleted, a 204 response is returned with no body.
 *
 * @throws This function does not explicitly throw errors but relies on the behavior of `getGame` and `deleteGame` functions.
 */
const deleteGameHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { pathParameters } = event

  if (!pathParameters || !pathParameters.id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Path parameter "id" is required' }),
    }
  }

  const id = pathParameters.id

  logger.debug({
    message: 'Request to delete game',
    id,
  })

  const game = await getGame(id)

  if (!game) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Game not found' }),
    }
  }

  await deleteGame(id)


  logger.info({
    message: 'Response to delete game',
    id,
  })

  return {
    statusCode: 204,
    body: '',
  }
}

export default deleteGameHandler