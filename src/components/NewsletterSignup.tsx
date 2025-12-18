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
    <div 
      className="rounded-2xl p-6 md:p-8 border"
      style={{
        background: 'linear-gradient(135deg, rgba(var(--color-surface-elevated), 0.8) 0%, rgba(var(--color-surface-elevated), 0.6) 100%)',
        borderColor: 'rgb(var(--color-border))'
      }}
    >
      <div className="flex items-center mb-6">
        <div 
          className="p-3 rounded-xl mr-4"
          style={{
            backgroundColor: 'rgba(var(--color-primary), 0.1)',
            color: 'rgb(var(--color-primary))'
          }}
        >
          <Mail className="w-6 h-6" />
        </div>
        <div>
          <h3 
            className="text-xl font-bold"
            style={{ color: 'rgb(var(--color-on-surface))' }}
          >
            Get Korean Cooking Tips & Deals
          </h3>
          <p 
            className="text-sm"
            style={{ color: 'rgb(var(--color-on-surface-muted))' }}
          >
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
            className="input-primary flex-1"
            disabled={status === 'loading' || status === 'success'}
            aria-label="Email address for newsletter"
            style={{
              backgroundColor: 'rgba(var(--color-surface-elevated), 0.5)',
              color: 'rgb(var(--color-on-surface))'
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`btn ${status === 'loading' ? 'btn-loading' : ''} ${status === 'success' ? 'btn-success' : ''} hover-lift`}
            style={{
              backgroundColor: status === 'success' 
                ? 'rgb(var(--color-success))' 
                : 'rgb(var(--color-primary))',
              color: 'white'
            }}
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
            className="p-3 rounded-lg text-sm"
            style={{
              backgroundColor: status === 'success' 
                ? 'rgba(var(--color-success), 0.1)' 
                : 'rgba(var(--color-error), 0.1)',
              color: status === 'success' 
                ? 'rgb(var(--color-success))' 
                : 'rgb(var(--color-error))'
            }}
          >
            {message}
          </div>
        )}

        <p 
          className="text-xs"
          style={{ color: 'rgb(var(--color-on-surface-muted))' }}
        >
          By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
};