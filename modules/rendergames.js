import { games } from "./games.js";

export function renderGames(list = games, limit = 6) {
  const gamesContainer = document.getElementById("games-container");
  if (!gamesContainer) return;

  gamesContainer.innerHTML = "";

  list.slice(0, limit).forEach((game) => {
    gamesContainer.innerHTML += `
     <div class="games-grid_box" data-id="${game.id}">
     <div class="box-image-section">
              <img class="template-img" src="
              ${game.image}" alt="" />
              <div class="image-section_discount">
              -${game.discountPercent}%</div>
            </div>
            <div class="under-box-section">
              <p class="under-box-section_title">
                ${game.name}
              </p>
              <p class="under-box-section_price">
              ${game.price}zł</p>
            </div>
          </div>`;
  });
}
