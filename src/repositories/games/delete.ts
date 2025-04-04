import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../dynamo/base";

const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE || 'GamesTable';

export async function deleteGame(gameId: string): Promise<void> {
  const params = {
    TableName: DYNAMODB_TABLE,
    Key: {
      id: { S: gameId },
    },
  }

  try {
    const command = new DeleteItemCommand(params)
    await client.send(command)
    console.log(`Game with ID ${gameId} deleted successfully.`)
  } catch (error) {
    console.error(`Failed to delete game with ID ${gameId}:`, error)
    throw error
  }
}