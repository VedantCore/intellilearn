import React from 'react';
import { Card } from '../components/Card';

const SectionWrapper = ({ id, title, subtitle, children }) => (
    <section id={id} className="animate-fade-in-up">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">{title}</h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-400">{subtitle}</p>
        </div>
        {children}
    </section>
);

// Helper function to get initials from a name
const getInitials = (name) => {
  if (!name) return '??';
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const TeamSection = () => {
    const teamMembers = [
        { name: "Vedant Sarva", role: "Project Lead & Group Leader" },
        { name: "Sudhanshu Pawar", role: "AI & Database Specialist" },
        { name: "Shejal Dattatray", role: "UI/UX Designer & Frontend" },
        { name: "Arpan Dabhade", role: "Backend & System Architect" },
    ];

    return (
        <SectionWrapper id="team" title="Our Team" subtitle="The dedicated individuals behind the IntelliLearn project.">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => {
                    const initials = getInitials(member.name);
                    const avatarUrl = `https://placehold.co/100x100/1e293b/94a3b8?text=${initials}`;
                    
                    return (
                        <Card key={index} className="text-center flex flex-col items-center p-6 hover:scale-105 transition-transform duration-300">
                            <img src={avatarUrl} alt={member.name} className="w-24 h-24 rounded-full mb-4 border-2 border-gray-700" />
                            <h4 className="font-semibold text-lg text-white">{member.name}</h4>
                            <p className="text-blue-400 text-sm">{member.role}</p>
                        </Card>
                    );
                })}
            </div>
        </SectionWrapper>
    );
};

export default TeamSection;