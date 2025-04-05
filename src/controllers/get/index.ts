import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import getGameHandler from './main'

export const handler = middy(getGameHandler)
  .use(httpErrorHandler())