import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Heart, Clock, Truck, Shield } from 'lucide-react';
import { COMPANY_CONFIG } from '@utils/companyConfig';
import { NewsletterSignup } from '@components/NewsletterSignup';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialIcons = [
    { icon: Facebook, label: 'Facebook', color: 'blue-600' },
    { icon: Instagram, label: 'Instagram', color: 'pink-600' },
    { icon: Twitter, label: 'Twitter', color: 'blue-400' },
  ];

  const contactItems = [
    { icon: MapPin, label: 'Our Location', content: COMPANY_CONFIG.contact.address.line1 + '\n' + COMPANY_CONFIG.contact.address.line2, color: 'red' },
    { icon: Phone, label: 'Phone Number', content: COMPANY_CONFIG.contact.phone, color: 'green' },
    { icon: Mail, label: 'Email Address', content: COMPANY_CONFIG.contact.email, color: 'blue' },
  ];

  const quickLinks = ['Home', 'Products', 'Recipes', 'About Us', 'Contact', 'Privacy Policy', 'Terms of Service'];

  return (
    <footer 
      className="pt-12"
      style={{
        background: 'linear-gradient(to bottom, rgb(var(--color-surface)) 0%, rgba(var(--color-surface-elevated), 0.5) 100%)'
      }}
    >
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <NewsletterSignup />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6 group">
              <div 
                className="relative h-12 w-12 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-primary-hover)) 100%)'
                }}
              >
                <span className="text-white font-bold text-xl">{COMPANY_CONFIG.name.charAt(0)}</span>
              </div>
              <div>
                <h3 
                  className="text-xl font-bold"
                  style={{ color: 'rgb(var(--color-primary))' }}
                >
                  {COMPANY_CONFIG.name}
                </h3>
                <p 
                  className="text-sm font-medium"
                  style={{ color: 'rgb(var(--color-on-surface-muted))' }}
                >
                  Authentic Korean Groceries
                </p>
              </div>
            </div>
            <p 
              className="mb-6 leading-relaxed"
              style={{ color: 'rgb(var(--color-on-surface-muted))' }}
            >
              Your trusted supplier of authentic Korean groceries in Kenya. Bringing the taste of Korea to your doorstep.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <a 
                  key={index}
                  href={COMPANY_CONFIG.socialMedia[social.label.toLowerCase() as keyof typeof COMPANY_CONFIG.socialMedia]}
                  className="social-icon rounded-lg hover-lift"
                  style={{
                    backgroundColor: 'rgba(var(--color-surface-elevated), 0.8)',
                    color: `rgb(var(--color-${social.color.split('-')[0]})`
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 
              className="font-bold text-lg mb-6 pb-2"
              style={{
                color: 'rgb(var(--color-on-surface))',
                borderBottom: '1px solid rgb(var(--color-border))'
              }}
            >
              Contact Info
            </h3>
            <ul className="space-y-4">
              {contactItems.map((item, index) => (
                <li key={index} className="flex items-start group">
                  <div 
                    className="p-2 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      backgroundColor: `rgba(var(--color-${item.color}), 0.1)`,
                      color: `rgb(var(--color-${item.color}))`
                    }}
                  >
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p 
                      className="font-medium"
                      style={{ color: 'rgb(var(--color-on-surface))' }}
                    >
                      {item.label}
                    </p>
                    <p 
                      className="text-sm"
                      style={{ color: 'rgb(var(--color-on-surface-muted))' }}
                    >
                      {item.content.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < item.content.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 
              className="font-bold text-lg mb-6 pb-2"
              style={{
                color: 'rgb(var(--color-on-surface))',
                borderBottom: '1px solid rgb(var(--color-border))'
              }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center group hover-lift"
                    style={{ color: 'rgb(var(--color-on-surface-muted))' }}
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: 'rgb(var(--color-primary))' }}
                    ></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours & Info */}
          <div>
            <h3 
              className="font-bold text-lg mb-6 pb-2"
              style={{
                color: 'rgb(var(--color-on-surface))',
                borderBottom: '1px solid rgb(var(--color-border))'
              }}
            >
              Business Info
            </h3>
            
            {/* Business Hours */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Clock 
                  className="w-5 h-5 mr-2" 
                  style={{ color: 'rgb(var(--color-primary))' }}
                />
                <h4 
                  className="font-semibold"
                  style={{ color: 'rgb(var(--color-on-surface))' }}
                >
                  Hours
                </h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span style={{ color: 'rgb(var(--color-on-surface-muted))' }}>Mon-Fri:</span>
                  <span 
                    className="font-medium"
                    style={{ color: 'rgb(var(--color-on-surface))' }}
                  >
                    {COMPANY_CONFIG.businessHours.weekdays}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span style={{ color: 'rgb(var(--color-on-surface-muted))' }}>Saturday:</span>
                  <span 
                    className="font-medium"
                    style={{ color: 'rgb(var(--color-on-surface))' }}
                  >
                    {COMPANY_CONFIG.businessHours.saturday}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span style={{ color: 'rgb(var(--color-on-surface-muted))' }}>Sunday:</span>
                  <span 
                    className="font-medium"
                    style={{ color: 'rgb(var(--color-on-surface))' }}
                  >
                    {COMPANY_CONFIG.businessHours.sunday}
                  </span>
                </li>
              </ul>
            </div>

            {/* Delivery Info Card */}
            <div 
              className="p-4 mb-4 rounded-2xl border hover-lift"
              style={{
                backgroundColor: 'rgba(var(--color-surface-elevated), 0.5)',
                borderColor: 'rgba(var(--color-border), 0.5)'
              }}
            >
              <div className="flex items-center mb-2">
                <Truck 
                  className="w-5 h-5 mr-2" 
                  style={{ color: 'rgb(var(--color-success))' }}
                />
                <h4 
                  className="font-semibold"
                  style={{ color: 'rgb(var(--color-on-surface))' }}
                >
                  Free Delivery
                </h4>
              </div>
              <p 
                className="text-sm"
                style={{ color: 'rgb(var(--color-on-surface-muted))' }}
              >
                Orders above KES <span 
                  className="font-bold"
                  style={{ color: 'rgb(var(--color-primary))' }}
                >
                  {COMPANY_CONFIG.delivery.freeThreshold}
                </span>
              </p>
            </div>

            {/* Security Info Card */}
            <div 
              className="p-4 rounded-2xl border hover-lift"
              style={{
                backgroundColor: 'rgba(var(--color-surface-elevated), 0.5)',
                borderColor: 'rgba(var(--color-border), 0.5)'
              }}
            >
              <div className="flex items-center mb-2">
                <Shield 
                  className="w-5 h-5 mr-2" 
                  style={{ color: 'rgb(var(--color-info))' }}
                />
                <h4 
                  className="font-semibold"
                  style={{ color: 'rgb(var(--color-on-surface))' }}
                >
                  Secure Payment
                </h4>
              </div>
              <p 
                className="text-sm"
                style={{ color: 'rgb(var(--color-on-surface-muted))' }}
              >
                100% secure transactions with SSL encryption
              </p>
            </div>
          </div>
        </div>

        {/* Accessibility & Copyright */}
        <div 
          className="pt-8 mt-8"
          style={{ borderTop: '1px solid rgb(var(--color-border))' }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center">
              <p 
                className="text-sm"
                style={{ color: 'rgb(var(--color-on-surface-muted))' }}
              >
                © {currentYear} <span 
                  style={{ color: 'rgb(var(--color-primary))' }}
                  className="font-semibold"
                >
                  {COMPANY_CONFIG.name}
                </span>. All rights reserved.
              </p>
              <p 
                className="text-xs mt-2 flex items-center justify-center gap-1"
                style={{ color: 'rgb(var(--color-on-surface-muted))' }}
              >
                Made with <Heart 
                  className="w-3 h-3 animate-pulse" 
                  style={{ color: 'rgb(var(--color-primary))' }}
                /> by 
                <span 
                  className="font-medium"
                  style={{ color: 'rgb(var(--color-primary))' }}
                >
                  SnooG Analytics
                </span>
              </p>
            </div>

            {/* Version */}
            <div className="text-center md:text-right">
              <span 
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: 'rgba(var(--color-primary), 0.1)',
                  color: 'rgb(var(--color-primary))'
                }}
              >
                v{import.meta.env.VITE_APP_VERSION || '1.0.0'}
              </span>
            </div>
          </div>

          {/* Payment Methods */}
          <div 
            className="mt-8 pt-6"
            style={{ borderTop: '1px solid rgb(var(--color-border))' }}
          >
            <p 
              className="text-center text-sm mb-4"
              style={{ color: 'rgb(var(--color-on-surface-muted))' }}
            >
              We Accept
            </p>
            <div className="flex justify-center items-center gap-6 flex-wrap">
              {['Visa', 'Mastercard', 'M-Pesa', 'PayPal'].map((method) => (
                <div 
                  key={method}
                  className="px-4 py-2 rounded-lg border hover-lift"
                  style={{
                    backgroundColor: 'rgba(var(--color-surface-elevated), 0.5)',
                    borderColor: 'rgba(var(--color-border), 0.5)',
                    color: 'rgb(var(--color-on-surface))'
                  }}
                >
                  <span className="text-sm font-medium">{method}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div 
        className="mt-8 py-4"
        style={{ backgroundColor: 'rgba(var(--color-surface), 0.8)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p 
            className="text-center text-xs"
            style={{ color: 'rgb(var(--color-on-surface-muted))' }}
          >
            This website uses cookies to enhance your experience. By continuing to browse, you agree to our use of cookies.
          </p>
        </div>
      </div>
    </footer>
  );
};