import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './supabaseClient'; // Import the Supabase client
import { GraduationCap, Menu, X, LogOut, User } from 'lucide-react';

// Import all sections
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import AIChatbotERPSection from './sections/AIChatbotERPSection';
import ReferencesSection from './sections/ReferencesSection';
import TeamSection from './sections/TeamSection';
import LoginPage from './sections/LoginPage';
import RegisterPage from './sections/RegisterPage';
import ProfilePage from './sections/ProfilePage';
import { Button } from './components/Button';

export default function App() {
  const [session, setSession] = useState(null); // <-- State for the user session
  const [authPage, setAuthPage] = useState('login');
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  
  // --- Session Management ---
  useEffect(() => {
    // Check for an active session when the app loads
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for changes in authentication state (login, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe(); // Cleanup the listener
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsProfileOpen(false);
    setAuthPage('login');
  };
  
  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileRef]);

  // --- Render Logic ---
  // If there is no session, show the login or register page
  if (!session) { 
    if (authPage === 'register') {
      return <RegisterPage handleShowLogin={() => setAuthPage('login')} />;
    }
    // LoginPage no longer needs handleLogin; Supabase handles it automatically
    return <LoginPage handleShowRegister={() => setAuthPage('register')} />;
  }

  // If there IS a session, render the main application
  const sections = {
    home: <HomeSection setActiveSection={setActiveSection} />,
    about: <AboutSection />,
    chatbot: <AIChatbotERPSection />,
    references: <ReferencesSection />,
    team: <TeamSection />,
    // Pass the entire session object to ProfilePage
    profile: <ProfilePage key={session.user.id} session={session} />, 
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
        <div className="absolute top-0 left-0 w-full h-full z-0">
            <div className="absolute inset-0 bg-grid-gray-800/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_100%)]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/80 to-gray-950"></div>
        </div>

      <header className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-950/70 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-white">IntelliLearn</span>
            </div>
            <nav className="hidden md:flex items-center space-x-1">
              <NavLink section="home">Home</NavLink>
              <NavLink section="about">About</NavLink>
              <NavLink section="chatbot">AI & ERP</NavLink>
              <NavLink section="references">References</NavLink>
              <NavLink section="team">Team</NavLink>
              
              <div className="relative ml-4" ref={profileRef}>
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <img className="h-9 w-9 rounded-full" src="https://placehold.co/40x40/1e293b/94a3b8?text=PW" alt="User profile" />
                </button>
                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                    <button onClick={() => { setActiveSection('profile'); setIsProfileOpen(false); }} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                      <User className="mr-3 h-4 w-4" />
                      Your Profile
                    </button>
                    <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-700">
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </nav>

            <div className="md:hidden">
              <Button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-transparent hover:bg-gray-800 p-2">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-gray-950/90 backdrop-blur-md">
            <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
              <NavLink section="home">Home</NavLink>
              <NavLink section="about">About</NavLink>
              <NavLink section="chatbot">AI & ERP</NavLink>
              <NavLink section="references">References</NavLink>
              <NavLink section="team">Team</NavLink>
              <NavLink section="profile">Profile</NavLink>
              <Button onClick={handleLogout} className="w-full mt-2 bg-red-600/20 text-red-300">
                Logout
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {sections[activeSection]}
      </main>

      <footer className="relative z-10 border-t border-gray-800/50 bg-gray-950/70">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} IntelliLearn by MIT-ADT University. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}