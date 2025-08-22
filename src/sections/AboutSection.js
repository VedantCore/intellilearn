import React from 'react';
import { Lightbulb, Target, BrainCircuit, Code, BarChart, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';

const SectionWrapper = ({ id, title, subtitle, children }) => (
    <section id={id} className="animate-fade-in-up">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">{title}</h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-400">{subtitle}</p>
        </div>
        {children}
    </section>
);

const AboutSection = () => {
    const aboutPoints = [
        { icon: Lightbulb, title: "Introduction", content: "IntelliLearn is a conceptual smart learning platform for MIT-ADT University, aiming to integrate AI and modern web technologies to create a unified digital campus experience. It addresses the need for a centralized, efficient, and user-friendly system for students and faculty." },
        { icon: Target, title: "Problem Statement", content: "Students and faculty often navigate multiple disconnected systems for academic information, ERP access, and support. This fragmentation leads to inefficiency, confusion, and a disjointed user experience, hindering access to critical resources and timely information." },
        { icon: BrainCircuit, title: "Proposed Solution", content: "We propose a single, responsive web platform featuring an AI-powered chatbot for instant query resolution, direct integration with the campus ERP, and a centralized hub for all academic resources. This creates a seamless, accessible, and intelligent learning environment." },
        { icon: Code, title: "System Design", content: "The prototype is built on a modern tech stack: React for the frontend, styled with Tailwind CSS and shadcn/ui components for a minimal, responsive UI. The architecture is modular, allowing for future expansion and integration with real backend services and APIs." },
        { icon: BarChart, title: "Scope & Feasibility", content: "The initial scope includes the core informational sections, a simulated AI chatbot, and an ERP access point. The project is highly feasible, using standard web technologies. Future scope includes real-time database integration, user authentication, and a fully functional AI model." },
        { icon: CheckCircle, title: "Conclusion", content: "IntelliLearn demonstrates a powerful vision for the digital transformation of MIT-ADT's academic ecosystem. By centralizing resources and leveraging AI, it promises to significantly enhance the efficiency, engagement, and satisfaction of the entire university community." },
    ];

    return (
        <SectionWrapper id="about" title="About IntelliLearn" subtitle="Understanding the vision and framework of our smart learning platform.">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {aboutPoints.map((point, index) => (
                    <Card key={index} className="hover:border-blue-500/50 hover:scale-105 transition-all duration-300">
                        <CardHeader className="flex items-start space-x-4">
                            <div className="p-3 bg-gray-800 rounded-lg">
                                <point.icon className="h-6 w-6 text-blue-400" />
                            </div>
                            <div>
                                <CardTitle>{point.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-400">{point.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </SectionWrapper>
    );
};

export default AboutSection;
