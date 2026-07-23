import { games } from "./games.js";

export function initWishlist(game) {
  const wishlistBtn = document.querySelector(".btn-wishlist");
  const wishlistIcon = wishlistBtn?.querySelector("i");

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  function updateHeartIcon() {
    if (!wishlistIcon) return;

    if (wishlist.includes(game.id)) {
      wishlistIcon.classList.remove("fa-regular");
      wishlistIcon.classList.add("fa-solid");

      wishlistBtn.dataset.tooltip = "Usuń z listy życzeń";
    } else {
      wishlistIcon.classList.remove("fa-solid");
      wishlistIcon.classList.add("fa-regular");
      wishlistBtn.dataset.tooltip = "Dodaj do listy życzeń";
    }
  }

  if (wishlistBtn) {
    wishlistBtn.addEventListener("click", () => {
      if (!wishlist.includes(game.id)) {
        wishlist.push(game.id);
      } else {
        wishlist = wishlist.filter((id) => id !== game.id);
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      updateWishlistCount();
      updateHeartIcon();

      console.log(wishlist);
    });
  }
  function updateWishlistCount() {
    const wishlistCount = document.querySelector(".wishlist-count");

    if (wishlistCount) {
      wishlistCount.textContent = wishlist.length;
    }
  }
  updateWishlistCount();
  updateHeartIcon();
}
export function renderWishlist() {
  const wishlistContainer = document.querySelector(".wishlist-games");
  if (!wishlistContainer) return;

  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const wishlistGames = games.filter((game) => wishlist.includes(game.id));
  wishlistContainer.innerHTML = "";

  wishlistGames.forEach((game) => {
    wishlistContainer.innerHTML += `
      <div class="wishlist-game">
        <img src="${game.image}" alt="${game.name}" />

        <div class="wishlist-game-info">
          <h2>${game.name}</h2>
          <p>${game.price.toFixed(2)} zł</p>
        </div>

        <button class="remove-from-wishlist" data-id="${game.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
  });
}

export function removeFromWishlist() {
  const wishlistContainer = document.querySelector(".wishlist-games");
  if (!wishlistContainer) return;

  wishlistContainer.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".remove-from-wishlist");
    if (!removeBtn) return;
    const gameId = Number(removeBtn.dataset.id);

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter((id) => id !== gameId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    renderWishlist();
  });
}
