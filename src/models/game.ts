/**
 * Represents a game model with basic information about a match.
 */
export interface Game {
  /**
   * Unique identifier for the game.
   */
  id: string;

  /**
   * Indicates whether the game has started.
   */
  started: boolean;

  /**
   * Name of the home team participating in the game.
   */
  homeTeam: string;

  /**
   * Name of the away team participating in the game.
   */
  awayTeam: string;
}
