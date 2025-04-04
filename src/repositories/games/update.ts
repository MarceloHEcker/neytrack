import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../dynamo/base";

interface UpdateGameParams {
  gameId: string;
  updateData: { [key: string]: any };
}

const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE || 'GamesTable'

export const updateGame = async ({ gameId, updateData }: UpdateGameParams): Promise<void> => {

  const updateExpression = Object.keys(updateData)
    .map((key, index) => `#key${index} = :value${index}`)
    .join(", ");

  const expressionAttributeNames = Object.keys(updateData).reduce((acc, key, index) => {
    acc[`#key${index}`] = key;
    return acc;
  }, {} as { [key: string]: string });

  const expressionAttributeValues = Object.keys(updateData).reduce((acc, key, index) => {
    acc[`:value${index}`] = updateData[key];
    return acc;
  }, {} as { [key: string]: any });

  const params = {
    TableName: DYNAMODB_TABLE,
    Key: {
      gameId: { S: gameId },
    },
    UpdateExpression: `SET ${updateExpression}`,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
  };

  try {
    const command = new UpdateItemCommand(params);
    await client.send(command);
    console.log(`Game with ID ${gameId} updated successfully.`);
  } catch (error) {
    console.error("Error updating game:", error);
    throw error;
  }
};