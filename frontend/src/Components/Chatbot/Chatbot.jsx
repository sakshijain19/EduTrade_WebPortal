import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Inject Botpress Webchat Script
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    script1.async = true;
    document.body.appendChild(script1);

    // Inject Botpress Custom Script
    const script2 = document.createElement("script");
    script2.src = "https://files.bpcontent.cloud/2025/02/07/13/20250207132958-JRISXZCB.js";
    script2.async = true;
    document.body.appendChild(script2);

    // Initialize Chatbot
    script1.onload = () => {
      window.botpressWebChat.init({
        botId: "943c07e9-1d72-48c6-b9ab-01a3345a75a9",
        host: "https://cdn.botpress.cloud/webchat/v2.2/inject.js",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "943c07e9-1d72-48c6-b9ab-01a3345a75a9",
        lazySocket: true,
        showBotInfoPage: false,
        botName: "EduTrade",
        avatarUrl: "https://i.ibb.co/xSTJwWKz/Logo.png",
        stylesheet: "https://webchat-styler-css.botpress.app/prod/c07fe89b-0b65-43a3-ae01-260619d10069/v38612/style.css"
    });
};
}, []);

return null;
};

export default Chatbot;






