import logger from '~/utils/logger'
import { Game } from '../../models/game'
import dynamoDb from '../dynamo/base'
import { GetCommand } from '@aws-sdk/lib-dynamodb'

const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE || 'GamesTable'

const getGame = async (gameId: string): Promise<Game> => {
  const params = {
    TableName: DYNAMODB_TABLE,
    Key: {
      id: gameId,
    },
  }

  try {
    const response = await dynamoDb.send(new GetCommand(params))

    return response.Item as Game
  } catch (error) {
    logger.error({
      message: 'Error fetching game',
      error,
    })

    throw error
  }
}

export default getGame