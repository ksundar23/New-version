'use client';
import Image from 'next/image';
import { motion } from 'motion/react';
import { AboutData } from '../lib/siteData';

export default function About({ about }: { about: AboutData }) {
  return (
    <div className="text-slate-300 font-sans pt-24 pb-12 container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center px-6"
      >
        <h2 className="text-4xl font-bold md:text-5xl text-white">About Me</h2>
      </motion.div>

      {/* Header Profile Section */}
      <div className="pb-16 flex flex-col items-center justify-center text-center px-6 border-b border-white/5 w-full">
        <div className="relative h-32 w-32 md:h-40 md:w-40 overflow-hidden rounded-full border-2 border-white/10 mb-6 shadow-xl">
          <Image 
            src="https://picsum.photos/seed/artist_portrait/400/400" 
            alt={`${about.name} - Game Artist`} 
            fill 
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 128px, 160px"
            className="" 
            referrerPolicy="no-referrer"
          />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">{about.name}</h2>
        <p className="text-[15px] text-gray-300 mb-2 font-medium">
          {about.role}
        </p>
        <p className="text-sm text-gray-400 flex items-center gap-1.5 mb-4">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          {about.location}
        </p>
        <a href={`mailto:${about.email}`} className="text-[#00a8e8] text-sm hover:underline mb-6 transition-all">
          {about.email}
        </a>
        <div className="mt-4 flex items-center justify-center gap-3">
          {about.socialLinks.map((social) => (
            <a 
              key={social.name} 
              href={social.url} 
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-110"
              style={{ backgroundColor: social.color }}
            >
              {social.name[0]}
            </a>
          ))}
        </div>
      </div>

      <div className="py-12">
        {/* Summary */}
        <section className="mb-14 border-b border-white/5 pb-14">
          <h2 className="text-2xl font-bold text-white mb-6 tracking-wide">Summary</h2>
          <p className="text-[15px] leading-relaxed text-gray-300">
            {about.summary}
          </p>
        </section>

        {/* Resume PDF */}
        <section className="mb-14 border-b border-white/5 pb-14">
           <h2 className="text-2xl font-bold text-white mb-4 tracking-wide">Resume PDF</h2>
           <a 
            href={about.resumeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#00a8e8] text-sm font-medium hover:underline inline-flex items-center gap-1 transition-all"
           >
             View Resume
           </a>
        </section>

        {/* Skills */}
        <section className="mb-14 border-b border-white/5 pb-14">
          <h2 className="text-2xl font-bold text-white mb-6 tracking-wide">Skills</h2>
          <div className="flex flex-wrap gap-2.5">
            {about.skills.map((skill) => (
              <span key={skill} className="px-4 py-2 border border-white/20 text-xs font-bold tracking-widest text-gray-300 rounded-[2px] uppercase">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Software Proficiency */}
        <section className="pb-14">
          <h2 className="text-2xl font-bold text-white mb-8 tracking-wide">Software proficiency</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
             {about.software.map((software) => (
                <div key={software.name} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-[4px] flex items-center justify-center text-[10px] font-bold text-white shadow-sm" style={{ backgroundColor: software.color }}>
                    {software.icon}
                  </div>
                  <span className="text-[15px] font-medium text-gray-300">{software.name}</span>
                </div>
             ))}
          </div>
        </section>
      </div>
    </div>
  );
}
