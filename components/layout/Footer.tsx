import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a] py-12 md:py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <Link href="/" className="font-display text-xl font-semibold tracking-wide text-white">
            Alexander Art
          </Link>
          <p className="mt-2 text-sm text-gray-500 max-w-md">
            Creating immersive, world-class game art for the casino and slot game industry. Aspiring to elevate visual storytelling.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2 text-sm text-gray-400">
          <nav className="flex flex-wrap items-center justify-center gap-4 mb-2">
            <Link href="/#home" className="hover:text-white transition-colors">Home</Link>
            <Link href="/#portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/#contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/admin" className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500">
              Login
            </Link>
          </nav>
          <p>© {new Date().getFullYear()} Alexander Art. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
