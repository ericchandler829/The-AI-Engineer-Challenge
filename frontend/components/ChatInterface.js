import { useState, useRef, useEffect } from 'react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [developerMessage, setDeveloperMessage] = useState('You are a helpful assistant.');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom of the messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;
    if (!apiKey.trim()) {
      setError('API key is required');
      return;
    }

    setError('');
    const userMessage = userInput;
    setUserInput('');
    
    // Add user message to the chat
    setMessages((prev) => [...prev, { text: userMessage, sender: 'user' }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          developer_message: developerMessage,
          user_message: userMessage,
          api_key: apiKey,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botReply = '';

      // Handle streaming response
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        botReply += chunk;
        
        // Update the message as chunks arrive
        setMessages((prev) => {
          const updatedMessages = [...prev];
          // If the last message is from the bot, update it
          if (updatedMessages.length > 0 && updatedMessages[updatedMessages.length - 1].sender === 'bot') {
            updatedMessages[updatedMessages.length - 1].text = botReply;
          } else {
            // Otherwise, add a new bot message
            updatedMessages.push({ text: botReply, sender: 'bot' });
          }
          return updatedMessages;
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to get a response. Please check your API key and try again.');
      setMessages((prev) => [...prev, { text: 'Error: Failed to get a response', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="form-group">
        <label htmlFor="apiKey">OpenAI API Key</label>
        <input
          type="password"
          id="apiKey"
          className="input"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your OpenAI API key"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="developerMessage">System Message (Optional)</label>
        <textarea
          id="developerMessage"
          className="textarea"
          value={developerMessage}
          onChange={(e) => setDeveloperMessage(e.target.value)}
          placeholder="Enter system instructions"
        />
      </div>

      <div className="chat-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {error && <p style={{ color: 'var(--error-color)', margin: '0.5rem 0' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            className="input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            style={{ margin: 0 }}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="btn"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface; 