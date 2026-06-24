export function initChatbot() {
  // open/close chat
  const chatBubble = document.querySelector(".chat-bubble");
  const chatWindow = document.querySelector(".chat-window");
  const closeBtn = document.querySelector(".chat-window-close");
  const contactCardContentBtn = document.querySelector(
    ".contact-card-content-btn",
  );

  //chat logic below
  const chatBody = document.getElementById("chatBody");
  const chatInput = document.getElementById("chatInput");
  const chatSend = document.getElementById("chatSend");

  //chatbot responses
  const welcomeMessages = [
    "Witaj! Jestem asystentem Fictional Games. W czym mogę pomóc?",
    "Cześć! Jak mogę Ci dziś pomóc?",
    "Hej! Masz problem z zamówieniem lub kluczem?",
    "Witaj w centrum pomocy Fictional Games!",
  ];

  const botRules = [
    {
      keywords: ["klucz", "key", "aktywacja"],
      responses: [
        "Podaj numer zamówienia.",
        "Sprawdź czy klucz jest poprawny.",
        "Jeśli nie działa, wyślij kod błędu.",
      ],
    },
    {
      keywords: ["zwrot", "refund"],
      responses: ["Zwrot możliwy w 7 dni jeśli klucz nieużyty."],
    },
    {
      keywords: ["błąd", "error", "nie działa"],
      responses: [
        "Sprawdź region aktywacji.",
        "Podaj dokładny komunikat błędu.",
      ],
    },
  ];

  function getRandomWelcomeMessage() {
    const randomIndex = Math.floor(Math.random() * welcomeMessages.length);

    return welcomeMessages[randomIndex];
  }

  function addBotMessage(text) {
    const row = document.createElement("div");
    row.classList.add("chat-row-assistant");
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-robot");
    const message = document.createElement("div");

    message.classList.add("chat-message", "chat-message--assistant");
    message.textContent = text;
    row.appendChild(icon);
    row.appendChild(message);
    chatBody.appendChild(row);
  }
  //event listeners
  chatBubble.addEventListener("click", () => {
    chatWindow.classList.add("active");
    chatBubble.classList.add("hidden");
  });

  closeBtn.addEventListener("click", () => {
    chatWindow.classList.remove("active");
    chatBubble.classList.remove("hidden");
  });

  contactCardContentBtn?.addEventListener("click", () => {
    chatWindow.classList.add("active");
    chatBubble.classList.add("hidden");
  });

  addBotMessage(getRandomWelcomeMessage());
}
