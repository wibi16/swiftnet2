import { Button, Input, Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import React, { useState, useRef, useEffect } from "react";

const Chat = () => {
  const [task, setTask] = useState(""); // State for the input value
  const [messages, setMessages] = useState([]); // State for storing chat messages
  const messagesEndRef = useRef(null); // Ref for scrolling to the bottom

  // Function to handle adding a new message
  const handleInitiate = () => {
    if (task.trim() !== "") {
      setMessages((prevMessages) => [...prevMessages, task]);
      setTask(""); // Clear the input field after adding the message
    }
  };

  // Scroll to the bottom of the chat whenever messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="h-screen bg-indigo-100 flex flex-col items-center animated-background">
      {/* Chat messages container */}
      <Tabs value="single" className="mt-8">
        <TabsHeader>
            <Tab key="single" value="single" className="min-w-40">
                Single
            </Tab>
            <Tab key="inTheLoop" value="inTheLoop" className=" min-w-60">
                In the Loop
            </Tab>
        </TabsHeader>
      </Tabs>
      <div className="w-full max-w-[40rem] no-scrollbar rounded-lg p-4 flex flex-col-reverse gap-4 overflow-y-auto mb-auto mt-8 h-[calc(100%-8rem)]">
        {messages.reverse().map((message, index) => (
          <div
            key={index}
            className="bg-indigo-400 text-white px-4 py-2 rounded-lg self-end"
          >
            {message}
          </div>
        ))}
        {/* Invisible div to maintain scroll position */}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input and Button */}
      <div className="relative flex w-full max-w-[40rem] shadow-xl mb-8">
        <Input
          type="text"
          label="Task"
          value={task}
          onKeyDown={(key) => {
            if (key.code === "Enter" && task) {
              handleInitiate();
            }
          }}
          onChange={(e) => setTask(e.target.value)}
          className="pr-20"
          containerProps={{
            className: "min-w-0",
          }}
        />
        <Button
          size="sm"
          className="!absolute right-1 top-1 rounded"
          variant="gradient"
          onClick={handleInitiate}
        >
          Initiate
        </Button>
      </div>
    </div>
  );
};

export default Chat;
