"use client";

import { useState } from 'react';

export default function ChatInput() {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle message submission here
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="input-field"
      />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  );
}