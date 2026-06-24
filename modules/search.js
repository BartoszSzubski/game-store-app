import { games } from "./games.js";

export function initSearch() {
  const searchBtn = document.querySelector(".search-btn");
  const searchBar = document.querySelector(".search-bar");
  const searchInput = document.querySelector(".search-bar_input");
  const searchResults = document.querySelector(".search-results");
  const overlay = document.querySelector(".search-overlay");
  const resultsCount = document.querySelector(".search-results-count");

  if (!searchBtn || !searchBar || !searchInput || !searchResults || !overlay)
    return; //test

  searchBtn.addEventListener("click", () => {
    searchBar.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!searchBar.contains(e.target) && !searchBtn.contains(e.target)) {
      searchBar.classList.remove("active");
    }
  });

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase().trim();

    if (value === "") {
      searchResults.innerHTML = "";
      searchResults.classList.remove("active");
      overlay.classList.remove("active");
      resultsCount.textContent = "";
      return;
    }

    searchResults.classList.add("active");
    overlay.classList.add("active");

    const filtered = games.filter((game) => {
      const nameMatch = game.name.toLowerCase().includes(value);

      const genreMatch = game.genres?.some((g) =>
        g.toLowerCase().includes(value),
      );
      const tagMatch = game.tags?.some((t) => t.toLowerCase().includes(value));

      return nameMatch || genreMatch || tagMatch;
    });
    const limited = filtered.slice(0, 4);
    renderSearchResults(limited, filtered.length);
  });

  function renderSearchResults(list, totalCount) {
    searchResults.innerHTML = "";

    if (totalCount === 0) {
      searchResults.innerHTML = `
       <div class="search-results-empty">
    <span>Brak wyników.</span>
    <button class="clear-search-btn"><i class="fa-regular fa-circle-xmark"></i></button>
  </div>
    `;
      resultsCount.textContent = "";
      return;
    }

    list.forEach((game) => {
      searchResults.innerHTML += `
      <div class="search-results-box data-id="${game.id}">
        <div class="search-results-box_left">
          <img class="search-results-img" src="${game.image}" />
        </div>
        <div class="search-results-right">
          ${game.name}
        </div>
      </div>
    `;
    });
    searchResults.innerHTML += `<div class="search-results-count">Zobacz ${totalCount} wyników.</div>`;
  } //dotad

  document.addEventListener("click", (e) => {
    // X button
    if (e.target.closest(".clear-search-btn")) {
      searchInput.value = "";
      searchResults.innerHTML = "";
      searchResults.classList.remove("active");
      overlay.classList.remove("active");
      return;
    }

    // poza results
    if (!searchResults.contains(e.target) && !searchBar.contains(e.target)) {
      searchResults.classList.remove("active");
      overlay.classList.remove("active");
    }
  });

  const clearInputBtn = document.querySelector(".clear-input-btn");

  document.addEventListener("click", (e) => {
    if (e.target.closest(".clear-input-btn")) {
      searchInput.value = "";
    }
  });
}
