import { PutItemCommand } from '@aws-sdk/client-dynamodb'
import { client } from '../dynamo/base'
import { Game } from '~/models/game'
import logger from '~/utils/logger'

const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE || 'GamesTable'

/**
 * Creates a new game entry in the DynamoDB table.
 *
 * @param item - The game object to be inserted into the database.
 * @param item.id - The unique identifier for the game.
 * @param item.started - A boolean indicating whether the game has started.
 * @param item.homeTeam - The name of the home team.
 * @param item.awayTeam - The name of the away team.
 * @returns A promise that resolves when the game is successfully inserted.
 * @throws Will throw an error if the insertion into DynamoDB fails.
 */
const createGame = async (item: Game): Promise<void> => {
  const params = {
    TableName: DYNAMODB_TABLE,
    Item: {
      id: { S: item.id },
      started: { BOOL: item.started },
      homeTeam: { S: item.homeTeam },
      awayTeam: { S: item.awayTeam }
    }
  }

  try {
    const command = new PutItemCommand(params)
    await client.send(command)
    logger.debug({
      message: 'Item successfully inserted into DynamoDB'
    })
  } catch (error) {
    logger.error({
      message: 'Error inserting item into DynamoDB',
      error,
    })

    throw error
  }
}

export default createGame

