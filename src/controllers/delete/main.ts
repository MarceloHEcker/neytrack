import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import deleteGame from '~/repositories/games/delete'
import getGame from '~/repositories/games/get'

const deleteGameHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
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

  await deleteGame(id)

  return {
    statusCode: 204,
    body: '',
  }
}

export default deleteGameHandler