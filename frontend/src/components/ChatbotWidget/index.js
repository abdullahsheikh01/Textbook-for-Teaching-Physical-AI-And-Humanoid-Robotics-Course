import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatbotWidget.module.css';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

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

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input, selected_text: selectedText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const newBotMessage = { text: data.response, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorBotMessage = { text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, errorBotMessage]);
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Close chatbot with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className={styles.chatbotContainer} role="complementary" aria-label="AI Assistant">
      {!isOpen ? (
        <button
          className={styles.chatbotToggle}
          onClick={toggleChatbot}
          aria-label="Open AI Assistant"
          title="AI Assistant"
        >
          AI HELP
        </button>
      ) : (
        <div
          className={styles.chatbotWindow}
          role="dialog"
          aria-modal="true"
          aria-label="AI Assistant Chat"
        >
          <div className={styles.chatbotHeader} role="banner">
            <span>AI Assistant</span>
            <button
              className={styles.closeButton}
              onClick={toggleChatbot}
              aria-label="Close chat"
              title="Close"
            >
              ×
            </button>
          </div>
          <div
            className={styles.chatbotBody}
            role="main"
            aria-live="polite"
            aria-relevant="additions"
          >
            {selectedText && (
              <div className={styles.selectedTextPrompt} role="status" aria-live="polite">
                Asking about selected text: "{selectedText.substring(0, 50)}{selectedText.length > 50 ? '...' : ''}"
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${styles[msg.sender]}`}
                role="logitem"
                aria-label={`${msg.sender} message: ${msg.text}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} aria-hidden="true" />
          </div>
          <div className={styles.chatbotInput} role="form" aria-label="Chat input">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask me anything about Physical AI & Humanoid Robotics..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              aria-label="Type your message"
              autoComplete="off"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim()}
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;