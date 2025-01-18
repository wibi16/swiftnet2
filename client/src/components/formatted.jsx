import React, { useEffect, useRef } from "react";
import { Bot } from "lucide-react";

const FormattedChatOutput = ({ content = "" }) => {
  const messagesEndRef = useRef(null);

  const cleanMessage = (text) => {
    if (!text) return "";
    
    // Find and remove everything from TaskResult to the end
    const taskResultIndex = text.indexOf('TaskResult(');
    if (taskResultIndex !== -1) {
      text = text.substring(0, taskResultIndex).trim();
    }
    
    const cleanups = [
      // Remove agent headers
      [/----------[\s\S]*?----------/g, ""],
      
      // Remove system metadata 
      [/\n\nHere is the pre-survey response:[\s\S]*?(?=\n\n|$)/g, ""],
      [/\n\nHere is the plan to follow[\s\S]*?(?=\n\n|$)/g, ""],
      [/\n\nHere is the final answer:/g, ""],
      
      // Remove any remaining TaskResult patterns
      [/TaskResult\([\s\S]*?\)$/g, ""],
      
      // Remove message metadata
      [/TextMessage\([^)]*\)[,\s]*$/gm, ""],
      [/RequestUsage\([^)]*\)[,\s]*$/gm, ""],
      [/stop_reason='[^']*'[,\s]*$/gm, ""],
      [/type='[^']*'[,\s]*$/gm, ""],
      [/content='[^']*'[,\s]*$/gm, ""],
      [/models_usage=[^,\n]*,?/g, ""],
      [/source='[^']*',?/g, ""],
      
      // Clean up formatting artifacts
      [/\n\s*:\s*[^\n]*(?=\n|$)/g, ""],
      [/^\d+\.\s*$/gm, ""],
      [/^[,.:\s]*$/gm, ""],
      [/[\(\[\{]\s*[\)\]\}]/g, ""],
      [/[,.\s]+$/gm, ""],
      [/^[,.\s]+$/gm, ""],
      [/^\s*\*\s*:.*$/gm, ""],
      
      // Clean up bullet points
      [/^\s*\*\s*/gm, "• "],
      
      // Fix code block formatting
      [/```(\w+)\s*\n/g, "```$1\n"],
      
      // Final cleanup
      [/\n\s*\n\s*\n/g, "\n\n"],
      [/\s{2,}/g, " "],
      [/\n{3,}/g, "\n\n"]
    ];

    return cleanups.reduce((text, [pattern, replacement]) => 
      text.replace(pattern, replacement)
    , text).trim();
  };

  const formatCodeBlock = (code, language) => {
    return (
      `<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg my-2 overflow-x-auto">
        <code class="language-${language || 'plaintext'}">${code.trim()}</code>
      </pre>`
    );
  };

  const parseContent = (content) => {
    const cleanedContent = cleanMessage(content);
    
    // If there's no content after cleaning, return empty array
    if (!cleanedContent) return [];
    
    // Split into meaningful chunks while preserving code blocks
    const chunks = cleanedContent.split(/\n\n(?=[A-Za-z•])/);
    
    return chunks.map(chunk => {
      // Handle code blocks specially
      let formattedText = chunk.replace(
        /```(python|sh|javascript|jsx|kotlin)?\n([\s\S]*?)```/g,
        (_, lang, code) => formatCodeBlock(code, lang)
      );
      
      // Format inline code
      formattedText = formattedText.replace(
        /`([^`]+)`/g,
        '<code class="bg-gray-100 text-gray-800 px-1 rounded">$1</code>'
      );
      
      // Convert newlines to <br/> but preserve code blocks
      formattedText = formattedText.replace(
        /(?<!<pre[\s\S]*?>[\s\S]*?)\n(?![\s\S]*?<\/pre>)/g,
        "<br />"
      );

      return { text: formattedText };
    }).filter(msg => {
      const cleanText = msg.text.replace(/<[^>]*>/g, "").trim();
      return cleanText && !/^[,.:\s)*]*$/.test(cleanText);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timer);
  }, [content]);

  const messages = parseContent(content);

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto bg-white rounded-xl overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((message, index) => (
          <div key={index} className="flex items-start gap-3 group">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Bot className="w-5 h-5 text-blue-600" />
            </div>
            
            <div className="flex-1">
              <div className="rounded-lg px-4 py-2 bg-gray-50 text-gray-800 shadow-sm 
                            group-hover:bg-gray-100 transition-colors duration-200">
                <div 
                  className="whitespace-pre-wrap text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: message.text }}
                />
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default FormattedChatOutput;