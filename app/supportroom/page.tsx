"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCommentAlt } from "react-icons/fa";

const ChatroomPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello, how can I assist you today?",
    },
    {
      id: 2,
      sender: "user",
      text: "I'm interested in your AI-powered customer support solution. Can you tell me more about it?",
    },
    {
      id: 3,
      sender: "bot",
      text: "Absolutely! Quanta is an AI-driven platform that delivers instant, accurate, and personalized responses to your customers, ensuring unparalleled satisfaction and efficiency.",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  // State variables for controlling the size of chat messages
  const [messageWidth, setMessageWidth] = useState("40%");
  const [messageHeight, setMessageHeight] = useState("auto");

  const countWords = (text: string) => {
    return text.trim().split(/\s+/).length;
  };

  const countCharacters = (text: string) => {
    return text.length;
  };

  const getTotalWordCount = () => {
    return messages.reduce((total, message) => total + countWords(message.text), 0);
  };

  const getTotalCharacterCount = () => {
    return messages.reduce((total, message) => total + countCharacters(message.text), 0);
  };

  const handleSendMessage = () => {
    const totalWordCount = getTotalWordCount();
    const totalCharacterCount = getTotalCharacterCount();
    const newMessageWordCount = countWords(newMessage);
    const newMessageCharacterCount = countCharacters(newMessage);

    if (
      newMessage.trim() !== "" &&
      totalWordCount + newMessageWordCount <= 500 &&
      totalCharacterCount + newMessageCharacterCount <= 2600
    ) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          sender: "user",
          text: newMessage,
        },
      ]);
      setNewMessage("");
    } else {
      alert("Word or character limit exceeded. You can only send up to 500 words and 2600 characters in total.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black font-Grosteque text-white">
      <section className="px-12 py-5 data-scroll-section">
        <nav className="flex justify-between items-center">
          <div className="logo">
            <span className="text-lime-200 font-extrabold text-4xl">Q.</span>
          </div>
        </nav>
      </section>
      <div className="flex-1 bg-black px-8 py-6 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message my-4 ${
              message.sender === "user" ? "justify-end" : ""
            } flex items-start`}
          >
            <div
              className={`bg-${
                message.sender === "user" ? "lime-200" : "white"
              } text-${message.sender === "user" ? "black" : "black"} rounded-lg p-4 ${
                message.sender === "user" ? "mr-4" : "ml-4"
              }`}
              style={{
                maxWidth: messageWidth, // Control width
                height: messageHeight,  // Control height
              }}
            >
              <p>{message.text}</p>
            </div>
            <Image
              src={`/images/${message.sender}-avatar.png`}
              width={40}
              height={40}
              alt={`${message.sender} avatar`}
              className="rounded-full"
            />
          </div>
        ))}
      </div>

      <div className="bg-lime-200 border-t border-black px-8 py-4 flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
          value={newMessage}
          onChange={(e) => {
            const words = e.target.value.trim().split(/\s+/);
            if (words.length <= 500) {
              setNewMessage(e.target.value);
            } else {
              alert("Word limit exceeded. You can only type up to 500 words.");
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <button
          className="bg-black text-white px-4 py-2 rounded-md ml-4 hover:bg-gray-800"
          onClick={handleSendMessage}
        >
          <FaCommentAlt />
        </button>
      </div>
    </div>
  );
};

export default ChatroomPage;
