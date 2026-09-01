export function initNavigation() {
  document.addEventListener("click", (e) => {
    const gameFromGrid = e.target.closest(".games-grid_box");
    const gameFromSearch = e.target.closest(".search-results-box");

    if (gameFromGrid) {
      const id = gameFromGrid.dataset.id;
      window.location.href = `product.html?id=${id}`;
      return;
    }

    if (gameFromSearch) {
      const id = gameFromSearch.dataset.id;
      window.location.href = `product.html?id=${id}`;
      return;
    }
  });

  const backBtn = document.querySelector(".back-btn");

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      history.back();
    });
  }

  const shopButtons = document.querySelectorAll(
    ".back-to-shop, .empty-basket-btn",
  );

  shopButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  });
}
