'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '../../lib/data';

export default function Blog() {
  return (
    <div className="py-24 px-6 mx-auto max-w-7xl">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold md:text-5xl text-white">Insights & Tutorials</h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          A deeper dive into my workflow, industry trends, and the meticulous process of creating slot game art.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article key={post.id} className="group flex flex-col overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/5 transition-colors hover:border-white/10 text-left">
            <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/9] w-full overflow-hidden bg-white/5">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                className="transition-transform duration-500 group-hover:scale-105" 
                priority={false}
                referrerPolicy="no-referrer"
              />
            </Link>
            <div className="flex flex-col flex-grow p-6">
              <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
                <span className="font-semibold uppercase tracking-wider text-indigo-400">{post.category}</span>
                <time>{post.date}</time>
              </div>
              <h2 className="mb-3 text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <p className="mb-6 text-sm text-gray-400 flex-grow">
                {post.excerpt}
              </p>
              <Link href={`/blog/${post.slug}`} className="mt-auto font-medium text-indigo-400 hover:text-indigo-300">
                Read Article →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Subscription CTA */}
      <div className="mt-24 rounded-3xl bg-gradient-to-br from-[#0a0a0a] to-[#111] border border-white/5 p-10 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Never Miss an Update</h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">Subscribe to get weekly insights on game art creation, tutorials, and industry trends directly to your inbox.</p>
        <SubscriptionForm />
      </div>
    </div>
  );
}

function SubscriptionForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-green-400 font-medium py-3"
      >
        Successfully subscribed! Check your inbox soon.
      </motion.div>
    );
  }

  return (
    <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-3" onSubmit={handleSubmit}>
      <input 
        type="email" 
        placeholder="Enter your email" 
        className="flex-grow rounded-md border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        required
        disabled={status === 'loading'}
      />
      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="rounded-md bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700 transition-colors shrink-0 disabled:opacity-50"
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  );
}
