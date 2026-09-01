import { renderGames } from "./modules/rendergames.js";
import { initSearch } from "./modules/search.js";
import { createTooltip } from "./modules/tooltip.js";
import { initNavigation } from "./modules/navigation.js";
import { initChatbot } from "./modules/chatbot.js";
import { handleProductPage } from "./modules/productpage.js";
import { renderWishlist } from "./modules/wishlist.js";
import { removeFromWishlist } from "./modules/wishlist.js";
import { initBurgerMenu } from "./modules/burger.js";
import { initWishlistCards } from "./modules/wishlist.js";
import { createBanner } from "./modules/banner.js";
import {
  initBasket,
  renderBasket,
  updateBasketCount,
} from "./modules/basket.js";
import { initTrending } from "./modules/trending.js";
import { initFaq } from "./modules/faq.js";

if (!document.getElementById("trending-page")) {
  renderGames();
}
if (document.getElementById("trending-page")) {
  initTrending();
}
initFaq();
initSearch();
createTooltip();
initNavigation();
initChatbot();
handleProductPage();
renderWishlist();
removeFromWishlist();
initBurgerMenu();
initWishlistCards();
createBanner();
initBasket();
if (document.getElementById("basket-products")) {
  renderBasket();
}
updateBasketCount();
