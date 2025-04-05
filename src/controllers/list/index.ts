import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'

import listMain from './main'

export interface ResponseType {
  statusCode: number
  body: string
}

const baseHandler = async (): Promise<ResponseType> => {
  const list = await listMain()

  return { statusCode: 200, body: JSON.stringify(list) }
}

export const handler = middy(baseHandler)
  .use(httpErrorHandler())