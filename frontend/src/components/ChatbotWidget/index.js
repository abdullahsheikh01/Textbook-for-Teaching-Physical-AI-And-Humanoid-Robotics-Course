import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatbotWidget.module.css';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection().toString().trim();
      setSelectedText(selection);
    };
    document.addEventListener('mouseup', handleTextSelection);
    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
    };
  }, []);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newUserMessage = { text: input, sender: 'user', selectedText: selectedText };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput('');
    setSelectedText(''); // Clear selected text after sending

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input, selected_text: selectedText }),
    });
    const data = await response.json();

    const newBotMessage = { text: data.response, sender: 'bot' };
    setMessages((prevMessages) => [...prevMessages, newBotMessage]);
  };



  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.chatbotContainer}>
      {!isOpen ? (
        <button className={styles.chatbotToggle} onClick={toggleChatbot}>
          AI HELP
        </button>
      ) : (
        <div className={styles.chatbotWindow}>
          <div className={styles.chatbotHeader}>
            <span>AI Assistant</span>
            <button className={styles.closeButton} onClick={toggleChatbot}>
              ×
            </button>
          </div>
          <div className={styles.chatbotBody}>
            {selectedText && (
              <div className={styles.selectedTextPrompt}>
                Asking about selected text: "{selectedText.substring(0, 50)}{selectedText.length > 50 ? '...' : ''}"
              </div>
            )}
            {messages.map((msg, index) => (
              <div key={index} className={`${styles.message} ${styles[msg.sender]}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.chatbotInput}>
            <input
              type="text"
              placeholder="Ask me anything about Physical AI & Humanoid Robotics..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <button onClick={handleSendMessage} disabled={!input.trim()}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
