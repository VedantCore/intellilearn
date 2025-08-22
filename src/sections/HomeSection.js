import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '../components/Button';

const HomeSection = ({ setActiveSection }) => (
  <div className="text-center flex flex-col items-center justify-center min-h-[70vh] animate-fade-in-up">
    <div className="max-w-4xl">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Welcome to IntelliLearn
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-300">
        The Future of Integrated Learning at MIT-ADT University.
      </p>
      <p className="mt-4 max-w-2xl mx-auto text-gray-400">
        A smart, AI-powered platform designed to streamline academic resources, enhance communication, and provide seamless access to campus services.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        <Button onClick={() => setActiveSection('about')} className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20">
          Learn More <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
        <Button onClick={() => setActiveSection('chatbot')} className="bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700">
          Try the AI Chatbot
        </Button>
      </div>
    </div>
  </div>
);

export default HomeSection;
