import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-300 mb-8">Page Not Found</h2>
      <p className="text-gray-400 mb-10 max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="rounded-md bg-white px-8 py-3 font-semibold text-black hover:bg-gray-200 transition-colors">
        Go Home
      </Link>
    </div>
  );
}
