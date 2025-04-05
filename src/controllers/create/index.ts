import middy from '@middy/core' // esm Node v14+
//const middy = require('@middy/core') // commonjs Node v12+

// import some middlewares
import jsonBodyParser from '@middy/http-json-body-parser'
import httpErrorHandler from '@middy/http-error-handler'
import validator from '@middy/validator'
import { transpileSchema } from '@middy/validator/transpile'
import createGameHandler from './main'

const schema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        homeTeam: { type: 'string' },
        awayTeam: { type: 'string' },
        started: { type: 'boolean' },
      },
      required: ['id', 'started'] // Insert here all required event properties
    }
  }
}



// Let's "middyfy" our handler, then we will be able to attach middlewares to it
export const handler = middy()
  .use(jsonBodyParser()) // parses the request body when it's a JSON and converts it to an object
  .use(validator({ eventSchema: transpileSchema(schema) })) // validates the input
  .use(httpErrorHandler()) // handles common http errors and returns proper responses
  .handler(createGameHandler)