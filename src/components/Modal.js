import React from 'react';
import { X } from 'lucide-react';

// A reusable modal component
export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in-up">
            <div className="bg-gray-900 border border-gray-700/50 rounded-xl shadow-lg w-full max-w-4xl h-[80vh] flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="flex-grow p-4 overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
}