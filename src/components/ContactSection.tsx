import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { COMPANY_CONFIG } from '../utils/companyConfig';

export const ContactSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Visit our store or contact us for orders and inquiries
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold mb-1">Our Location</h4>
                <p className="text-gray-600">
                  {COMPANY_CONFIG.contact.address.line1}<br />
                  {COMPANY_CONFIG.contact.address.line2}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold mb-1">Phone Number</h4>
                <p className="text-gray-600">{COMPANY_CONFIG.contact.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold mb-1">Email Address</h4>
                <p className="text-gray-600">{COMPANY_CONFIG.contact.email}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold mb-1">Business Hours</h4>
                <p className="text-gray-600">
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
              className="inline-flex items-center justify-center w-full bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors shadow-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with us on WhatsApp
            </a>
          </div>
        </div>
        
        {/* Map Placeholder */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold mb-6">Find Us</h3>
          <div className="h-96 bg-gray-100 rounded-xl overflow-hidden">
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
              <MapPin className="w-16 h-16 text-primary mb-4" />
              <div className="text-center px-4">
                <p className="text-gray-700 font-semibold text-lg mb-2">
                  {COMPANY_CONFIG.contact.address.line1}
                </p>
                <p className="text-gray-600">
                  {COMPANY_CONFIG.contact.address.line2}
                </p>
                <p className="text-gray-500 text-sm mt-4">
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