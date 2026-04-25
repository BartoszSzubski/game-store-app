import { games } from "./games.js";

const gamesContainer = document.getElementById("games-container");
//render gier

function renderGames(list) {
  gamesContainer.innerHTML = "";

  list.forEach((game) => {
    gamesContainer.innerHTML += `
     <div class="games-grid_box">
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

renderGames(games.slice(0, 6));

//obsługa searchButton
const searchBtn = document.querySelector(".search-btn");
const searchBar = document.querySelector(".search-bar");

searchBtn.addEventListener("click", () => {
  searchBar.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!searchBar.contains(e.target) && !searchBtn.contains(e.target)) {
    searchBar.classList.remove("active");
  }
});

//searchbar filter
