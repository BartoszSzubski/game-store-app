import { games } from "./games.js";
import { initWishlist } from "./wishlist.js";

export function handleProductPage() {
  const productPage = document.querySelector(".product-page");
  if (!productPage) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  console.log("ID from URL:", id);

  const game = games.find((g) => g.id === id);

  if (!game) {
    console.error("Game not found for ID:", id);
    return;
  }
  document.body.style.backgroundImage = `
  linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.15)),
  url("${game.background}")
`;

  console.log("Game found:", game);

  const productImage = document.querySelector(".product-image img");
  if (productImage) productImage.src = game.image;

  const productDescription = document.querySelector(
    ".product-description-content",
  );
  if (productDescription) productDescription.textContent = game.description;

  const productTitle = document.querySelector(".product-panel-title");
  if (productTitle) productTitle.textContent = game.name;

  const productTags = document.querySelector(".product-tags");
  if (productTags) {
    productTags.textContent = `Tagi: ${JSON.stringify(game.tags.join(", ").toUpperCase())}`;
  }

  const productPlatform = document.querySelector(".product-platform");
  if (productPlatform) {
    productPlatform.textContent = game.platforms.join(", ");
  }
  const productPublisher = document.querySelector(".product-publisher");
  if (productPublisher) {
    productPublisher.textContent = game.publisher;
  }

  const productLanguages = document.querySelector(".product-languages");
  if (productLanguages) {
    productLanguages.textContent = game.languages.join(", ");
  }
  const productGenres = document.querySelector(".product-genres");
  if (productGenres) {
    productGenres.textContent = game.genres.join(", ").toUpperCase();
  }
  const releaseDate = document.querySelector(".product-release-date");
  if (releaseDate) {
    releaseDate.textContent = game.releaseDate;
  }

  const productPegi = document.querySelector(".product-pegi");
  if (productPegi) {
    productPegi.textContent = game.pegi;
  }

  const productSize = document.querySelector(".product-size");
  if (productSize) {
    productSize.textContent = `~${game.size}`;
  }

  const productActivation = document.querySelector(".product-activation");
  if (productActivation) {
    productActivation.textContent = game.activation;
  }

  const viewersCount = document.querySelector(".product-viewers-count");
  if (viewersCount) {
    const randomViewers = Math.floor(Math.random() * 90) + 10;

    viewersCount.textContent = `${randomViewers} użytkowników na tej stronie`;
  }
  const cartButton = document.querySelector(".btn-cart");

  if (cartButton) {
    cartButton.title = `Dodaj do koszyka: ${game.name}`;
  }

  //wishlist
  initWishlist(game);
}
