import React from 'react';
import { Shield, Cookie, Lock, Eye } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-8">
            <Shield className="w-8 h-8 text-red-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Cookie className="w-6 h-6 text-red-600 mr-2" />
                Cookie Policy
              </h2>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">What Are Cookies</h3>
                <p className="text-gray-700">
                  Cookies are small text files that are stored on your device when you visit our website. 
                  They help us provide you with a better experience by remembering your preferences and 
                  understanding how you use our site.
                </p>
                
                <h3 className="font-semibold text-lg">Types of Cookies We Use</h3>
                <div className="space-y-4 mt-4">
                  <div className="p-4 bg-red-50 rounded-xl">
                    <h4 className="font-bold text-red-700 mb-2">Strictly Necessary Cookies</h4>
                    <p className="text-gray-700">
                      These cookies are essential for the website to function and cannot be switched off. 
                      They are usually only set in response to actions made by you.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <h4 className="font-bold text-blue-700 mb-2">Analytics Cookies</h4>
                    <p className="text-gray-700">
                      These cookies allow us to count visits and traffic sources so we can measure and 
                      improve the performance of our site.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-xl">
                    <h4 className="font-bold text-green-700 mb-2">Marketing Cookies</h4>
                    <p className="text-gray-700">
                      These cookies may be set through our site by our advertising partners to build a 
                      profile of your interests.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Lock className="w-6 h-6 text-red-600 mr-2" />
                Your Rights
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Eye className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                  <span>Right to access your personal data</span>
                </li>
                <li className="flex items-start">
                  <Eye className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                  <span>Right to correct inaccurate data</span>
                </li>
                <li className="flex items-start">
                  <Eye className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                  <span>Right to delete your data</span>
                </li>
                <li className="flex items-start">
                  <Eye className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                  <span>Right to restrict processing</span>
                </li>
                <li className="flex items-start">
                  <Eye className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                  <span>Right to data portability</span>
                </li>
                <li className="flex items-start">
                  <Eye className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                  <span>Right to object to processing</span>
                </li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
              <p className="text-gray-700 mb-4">
                You can manage your cookie preferences at any time by clicking on the "Cookie Settings" 
                link in the footer or by clearing your browser cookies.
              </p>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold mb-2">Browser Settings</h3>
                <p className="text-gray-700">
                  Most web browsers allow you to control cookies through their settings. 
                  You can usually find these settings in the "Options" or "Preferences" menu of your browser.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about our cookie policy or how we handle your data, 
                please contact us at:
              </p>
              <div className="mt-4 p-4 bg-red-50 rounded-xl">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@mishafoodstuffs.com<br />
                  <strong>Phone:</strong> +254 797 005509<br />
                  <strong>Address:</strong> Samaki Drive Hse Number 13, Nairobi, Kenya
                </p>
              </div>
            </section>
            
            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500">
                Last Updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};