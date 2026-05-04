'use client';

import { useEffect, useMemo, useState } from 'react';
import { Save, LogOut, Lock } from 'lucide-react';
import {
  SiteData,
  defaultSiteData,
  loadSavedSiteData,
  saveSiteData,
} from '../../lib/siteData';

const ADMIN_PASSWORD = 'admin1234';

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default function Admin() {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginStep, setLoginStep] = useState<'password' | 'verification'>('password');
  const [password, setPassword] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const saved = loadSavedSiteData();
    if (saved) {
      setSiteData(saved);
    }
    const auth = window.localStorage.getItem('sundarrajanAdminAuth') === 'true';
    if (auth) {
      setIsLoggedIn(true);
      setLoginStep('verification');
    }
  }, []);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === ADMIN_PASSWORD) {
      const code = generateVerificationCode();
      setVerificationCode(code);
      setLoginStep('verification');
      setPassword('');
      setFeedback('Password accepted. Enter the verification code to continue.');
      return;
    }
    setFeedback('Incorrect password. Please try again.');
  };

  const handleVerification = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (enteredCode === verificationCode && verificationCode !== '') {
      window.localStorage.setItem('sundarrajanAdminAuth', 'true');
      setIsLoggedIn(true);
      setEnteredCode('');
      setFeedback('Secure login verified. You are now logged in.');
      return;
    }

    setFeedback('Verification failed. Please check the code and try again.');
  };

  const handleLogout = () => {
    window.localStorage.removeItem('sundarrajanAdminAuth');
    setIsLoggedIn(false);
    setLoginStep('password');
    setVerificationCode('');
    setEnteredCode('');
    setFeedback('Logged out.');
  };

  const handleResendCode = () => {
    const code = generateVerificationCode();
    setVerificationCode(code);
    setFeedback('A new verification code has been generated.');
  };

  const handleSave = () => {
    const nextData = {
      ...siteData,
      publish: {
        isPublished: true,
        lastSaved: new Date().toISOString(),
      },
    };
    saveSiteData(nextData);
    setSiteData(nextData);
    setFeedback('Changes saved and published locally. Refresh the public pages to see updates.');
  };

  const updateField = <K extends keyof SiteData>(key: K, value: SiteData[K]) => {
    setSiteData((prev) => ({ ...prev, [key]: value }));
  };

  const updateProject = (index: number, key: keyof SiteData['portfolioProjects'][number], value: string) => {
    setSiteData((prev) => {
      const projects = [...prev.portfolioProjects];
      const project = { ...projects[index] };
      if (key === 'images' || key === 'tools') {
        project[key] = value.split(',').map((item) => item.trim()) as any;
      } else {
        project[key] = value as any;
      }
      projects[index] = project;
      return { ...prev, portfolioProjects: projects };
    });
  };

  const addProject = () => {
    setSiteData((prev) => ({
      ...prev,
      portfolioProjects: [
        ...prev.portfolioProjects,
        {
          id: `${Date.now()}`,
          title: 'New artwork',
          category: 'Game Art',
          shortDescription: 'A short description for the new artwork.',
          image: 'https://picsum.photos/seed/new_project/1200/800',
          images: ['https://picsum.photos/seed/new_project/1200/800'],
          slug: `new-artwork-${Date.now()}`,
          tools: ['Photoshop'],
          role: 'Artist',
          description: 'Add a description for the new artwork.',
        },
      ],
    }));
  };

  const removeProject = (index: number) => {
    setSiteData((prev) => ({
      ...prev,
      portfolioProjects: prev.portfolioProjects.filter((_, idx) => idx !== index),
    }));
  };

  const updateBlog = (index: number, key: keyof SiteData['blogPosts'][number], value: string) => {
    setSiteData((prev) => {
      const posts = [...prev.blogPosts];
      posts[index] = { ...posts[index], [key]: value } as any;
      return { ...prev, blogPosts: posts };
    });
  };

  const addBlogPost = () => {
    setSiteData((prev) => ({
      ...prev,
      blogPosts: [
        ...prev.blogPosts,
        {
          id: `${Date.now()}`,
          title: 'New blog post',
          category: 'Updates',
          date: 'Jan 01, 2027',
          excerpt: 'Draft a short summary for the new blog post.',
          image: 'https://picsum.photos/seed/new_blog/800/500',
          slug: `new-blog-${Date.now()}`,
        },
      ],
    }));
  };

  const removeBlogPost = (index: number) => {
    setSiteData((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.filter((_, idx) => idx !== index),
    }));
  };

  const publishStatus = useMemo(() => {
    return siteData.publish.isPublished ? 'Published' : 'Draft';
  }, [siteData.publish.isPublished]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#050505] text-white py-24 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-[#111111]/90 p-10 shadow-xl shadow-black/20">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-600/10 text-indigo-400">
              <Lock size={28} />
            </div>
            <h1 className="text-3xl font-bold">Secure Admin Login</h1>
            <p className="mt-3 text-sm text-gray-400">
              Enter your password, then verify with a one-time code to access the admin editor.
            </p>
          </div>

          <form
            onSubmit={loginStep === 'password' ? handleLogin : handleVerification}
            className="space-y-6"
          >
            {loginStep === 'password' ? (
              <>
                <label className="block text-sm font-semibold text-gray-300">
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="Enter admin password"
                  />
                </label>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-indigo-500"
                >
                  Continue
                </button>
              </>
            ) : (
              <>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-gray-300">
                  <p className="font-semibold text-white">Verification required</p>
                  <p className="mt-2">
                    Enter the one-time verification code below to complete login.
                  </p>
                  <p className="mt-4 text-xs text-gray-400">
                    Demo code: <span className="font-semibold text-white">{verificationCode}</span>
                  </p>
                </div>

                <label className="block text-sm font-semibold text-gray-300">
                  Verification code
                  <input
                    type="text"
                    value={enteredCode}
                    onChange={(event) => setEnteredCode(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="Enter verification code"
                  />
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-indigo-500"
                  >
                    Verify Code
                  </button>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:border-indigo-500"
                  >
                    Resend Code
                  </button>
                </div>
              </>
            )}

            {feedback && <p className="text-sm text-red-400">{feedback}</p>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white py-10 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#111111]/90 px-6 py-6 shadow-xl shadow-black/20 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Admin Editor</p>
            <h1 className="mt-3 text-3xl font-bold">Edit site content, artworks, and blogs</h1>
            <p className="mt-2 text-sm text-gray-400 max-w-2xl">
              Use the controls below to update the homepage, portfolio items, and blog posts. Save changes to persist them in the browser.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-200">
              <span className={`h-2.5 w-2.5 rounded-full ${siteData.publish.isPublished ? 'bg-green-400' : 'bg-yellow-400'}`} />
              <span>{publishStatus}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-indigo-500"
              >
                <Save size={16} /> Save & Publish
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:border-indigo-500"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </header>

        {feedback && (
          <div className="mb-6 rounded-3xl border border-green-500/20 bg-green-500/10 px-5 py-4 text-sm text-green-200">
            {feedback}
          </div>
        )}

        <section className="mb-10 rounded-3xl border border-white/10 bg-[#111111]/90 p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Homepage Text</h2>
              <p className="text-sm text-gray-400">Update hero copy and CTA buttons.</p>
            </div>
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            <label className="block text-sm text-gray-300">
              Hero text
              <textarea
                value={siteData.heroText}
                onChange={(e) => updateField('heroText', e.target.value)}
                rows={4}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </label>
            {siteData.heroActions.map((action, index) => (
              <label key={index} className="block text-sm text-gray-300">
                Button {index + 1} label
                <input
                  value={action.label}
                  onChange={(e) => {
                    const actions = [...siteData.heroActions];
                    actions[index] = { ...actions[index], label: e.target.value };
                    updateField('heroActions', actions);
                  }}
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
                <span className="mt-2 text-xs text-gray-500">Link: {action.href}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="mb-10 rounded-3xl border border-white/10 bg-[#111111]/90 p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">About Section</h2>
              <p className="text-sm text-gray-400">Edit name, summary, and profile details.</p>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="block text-sm text-gray-300">
              Name
              <input
                value={siteData.about.name}
                onChange={(e) => updateField('about', { ...siteData.about, name: e.target.value })}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </label>
            <label className="block text-sm text-gray-300">
              Role
              <input
                value={siteData.about.role}
                onChange={(e) => updateField('about', { ...siteData.about, role: e.target.value })}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </label>
            <label className="block text-sm text-gray-300">
              Location
              <input
                value={siteData.about.location}
                onChange={(e) => updateField('about', { ...siteData.about, location: e.target.value })}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </label>
            <label className="block text-sm text-gray-300">
              Email
              <input
                value={siteData.about.email}
                onChange={(e) => updateField('about', { ...siteData.about, email: e.target.value })}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </label>
            <label className="block text-sm text-gray-300 lg:col-span-2">
              Summary
              <textarea
                value={siteData.about.summary}
                onChange={(e) => updateField('about', { ...siteData.about, summary: e.target.value })}
                rows={6}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </label>
            <label className="block text-sm text-gray-300 lg:col-span-2">
              Resume URL
              <input
                value={siteData.about.resumeUrl}
                onChange={(e) => updateField('about', { ...siteData.about, resumeUrl: e.target.value })}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </label>
          </div>
        </section>

        <section className="mb-10 rounded-3xl border border-white/10 bg-[#111111]/90 p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Portfolio Artwork</h2>
              <p className="text-sm text-gray-400">Add, edit, or remove portfolio items.</p>
            </div>
            <button
              onClick={addProject}
              className="rounded-2xl bg-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-white/10"
            >
              Add Artwork
            </button>
          </div>

          <div className="space-y-6">
            {siteData.portfolioProjects.map((project, index) => (
              <div key={project.id} className="rounded-3xl border border-white/10 bg-[#0d0d0d]/90 p-5">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <p className="text-sm text-gray-400">{project.category}</p>
                  </div>
                  <button
                    onClick={() => removeProject(index)}
                    className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/20"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <label className="block text-sm text-gray-300">
                    Title
                    <input
                      value={project.title}
                      onChange={(e) => updateProject(index, 'title', e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </label>
                  <label className="block text-sm text-gray-300">
                    Category
                    <input
                      value={project.category}
                      onChange={(e) => updateProject(index, 'category', e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </label>
                  <label className="block text-sm text-gray-300">
                    Role
                    <input
                      value={project.role}
                      onChange={(e) => updateProject(index, 'role', e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </label>
                  <label className="block text-sm text-gray-300">
                    Slug
                    <input
                      value={project.slug}
                      onChange={(e) => updateProject(index, 'slug', e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </label>
                  <label className="block text-sm text-gray-300 lg:col-span-2">
                    Short description
                    <input
                      value={project.shortDescription}
                      onChange={(e) => updateProject(index, 'shortDescription', e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </label>
                  <label className="block text-sm text-gray-300 lg:col-span-2">
                    Image URL
                    <input
                      value={project.image}
                      onChange={(e) => updateProject(index, 'image', e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </label>
                  <label className="block text-sm text-gray-300">
                    Extra image URLs (comma separated)
                    <input
                      value={project.images.join(', ')}
                      onChange={(e) => updateProject(index, 'images', e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </label>
                  <label className="block text-sm text-gray-300 lg:col-span-2">
                    Tools (comma separated)
                    <input
                      value={project.tools.join(', ')}
                      onChange={(e) => updateProject(index, 'tools', e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </label>
                  <label className="block text-sm text-gray-300 lg:col-span-2">
                    Description
                    <textarea
                      value={project.description}
                      onChange={(e) => updateProject(index, 'description', e.target.value)}
                      rows={4}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#111111]/90 p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Blog Posts</h2>
              <p className="text-sm text-gray-400">Manage the blog cards displayed on the blog page.</p>
            </div>
            <button
              onClick={addBlogPost}
              className="rounded-2xl bg-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-white/10"
            >
              Add Blog Post
            </button>
          </div>

          <div className="space-y-6">
            {siteData.blogPosts.map((post, index) => (
              <div key={post.id} className="rounded-3xl border border-white/10 bg-[#0d0d0d]/90 p-5">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <p className="text-sm text-gray-400">{post.category}</p>
                  </div>
                  <button
                    onClick={() => removeBlogPost(index)}
                    className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/20"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <label className="block text-sm text-gray-300">
                    Title
                    <input
                      value={post.title}
                      onChange={(e) => updateBlog(index, 'title', e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </label>
                  <label className="block text-sm text-gray-300">
                    Category
                    <input
                      value={post.category}
                      onChange={(e) => updateBlog(index, 'category', e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </label>
                  <label className="block text-sm text-gray-300">
                    Date
                    <input
                      value={post.date}
                      onChange={(e) => updateBlog(index, 'date', e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </label>
                  <label className="block text-sm text-gray-300">
                    Slug
                    <input
                      value={post.slug}
                      onChange={(e) => updateBlog(index, 'slug', e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </label>
                  <label className="block text-sm text-gray-300 lg:col-span-2">
                    Excerpt
                    <textarea
                      value={post.excerpt}
                      onChange={(e) => updateBlog(index, 'excerpt', e.target.value)}
                      rows={4}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </label>
                  <label className="block text-sm text-gray-300 lg:col-span-2">
                    Image URL
                    <input
                      value={post.image}
                      onChange={(e) => updateBlog(index, 'image', e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
