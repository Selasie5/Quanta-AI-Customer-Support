import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

export default function ChatRoom() {
  return (
    <div className="chat-room">
      <div className="chat-messages">
        <ChatMessage message="Hello, how can I assist you today?" />
        <ChatMessage message="I'm an AI assistant created by Quanta. How may I help you?" />
      </div>
      <ChatInput />
    </div>
  );
}