import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './supabaseClient';
import { GraduationCap, Menu, X, LogOut, User } from 'lucide-react';

// Import all sections and the new background
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import AIChatbotERPSection from './sections/AIChatbotERPSection';
import ReferencesSection from './sections/ReferencesSection';
import TeamSection from './sections/TeamSection';
import LoginPage from './sections/LoginPage';
import RegisterPage from './sections/RegisterPage';
import ProfilePage from './sections/ProfilePage';
import PrismBackground from './components/PrismBackground'; // Your new background
import { Button } from './components/Button';

// Helper function to get initials from a name
const getInitials = (name) => {
  if (!name) return '??';
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export default function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authPage, setAuthPage] = useState('login');
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      async function getProfile() {
        const { user } = session;
        const { data, error } = await supabase
          .from('profiles')
          .select(`full_name`)
          .eq('id', user.id)
          .single();
        if (error) console.warn(error);
        else if (data) setProfile(data);
      }
      getProfile();
    }
  }, [session]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsProfileOpen(false);
    setAuthPage('login');
    setProfile(null);
  };
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileRef]);

  if (!session) { 
    if (authPage === 'register') {
      return <RegisterPage handleShowLogin={() => setAuthPage('login')} />;
    }
    return <LoginPage handleShowRegister={() => setAuthPage('register')} />;
  }

  const sections = {
    home: <HomeSection setActiveSection={setActiveSection} />,
    about: <AboutSection />,
    chatbot: <AIChatbotERPSection />,
    references: <ReferencesSection />,
    team: <TeamSection />,
    profile: <ProfilePage key={session.user.id} session={session} />, 
  };

  const NavLink = ({ section, children }) => (
    <button
      onClick={() => { setActiveSection(section); setIsMenuOpen(false); }}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        activeSection === section
          ? 'text-white bg-blue-600'
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
    >
      {children}
    </button>
  );

  const userInitials = profile ? getInitials(profile.full_name) : '...';

  return (
    // The main div is now wrapped by the PrismBackground component
    <PrismBackground>
      <div className="min-h-screen bg-gray-950/80 text-gray-200 font-sans antialiased relative overflow-x-hidden backdrop-blur-sm">
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
                    <img className="h-9 w-9 rounded-full" src={`https://placehold.co/40x40/1e293b/94a3b8?text=${userInitials}`} alt="User profile" />
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
    </PrismBackground>
  );
}