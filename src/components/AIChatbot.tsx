
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  Heart,
  Zap,
  Clock,
  TrendingUp
} from "lucide-react";

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'suggestion' | 'exercise';
  stressLevel?: number;
}

interface AIChatbotProps {
  currentStressLevel: number;
  onStressUpdate: (level: number) => void;
}

const AIChatbot = ({ currentStressLevel, onStressUpdate }: AIChatbotProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hi! I'm your AI mental wellness assistant. I can help you manage stress, provide coping strategies, and offer personalized support. How are you feeling right now?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Proactive support based on stress level
    if (currentStressLevel > 75 && messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      const timeSinceLastMessage = Date.now() - lastMessage.timestamp.getTime();
      
      if (timeSinceLastMessage > 300000) { // 5 minutes
        triggerProactiveSupport();
      }
    }
  }, [currentStressLevel]);

  const triggerProactiveSupport = () => {
    const proactiveMessage: ChatMessage = {
      id: Date.now().toString(),
      content: "I noticed your stress levels have been elevated. Would you like me to guide you through a quick breathing exercise or share some coping strategies?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'suggestion'
    };
    
    setMessages(prev => [...prev, proactiveMessage]);
  };

  const generateAIResponse = (userMessage: string): ChatMessage[] => {
    const lowerMessage = userMessage.toLowerCase();
    const responses: ChatMessage[] = [];

    // Analyze user message for stress indicators
    const stressKeywords = ['stressed', 'overwhelmed', 'anxious', 'panic', 'pressure', 'deadline'];
    const positiveKeywords = ['good', 'better', 'fine', 'okay', 'great', 'happy'];
    const supportKeywords = ['help', 'support', 'advice', 'suggestion', 'what should'];

    let detectedStress = currentStressLevel;
    
    // Adjust stress level based on message content
    if (stressKeywords.some(keyword => lowerMessage.includes(keyword))) {
      detectedStress = Math.min(100, detectedStress + 20);
    } else if (positiveKeywords.some(keyword => lowerMessage.includes(keyword))) {
      detectedStress = Math.max(0, detectedStress - 15);
    }

    onStressUpdate(detectedStress);

    // Generate contextual responses
    if (lowerMessage.includes('breathing') || lowerMessage.includes('breathe')) {
      responses.push({
        id: Date.now().toString(),
        content: "Great choice! Let's do a simple breathing exercise together. I'll guide you through the 4-7-8 technique:",
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      });
      
      responses.push({
        id: (Date.now() + 1).toString(),
        content: "🔵 Breathe in through your nose for 4 counts\n⏸️ Hold your breath for 7 counts\n🔵 Exhale slowly through your mouth for 8 counts\n\nRepeat this 3-4 times. I'll wait here while you practice.",
        sender: 'ai',
        timestamp: new Date(),
        type: 'exercise'
      });
    } else if (stressKeywords.some(keyword => lowerMessage.includes(keyword))) {
      const stressResponses = [
        "I hear that you're feeling stressed. That's completely normal, especially in demanding work environments. Let's work through this together.",
        "Stress can feel overwhelming, but remember that you've handled difficult situations before. What's the main source of your stress right now?",
        "I understand you're under pressure. Let's break this down into manageable pieces. What's one small thing you can control in this situation?"
      ];
      
      responses.push({
        id: Date.now().toString(),
        content: stressResponses[Math.floor(Math.random() * stressResponses.length)],
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      });
      
      if (detectedStress > 70) {
        responses.push({
          id: (Date.now() + 1).toString(),
          content: "Since your stress level is quite high, I recommend:\n• Take 5 deep breaths right now\n• Step away from your desk for 2 minutes\n• Drink some water\n• Consider delegating one task if possible",
          sender: 'ai',
          timestamp: new Date(),
          type: 'suggestion'
        });
      }
    } else if (lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('boss')) {
      responses.push({
        id: Date.now().toString(),
        content: "Work challenges can be really tough. Remember that your job doesn't define your worth, and most work problems are temporary. What specific work situation is bothering you?",
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      });
    } else if (supportKeywords.some(keyword => lowerMessage.includes(keyword))) {
      responses.push({
        id: Date.now().toString(),
        content: "I'm here to help! Based on our conversation, here are some personalized suggestions:\n• Practice the 5-minute mindfulness technique\n• Use the Pomodoro method for overwhelming tasks\n• Connect with a colleague for support\n• Take micro-breaks every hour",
        sender: 'ai',
        timestamp: new Date(),
        type: 'suggestion'
      });
    } else if (positiveKeywords.some(keyword => lowerMessage.includes(keyword))) {
      responses.push({
        id: Date.now().toString(),
        content: "That's wonderful to hear! It's great that you're feeling better. What's been helping you feel this way? This insight could be valuable for future stressful moments.",
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      });
    } else {
      // Default empathetic responses
      const defaultResponses = [
        "I'm listening. Can you tell me more about what's going on?",
        "Thank you for sharing that with me. How are you feeling about the situation?",
        "That sounds challenging. What do you think would help you feel better right now?",
        "I appreciate you opening up. What's one thing that's going well for you today?",
        "It takes courage to reach out. What kind of support would be most helpful?"
      ];
      
      responses.push({
        id: Date.now().toString(),
        content: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      });
    }

    return responses;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setConversationContext(prev => [...prev, inputMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponses = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, ...aiResponses]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleQuickResponse = (response: string) => {
    setInputMessage(response);
    handleSendMessage();
  };

  const quickResponses = [
    "I'm feeling overwhelmed",
    "I need breathing exercises",
    "Work is stressing me out",
    "I'm feeling better",
    "Give me some tips",
    "I need immediate help"
  ];

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'suggestion': return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      case 'exercise': return <Heart className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-green-200 shadow-lg h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center text-green-700">
            <MessageCircle className="w-5 h-5 mr-2" />
            AI Wellness Assistant
          </span>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              Active Support
            </Badge>
            {currentStressLevel > 70 && (
              <Badge variant="destructive">
                <Zap className="w-3 h-3 mr-1" />
                High Priority
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : message.type === 'suggestion'
                      ? 'bg-yellow-50 border border-yellow-200 text-yellow-800'
                      : message.type === 'exercise'
                      ? 'bg-red-50 border border-red-200 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'ai' && (
                      <div className="flex items-center space-x-1">
                        <Bot className="w-4 h-4" />
                        {getMessageIcon(message.type)}
                      </div>
                    )}
                    {message.sender === 'user' && <User className="w-4 h-4" />}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        {message.stressLevel && (
                          <Badge variant="outline" className="text-xs">
                            Stress: {message.stressLevel}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        {/* Quick Response Buttons */}
        <div className="p-3 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 mb-3">
            {quickResponses.map((response, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickResponse(response)}
                className="text-xs"
              >
                {response}
              </Button>
            ))}
          </div>
          
          {/* Message Input */}
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isTyping}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-green-600 hover:bg-green-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatbot;
