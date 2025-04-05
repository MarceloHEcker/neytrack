import logger from '~/utils/logger'
import updateGameHandler from './main'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    return await updateGameHandler(event)
  } catch (error) {
    logger.error({
      message: 'Error on update game',
      error,
    })

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    }
  }
}