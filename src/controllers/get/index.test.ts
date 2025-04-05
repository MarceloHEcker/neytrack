import { APIGatewayProxyEvent } from 'aws-lambda'
import { mock } from 'jest-mock-extended'

import { handler } from './index'
import getGameMain from './main'

jest.mock('./main')

describe('Controllers - Get - Index', () => {
  const getGameMainMock = jest.mocked(getGameMain)
  const event = mock<APIGatewayProxyEvent>({})

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return the result of listHandler when it resolves successfully', async () => {
    const mockResponse = {
      statusCode: 200,
      body: JSON.stringify({ data: 'test data' }),
    }
    getGameMainMock.mockResolvedValue(mockResponse)

    const result = await handler(event)
    expect(result).toEqual(mockResponse)

    expect(getGameMainMock).toHaveBeenCalledTimes(1)
    expect(getGameMainMock).toHaveBeenCalledWith(event)
  })

  it('should return a 500 error response when listHandler throws an error', async () => {
    const mockError = new Error('Test error')
    getGameMainMock.mockRejectedValue(mockError)

    const result = await handler(event)
    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: 'Test error',
      }),
    })

    expect(getGameMainMock).toHaveBeenCalledTimes(1)
    expect(getGameMainMock).toHaveBeenCalledWith(event)
  })

  it('should return a 500 error response with "Unknown error" when listHandler throws a non-Error object', async () => {
    getGameMainMock.mockRejectedValue('Non-error object')

    const result = await handler(event)
    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: 'Unknown error',
      }),
    })

    expect(getGameMainMock).toHaveBeenCalledTimes(1)
    expect(getGameMainMock).toHaveBeenCalledWith(event)
  })


})