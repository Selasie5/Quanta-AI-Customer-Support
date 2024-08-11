"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaCommentAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";

interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'tr', name: 'Turkish' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'pl', name: 'Polish' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'he', name: 'Hebrew' },
  { code: 'sv', name: 'Swedish' },
  { code: 'no', name: 'Norwegian' },
  { code: 'da', name: 'Danish' },
  { code: 'fi', name: 'Finnish' },
  { code: 'cs', name: 'Czech' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'ro', name: 'Romanian' },
  { code: 'sk', name: 'Slovak' },
  { code: 'el', name: 'Greek' },
  { code: 'th', name: 'Thai' },
  { code: 'ms', name: 'Malay' },
  { code: 'id', name: 'Indonesian' },
  { code: 'tl', name: 'Tagalog' },
  { code: 'my', name: 'Burmese' },
  { code: 'km', name: 'Khmer' },
  { code: 'la', name: 'Lao' },
  { code: 'ne', name: 'Nepali' },
  { code: 'si', name: 'Sinhalese' },
  { code: 'sw', name: 'Swahili' },
  { code: 'cy', name: 'Welsh' },
  { code: 'hr', name: 'Croatian' },
  { code: 'sr', name: 'Serbian' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'lt', name: 'Lithuanian' },
  { code: 'lv', name: 'Latvian' },
  { code: 'et', name: 'Estonian' },
  { code: 'mt', name: 'Maltese' },
  // Add more languages as needed
];


const ChatroomPage: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>(""); // Ensure a valid sessionId
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en'); // Default language

  useEffect(() => {
    if (user?.uid) {
      setSessionId(user.uid);
    } else {
      // Handle case where user is not authenticated or UID is not available
      setSessionId("default_session_id");
    }
  }, [user]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: newMessage,
    };

    // Add the user's message to the state
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage(""); // Clear the input field
    setLoading(true); // Set loading state

    try {
      console.log("Sending message with sessionId:", sessionId);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId || "default_session_id", // Ensure sessionId is set
          message: newMessage,
          language: selectedLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received response:", data);

      const botMessage: Message = {
        id: messages.length + 2,
        sender: "bot",
        text: data.response,
      };

      // Add the bot's response to the state
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Optionally add an error message to the chat
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black font-Grosteque text-white">
      <section className="px-12 py-5 data-scroll-section">
        <nav className="flex justify-between items-center">
          <div className="logo">
            <span className="text-lime-200 font-extrabold text-4xl">Q.</span>
          </div>
          <div className="language-select">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-black text-white border border-lime-200 rounded-lg px-4 py-2"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
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
                maxWidth: "40%",  // Control width
                height: "auto",   // Control height
              }}
            >
              <p>{message.text}</p>
            </div>
            <Image
              src="/avatar-7.png" // Update with actual image path
              width={40}
              height={40}
              alt={`${message.sender} avatar`}
              className="rounded-full"
            />
          </div>
        ))}
        {loading && <p className="text-white text-center">Loading...</p>}
      </div>

      <div className="bg-lime-200 border-t border-black px-8 py-4 flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button
          className="bg-black text-white px-4 py-2 rounded-md ml-4 hover:bg-gray-800"
          onClick={sendMessage}
          disabled={loading}
        >
          <FaCommentAlt />
        </button>
      </div>
    </div>
  );
};

export default ChatroomPage;
