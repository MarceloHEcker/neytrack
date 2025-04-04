import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

export const client = new DynamoDBClient({})
const dynamoDb = DynamoDBDocumentClient.from(client)

export default dynamoDb