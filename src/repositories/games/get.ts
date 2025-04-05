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

    if (!response.Item) {
      throw new Error(`Game with ID ${gameId} not found`)
    }

    return response.Item as Game
  } catch (error) {
    console.error('Error fetching game:', error)
    throw error
  }
}

export default getGame