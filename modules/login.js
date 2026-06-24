export function handleTogglePasswordVisibility() {
  const passwordInputs = document.querySelectorAll(".password-box input");

  passwordInputs.forEach((input) => {
    const inputContainer = input.parentElement;
    const eyeOpen = inputContainer.querySelector(".eye-open");
    const eyeClose = inputContainer.querySelector(".eye-close");

    if (!eyeOpen) return;
    if (!eyeClose) return;

    eyeOpen.classList.add("eye-icon--hidden");

    // Hide password
    eyeOpen.addEventListener("click", () => {
      input.type = "password";
      eyeClose.classList.remove("eye-icon--hidden");
      eyeOpen.classList.add("eye-icon--hidden");
    });

    // Show password
    eyeClose.addEventListener("click", () => {
      input.type = "text";
      eyeClose.classList.add("eye-icon--hidden");
      eyeOpen.classList.remove("eye-icon--hidden");
    });
  });
}
