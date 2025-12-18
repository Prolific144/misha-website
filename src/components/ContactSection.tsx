import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { COMPANY_CONFIG } from '@utils/companyConfig';

export const ContactSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Get In Touch</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Visit our store or contact us for orders and inquiries
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 stagger-child">
        {/* Contact Info */}
        <div className="card p-6 md:p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h3>
          
          <div className="space-y-6">
            <div className="flex items-start group">
              <div className="flex-shrink-0 p-3 bg-red-100 dark:bg-red-900/30 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1 text-gray-900 dark:text-white">Our Location</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {COMPANY_CONFIG.contact.address.line1}<br />
                  {COMPANY_CONFIG.contact.address.line2}
                </p>
              </div>
            </div>
            
            <div className="flex items-start group">
              <div className="flex-shrink-0 p-3 bg-green-100 dark:bg-green-900/30 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1 text-gray-900 dark:text-white">Phone Number</h4>
                <a 
                  href={`tel:${COMPANY_CONFIG.contact.phone}`}
                  className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors underline-animate"
                >
                  {COMPANY_CONFIG.contact.phone}
                </a>
              </div>
            </div>
            
            <div className="flex items-start group">
              <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1 text-gray-900 dark:text-white">Email Address</h4>
                <a 
                  href={`mailto:${COMPANY_CONFIG.contact.email}`}
                  className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors underline-animate"
                >
                  {COMPANY_CONFIG.contact.email}
                </a>
              </div>
            </div>
            
            <div className="flex items-start group">
              <div className="flex-shrink-0 p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1 text-gray-900 dark:text-white">Business Hours</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Monday - Friday: {COMPANY_CONFIG.businessHours.weekdays}<br />
                  Saturday: {COMPANY_CONFIG.businessHours.saturday}<br />
                  Sunday: {COMPANY_CONFIG.businessHours.sunday}
                </p>
              </div>
            </div>
          </div>
          
          {/* WhatsApp Button */}
          <div className="mt-8">
            <a
              href={COMPANY_CONFIG.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full py-3"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with us on WhatsApp
            </a>
          </div>
        </div>
        
        {/* Map Placeholder */}
        <div className="card p-6 md:p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Find Us</h3>
          <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden card-image-zoom">
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900">
              <MapPin className="w-16 h-16 text-red-600 dark:text-red-400 mb-4" />
              <div className="text-center px-4">
                <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg mb-2">
                  {COMPANY_CONFIG.contact.address.line1}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {COMPANY_CONFIG.contact.address.line2}
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mt-4">
                  Visit our store for personal shopping assistance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};