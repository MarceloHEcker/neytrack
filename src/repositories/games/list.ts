import { ScanCommand } from '@aws-sdk/lib-dynamodb'

import { Game } from '../../models/game'
import dynamoDb from '../dynamo/base'
import logger from '~/utils/logger'

const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE || 'GamesTable'

/**
 * Fetches all game entries from the DynamoDB table.
 * 
 * @returns A promise that resolves to an array of game objects.
 * @throws Will throw an error if the fetch operation fails.
 * */
const listGames = async (): Promise<Game[]> => {
  const params = {
    TableName: DYNAMODB_TABLE,
  }

  try {
    const command = new ScanCommand(params)
    const result = await dynamoDb.send(command) as { Items?: Game[] }
    return result.Items || []
  } catch (error) {
    logger.error({
      message: 'Error scanning DynamoDB table',
      error,
    })
    throw new Error('Could not fetch games')
  }
}

export default listGames