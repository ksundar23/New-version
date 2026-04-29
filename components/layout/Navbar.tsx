'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: '/#home', label: 'Home' },
    { href: '/#portfolio', label: 'Artworks' },
    { href: '/#about', label: 'About' },
    { href: '/#contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1c1c1c] text-white">
      <div className="mx-auto flex h-20 w-full px-6 lg:px-12 items-center justify-between">
        <Link href="/" className="flex flex-col items-start transition-opacity hover:opacity-80">
          <span className="font-display text-2xl lg:text-3xl tracking-[0.15em] font-bold uppercase leading-tight">
            SUNDARRAJAN ART
          </span>
          <span className="text-[13px] text-gray-300 font-medium tracking-wide">
            Game artist & slot specialist
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10 text-sm font-bold tracking-widest uppercase text-gray-300">
          <Link href="/#home" className="hover:text-white transition-colors">Home</Link>
          <Link href="/#portfolio" className="hover:text-white transition-colors">Artworks</Link>
          <Link href="/#about" className="hover:text-white transition-colors">About</Link>
          <Link href="/#contact" className="hover:text-white transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/blog" className="hidden md:flex ml-4 rounded-sm bg-white px-8 py-2.5 text-sm font-bold tracking-widest text-black uppercase hover:bg-gray-200 transition-colors">
            BLOG
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-white p-2" 
            aria-label="Toggle Menu"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-[#1c1c1c] border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-bold tracking-widest uppercase text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
