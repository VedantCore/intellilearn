import React, { useState, useEffect, useRef } from 'react';
import { marked } from "marked";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Bot, School, Send, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { universityKnowledge } from '../knowledgeBase';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const SectionWrapper = ({ id, title, subtitle, children }) => (
  <section id={id} className="animate-fade-in-up">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">{title}</h2>
      <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-400">{subtitle}</p>
    </div>
    {children}
  </section>
);

export default function AIChatbotERPSection() {
  // State for AI Chatbot
  const [messages, setMessages] = useState([
    { role: 'model', content: 'Hello! I am the IntelliLearn AI assistant. Ask me anything specific about MIT-ADT.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const chatSession = model.startChat({
      history: [
        { 
          role: "user", 
          parts: [{ text: `You are a helpful assistant for MIT-ADT University, named IntelliLearn AI. Answer questions based ONLY on this knowledge base: \n\n${universityKnowledge}` }] 
        },
        { 
          role: "model", 
          parts: [{ text: "Okay, I am the IntelliLearn AI. I will answer questions based on the provided information. How can I help?" }] 
        }
      ],
      generationConfig: { maxOutputTokens: 1000 },
    });
    setChat(chatSession);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading || !chat) return;
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    try {
      const result = await chat.sendMessage(currentInput); 
      const response = await result.response;
      const rawText = await response.text();
      const html = marked.parse(rawText);
      const botResponse = { role: 'model', content: html };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Error fetching response from Gemini API:", error);
      const errorMessage = { role: 'model', content: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionWrapper id="chatbot-erp" title="AI Chatbot & ERP Access" subtitle="Get instant answers and quick access to essential campus systems.">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* AI Chatbot Card */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center"><Bot className="mr-2 text-blue-400"/> AI Assistant</CardTitle>
            <CardDescription>Ask me anything about MIT-ADT (Powered by Gemini)</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <div className="flex-grow h-80 overflow-y-auto p-4 bg-gray-950 rounded-lg border border-gray-800 space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'model' && <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center"><Bot className="h-5 w-5 text-white" /></div>}
                  <div className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200'}`}>
                    {msg.role === 'user'
                      ? <p className="text-sm">{msg.content}</p>
                      : <div className="prose prose-invert text-sm" dangerouslySetInnerHTML={{ __html: msg.content }} />}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-end gap-2 justify-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center"><Bot className="h-5 w-5 text-white" /></div>
                  <div className="max-w-xs md:max-w-md rounded-lg px-4 py-2 bg-gray-800 text-gray-200">
                    <div className="flex items-center space-x-1">
                      <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={isLoading}
              />
              <Button onClick={handleSend} disabled={isLoading} className="bg-blue-600 text-white hover:bg-blue-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Simplified ERP Link Card */}
        <div className="flex flex-col justify-center">
          <Card className="h-full flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="flex items-center"><School className="mr-2 text-blue-400"/> Campus ERP System</CardTitle>
              <CardDescription>Access grades, attendance, and other administrative services.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-6">
                The MIT-ADT University ERP system is your central portal for managing all academic and administrative tasks. Click the button below to go to the official TCSIon portal.
              </p>
            </CardContent>
            <CardFooter>
              <a href="https://g01.tcsion.com/SelfServices/home" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700">
                  Go to ERP Portal <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </CardFooter>
          </Card>
        </div>
      </div>
    </SectionWrapper>
  );
}
