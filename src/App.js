import React, { useState } from 'react';
import { GraduationCap, Menu, X } from 'lucide-react';

import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import AIChatbotERPSection from './sections/AIChatbotERPSection';
import ReferencesSection from './sections/ReferencesSection';
import TeamSection from './sections/TeamSection';
import { Button } from './components/Button';

export default function App() {
  // --- ADD THESE TWO LINES FOR DEBUGGING ---
  console.log("Gemini API Key:", process.env.AIzaSyCtjk1thjWRBUuerko_Tdk7pOgUxet20as);
  // -----------------------------------------

  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = {
    home: <HomeSection setActiveSection={setActiveSection} />,
    about: <AboutSection />,
    chatbot: <AIChatbotERPSection />,
    references: <ReferencesSection />,
    team: <TeamSection />,
  };

  const NavLink = ({ section, children }) => (
    <button
      onClick={() => {
        setActiveSection(section);
        setIsMenuOpen(false);
      }}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        activeSection === section
          ? 'text-white bg-blue-600'
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans antialiased relative overflow-x-hidden">
        {/* Background Gradient Grid */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
            <div className="absolute inset-0 bg-grid-gray-800/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_100%)]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/80 to-gray-950"></div>
        </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-950/70 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-white">IntelliLearn</span>
              <span className="text-sm text-gray-400 hidden sm:inline">by MIT-ADT</span>
            </div>
            <nav className="hidden md:flex items-center space-x-1">
              <NavLink section="home">Home</NavLink>
              <NavLink section="about">About</NavLink>
              <NavLink section="chatbot">AI & ERP</NavLink>
              <NavLink section="references">References</NavLink>
              <NavLink section="team">Team</NavLink>
            </nav>
            <div className="md:hidden">
              <Button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-transparent hover:bg-gray-800 p-2">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-950/90 backdrop-blur-md">
            <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
              <NavLink section="home">Home</NavLink>
              <NavLink section="about">About</NavLink>
              <NavLink section="chatbot">AI & ERP</NavLink>
              <NavLink section="references">References</NavLink>
              <NavLink section="team">Team</NavLink>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {sections[activeSection]}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 bg-gray-950/70">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} IntelliLearn by MIT-ADT University. All Rights Reserved.</p>
          <p className="text-xs mt-2">A Prototype for a Smarter, Connected Campus.</p>
        </div>
      </footer>
    </div>
  );
}