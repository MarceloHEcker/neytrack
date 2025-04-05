import { PutItemCommand } from '@aws-sdk/client-dynamodb'
import { client } from '../dynamo/base'
import { Game } from '~/models/game'

const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE || 'GamesTable'

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
    console.log('Item successfully inserted into DynamoDB')
  } catch (error) {
    console.error('Error inserting item into DynamoDB:', error)
    throw error
  }
}

export default createGame

