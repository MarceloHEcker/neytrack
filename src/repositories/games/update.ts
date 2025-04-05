import { AttributeValue, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import { client } from '../dynamo/base'
import { Game } from '~/models/game'

interface UpdateGameParams {
  gameId: string;
  updateData: { [key: string]: Game };
}

const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE || 'GamesTable'

export const updateGame = async ({ gameId, updateData }: UpdateGameParams): Promise<void> => {

  const updateExpression = Object.keys(updateData)
    .map((key: string, index) => `#key${key} = :value${index}`)
    .join(', ')

  const expressionAttributeNames = Object.keys(updateData).reduce((acc, key, index) => {
    acc[`#key${index}`] = key
    return acc
  }, {} as { [key: string]: string })

  const expressionAttributeValues = Object.keys(updateData).reduce((acc, key, index) => {
    acc[`:value${index}`] = { S: JSON.stringify(updateData[key]) } // Convert Game object to string
    return acc
  }, {} as { [key: string]: AttributeValue })

  const params = {
    TableName: DYNAMODB_TABLE,
    Key: {
      gameId: { S: gameId },
    },
    UpdateExpression: `SET ${updateExpression}`,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
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