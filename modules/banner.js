export function createBanner() {
  const slides = [
    "images/banner1.png",
    "images/banner2.png",
    "images/banner3.png",
    "images/banner4.png",
  ];

  let currentSlide = 0;

  const nextButton = document.querySelector(".carousel-btn-next");
  const prevButton = document.querySelector(".carousel-btn-prev");
  const bannerImage = document.querySelector(".adgame-img");

  if (!nextButton || !prevButton || !bannerImage) return;
  function showSlide(index) {
    bannerImage.src = slides[index];
  }

  let slideTimer;

  nextButton.addEventListener("click", () => {
    currentSlide++;

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    clearTimeout(slideTimer);
    showSlide(currentSlide);
    startTimer();
  });

  prevButton.addEventListener("click", () => {
    currentSlide--;

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    clearTimeout(slideTimer);
    showSlide(currentSlide);
    startTimer();
  });

  function startTimer() {
    slideTimer = setTimeout(() => {
      currentSlide++;

      if (currentSlide >= slides.length) {
        currentSlide = 0;
      }

      showSlide(currentSlide);
      startTimer();
    }, 7000);
  }
  showSlide(0);
  startTimer();
}
