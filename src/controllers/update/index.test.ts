import { APIGatewayProxyEvent } from 'aws-lambda'
import { mock } from 'jest-mock-extended'

import { handler } from './index'
import updateGameMain from './main'

jest.mock('./main')

describe('Controllers - Update - Index', () => {
  const updateGameMainMock = jest.mocked(updateGameMain)
  const event = mock<APIGatewayProxyEvent>({})

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return the result of updateGameMain when it resolves successfully', async () => {
    const mockResponse = {
      statusCode: 200,
      body: JSON.stringify({ data: 'test data' }),
    }
    updateGameMainMock.mockResolvedValue(mockResponse)

    const result = await handler(event)
    expect(result).toEqual(mockResponse)

    expect(updateGameMainMock).toHaveBeenCalledTimes(1)
    expect(updateGameMainMock).toHaveBeenCalledWith(event)
  })

  it('should return a 500 error response when getGameMain throws an error', async () => {
    const mockError = new Error('Test error')
    updateGameMainMock.mockRejectedValue(mockError)

    const result = await handler(event)
    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: 'Test error',
      }),
    })

    expect(updateGameMainMock).toHaveBeenCalledTimes(1)
    expect(updateGameMainMock).toHaveBeenCalledWith(event)
  })

  it('should return a 500 error response with "Unknown error" when getGameMain throws a non-Error object', async () => {
    updateGameMainMock.mockRejectedValue('Non-error object')

    const result = await handler(event)
    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: 'Unknown error',
      }),
    })

    expect(updateGameMainMock).toHaveBeenCalledTimes(1)
    expect(updateGameMainMock).toHaveBeenCalledWith(event)
  })

})