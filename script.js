const searchBtn = document.querySelector(".search-btn");
const searchBar = document.querySelector(".search-bar");

searchBtn.addEventListener("click", () => {
  searchBar.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!searchBar.contains(e.target) && !searchBtn.contains(e.target)) {
    searchBar.classList.remove("active");
  }
});
// to jeszcze do przekminienia
