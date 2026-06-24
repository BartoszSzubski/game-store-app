export function createTooltip() {
  const btnWishlist = document.querySelector(".btn-wishlist");

  if (!btnWishlist) return;

  const createTooltip = (e) => {
    const tooltipParent = e.currentTarget;
    const tooltipText = tooltipParent.dataset.tooltip;

    if (tooltipParent.querySelector(".tooltip")) return;

    const newTooltip = document.createElement("span");
    newTooltip.innerHTML = tooltipText;
    newTooltip.className = "tooltip";

    tooltipParent.appendChild(newTooltip);
  };

  const removeTooltip = (e) => {
    const tooltip = e.currentTarget.querySelector(".tooltip");
    if (tooltip) {
      tooltip.remove();
    }
  };

  btnWishlist.addEventListener("mouseover", createTooltip);
  btnWishlist.addEventListener("mouseleave", removeTooltip);
}
