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

  //chatbot welcome messages
  const welcomeMessages = [
    "Witaj! Jestem asystentem Fictional Games. W czym mogę pomóc?",
    "Cześć! Jak mogę Ci dziś pomóc?",
    "Hej! Masz problem z zamówieniem lub kluczem?",
    "Witaj w centrum pomocy Fictional Games!",
  ];

  const chatbotRules = [
    {
      keywords: ["cześć", "hej", "siema"],
      responses: [
        "Cześć! W czym mogę pomóc?",
        "Witaj, jak mogę ci pomóc? Opisz swój problem.",
        "Hej, co potrzebujesz?",
      ],
    },
    {
      keywords: ["klucz", "key", "aktywacja", "zamówienie"],
      responses: [
        "Podaj numer zamówienia.",
        "Sprawdź czy klucz jest poprawny.",
        "Jeśli nie działa, wyślij kod błędu.",
      ],
    },
    {
      keywords: ["zwrot", "refund"],
      responses: [
        "Jasne! Możesz zrobić zwrot w ciągu 7 dni, o ile klucz nie został użyty.",
        'Zwrotu możesz dokonać w naszym formularzu kontaktowym: <a href="contact.html">kliknij tutaj</a>',
      ],
    },
    {
      keywords: ["błąd", "error", "nie działa"],
      responses: [
        "Sprawdź region aktywacji.",
        "Podaj dokładny komunikat błędu.",
        "Chętnie pomożemy, napisz co dokładnie się stało.",
      ],
    },
    {
      keywords: ["kontakt", "support", "pomoc", "email"],
      responses: [
        'Skontaktuj się z nami: <a href="contact.html">kliknij tutaj</a>',
        'Przejdź do formularza kontaktowego: <a href="contact.html">kliknij tutaj</a>',
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
    message.innerHTML = text;
    row.appendChild(icon);
    row.appendChild(message);
    chatBody?.appendChild(row);
    scrollToBottom();
  }

  function addUserMessage(text) {
    const message = document.createElement("div");
    message.classList.add("chat-message", "chat-message--user");
    message.textContent = text;
    chatBody.appendChild(message);
    scrollToBottom();
  }
  function handleSendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    addUserMessage(text);
    chatInput.value = "";

    const typing = showTyping();
    handleDelayedReply(text, typing);
  }

  function showTyping() {
    const typing = document.createElement("div");
    typing.classList.add("chat-row-assistant");
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-robot");
    const message = document.createElement("div");
    message.classList.add("chat-message", "chat-message--assistant");
    message.textContent = "Pisze...";
    typing.appendChild(icon);
    typing.appendChild(message);
    chatBody.appendChild(typing);
    chatBody.scrollTo({ top: chatBody.scrollHeight });
    return typing;
  }

  function handleDelayedReply(text, typing) {
    const delay = 600 + Math.random() * 1200;
    setTimeout(() => {
      typing.remove();
      const botResponse = getBotResponse(text);
      addBotMessage(botResponse);
    }, delay);
  }

  function scrollToBottom() {
    chatBody?.scrollTo({
      top: chatBody.scrollHeight,
      behavior: "smooth",
    });
  }

  function getBotResponse(userText) {
    const text = userText.toLowerCase();
    for (let i = 0; i < chatbotRules.length; i++) {
      const chatResponse = chatbotRules[i];
      for (let j = 0; j < chatResponse.keywords.length; j++) {
        const keyword = chatResponse.keywords[j];
        if (text.includes(keyword)) {
          const randomIndex = Math.floor(
            Math.random() * chatResponse.responses.length,
          );
          return chatResponse.responses[randomIndex];
        }
      }
    }
    return "Nie rozumiem, możesz powtórzyć?";
  }

  //event listeners
  chatBubble?.addEventListener("click", () => {
    chatWindow.classList.add("active");
    chatBubble.classList.add("hidden");
  });

  closeBtn?.addEventListener("click", () => {
    chatWindow.classList.remove("active");
    chatBubble.classList.remove("hidden");
  });

  contactCardContentBtn?.addEventListener("click", () => {
    chatWindow.classList.add("active");
    chatBubble.classList.add("hidden");
  });

  chatSend?.addEventListener("click", handleSendMessage);

  chatInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  });

  addBotMessage(getRandomWelcomeMessage());
}
