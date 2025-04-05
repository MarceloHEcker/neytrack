import { APIGatewayProxyEvent } from 'aws-lambda'
import { mock } from 'jest-mock-extended'

import { handler } from './index'
import createGameMain from './main'

jest.mock('./main')

describe('Controllers - Create - Index', () => {
  const createGameMainMock = jest.mocked(createGameMain)
  const event = mock<APIGatewayProxyEvent>({})

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return the result of createGameMain when it resolves successfully', async () => {
    const mockResponse = {
      statusCode: 200,
      body: JSON.stringify({ data: 'test data' }),
    }
    createGameMainMock.mockResolvedValue(mockResponse)

    const result = await handler(event)
    expect(result).toEqual(mockResponse)

    expect(createGameMainMock).toHaveBeenCalledTimes(1)
    expect(createGameMainMock).toHaveBeenCalledWith(event)
  })

  it('should return a 500 error response when createGameMainMock throws an error', async () => {
    const mockError = new Error('Test error')
    createGameMainMock.mockRejectedValue(mockError)

    const result = await handler(event)
    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: 'Test error',
      }),
    })

    expect(createGameMainMock).toHaveBeenCalledTimes(1)
    expect(createGameMainMock).toHaveBeenCalledWith(event)
  })

  it('should return a 500 error response with "Unknown error" when createGameMainMock throws a non-Error object', async () => {
    createGameMainMock.mockRejectedValue('Non-error object')

    const result = await handler(event)
    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: 'Unknown error',
      }),
    })

    expect(createGameMainMock).toHaveBeenCalledTimes(1)
    expect(createGameMainMock).toHaveBeenCalledWith(event)
  })

})