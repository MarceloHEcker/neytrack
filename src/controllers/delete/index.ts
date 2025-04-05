import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import deleteGameHandler from './main'

export const handler = middy(deleteGameHandler)
  .use(httpErrorHandler())