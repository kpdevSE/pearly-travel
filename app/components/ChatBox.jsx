import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("../api/socket.js");

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      socket.emit("sendMessage", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="fixed bottom-5 right-5 bg-white shadow-lg rounded-lg p-4 w-80">
      <div className="h-60 overflow-y-auto mb-3">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 border-b">
            {msg}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-grow border rounded-lg p-2"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
