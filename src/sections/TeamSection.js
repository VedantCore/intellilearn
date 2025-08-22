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

const TeamSection = () => {
    const teamMembers = [
        { name: "Vedant Sarva", role: "Project Lead & Group Leader", avatar: "https://placehold.co/100x100/1e293b/94a3b8?text=PW" },
        { name: "Sudhanshu Pawar", role: "Backend & System Architect", avatar: "https://placehold.co/100x100/1e293b/94a3b8?text=SC" },
        { name: "Shejal Dattatray", role: "UI/UX Designer & Frontend", avatar: "https://placehold.co/100x100/1e293b/94a3b8?text=PG" },
        { name: "Arpan Dabhade", role: "AI & Database Specialist", avatar: "https://placehold.co/100x100/1e293b/94a3b8?text=SS" },
    ];

    return (
        <SectionWrapper id="team" title="Our Team" subtitle="The dedicated individuals behind the IntelliLearn project.">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                    <Card key={index} className="text-center flex flex-col items-center p-6 hover:scale-105 transition-transform duration-300">
                        <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full mb-4 border-2 border-gray-700" />
                        <h4 className="font-semibold text-lg text-white">{member.name}</h4>
                        <p className="text-blue-400 text-sm">{member.role}</p>
                    </Card>
                ))}
            </div>
        </SectionWrapper>
    );
};

export default TeamSection;
