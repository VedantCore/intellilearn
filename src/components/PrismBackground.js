import React from 'react';

const PrismBackground = ({ className = "", children }) => {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-600 via-yellow-500 to-red-600 animate-gradient-y opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-green-600 via-blue-600 to-indigo-600 animate-gradient-xy opacity-30"></div>
      </div>
      
      {/* Prismatic overlay effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-conic from-blue-400 via-purple-400 to-blue-400 opacity-20 animate-spin-slow"></div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-gray-950 opacity-60"></div>
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 animate-shimmer"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PrismBackground;