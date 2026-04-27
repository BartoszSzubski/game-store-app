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

const searchInput = document.querySelector(".search-bar_input");
const searchResults = document.querySelector(".search-results");
const overlay = document.querySelector(".search-overlay");

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase().trim();

  if (value === "") {
    searchResults.innerHTML = "";
    searchResults.classList.remove("active");
    overlay.classList.remove("active");
    return;
  }

  searchResults.classList.add("active");
  overlay.classList.add("active");

  const filtered = games
    .filter((game) => {
      const nameMatch = game.name.toLowerCase().includes(value);

      const genreMatch = game.genres?.some((g) =>
        g.toLowerCase().includes(value),
      );
      const tagMatch = game.tags?.some((t) => t.toLowerCase().includes(value));

      return nameMatch || genreMatch || tagMatch;
    })
    .slice(0, 4);
  renderSearchResults(filtered);
});

function renderSearchResults(list) {
  searchResults.innerHTML = "";

  list.forEach((game) => {
    searchResults.innerHTML += `
      <div class="search-results-box">
        <div class="search-results-box_left">
          <img class="search-results-img" src="${game.image}" />
        </div>
        <div class="search-results-right">
          ${game.name}
        </div>
      </div>
    `;
  });
} //dotad

document.addEventListener("click", (e) => {
  if (!searchResults.contains(e.target)) {
    searchResults.classList.remove("active");
    overlay.classList.remove("active");
  }
}); //zamykanie search-results
