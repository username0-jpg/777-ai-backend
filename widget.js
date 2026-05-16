function initWidget() {

  const currentScript =
    document.querySelector(
      'script[data-business]'
    );

  const businessId =
    currentScript
      ? currentScript.getAttribute(
          "data-business"
        )
      : "777luckydraws";

  let settings = null;

  const API_URL =
    "https://seven77luckydraws-ai.onrender.com";

  // LOAD SETTINGS

  fetch(
    `${API_URL}/settings?businessId=${businessId}`
  )
  .then((response) => response.json())
  .then((data) => {

    console.log(data);

    if (
      !data ||
      !data.business_name
    ) {

      alert(
        "Business settings failed to load."
      );

      return;

    }

    settings = data;

    startWidget();

  })
  .catch((error) => {

    console.log(error);

    alert(
      "Failed to connect to server."
    );

  });

  // START WIDGET

  function startWidget() {

    const widget =
      document.createElement("div");

    widget.innerHTML = `

<div id="chat-button">
  💬
</div>

<div id="chat-widget" class="closed">

  <div id="chat-header">

    <div id="header-left">

      <div id="online-dot"></div>

      <span>
        ${settings.business_name} AI
      </span>

    </div>

    <button id="close-chat">
      ✕
    </button>

  </div>

  <div id="welcome-screen">

    <div id="welcome-content">

      <h2>
        👋 Welcome
      </h2>

      <p>
        How can we help today?
      </p>

      <button id="start-chat">
        Start Conversation
      </button>

    </div>

  </div>

  <div id="chat-container">

    <div id="chat-messages">

      <div class="message ai">
        Hello 👋 How can I help you today?
      </div>

    </div>

    <div id="typing-indicator">

      <span></span>
      <span></span>
      <span></span>

    </div>

    <div id="bottom-area">

      <div id="chat-input-area">

        <input
          id="chat-input"
          placeholder="Type message..."
        />

        <button id="chat-send">
          Send
        </button>

      </div>

      <div id="chat-footer">
        Powered by 777LuckyDrawsLTD
      </div>

    </div>

  </div>

</div>

<style>

#chat-button {

  position: fixed;

  bottom: 20px;
  right: 20px;

  width: 65px;
  height: 65px;

  border-radius: 50%;

  background:
    ${settings.primary_color};

  color: white;

  display: flex;

  justify-content: center;
  align-items: center;

  font-size: 28px;

  cursor: pointer;

  z-index: 999999;

  box-shadow:
    0 0 25px rgba(0,0,0,0.35);

}

#chat-widget {

  position: fixed;

  bottom: 100px;
  right: 20px;

  width: 350px;
  height: 520px;

  background: #111827;

  border-radius: 20px;

  overflow: hidden;

  display: flex;
  flex-direction: column;

  font-family: Arial;

  z-index: 999999;

}

#chat-widget.closed {

  display: none;

}

#chat-header {

  background:
    ${settings.primary_color};

  color: white;

  padding: 15px;

  display: flex;

  justify-content: space-between;
  align-items: center;

}

#header-left {

  display: flex;

  align-items: center;

  gap: 10px;

}

#online-dot {

  width: 10px;
  height: 10px;

  border-radius: 50%;

  background: #22c55e;

}

#close-chat {

  background: transparent;

  border: none;

  color: white;

  font-size: 18px;

  cursor: pointer;

}

#welcome-screen {

  flex: 1;

  display: flex;

  justify-content: center;
  align-items: center;

  text-align: center;

  color: white;

  padding: 30px;

}

#start-chat {

  padding: 12px 20px;

  border: none;

  border-radius: 10px;

  background:
    ${settings.primary_color};

  color: white;

  cursor: pointer;

  font-weight: bold;

}

#chat-container {

  display: none;

  flex-direction: column;

  flex: 1;

  overflow: hidden;

}

#chat-messages {

  flex: 1;

  overflow-y: auto;

  padding: 15px;

  color: white;

}

.message {

  margin-bottom: 10px;

  padding: 12px;

  border-radius: 12px;

  max-width: 85%;

  line-height: 1.4;

}

.user {

  background:
    ${settings.primary_color};

  margin-left: auto;

}

.ai {

  background: #374151;

}

#typing-indicator {

  display: none;

  padding: 10px 15px;

  color: white;

}

#bottom-area {

  background: #1f2937;

}

#chat-input-area {

  display: flex;

  padding: 10px;

  gap: 10px;

}

#chat-input {

  flex: 1;

  padding: 12px;

  border: none;

  border-radius: 10px;

  background: #374151;

  color: white;

}

#chat-send {

  padding: 12px 15px;

  background:
    ${settings.primary_color};

  color: white;

  border: none;

  border-radius: 10px;

  cursor: pointer;

  font-weight: bold;

}

#chat-footer {

  text-align: center;

  padding: 8px;

  font-size: 11px;

  color: #9ca3af;

  background: #0f172a;

}

</style>

`;

    document.body.appendChild(widget);

    // ELEMENTS

    const chatWidget =
      document.getElementById(
        "chat-widget"
      );

    const chatButton =
      document.getElementById(
        "chat-button"
      );

    const closeButton =
      document.getElementById(
        "close-chat"
      );

    const welcomeScreen =
      document.getElementById(
        "welcome-screen"
      );

    const chatContainer =
      document.getElementById(
        "chat-container"
      );

    const startChatButton =
      document.getElementById(
        "start-chat"
      );

    const messages =
      document.getElementById(
        "chat-messages"
      );

    const input =
      document.getElementById(
        "chat-input"
      );

    const button =
      document.getElementById(
        "chat-send"
      );

    const typingIndicator =
      document.getElementById(
        "typing-indicator"
      );

    // OPEN

    chatButton.onclick = () => {

      chatWidget.classList.remove(
        "closed"
      );

      chatButton.style.display =
        "none";

    };

    // CLOSE

    closeButton.onclick = () => {

      chatWidget.classList.add(
        "closed"
      );

      chatButton.style.display =
        "flex";

    };

    // START CHAT

    startChatButton.onclick = () => {

      welcomeScreen.style.display =
        "none";

      chatContainer.style.display =
        "flex";

      input.focus();

    };

    // SEND MESSAGE

    async function sendMessage() {

      const message =
        input.value.trim();

      if (!message) return;

      messages.innerHTML += `

        <div class="message user">
          ${message}
        </div>

      `;

      input.value = "";

      typingIndicator.style.display =
        "block";

      messages.scrollTop =
        messages.scrollHeight;

      try {

        const response =
          await fetch(
            `${API_URL}/chat`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({

                message,
                businessId,

                userEmail:
                  settings.user_email

              })

            }
          );

        const data =
          await response.json();

        typingIndicator.style.display =
          "none";

        const aiReply =
          data.reply ||
          data.error ||
          "AI failed to respond.";

        messages.innerHTML += `

          <div class="message ai">
            ${aiReply}
          </div>

        `;

        messages.scrollTop =
          messages.scrollHeight;

      } catch (error) {

        console.log(error);

        typingIndicator.style.display =
          "none";

      }

    }

    // BUTTON

    button.onclick =
      sendMessage;

    // ENTER

    input.addEventListener(
      "keypress",
      (event) => {

        if (
          event.key === "Enter"
        ) {

          sendMessage();

        }

      }
    );

  }

}

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initWidget
  );

} else {

  initWidget();

}