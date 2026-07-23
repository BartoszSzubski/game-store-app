import { renderGames } from "./modules/rendergames.js";
import { initSearch } from "./modules/search.js";
import { createTooltip } from "./modules/tooltip.js";
import { initNavigation } from "./modules/navigation.js";
import { initChatbot } from "./modules/chatbot.js";
import { handleProductPage } from "./modules/productpage.js";
import { renderWishlist } from "./modules/wishlist.js";
import { removeFromWishlist } from "./modules/wishlist.js";

renderGames();
initSearch();
createTooltip();
initNavigation();
initChatbot();
handleProductPage();
renderWishlist();
removeFromWishlist();

/*support.js section*/
const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("active");
  });
});

//trending games// //test//
//const trendingGames = games.filter((game) => game.trending);

//renderGames(trendingGames);
