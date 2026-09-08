import { games } from "./games.js";

export function addToCart(gameId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cart.includes(gameId)) {
    cart.push(gameId);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateBasketCount();
  return cart;
}
export function initBasket(game) {
  const addToCartButton = document.querySelector(".btn-cart");

  if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
      addToCart(game.id);

      addToCartButton.innerHTML = ` 
               <i class="fa-solid fa-check"></i
                ><span>Dodano do koszyka</span>
              `;
    });
  }
}

export function renderBasket() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartGames = games.filter((game) => cart.includes(game.id));
  const basketProducts = document.getElementById("basket-products");
  const emptyBasket = document.getElementById("empty-basket");

  if (!basketProducts || !emptyBasket) return;
  basketProducts.innerHTML = "";

  if (cartGames.length === 0) {
    emptyBasket.style.display = "flex";
    updateBasketTotal();
    return;
  }
  emptyBasket.style.display = "none";
  cartGames.forEach((game) => {
    basketProducts.innerHTML += `
   
    <div class="basket-product">
      <img class="basket-product-image" src="${game.image}" alt="${game.name}">
      <div class="basket-game-info"><h2 class="basket-game-name">${game.name}</h2>
      <p class="basket-game-price">${game.price} zł</p>
      </div>
      <button class="basket-game-delete" data-game-id="${game.id}" title="Usuń z koszyka"><i class="fa-solid fa-xmark"></i></button>
    </div>
    
  `;
    updateBasketTotal();
  });
  const deleteButtons = document.querySelectorAll(".basket-game-delete");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const gameId = Number(button.dataset.gameId);

      removeFromBasket(gameId);
    });
  });
}

export function removeFromBasket(gameId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((id) => id !== gameId);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderBasket();
  updateBasketCount();
}

export function updateBasketCount() {
  const basketCounter = document.querySelector(".basket-count");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  basketCounter.textContent = cart.length;
}

export function updateBasketTotal() {
  const basketTotal = document.querySelector(".basket-summary span");
  if (!basketTotal) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartGames = games.filter((game) => cart.includes(game.id));
  const total = cartGames.reduce((sum, game) => {
    return sum + game.price;
  }, 0);

  basketTotal.textContent = `${total.toFixed(2)} zł`;
}
