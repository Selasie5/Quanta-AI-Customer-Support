import React, { FC } from 'react';

interface ChatMessageProps {
  message: string;
}

const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className="chat-message">
      <p>{message}</p>
    </div>
  );
};

export default ChatMessage;