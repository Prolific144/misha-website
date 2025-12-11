import React, { useState } from 'react';
import { Mail, Check, Send } from 'lucide-react';

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    // Simulate API call
    setTimeout(() => {
      // In production, replace with actual API call
      console.log('Newsletter signup:', email);
      
      setStatus('success');
      setMessage('Thank you for subscribing! Check your email for a welcome offer.');
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl mr-4">
          <Mail className="w-6 h-6 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Get Korean Cooking Tips & Deals
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Subscribe to our newsletter for recipes, promotions, and new arrivals
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-600 dark:text-white"
            disabled={status === 'loading' || status === 'success'}
            aria-label="Email address for newsletter"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`px-6 py-3 rounded-xl font-semibold flex items-center justify-center min-w-[140px] transition-all ${
              status === 'success'
                ? 'bg-green-600 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            } ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {status === 'loading' ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Subscribing...
              </>
            ) : status === 'success' ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                Subscribed!
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Subscribe
              </>
            )}
          </button>
        </div>

        {message && (
          <div
            className={`p-3 rounded-lg text-sm ${
              status === 'success'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
            }`}
          >
            {message}
          </div>
        )}

        <p className="text-xs text-gray-500 dark:text-gray-400">
          By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
};