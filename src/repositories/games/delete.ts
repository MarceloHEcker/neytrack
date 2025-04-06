import { DeleteItemCommand } from '@aws-sdk/client-dynamodb'
import { client } from '../dynamo/base'
import logger from '~/utils/logger'

const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE || 'GamesTable'

/**
 * Deletes a game entry from the DynamoDB table.
 *
 * @param gameId - The unique identifier for the game to be deleted.
 * @returns A promise that resolves when the game is successfully deleted.
 * @throws Will throw an error if the deletion from DynamoDB fails.
 */
const deleteGame = async (gameId: string): Promise<void> => {
  const params = {
    TableName: DYNAMODB_TABLE,
    Key: {
      id: { S: gameId },
    },
  }

  try {
    const command = new DeleteItemCommand(params)
    await client.send(command)
  } catch (error) {
    logger.error({
      message: `Failed to delete game with ID ${gameId}:`,
      error,
    })

    throw error
  }
}

export default deleteGame