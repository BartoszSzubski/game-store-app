export function initBurgerMenu() {
  const burgerBtn = document.querySelector(".burger-btn");
  const mobileMenu = document.querySelector(".menu-left-center");

  if (!burgerBtn || !mobileMenu) return;

  burgerBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    burgerBtn.classList.toggle("hamburger--open");
  });
}
