import { games } from "./games.js";
import { addToCart } from "./basket.js";

function updateHeartIcon(button, icon, wishlist, gameId) {
  if (!button || !icon) return;

  if (wishlist.includes(gameId)) {
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");

    button.dataset.tooltip = "Usuń z listy życzeń";
  } else {
    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");

    button.dataset.tooltip = "Dodaj do listy życzeń";
  }
}

export function initWishlist(game) {
  const wishlistBtn = document.querySelector(".btn-wishlist");
  const wishlistIcon = wishlistBtn?.querySelector("i");

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  updateHeartIcon(wishlistBtn, wishlistIcon, wishlist, game.id);

  if (wishlistBtn) {
    wishlistBtn.addEventListener("click", () => {
      if (!wishlist.includes(game.id)) {
        wishlist.push(game.id);
      } else {
        wishlist = wishlist.filter((id) => id !== game.id);
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      updateWishlistCount();
      updateHeartIcon(wishlistBtn, wishlistIcon, wishlist, game.id);

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
  const emptyWishList = document.querySelector(".empty-wishlist-message");

  if (!wishlistContainer) return;

  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const wishlistGames = games.filter((game) => wishlist.includes(game.id));
  wishlistContainer.innerHTML = "";

  if (wishlistGames.length === 0) {
    emptyWishList.style.display = "flex";
    return;
  }

  emptyWishList.style.display = "none";

  wishlistGames.forEach((game) => {
    wishlistContainer.innerHTML += `
      <div class="wishlist-game">
        <img src="${game.image}" alt="${game.name}" />

        <div class="wishlist-game-info">
          <h2>${game.name}</h2>
          <p>${game.price.toFixed(2)} zł</p>
        </div>
              <button class="add-to-cart-wishlist" data-id="${game.id}" title="Dodaj do koszyka">
        <i class="fa-solid fa-cart-shopping"></i>
      </button>

        <button class="remove-from-wishlist" data-id="${game.id}" title="Usuń z listy życzeń">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
  });

  document.querySelectorAll(".add-to-cart-wishlist").forEach((button) => {
    button.addEventListener("click", () => {
      const gameId = Number(button.dataset.id);
      addToCart(gameId);

      button.innerHTML = `
      <i class="fa-solid fa-check"></i>
    `;
    });
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

export function initWishlistCards() {
  document.querySelectorAll(".game-wishlist-btn").forEach((btn) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const wishlistCount = document.querySelector(".wishlist-count");

    if (wishlistCount) {
      wishlistCount.textContent = wishlist.length;
    }
    const gameId = Number(btn.dataset.id);
    const icon = btn.querySelector("i");

    updateHeartIcon(btn, icon, wishlist, gameId);

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (wishlist.includes(gameId)) {
        wishlist = wishlist.filter((id) => id !== gameId);
      } else {
        wishlist.push(gameId);
      }
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      updateHeartIcon(btn, icon, wishlist, gameId);

      const wishlistCount = document.querySelector(".wishlist-count");

      if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
      }
    });
  });
}
