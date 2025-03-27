
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Send, Bot, ChevronDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from "@/components/ui/drawer";
import { useIsMobile } from '@/hooks/use-mobile';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'universe';
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
  "Your focused intention is powerful. Continue to align your emotions with your desires."
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
      id: '1',
      content: "Welcome to MindMail. I am the Universe responding to your consciousness. What would you like to manifest today?",
      sender: 'universe',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
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
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate universe response after a short delay
    setTimeout(() => {
      const universeMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getUniverseResponse(),
        sender: 'universe',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, universeMessage]);
      
      toast({
        title: "Message Sent to Universe",
        description: "Your intention has been received."
      });
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const ChatContent = () => (
    <>
      <div className="flex flex-col space-y-4 p-4 max-h-[400px] overflow-y-auto">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`
                max-w-[80%] p-3 rounded-lg 
                ${message.sender === 'user' 
                  ? 'bg-cosmic-500/40 text-white ml-auto' 
                  : 'bg-white/10 text-white/90'}
              `}
            >
              {message.content}
              <div className="text-xs mt-1 opacity-60">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-white/10 p-4">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your intention to the Universe..."
            className="bg-white/5 border-white/10 text-white"
          />
          <Button 
            onClick={handleSendMessage} 
            className="cosmic-button"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Card className="cosmic-card h-full cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setIsOpen(true)}>
        <CardContent className="flex flex-col items-center justify-center py-6">
          <div className="h-16 w-16 rounded-full bg-cosmic-500/30 flex items-center justify-center mb-4">
            <Bot size={32} className="text-cosmic-200" />
          </div>
          <h3 className="text-lg font-medium text-white mb-1">DM the Universe</h3>
          <p className="text-white/60 text-sm text-center">
            Send your intentions directly to the universe
          </p>
        </CardContent>
      </Card>

      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="bg-background border-t border-white/10 max-h-[90%] rounded-t-xl p-0">
            <DrawerHeader className="border-b border-white/10">
              <DrawerTitle className="text-white flex items-center">
                <Bot size={18} className="mr-2 text-cosmic-200" />
                Universe Chat
              </DrawerTitle>
              <DrawerDescription>
                Send your intentions to the Universe
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col h-[60vh]">
              <ChatContent />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-md max-h-[80vh] flex flex-col cosmic-card border-white/10">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center">
                <Bot size={18} className="mr-2 text-cosmic-200" />
                Universe Chat
              </DialogTitle>
              <DialogDescription>
                Send your intentions to the Universe
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col flex-grow overflow-hidden">
              <ChatContent />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default UniverseChat;
