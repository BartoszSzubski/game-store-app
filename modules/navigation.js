export function initNavigation() {
  document.addEventListener("click", (e) => {
    const gameFromGrid = e.target.closest(".games-grid_box");
    const gameFromSearch = e.target.closest(".search-results-box");
    const back = e.target.closest(
      ".back-btn, .back-to-shop, .empty-basket-btn",
    );

    if (gameFromGrid) {
      const id = gameFromGrid.dataset.id;
      window.location.href = `product.html?id=${id}`;
      return;
    }
    if (gameFromSearch) {
      const id = gameFromSearch.dataset.id;
      window.location.href = `product.html?id=${id}`;
    }
    if (back) {
      if (document.referrer) {
        history.back();
      } else {
        window.location.href = "index.html";
      }
    }
  });
}
