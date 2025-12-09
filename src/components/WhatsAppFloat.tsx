import React from 'react';
import { MessageCircle } from 'lucide-react';
import { COMPANY_CONFIG } from '../utils/companyConfig';

export const WhatsAppFloat: React.FC = () => {
  return (
    <a
      href={COMPANY_CONFIG.getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group"
    >
      <div className="relative">
        {/* Floating Animation */}
        <div className="absolute -inset-4 bg-green-500 rounded-full opacity-20 animate-ping"></div>
        
        {/* Main Button */}
        <div className="relative bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110">
          <MessageCircle className="w-6 h-6" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute -top-12 right-0 bg-dark text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          <span className="text-sm font-medium">Order on WhatsApp</span>
          <div className="absolute -bottom-1 right-4 w-2 h-2 bg-dark transform rotate-45"></div>
        </div>
      </div>
    </a>
  );
};