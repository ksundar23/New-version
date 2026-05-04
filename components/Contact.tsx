'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { ContactData } from '../lib/siteData';

export default function Contact({ contact }: { contact: ContactData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="pt-24 pb-12 container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center px-6"
      >
        <h2 className="text-4xl font-bold md:text-5xl text-white">Contact</h2>
      </motion.div>

      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 text-4xl font-bold md:text-5xl text-white">Let&apos;s Create<br/>Something Great.</h2>
          <p className="mb-10 text-lg text-gray-400 max-w-md">
            Whether you are a studio looking to expand your team or a client needing freelance art, I&apos;m ready to bring my expertise to your next project.
          </p>

          <div className="mb-12 inline-flex items-center gap-3 rounded-full border border-green-500/30 bg-green-500/10 px-5 py-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-green-400">{contact.availableText}</span>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">Email</h3>
              <a href={`mailto:${contact.email}`} className="text-xl font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                {contact.email}
              </a>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">{contact.networkTitle}</h3>
              <div className="flex flex-col gap-2">
                {contact.networkLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit text-lg font-medium text-white hover:text-indigo-400 transition-colors"
                  >
                    {link.name} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#111111] border border-white/5 p-8 md:p-10">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-400" htmlFor="name">Name</label>
                      <input 
                        required
                        type="text" 
                        id="name" 
                        className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-400" htmlFor="email">Email</label>
                      <input 
                        required
                        type="email" 
                        id="email" 
                        className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-400" htmlFor="subject">Subject</label>
                    <select 
                      id="subject"
                      className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none"
                    >
                      <option value="freelance">Freelance Inquiry</option>
                      <option value="fulltime">Full-time Opportunity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-400" htmlFor="message">Message</label>
                    <textarea 
                      required
                      id="message" 
                      rows={5}
                      className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full rounded-md bg-white px-6 py-4 font-medium text-black hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : 'Send Message'}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="mb-6 rounded-full bg-green-500/10 p-4">
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Message Sent!</h2>
                <p className="text-gray-400 mb-8 max-w-xs">
                  Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="rounded-md border border-white/10 px-6 py-2 text-sm font-medium text-white hover:bg-white/5 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
