import React, { useState, useEffect } from "react";
import { Send, Loader2, MessageSquare, Zap, LockIcon, ArrowRight, Clock, X } from "lucide-react";
import { io } from "socket.io-client";
import { Navigate, useNavigate } from "react-router";
import { usePrivy } from '@privy-io/react-auth';
import ChatResponseUI from "../components/chatui";
import Navbar from "../components/navbar";

const FirstTimePopup = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300); // Match transition duration
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
      isAnimating ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'
    }`}>
      <div className={`transform transition-all duration-300 w-full max-w-md mx-4 ${
        isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Decorative gradient top bar */}
          <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500" />
          
          {/* Close button with pulse effect */}
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors group"
          >
            <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
            <span className="absolute inset-0 rounded-full animate-pulse bg-gray-100 opacity-0 group-hover:opacity-100" />
          </button>
          
          <div className="p-8">
            <div className="flex flex-col items-center text-center">
              {/* Logo with subtle hover effect */}
              <div className="relative group mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <img 
                  src="/logo.png" 
                  alt="SwiftNet Logo" 
                  className="w-20 h-20 relative transform transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
              
              {/* Animated title */}
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent transform transition-all duration-300 hover:scale-105">
                Welcome to SwiftNet
              </h2>
              
              {/* Animated divider */}
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-6 transform transition-all duration-300 hover:scale-x-150" />
              
              {/* Content with better typography */}
              <p className="text-gray-600 mb-8 leading-relaxed max-w-sm">
                Please note that SwiftNet is currently in 
                <span className="font-medium text-cyan-600"> experimental stage</span>. 
                We're constantly improving our service to provide you with the 
                <span className="font-medium text-blue-600"> best experience</span>.
              </p>
              
              {/* Enhanced button with animation */}
              <button
                onClick={onClose}
                className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl px-8 py-3 font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <span className="relative z-10">I understand</span>
                <div className="absolute inset-0 bg-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 opacity-20" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Separate suggestion lists for each mode
const singleModeSuggestions = [
  {
    text: "Write a python program to add n natural numbers",
    time: "15-20 seconds"
  },
  {
    text: "Generate unit tests for my authentication service",
    time: "15-20 seconds"
  },
  {
    text: "Create an API endpoint for user registration",
    time: "15-20 seconds"
  },
  {
    text: "Debug my React useEffect hook",
    time: "15-20 seconds"
  }
];

const conversationalModeSuggestions = [
  {
    text: "Can you help me understand how blockchain works?",
    time: "15-20 seconds"
  },
  {
    text: "Let's brainstorm features for my new app idea",
    time: "15-20 seconds"
  },
  {
    text: "I need help planning my software architecture",
    time: "15-20 seconds"
  },
  {
    text: "Guide me through learning React hooks",
    time: "15-20 seconds"
  }
];

const socket = io("https://swiftnet.onrender.com");
// const socket = io("http://localhost:5000");

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
            ? "bg-cyan-500 text-white shadow-lg"
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
  const [showFirstTimePopup, setShowFirstTimePopup] = useState(false);
  const { ready, authenticated } = usePrivy();
  const navigate = useNavigate();

  // Get current suggestions based on mode
  const getCurrentSuggestions = () => {
    return mode === "single" ? singleModeSuggestions : conversationalModeSuggestions;
  };

  // Handle mode change
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setShowSuggestions(true); // Show suggestions again when mode changes
    setMessages([]); // Clear previous messages
    setResponse(""); // Clear previous response
  };

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedSwiftNet");
    if (!hasVisited) {
      setShowFirstTimePopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    localStorage.setItem("hasVisitedSwiftNet", "true");
    setShowFirstTimePopup(false);
  };

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
    setShowSuggestions(false);
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
      <FirstTimePopup isOpen={showFirstTimePopup} onClose={handleClosePopup} />
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
          <div className="w-full max-w-3xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                SwiftNet
              </h1>
              <p className="text-gray-600">Think Fast, Think Swift</p>
            </div>

            <div className="flex flex-col items-center">
              <ModeSwitch mode={mode} onModeChange={handleModeChange} />

              {showSuggestions && (
                <div className="w-full grid grid-cols-2 gap-4 mb-6">
                  {getCurrentSuggestions().map((suggestion, index) => (
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