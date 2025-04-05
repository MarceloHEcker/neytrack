import listHandler from './main'

export const handler = async () => {
  try {
    return await listHandler()
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    }
  }
}