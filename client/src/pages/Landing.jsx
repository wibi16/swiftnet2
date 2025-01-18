import React, { useState, useEffect } from "react";
import { Send, Loader2, MessageSquare, Zap, LockIcon, ArrowRight, Clock } from "lucide-react";
import { io } from "socket.io-client";
import { Navigate, useNavigate } from "react-router";
import { usePrivy } from '@privy-io/react-auth';
import ChatResponseUI from "../components/chatui";
import Navbar from "../components/navbar";


const suggestions = [
  {
    text: "Write a python program to add n natural numbers",
  },
  {
    text: "Generate unit tests for my authentication service",
  },
  {
    text: "Explain my python code",
  },
  {
    text: "Help me debug my React useEffect hook",
  }
];

// const socket = io("http://localhost:5000");
const socket = io("https://swiftnet.onrender.com");

function ModeSwitch({ mode, onModeChange }) {
  return (
    <div className="inline-flex p-1 bg-gray-100 rounded-lg mb-6">
      <button
        onClick={() => onModeChange("single")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
          mode === "single"
            ? "bg-cyan-500 text-white shadow-lg"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        <Zap className="h-4 w-4" />
        Single Task
      </button>
      <button
        onClick={() => onModeChange("conversational")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
          mode === "conversational"
            ? "bg-indigo-500 text-white shadow-lg"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        <MessageSquare className="h-4 w-4" />
        Conversational
      </button>
    </div>
  );
}

function Landing() {
  const [userInput, setUserInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState("");
  const [mode, setMode] = useState("single");
  const [messages, setMessages] = useState([]);
  const [estimatedTime, setEstimatedTime] = useState("15-20 seconds");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const { ready, authenticated } = usePrivy();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("connect", () => console.info("Connected to WebSocket server:", socket.id));
    socket.on("disconnect", () => console.info("Disconnected from WebSocket server"));
    
    socket.on("stream_response", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      setResponse((prevResponse) => prevResponse + data.data);
      setIsProcessing(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("stream_response");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setShowSuggestions(false);

    if (mode !== "single" && response !== "") {
      socket.emit("user_response", { response: userInput });
    } else {
      setIsProcessing(true);
      setResponse("");
      socket.emit("process_task", { task: userInput, humanInteraction: mode });
    }
    
    setUserInput("");
  };

  const handleSuggestionClick = (suggestion) => {
    setUserInput(suggestion.text);
    setEstimatedTime(suggestion.time);
    setShowSuggestions(false);
    // Automatically submit the suggestion
    socket.emit("process_task", { task: suggestion.text, humanInteraction: mode });
    setIsProcessing(true);
    setResponse("");
  };

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!authenticated) {
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
          <div className="w-full max-w-3xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                SwiftNet
              </h1>
              <p className="text-gray-600">Intelligent AI agents at your service</p>
            </div>

            <div className="flex flex-col items-center">
              <ModeSwitch mode={mode} onModeChange={setMode} />

              {showSuggestions && (
                <div className="w-full grid grid-cols-2 gap-4 mb-6">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-indigo-500 hover:shadow-md transition-all text-left group"
                    >
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 group-hover:text-indigo-600 line-clamp-2">
                          {suggestion.text}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-lg">
                <div className="p-6 max-h-[400px] overflow-y-auto">
                  <ChatResponseUI messages={messages} />
                </div>

                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <form onSubmit={handleSubmit} className="relative flex items-center">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder={mode === "single" ? "Describe your task..." : "Type your message..."}
                      className="flex-1 px-4 py-4 bg-white rounded-l-xl border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-gray-900 placeholder-gray-500"
                    />
                    <div className="flex items-center bg-white border border-l-0 border-gray-200 rounded-r-xl px-3 py-2">
                      <div className="text-xs text-gray-500 flex items-center gap-1 mr-2">
                        <Clock className="w-3 h-3" />
                        <span>{estimatedTime}</span>
                      </div>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white rounded-lg px-4 py-2 flex items-center gap-2 transition-colors"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Processing</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            <span>{mode === "single" ? "Submit" : "Send"}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;