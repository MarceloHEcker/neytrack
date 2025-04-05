import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import getGame from '~/repositories/games/get'
import logger from '~/utils/logger'

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