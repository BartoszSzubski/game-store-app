import { renderGames } from "./modules/rendergames.js";
import { initSearch } from "./modules/search.js";
import { createTooltip } from "./modules/tooltip.js";
import { initNavigation } from "./modules/navigation.js";
import { initChatbot } from "./modules/chatbot.js";

renderGames();
initSearch();
createTooltip();
initNavigation();
initChatbot();

/*support.js section*/
const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("active");
  });
});
