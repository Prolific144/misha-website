import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { WHATSAPP_CONFIG, CONTACT_INFO } from '@/config/company';
import { generateWhatsAppUrl } from '@/utils/helpers';

export const WhatsAppFloat: React.FC = () => {
  const whatsappUrl = generateWhatsAppUrl();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
        aria-label="Chat with us on WhatsApp"
      >
        {/* Floating Animation */}
        <div className="absolute -inset-4 bg-green-500 rounded-full opacity-20 animate-ping"></div>
        
        {/* Main Button */}
        <div className="relative bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 hover:shadow-3xl">
          <MessageCircle className="w-6 h-6" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute -top-12 right-0 bg-gray-900 dark:bg-gray-800 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
          <span className="text-sm font-medium">Order on WhatsApp</span>
          <div className="absolute -bottom-1 right-4 w-2 h-2 bg-gray-900 dark:bg-gray-800 transform rotate-45"></div>
        </div>
      </a>

      {/* Phone Button (Optional) */}
      <a
        href={`tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`}
        className="group relative"
        aria-label="Call us"
      >
        <div className="relative bg-blue-500 text-white p-4 rounded-full shadow-2xl hover:bg-blue-600 transition-all hover:scale-110 hover:shadow-3xl">
          <Phone className="w-6 h-6" />
        </div>
        <div className="absolute -top-12 right-0 bg-gray-900 dark:bg-gray-800 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
          <span className="text-sm font-medium">Call us</span>
          <div className="absolute -bottom-1 right-4 w-2 h-2 bg-gray-900 dark:bg-gray-800 transform rotate-45"></div>
        </div>
      </a>
    </div>
  );
};