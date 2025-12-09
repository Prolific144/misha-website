import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { COMPANY_CONFIG } from '../utils/companyConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold">{COMPANY_CONFIG.name}</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted supplier of authentic Korean groceries in Kenya.
            </p>
            <div className="flex space-x-4">
              <a href={COMPANY_CONFIG.socialMedia.facebook} className="hover:text-primary">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={COMPANY_CONFIG.socialMedia.instagram} className="hover:text-primary">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={COMPANY_CONFIG.socialMedia.tiktok} className="hover:text-primary">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                <span className="text-gray-300">
                  {COMPANY_CONFIG.contact.address.line1}<br />
                  {COMPANY_CONFIG.contact.address.line2}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary" />
                <span className="text-gray-300">{COMPANY_CONFIG.contact.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-primary" />
                <span className="text-gray-300">{COMPANY_CONFIG.contact.email}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-primary">Home</a></li>
              <li><a href="#products" className="text-gray-300 hover:text-primary">Products</a></li>
              <li><a href="#recipes" className="text-gray-300 hover:text-primary">Recipes</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-primary">About Us</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-primary">Contact</a></li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="font-bold text-lg mb-4">Business Hours</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Mon-Fri: {COMPANY_CONFIG.businessHours.weekdays}</li>
              <li>Saturday: {COMPANY_CONFIG.businessHours.saturday}</li>
              <li>Sunday: {COMPANY_CONFIG.businessHours.sunday}</li>
            </ul>
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <p className="text-sm">
                <span className="text-primary font-semibold">Free Delivery:</span> 
                <br />Orders above KES {COMPANY_CONFIG.delivery.freeThreshold}
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {COMPANY_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Powered by SnooG Analytics | Designed for Misha Foodstuffs Kenya
          </p>
        </div>
      </div>
    </footer>
  );
};