"use client";

import { useState } from "react";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: string; content: string }[]
  >([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    const botMessage = { role: "assistant", content: data.reply };
    setMessages((prev) => [...prev, botMessage]);

    setMessage("");
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                background:
                  msg.role === "user" ? "#0070f3" : "#eaeaea",
                color: msg.role === "user" ? "white" : "black",
                padding: "8px 12px",
                borderRadius: "10px",
                display: "inline-block",
              }}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <div style={styles.inputContainer}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about inventory..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  chatContainer: {
    position: "fixed" as const,
    bottom: "20px",
    right: "20px",
    width: "300px",
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column" as const,
  },
  chatBox: {
    height: "300px",
    overflowY: "auto" as const,
    padding: "10px",
  },
  inputContainer: {
    display: "flex",
    borderTop: "1px solid #ddd",
  },
  input: {
    flex: 1,
    padding: "8px",
    border: "none",
    outline: "none",
  },
  button: {
    padding: "8px 12px",
    background: "#0070f3",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};