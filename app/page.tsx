'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import dynamic from 'next/dynamic';

const Portfolio = dynamic(() => import('../components/Portfolio'), {
  ssr: false,
});

import About from '../components/About';
import Contact from '../components/Contact';

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  const images = [
    "https://picsum.photos/seed/egypt_gold/1920/1080",
    "https://picsum.photos/seed/casino_art/1920/1080",
    "https://picsum.photos/seed/game_character/1920/1080",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex flex-col bg-[#0a0a0a] w-full">
      <div ref={ref} style={{ position: "relative" }}>
      <section
        id="home"
        className="relative h-screen w-full overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          {/* 🎬 CINEMATIC SLIDESHOW */}
          <motion.div style={{ y: yBg }} className="absolute inset-0 overflow-hidden">
            {images.map((img, i) => {
              const isActive = i === index;

              return (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{
                    opacity: { duration: 1.2 },
                  }}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale: isActive ? 1.06 : 1.1 }}
                    transition={{ duration: 6 }}
                  >
                    <Image
                      src={img}
                      alt="hero"
                      fill
                      style={{ objectFit: "cover" }}
                      priority={i === 0}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="absolute inset-0 bg-black/60 z-10"></div>
        
        <div className="absolute inset-0 z-20 flex items-center justify-center w-full h-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-4xl text-center px-6"
          >
            <p className="mx-auto mb-10 text-xl md:text-2xl font-medium text-white drop-shadow-md leading-relaxed max-w-3xl">
              Crafting immersive visuals, casino games, character design, environment art, concept illustration, and engaging player experiences.
            </p>
            <div className="flex items-center justify-center gap-6">
              <Link href="#portfolio" className="inline-flex h-12 items-center justify-center rounded bg-white px-8 font-semibold text-black transition-all hover:bg-gray-200">
                Artworks
              </Link>
              <Link href="#contact" className="inline-flex h-12 items-center justify-center rounded border border-white/20 bg-[#050505] px-8 font-semibold text-white transition-all hover:bg-black/80">
                Hire Me
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>

      <section id="portfolio" className="w-full">
        <Portfolio />
      </section>

      <section id="about" className="w-full">
        <About />
      </section>

      <section id="contact" className="w-full">
        <Contact />
      </section>
    </div>
  );
}
