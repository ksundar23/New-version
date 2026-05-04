'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioProject } from '../lib/siteData';

export default function Portfolio({
  projects,
  categories = ['All', 'Game Art', 'Environment', 'Characters'],
}: {
  projects: PortfolioProject[];
  categories?: string[];
}) {
  const categoryList = ['All', ...(categories || [])];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedSlug) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedSlug]);

  const activeProjectIndex = filteredProjects.findIndex(p => p.slug === selectedSlug);
  const activeProject = activeProjectIndex !== -1 ? filteredProjects[activeProjectIndex] : null;

  const scrollToTop = () => {
    const container = document.getElementById('lightbox-scroll-container');
    if (container) {
      container.scrollTop = 0;
    } else {
      document.getElementById('lightbox-top')?.scrollIntoView({ behavior: 'auto' });
    }
  };

  const nextProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeProjectIndex === -1) return;
    const nextIdx = (activeProjectIndex + 1) % filteredProjects.length;
    setSelectedSlug(filteredProjects[nextIdx].slug);
    setTimeout(scrollToTop, 10);
  };

  const prevProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeProjectIndex === -1) return;
    const prevIdx = (activeProjectIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedSlug(filteredProjects[prevIdx].slug);
    setTimeout(scrollToTop, 10);
  };

  const closeModal = () => setSelectedSlug(null);

  return (
    <div className="pt-24 pb-12 w-full container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center px-6"
      >
        <h2 className="text-4xl font-bold md:text-5xl text-white">Artworks</h2>
        <p className="mt-4 text-sm text-gray-400 max-w-2xl mx-auto">
          A selection of my best work in slot game art, environments, and
          <br className="hidden md:block"/> character design.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mb-16 flex flex-wrap justify-center gap-3 px-6"
      >
        {categoryList.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-5 py-2 text-sm transition-all ${
              activeCategory === category 
              ? 'bg-[#5B46F9] text-white font-medium shadow-[0_0_15px_rgba(91,70,249,0.4)]' 
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-px">
        <AnimatePresence mode='popLayout'>
          {filteredProjects.map((project, i) => (
            <motion.div 
              key={project.id} 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              id={project.slug} 
              className="group relative aspect-square overflow-hidden bg-[#111] outline outline-1 outline-[#1c1c1c] -outline-offset-1 cursor-pointer"
              onClick={() => setSelectedSlug(project.slug)}
              onMouseEnter={() => {
                // Prefetch the project's images to the browser cache
                const prefetch = (url: string) => {
                  if (typeof document === 'undefined') return;
                  const existing = document.querySelector(`link[href="${url}"]`);
                  if (existing) return;

                  const link = document.createElement('link');
                  link.rel = 'prefetch'; // Use prefetch for lower priority than preload
                  link.as = 'image';
                  link.href = url;
                  document.head.appendChild(link);
                };
                
                prefetch(project.image);
                if (project.images && project.images.length > 0) {
                  prefetch(project.images[0]);
                }
              }}
            >
              <div className="absolute inset-0 block h-full w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="transition-transform duration-700 group-hover:scale-105"
                  priority={i < 4}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full text-left opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-lg font-bold text-white transition-colors leading-tight">
                    {project.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={closeModal} />

            {/* Fixed Controls */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2 }}
              onClick={closeModal}
              className="absolute right-6 top-6 z-[110] text-gray-500 hover:text-white transition-colors"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </motion.button>

            <motion.button 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.3 }}
              onClick={prevProject} 
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[110] text-white/30 hover:text-white transition-colors hidden md:block"
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
            </motion.button>

            <motion.button 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.3 }}
              onClick={nextProject} 
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[110] text-white/30 hover:text-white transition-colors hidden md:block"
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg>
            </motion.button>

            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              onClick={(e) => { e.stopPropagation(); document.getElementById('lightbox-top')?.scrollIntoView({ behavior: 'smooth' }); }} 
              className="absolute bottom-8 right-4 md:right-8 z-[110] flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors backdrop-blur-md" 
              aria-label="Scroll to top"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 15l7-7 7 7" /></svg>
            </motion.button>

            {/* Scrollable Content Container */}
            <div 
              id="lightbox-scroll-container"
              className="absolute inset-0 overflow-y-auto"
              onClick={closeModal}
            >
              <div 
                className="flex w-full min-h-full p-4 lg:p-12 relative pointer-events-auto"
                onClick={(e) => e.stopPropagation()} // Prevent close when clicking content
              >
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeProject.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    id="lightbox-top" 
                    className="max-w-[1200px] w-full mx-auto relative pt-12 pb-24 flex flex-col items-center"
                  >
                 {/* Title */}
                 <motion.h1 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.1 }}
                   className="text-3xl md:text-4xl font-black tracking-wide text-white font-sans uppercase mb-6 text-center"
                 >
                   {activeProject.title}
                 </motion.h1>

                 {/* Share buttons styled row */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center flex-wrap gap-2 mb-8"
                  >
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? window.location.href : '#'}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#3b5998] hover:bg-[#2d4373] text-white px-3 py-1 text-[11px] font-bold rounded-sm transition-colors uppercase"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      Share
                    </a>
                    <a 
                      href={`https://pinterest.com/pin/create/button/?url=${typeof window !== 'undefined' ? window.location.href : '#'}&media=${activeProject.image}&description=${activeProject.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#cb2027] hover:bg-[#9f191f] text-white px-3 py-1 text-[11px] font-bold rounded-sm transition-colors uppercase"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592 0 12.017 0z"/></svg>
                      Pin
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(activeProject.title)}&url=${typeof window !== 'undefined' ? window.location.href : '#'}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#00aced] hover:bg-[#0084b4] text-white px-3 py-1 text-[11px] font-bold rounded-sm transition-colors uppercase"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                      Tweet
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== 'undefined' ? window.location.href : '#'}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#0077b5] hover:bg-[#005582] text-white px-3 py-1 text-[11px] font-bold rounded-sm transition-colors uppercase"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      Share
                    </a>
                  </motion.div>

                 {/* Description */}
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.3 }}
                   className="text-center mb-12"
                 >
                   <p className="text-gray-300 text-sm max-w-3xl mx-auto leading-relaxed">{activeProject.description}</p>
                 </motion.div>

                  {/* Vertical Stack of Images */}
                  <div className="flex flex-col items-center gap-8 md:gap-12 w-full">
                     {(activeProject.images && activeProject.images.length > 0 ? activeProject.images : [activeProject.image]).map((img, i) => (
                       <LightboxContentImage key={i} img={img} activeProject={activeProject} i={i} setZoomedImage={setZoomedImage} />
                     ))}
                  </div>
                 
                 {/* Mobile/Tablet Prev Arrow (Bottom) */}
                 <div className="flex justify-between w-full mt-12 md:hidden px-4">
                    <button onClick={prevProject} className="text-white/50 hover:text-white transition-colors p-4 flex items-center gap-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
                      Prev
                    </button>
                    <button onClick={nextProject} className="text-white/50 hover:text-white transition-colors p-4 flex items-center gap-2">
                      Next
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                 </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Zoom Overlay */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm cursor-zoom-out"
            onClick={() => setZoomedImage(null)}
          >
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute right-6 top-6 z-[210] text-gray-400 hover:text-white transition-colors"
              title="Close Zoom"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
            <div className="relative w-full h-full max-w-[95vw] max-h-[95vh] p-4 flex items-center justify-center pointer-events-none">
              <ZoomedImageWithLoader zoomedImage={zoomedImage} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LightboxContentImage({ img, activeProject, i, setZoomedImage }: { img: string; activeProject: any; i: number; setZoomedImage: (img: string) => void }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
      className="w-full flex justify-center flex-col items-center"
    >
      <button 
        type="button" 
        onClick={() => setZoomedImage(img)} 
        className="relative w-full max-w-5xl cursor-zoom-in block outline-none bg-white/5 rounded-lg overflow-hidden min-h-[300px]" 
        title="Click to view full size"
      >
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/10 border-t-[#5B46F9] rounded-full animate-spin"></div>
          </div>
        )}
        <Image
          src={img}
          alt={`${activeProject.title} - Image ${i + 1}`}
          width={1600}
          height={1200}
          style={{ objectFit: "contain" }}
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority={i === 0}
          loading={i === 0 ? undefined : "lazy"}
          onLoad={() => setIsLoaded(true)}
          className="w-full h-auto transition-opacity duration-500 hover:opacity-95"
          referrerPolicy="no-referrer"
        />
      </button>
      <p className="text-[#888] text-xs font-medium mt-4 text-center max-w-2xl px-4">
        {activeProject.shortDescription} {i > 0 ? ` (View ${i + 1})` : ''}
      </p>
    </motion.div>
  );
}

function ZoomedImageWithLoader({ zoomedImage }: { zoomedImage: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-white/10 border-t-[#5B46F9] rounded-full animate-spin"></div>
        </div>
      )}
      <Image
        src={zoomedImage}
        alt="Zoomed Artwork"
        width={2000}
        height={2000}
        style={{ objectFit: "contain" }}
        priority
        onLoad={() => setIsLoaded(true)}
        className={`w-auto h-auto max-w-full max-h-full drop-shadow-2xl pointer-events-auto transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        referrerPolicy="no-referrer"
      />
    </>
  );
}
