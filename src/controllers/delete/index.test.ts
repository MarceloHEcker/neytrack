import { APIGatewayProxyEvent } from 'aws-lambda'
import { mock } from 'jest-mock-extended'

import { handler } from './index'
import deleteGameMain from './main'

jest.mock('./main')

describe('Controllers - Delete - Index', () => {
  const deleteGameMainMock = jest.mocked(deleteGameMain)
  const event = mock<APIGatewayProxyEvent>({})

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return the result of deleteGameMain when it resolves successfully', async () => {
    const mockResponse = {
      statusCode: 200,
      body: JSON.stringify({ data: 'test data' }),
    }
    deleteGameMainMock.mockResolvedValue(mockResponse)

    const result = await handler(event)
    expect(result).toEqual(mockResponse)

    expect(deleteGameMainMock).toHaveBeenCalledTimes(1)
    expect(deleteGameMainMock).toHaveBeenCalledWith(event)
  })

  it('should return a 500 error response when deleteGameMain throws an error', async () => {
    const mockError = new Error('Test error')
    deleteGameMainMock.mockRejectedValue(mockError)

    const result = await handler(event)
    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: 'Test error',
      }),
    })

    expect(deleteGameMainMock).toHaveBeenCalledTimes(1)
    expect(deleteGameMainMock).toHaveBeenCalledWith(event)
  })

  it('should return a 500 error response with "Unknown error" when deleteGameMain throws a non-Error object', async () => {
    deleteGameMainMock.mockRejectedValue('Non-error object')

    const result = await handler(event)
    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: 'Unknown error',
      }),
    })

    expect(deleteGameMainMock).toHaveBeenCalledTimes(1)
    expect(deleteGameMainMock).toHaveBeenCalledWith(event)
  })


})