import { handler } from './index'
import listHandler from './main'

jest.mock('./main')

describe('Controllers - List - Index', () => {
  const listHandlerMock = jest.mocked(listHandler)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return the result of listHandler when it resolves successfully', async () => {
    const mockResponse = {
      statusCode: 200,
      body: JSON.stringify({ data: 'test data' }),
    }
    listHandlerMock.mockResolvedValue(mockResponse)

    const result = await handler()
    expect(result).toEqual(mockResponse)

    expect(listHandlerMock).toHaveBeenCalledTimes(1)
    expect(listHandlerMock).toHaveBeenCalledWith()
  })

  it('should return a 500 error response when listHandler throws an error', async () => {
    const mockError = new Error('Test error')
    listHandlerMock.mockRejectedValue(mockError)

    const result = await handler()
    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: 'Test error',
      }),
    })

    expect(listHandlerMock).toHaveBeenCalledTimes(1)
    expect(listHandlerMock).toHaveBeenCalledWith()
  })

  it('should return a 500 error response with "Unknown error" when listHandler throws a non-Error object', async () => {
    listHandlerMock.mockRejectedValue('Non-error object')

    const result = await handler()
    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: 'Unknown error',
      }),
    })

    expect(listHandlerMock).toHaveBeenCalledTimes(1)
    expect(listHandlerMock).toHaveBeenCalledWith()

  })
})