import { games } from "./games.js";
import { renderGames } from "./rendergames.js";

export function initTrending() {
  const trendingGames = games.filter((game) => game.trending);

  renderGames(trendingGames);
}
