import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '../../../lib/data';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = blogPosts.find(p => p.slug === resolvedParams.slug) || blogPosts[0];

  return (
    <article className="py-24 px-6 mx-auto max-w-4xl">
      <div className="mb-10">
        <Link href="/blog" className="inline-flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300 mb-8">
          ← Back to Blog
        </Link>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <span className="font-semibold uppercase tracking-wider text-indigo-400">{post.category}</span>
          <span>•</span>
          <time>{post.date}</time>
        </div>
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
          {post.title}
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          {post.excerpt}
        </p>
      </div>

      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl mb-16 bg-white/5">
        <Image 
          src={post.image} 
          alt={post.title} 
          fill 
          style={{ objectFit: "cover" }}
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="" 
          priority={false}
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-8">
        <p>
          Creating game art is a balancing act between aesthetics and performance. 
          When designing assets for mobile devices, the most important factor is readability. 
          Players need to understand what they are seeing in a fraction of a second.
        </p>
        
        <h2 className="text-2xl font-bold text-white mt-12 mb-6">The Importance of Contrast</h2>
        <p>
          High contrast isn&apos;t just about making things &quot;pop.&quot; It&apos;s about hierarchy. 
          The wild symbol should stand out significantly more than the low-paying card symbols. 
          I typically use complementary color schemes and intense edge lighting to ensure the player&apos;s eye is drawn exactly where it needs to be.
        </p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">Case Study Breakdown</h3>
        <p>
          In my recent project, I focused heavily on streamlining the silhouette of the main characters. 
          We found that by reducing the noise and detail in the internal textures, and instead focusing on strong, recognizable shapes, player retention increased.
        </p>

        <div className="my-12 relative aspect-video w-full overflow-hidden rounded-xl bg-white/5 p-2">
            <Image 
                src="https://picsum.photos/seed/breakdown/800/450" 
                alt="Process Breakdown" 
                width={800}
                height={450}
                style={{ objectFit: "cover" }}
                className="rounded-lg w-full h-auto" 
                referrerPolicy="no-referrer"
            />
            <p className="text-center text-sm text-gray-500 mt-4">Fig 1. Silhouette breakdown and edge lighting passes.</p>
        </div>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6">Iterative Workflow</h2>
        <p>
          Don&apos;t fall in love with the first draft. The casino industry is fast-paced, but taking the time to do 3-4 iterations of a symbol before moving to the final render saves time in the long run.
        </p>
      </div>

      <div className="mt-20 pt-10 border-t border-white/5 flex justify-between items-center">
        <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden relative bg-white/5">
                <Image 
                  src="https://picsum.photos/seed/portrait/100/100" 
                  alt="Author" 
                  fill 
                  style={{ objectFit: "cover" }}
                  sizes="48px" 
                  priority={false}
                />
            </div>
            <div>
                <p className="font-semibold text-white">Sundarrajan</p>
                <p className="text-sm text-gray-500">Game Artist & Slot Specialist</p>
            </div>
        </div>
        <Link href="/contact" className="rounded-md border border-white/20 px-6 py-2 text-sm font-medium hover:bg-white hover:text-black transition-colors">
            Contact Author
        </Link>
      </div>
    </article>
  );
}
