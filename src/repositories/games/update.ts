import { UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import { client } from '../dynamo/base'

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
    console.log(`Game with ID ${gameId} updated successfully.`)
  } catch (error) {
    console.error('Error updating game:', error)
    throw error
  }
}

export default updateGame