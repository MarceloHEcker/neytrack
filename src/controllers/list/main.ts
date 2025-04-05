import { APIGatewayProxyResult } from 'aws-lambda'

import listGames from '~/repositories/games/list'
import logger from '~/utils/logger'

const listGamesMain = async (): Promise<APIGatewayProxyResult> => {

  logger.debug({
    message: 'Request to list games',
  })

  const games = await listGames()

  logger.info({
    message: 'Response to list games',
  })

  return {
    statusCode: 200,
    body: JSON.stringify(games),
  }
}

export default listGamesMain