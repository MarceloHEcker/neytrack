import { APIGatewayProxyResult } from 'aws-lambda'

import listGames from '~/repositories/games/list'

const listGamesMain = async (): Promise<APIGatewayProxyResult> => {
  const games = await listGames()

  return {
    statusCode: 200,
    body: JSON.stringify(games),
  }
}

export default listGamesMain