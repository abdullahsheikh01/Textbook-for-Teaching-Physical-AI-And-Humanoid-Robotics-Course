import React, { useState } from 'react';
import Layout from '@theme-original/Layout';
import ChatbotWidget from '@site/src/components/ChatbotWidget';
import AiHelpButton from '@site/src/components/AiHelpButton';

export default function LayoutWrapper(props) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen((prev) => !prev);
  };

  return (
    <>
      <Layout {...props} />
      <AiHelpButton onClick={toggleChatbot} />
      {isChatbotOpen && <ChatbotWidget />}
    </>
  );
}
