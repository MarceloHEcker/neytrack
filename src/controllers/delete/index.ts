import { APIGatewayProxyEvent } from 'aws-lambda'
import deleteGameHandler from './main'

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    return await deleteGameHandler(event)
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    }
  }
}