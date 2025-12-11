import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Heart } from 'lucide-react';
import { COMPANY_CONFIG } from '../utils/companyConfig';
import { NewsletterSignup } from './NewsletterSignup';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white">
      {/* Newsletter Section */}
      <div className="bg-gray-900 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <NewsletterSignup />
        </div>
      </div>

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
              <a 
                href={COMPANY_CONFIG.socialMedia.facebook} 
                className="hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href={COMPANY_CONFIG.socialMedia.instagram} 
                className="hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={COMPANY_CONFIG.socialMedia.tiktok} 
                className="hover:text-primary transition-colors"
                aria-label="Twitter"
              >
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
              <li><a href="#home" className="text-gray-300 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#products" className="text-gray-300 hover:text-primary transition-colors">Products</a></li>
              <li><a href="#recipes" className="text-gray-300 hover:text-primary transition-colors">Recipes</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#privacy-policy" className="text-gray-300 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#cookie-policy" className="text-gray-300 hover:text-primary transition-colors">Cookie Policy</a></li>
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

        {/* Accessibility & Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-left">
              <p className="text-gray-400 text-sm">
                <button 
                  className="hover:text-primary transition-colors"
                  onClick={() => {
                    document.documentElement.style.fontSize = '110%';
                  }}
                >
                  Increase Text Size
                </button>
                {' • '}
                <button 
                  className="hover:text-primary transition-colors"
                  onClick={() => {
                    document.documentElement.style.fontSize = '100%';
                  }}
                >
                  Reset Text Size
                </button>
                {' • '}
                <button 
                  className="hover:text-primary transition-colors"
                  onClick={() => {
                    document.documentElement.classList.toggle('high-contrast');
                  }}
                >
                  High Contrast
                </button>
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-gray-400">
                © {currentYear} {COMPANY_CONFIG.name}. All rights reserved.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Made with <Heart className="w-3 h-3 inline text-red-400" /> by SnooG Analytics
              </p>
            </div>

            <div className="text-right">
              <p className="text-gray-400 text-sm">
                {/* FIX: Use import.meta.env for Vite instead of process.env */}
                v{import.meta.env.VITE_APP_VERSION || '1.0.0'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};