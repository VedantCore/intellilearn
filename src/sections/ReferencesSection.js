import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const SectionWrapper = ({ id, title, subtitle, children }) => (
    <section id={id} className="animate-fade-in-up">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">{title}</h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-400">{subtitle}</p>
        </div>
        {children}
    </section>
);

const ReferencesSection = () => {
    const references = [
        { title: "React Documentation", link: "https://react.dev/", description: "The official documentation for the React library." },
        { title: "Tailwind CSS", link: "https://tailwindcss.com/", description: "A utility-first CSS framework for rapid UI development." },
        { title: "shadcn/ui", link: "https://ui.shadcn.com/", description: "Beautifully designed components that you can copy and paste into your apps." },
        { title: "Lucide Icons", link: "https://lucide.dev/", description: "A community-maintained fork of Feather Icons, with more icons and better tooling." },
        { title: "MIT-ADT University", link: "https://mituniversity.ac.in/", description: "The official website of MIT Art, Design and Technology University." },
    ];

    return (
        <SectionWrapper id="references" title="References & Technologies" subtitle="The tools and resources that made this prototype possible.">
            <div className="space-y-4 max-w-3xl mx-auto">
                {references.map((ref, index) => (
                    <Card key={index} className="transition-all duration-300 hover:border-blue-500/50">
                        <div className="p-4 flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold text-white">{ref.title}</h4>
                                <p className="text-sm text-gray-400">{ref.description}</p>
                            </div>
                            <a href={ref.link} target="_blank" rel="noopener noreferrer">
                                <Button className="bg-transparent hover:bg-gray-800 text-gray-300">
                                    <ExternalLink className="h-4 w-4" />
                                </Button>
                            </a>
                        </div>
                    </Card>
                ))}
            </div>
        </SectionWrapper>
    );
};

export default ReferencesSection;
