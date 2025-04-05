import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import getGame from '~/repositories/games/get'

const getGameHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('event', event)

  const { pathParameters } = event

  if (!pathParameters || !pathParameters.id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Path parameter "id" is required' }),
    }
  }

  const id = pathParameters.id

  const game = await getGame(id)

  if (!game) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Game not found' }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(game),
  }
}

export default getGameHandler