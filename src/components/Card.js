import React from 'react';

export const Card = ({ className, children }) => (
  <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-lg ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ className, children }) => <div className={`p-6 ${className}`}>{children}</div>;
export const CardTitle = ({ className, children }) => <h3 className={`text-xl font-semibold tracking-tight text-white ${className}`}>{children}</h3>;
export const CardDescription = ({ className, children }) => <p className={`text-sm text-gray-400 ${className}`}>{children}</p>;
export const CardContent = ({ className, children }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;
export const CardFooter = ({ className, children }) => <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>;
