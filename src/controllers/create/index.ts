import createGameHandler from './main'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const result = await createGameHandler(event)
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error instanceof Error ? error.message : 'An unknown error occurred' }),
    }
  }
}