import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Send, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import axios from "axios";

interface Message {
  id: string;
  content: string;
  sender: "user" | "universe";
  timestamp: Date;
}

const universeResponses = [
  "I've received your intention. Trust the process and watch for signs.",
  "Your desire has been heard. Remember that timing is divine.",
  "As you believe, so shall it be. Continue to hold this vision.",
  "The wheels are in motion. Maintain your focus and gratitude.",
  "Everything you seek is already yours in the quantum field. Stay open to receiving.",
  "Your consciousness is creating this reality. I'm simply responding to your vibration.",
  "Consider it done. Now practice the feeling of already having received.",
  "Your message has been received. Let go of how it will manifest and trust the process.",
  "What you seek is seeking you. Remain in a state of allowing.",
  "Your focused intention is powerful. Continue to align your emotions with your desires.",
];

const getUniverseResponse = () => {
  const randomIndex = Math.floor(Math.random() * universeResponses.length);
  return universeResponses[randomIndex];
};

const UniverseChat = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Welcome to MindMail. I am the Universe responding to your consciousness. What would you like to manifest today?",
      sender: "universe",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate universe response after a short delay
    setTimeout(() => {
      const universeMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getUniverseResponse(),
        sender: "universe",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, universeMessage]);

      toast({
        title: "Message Sent to Universe",
        description: "Your intention has been received.",
      });
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const [postData, setPostData] = useState({
    prompt: "",
    // model: "gpt-3.5-turbo",
    // temperature: 0.7,
    // max_tokens: 200,
    // top_p: 1,
    // frequency_penalty: 0,
    // presence_penalty: 0,
    // stop: null
  });

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostData({ ...postData, prompt: e.target.value });
    try {
      const response = await axios.post(
        "https://mindmailaiimagegenerator.onrender.com/generate-image",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
        }
      );
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log("Error submit data:", error);
    }
  };

  return (
    <Card className="cosmic-card h-full flex flex-col">
      <CardHeader className="border-b border-white/10 pb-3">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-cosmic-500/30 flex items-center justify-center mr-3">
            <Bot size={20} className="text-cosmic-200" />
          </div>
          <div>
            <CardTitle className="text-white text-lg">
              DM the Universe
            </CardTitle>
            <CardDescription>
              Send your intentions directly to the universe
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden flex flex-col p-0">
        <div className="flex flex-col space-y-4 p-4 overflow-y-auto flex-grow max-h-[400px]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`
                  max-w-[80%] p-3 rounded-lg 
                  ${
                    message.sender === "user"
                      ? "bg-cosmic-500/40 text-white ml-auto"
                      : "bg-white/10 text-white/90"
                  }
                `}
              >
                {message.content}
                <div className="text-xs mt-1 opacity-60">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t border-white/10 p-4 mt-auto">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your intention to the Universe..."
              className="bg-white/5 border-white/10 text-white"
            />
            <Button onClick={handleSendMessage} className="cosmic-button">
              <Send size={18} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UniverseChat;
