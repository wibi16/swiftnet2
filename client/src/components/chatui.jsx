import React, { useEffect, useRef } from "react";
import { Bot } from "lucide-react";
import FormattedChatOutput from "./formatted";


const ChatUI = ({ messages = [] }) => {
  const messagesEndRef = useRef(null);

  console.log(messages);
  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getMessageSender = (string) => {
    const match = string.match(/----------\s*(\w+)\s*----------/);
    if (match && match[1] && match[1] === "MagenticOneOrchestrator") {
      match[1] = "TaskMaster";
    }
    if (match && match[1] && match[1] === "WebSurfer") {
      match[1] = "BrowserBot";
    }
    if (match && match[1] && match[1] === "Coder") {
      match[1] = "CodeSmith";
    }
    if (match && match[1] && match[1] === "ComputerTerminal") {
      match[1] = "ShellCommander";
    }
    if (match && match[1] && match[1] === "FileSurfer") {
      match[1] = "FileNavigator";
    }
    return match ? match[1] : null;
  };

  const removeSenderPattern = (input) => {
    const _input = input.trim("\n");
    const output = _input.replace(/----------\s*(\w+)\s*----------/, "");
    return output;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    messages &&
    messages.length > 0 && (
      <div className="flex flex-col max-h-[600px] w-full max-w-4xl mx-auto bg-white rounded-xl overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {messages.map((message, index) => (
            <FormattedChatOutput content={message.data} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        
      </div>
    )
  );
};

export default ChatUI;