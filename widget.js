(() => {

  const API_URL =
    "https://seven77-ai-backend.onrender.com";

  const currentScript =
    document.currentScript;

  const businessId =
    currentScript.getAttribute(
      "data-business"
    );

  if (!businessId) {

    console.error(
      "Missing business ID"
    );

    return;

  }
console.log("WIDGET VERSION 2.1");
  async function loadWidget() {

    try {

      const response =
        await fetch(
          `${API_URL}/settings?businessId=${businessId}`
        );

      const settings =
        await response.json();

      createWidget(settings);

    } catch (error) {

      console.log(error);

    }

  }

  function createWidget(settings) {

    // BUTTON

    const button =
      document.createElement("button");

    button.innerHTML =
      "💬";

    Object.assign(
      button.style,
      {

        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "72px",
        height: "72px",
        borderRadius: "50%",
        border: "none",
        background:
          settings.primary_color ||
          "#dc2626",
        color: "white",
        fontSize: "30px",
        cursor: "pointer",
        zIndex: "999999",
        boxShadow:
          "0 15px 35px rgba(0,0,0,0.3)",
        transition:
          "all 0.25s ease"

      }
    );

    document.body.appendChild(
      button
    );

    // CHAT

    const chat =
      document.createElement("div");

    Object.assign(
      chat.style,
      {

        position: "fixed",
        bottom: "105px",
        right: "20px",
        width: "360px",
        height: "540px",
        background: "#111827",
        borderRadius: "26px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        zIndex: "999999",
        boxShadow:
          "0 25px 50px rgba(0,0,0,0.35)",
        border:
          "1px solid rgba(255,255,255,0.06)",

        opacity: "0",
        transform:
          "translateY(20px) scale(0.95)",

        pointerEvents: "none",

        transition:
          "all 0.25s ease"

      }
    );

    document.body.appendChild(
      chat
    );

    // HEADER

    const header =
      document.createElement("div");

    Object.assign(
      header.style,
      {

        padding: "18px",
        background:
          settings.primary_color ||
          "#dc2626",
        color: "white",
        display: "flex",
        justifyContent:
          "space-between",
        alignItems:
          "center"

      }
    );

    // TITLE

    const title =
      document.createElement("div");

    title.innerHTML = `
      <div style="
        font-weight:bold;
        font-size:17px;
      ">
        777Bot
      </div>

      <div style="
        font-size:12px;
        opacity:0.8;
        margin-top:3px;
      ">
        AI Assistant • Online
      </div>
    `;

    header.appendChild(title);

    // MINIMIZE

    const minimize =
      document.createElement("button");

    minimize.innerHTML = "—";

    Object.assign(
      minimize.style,
      {

        background: "transparent",
        border: "none",
        color: "white",
        fontSize: "22px",
        cursor: "pointer"

      }
    );

    header.appendChild(
      minimize
    );

    chat.appendChild(header);

    // MESSAGES

    const messages =
      document.createElement("div");

    Object.assign(
      messages.style,
      {

        flex: "1",
        padding: "15px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: "#0f172a"

      }
    );

    chat.appendChild(messages);

    // INPUT AREA

    const inputArea =
      document.createElement("div");

    Object.assign(
      inputArea.style,
      {

        padding: "15px",
        display: "flex",
        gap: "10px",
        background: "#111827"

      }
    );
// FOOTER

const footer =
  document.createElement("div");

footer.innerHTML =
  "Powered by 777BotLtd";

Object.assign(
  footer.style,
  {

    textAlign: "center",
    fontSize: "11px",
    padding: "10px",
    color: "#9ca3af",
    background: "#111827",
    borderTop:
      "1px solid rgba(255,255,255,0.05)"

  }
);

chat.appendChild(
  footer
);
    chat.appendChild(inputArea);

    // INPUT

    const input =
      document.createElement("input");

    input.placeholder =
      "Type your message...";

    Object.assign(
      input.style,
      {

        flex: "1",
        padding: "14px",
        borderRadius: "14px",
        border: "none",
        outline: "none",
        background: "#1f2937",
        color: "white",
        fontSize: "14px"

      }
    );

    inputArea.appendChild(input);

    // SEND

    const send =
      document.createElement("button");

    send.innerHTML =
      "➜";

    Object.assign(
      send.style,
      {

        width: "54px",
        border: "none",
        borderRadius: "14px",
        background:
          settings.primary_color ||
          "#dc2626",
        color: "white",
        cursor: "pointer",
        fontSize: "18px"

      }
    );

    inputArea.appendChild(send);

    // OPEN STATE

    let isOpen = false;

    button.onclick = () => {

      isOpen = !isOpen;

      if (isOpen) {

        chat.style.opacity =
          "1";

        chat.style.transform =
          "translateY(0) scale(1)";

        chat.style.pointerEvents =
          "all";

      } else {

        closeWidget();

      }

    };

    minimize.onclick =
      closeWidget;

    function closeWidget() {

      isOpen = false;

      chat.style.opacity =
        "0";

      chat.style.transform =
        "translateY(20px) scale(0.95)";

      chat.style.pointerEvents =
        "none";

    }

    // TIMESTAMP

    function getTime() {

      return new Date()
        .toLocaleTimeString(
          [],
          {

            hour: "2-digit",
            minute: "2-digit"

          }
        );

    }

    // SAVE CHAT

    function saveMessages() {

      localStorage.setItem(

        `chat_${businessId}`,

        messages.innerHTML

      );

    }

    // LOAD CHAT

    const oldMessages =
      localStorage.getItem(
        `chat_${businessId}`
      );

    if (oldMessages) {

      messages.innerHTML =
        oldMessages;

    }

    // MESSAGE

    function addMessage(
      text,
      isUser
    ) {

      const wrapper =
        document.createElement("div");

      wrapper.style.display =
        "flex";

      wrapper.style.flexDirection =
        "column";

      wrapper.style.alignItems =
        isUser
          ? "flex-end"
          : "flex-start";

      const bubble =
        document.createElement("div");

      bubble.innerHTML = `
        ${
          !isUser
            ? `
            <div style="
              font-size:12px;
              margin-bottom:5px;
              opacity:0.8;
            ">
               777Bot
            </div>
          `
            : ""
        }

        <div>
          ${text}
        </div>

        <div style="
          font-size:11px;
          opacity:0.65;
          margin-top:6px;
        ">
          ${getTime()}
        </div>
      `;

      Object.assign(
        bubble.style,
        {

          maxWidth: "82%",
          padding: "13px 15px",
          borderRadius: "18px",
          background:
            isUser
              ? settings.primary_color
              : "#1f2937",
          color: "white",
          fontSize: "14px",
          lineHeight: "1.5",
          wordBreak:
            "break-word"

        }
      );

      wrapper.appendChild(
        bubble
      );

      messages.appendChild(
        wrapper
      );

      messages.scrollTop =
        messages.scrollHeight;

      saveMessages();

    }

    // TYPING DOTS

    function addTyping() {

      const typing =
        document.createElement("div");

      typing.id =
        "typing";

      typing.innerHTML = `
        <div style="
          display:flex;
          gap:5px;
          padding:12px;
        ">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      `;

      messages.appendChild(
        typing
      );

      messages.scrollTop =
        messages.scrollHeight;

      return typing;

    }

    // STYLE DOTS

    const style =
      document.createElement("style");

    style.innerHTML = `

      .dot {

        width:8px;
        height:8px;

        background:#9ca3af;

        border-radius:50%;

        animation:
          bounce 1s infinite;

      }

      .dot:nth-child(2) {

        animation-delay:0.2s;

      }

      .dot:nth-child(3) {

        animation-delay:0.4s;

      }

      @keyframes bounce {

        0%, 80%, 100% {

          transform:
            translateY(0);

        }

        40% {

          transform:
            translateY(-6px);

        }

      }

      @media (max-width: 500px) {

        .mobile-widget {

          width:calc(100vw - 20px) !important;

          right:10px !important;

          bottom:90px !important;

        }

      }

    `;

    document.head.appendChild(
      style
    );

    chat.classList.add(
      "mobile-widget"
    );

    // SEND MESSAGE

    async function sendMessage() {

      const text =
        input.value.trim();

      if (!text) return;

      addMessage(
        text,
        true
      );

      input.value = "";

      // LEAD DETECTION

  

      const typing =
        addTyping();

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

                message: text,

                businessId

              })

            }
          );

        const data =
          await response.json();

        typing.remove();

        addMessage(
          data.reply,
          false
        );

      } catch (error) {

        typing.remove();

        addMessage(
          "Something went wrong.",
          false
        );

      }

    }

    // EVENTS

    send.onclick =
      sendMessage;

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

    // WELCOME MESSAGE

    if (!oldMessages) {

      addMessage(

        "Hi 👋 Welcome to 777Bot. How can I help you today?",

        false

      );

    }

  }

  loadWidget();

})();