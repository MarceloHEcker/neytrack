import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import dynamoDb, { client } from './base'

jest.mock('@aws-sdk/client-dynamodb', () => {
  return {
    DynamoDBClient: jest.fn(),
  }
})

jest.mock('@aws-sdk/lib-dynamodb', () => {
  return {
    DynamoDBDocumentClient: {
      from: jest.fn().mockReturnValue({}),
    },
  }
})

describe('Repositories - Dynamo DB - Base', () => {
  it('should create a DynamoDBClient instance', () => {
    expect(DynamoDBClient).toHaveBeenCalledTimes(1)
    expect(client).toBeInstanceOf(DynamoDBClient)
  })

  it('should create a DynamoDBDocumentClient instance from DynamoDBClient', () => {
    expect(DynamoDBDocumentClient.from).toHaveBeenCalledWith(client)
    expect(dynamoDb).toBeDefined()
  })
})