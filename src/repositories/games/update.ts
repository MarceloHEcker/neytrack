import { UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import { client } from '../dynamo/base'
import logger from '~/utils/logger'

interface UpdateGameData {
  started: boolean
  homeTeam: string
  awayTeam: string
}

interface UpdateGameParams {
  gameId: string;
  updateData: UpdateGameData;
}

const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE || 'GamesTable'

/**
 * Updates a game record in the DynamoDB table with the provided data.
 *
 * @param {UpdateGameParams} params - The parameters for updating the game.
 * @param {string} params.gameId - The unique identifier of the game to update.
 * @param {object} params.updateData - The data to update the game with.
 * @param {boolean} params.updateData.started - Indicates whether the game has started.
 * @param {string} params.updateData.homeTeam - The name of the home team.
 * @param {string} params.updateData.awayTeam - The name of the away team.
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 * @throws Will throw an error if the update operation fails.
 */
const updateGame = async ({ gameId, updateData }: UpdateGameParams): Promise<void> => {

  const params = {
    TableName: DYNAMODB_TABLE,
    Key: {
      id: { S: gameId },
    },
    UpdateExpression: 'SET #started = :started, #homeTeam = :homeTeam, #awayTeam = :awayTeam',
    ExpressionAttributeNames: {
      '#started': 'started',
      '#homeTeam': 'homeTeam',
      '#awayTeam': 'awayTeam',
    },
    ExpressionAttributeValues: {
      ':started': { BOOL: updateData.started },
      ':homeTeam': { S: updateData.homeTeam },
      ':awayTeam': { S: updateData.awayTeam },
    },
  }

  try {
    const command = new UpdateItemCommand(params)
    await client.send(command)
    logger.debug({
      message: `Game with ID ${gameId} updated successfully.`
    })
  } catch (error) {
    logger.error({
      message: 'Error updating game',
      error,
    })

    throw error
  }
}

export default updateGame