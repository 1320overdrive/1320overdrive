"use client";

import { useState } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import Link from "next/link";

const screenshots = [
  { src: "/images/garage.png", alt: "Garage" },
  { src: "/images/snowy-challenger.png", alt: "Snowy Challenger" },
  { src: "/images/car-purchase.png", alt: "Car Purchase" },
  { src: "/images/car-inventory.png", alt: "Car Inventory" },
  { src: "/images/rainy-race.png", alt: "Rainy Race" },
];

const socialLinks = [
  {
    name: "Discord",
    href: "https://discord.gg/k5fAhNkpm",
    label: "Join Our Discord",
    colorClass: "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700",
    iconBgClass: "bg-indigo-600/20 border-indigo-500/40",
    iconColorClass: "text-indigo-400",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
    buttonIcon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
    description: "Connect with racers, share builds, and talk directly with the dev.",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/1320overdrive",
    label: "Follow on Instagram",
    colorClass: "bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:opacity-90 active:opacity-80",
    iconBgClass: "bg-pink-600/20 border-pink-500/40",
    iconColorClass: "text-pink-400",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
    buttonIcon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
    description: "Behind-the-scenes content, screenshots, and game updates.",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@nicholaslittle434",
    label: "Follow on TikTok",
    colorClass: "bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 border border-white/10",
    iconBgClass: "bg-white/10 border-white/20",
    iconColorClass: "text-white",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
    buttonIcon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
    description: "Short clips, teasers, and dev moments from the garage.",
  },
  {
    name: "X",
    href: "https://x.com/1320overdrive",
    label: "Follow on X",
    colorClass: "bg-zinc-900 hover:bg-zinc-700 active:bg-black border border-white/10",
    iconBgClass: "bg-white/10 border-white/20",
    iconColorClass: "text-white",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L2.25 2.25h6.602l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    buttonIcon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L2.25 2.25h6.602l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    description: "News, announcements, and real-time updates from the team.",
  },
];

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        "service_qaoxsvm",
        "template_ncdlbo8",
        {
          from_name: name,
          from_email: email,
          message: selectedPlatforms.length
            ? `Early Access Platforms: ${selectedPlatforms.join(", ")}\n\n${message}`
            : message,
        },
        "IO_JZYXks_N8dNh79"
      );
      setSubmitted(true);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterLoading(true);
    setNewsletterError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setNewsletterSubmitted(true);
    } catch (err: any) {
      setNewsletterError(err.message || "Something went wrong. Please try again.");
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-8 text-white text-4xl font-light hover:text-red-500 transition-colors z-10"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <div className="relative max-w-5xl w-full max-h-[90vh]">
            <Image
              src={lightbox}
              alt="Enlarged screenshot"
              width={1200}
              height={800}
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>
        </div>
      )}

      {/* Video Modal */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setVideoModalOpen(false)}
        >
          <button
            className="absolute top-6 right-8 text-white text-4xl font-light hover:text-red-500 transition-colors z-10"
            onClick={() => setVideoModalOpen(false)}
          >
            ✕
          </button>
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              controls
              autoPlay
              playsInline
              className="w-full rounded-xl"
            >
              {/*<source src="/videos/gameplay1.mp4" type="video/mp4" /> */}
              <source src="/videos/trailer-with-song.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-sm border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image src="/images/logo.png" alt="1320 OverDrive Logo" width={120} height={40} />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex gap-8 text-sm text-zinc-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#platforms" className="hover:text-white transition-colors">Platforms</a>
            <a href="#media" className="hover:text-white transition-colors">Media</a>
            <a href="#newsletter" className="hover:text-white transition-colors">Newsletter</a>
            <a href="#community" className="hover:text-white transition-colors">Community</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-2 flex flex-col gap-4 text-sm text-zinc-400 border-t border-white/10 pt-4">
            <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">About</a>
            <a href="#features" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Features</a>
            <a href="#platforms" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Platforms</a>
            <a href="#media" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Media</a>
            <a href="#newsletter" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Newsletter</a>
            <a href="#community" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Community</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Contact</a>
          </div>
        )}
      </nav>

      {/* Hero with video background */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        >
          <source src="/videos/gameplay1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/65 z-10" />
        <div className="relative z-20 flex flex-col items-center gap-6 px-4">
          <p className="text-red-500 text-xs sm:text-sm font-semibold tracking-widest uppercase">
            Coming Soon
          </p>
          <p className="text-zinc-300 text-base sm:text-xl max-w-xl leading-relaxed">
            The ultimate mobile drag racing experience. Full throttle. No limits.
          </p>
          <button
            onClick={() => setVideoModalOpen(true)}
            className="mt-2 group flex items-center gap-3 bg-white/10 hover:bg-red-600 active:bg-red-700 border border-white/20 hover:border-red-600 backdrop-blur-sm text-white font-bold px-6 py-3 rounded-full uppercase tracking-widest text-sm transition-all duration-200 touch-manipulation"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white group-hover:border-white">
              <svg className="w-3 h-3 fill-white ml-0.5" viewBox="0 0 10 10">
                <polygon points="1,0 9,5 1,10" />
              </svg>
            </span>
            Watch Trailer
          </button>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 md:py-32 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black uppercase mb-6">About the Game</h2>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
          1320 OverDrive is a high-octane mobile drag racing game built for speed enthusiasts.
          Customize your ride, upgrade your engine, and race your way to the top.
          1320 feet. Every second counts. Take the competition online and go head-to-head against real racers from around the world.
          Climb the leaderboards, dominate live 1v1 matches, and cement your place at the top.
        </p>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-32 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-12 md:mb-16">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              { title: "Custom Builds", desc: "Tune and upgrade your car to perfection." },
              { title: "Precision & Power", desc: "Easy to pick up, hard to master drag racing excitement." },
              { title: "Compete", desc: "Race against opponents and climb the leaderboard." },
            ].map((f) => (
              <div key={f.title} className="bg-zinc-900 rounded-2xl p-8 border border-white/5">
                <h3 className="text-red-500 font-bold text-xl uppercase mb-3">{f.title}</h3>
                <p className="text-zinc-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section id="platforms" className="py-20 md:py-32 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">Coming Soon</h2>
        <p className="text-zinc-400 mb-12 text-base md:text-lg">Coming to multiple platforms</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16">
          {[
            { src: "/images/ios.png", alt: "iOS" },
            { src: "/images/android.png", alt: "Android" },
            { src: "/images/steam.png", alt: "Steam" },
          ].map((p) => (
            <div key={p.alt} className="flex flex-col items-center gap-3 group">
              <div className="w-20 h-20 md:w-24 md:h-24 relative flex items-center justify-center rounded-2xl border border-white/10 bg-zinc-900 p-2 group-hover:border-red-500 group-hover:bg-zinc-800 transition-all duration-200">
                <Image src={p.src} alt={p.alt} fill className="object-contain p-2" />
              </div>
              <span className="text-zinc-400 text-sm font-semibold uppercase tracking-widest group-hover:text-white transition-colors">
                {p.alt}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Media */}
      <section id="media" className="py-20 md:py-32 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black uppercase mb-12 md:mb-16">Media</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="md:col-span-2 rounded-2xl overflow-hidden border border-white/10">
            <video controls className="w-full object-cover" playsInline>
              <source src="/videos/gameplay2.mp4" type="video/mp4" />
            </video>
          </div>
          {screenshots.map((s) => (
            <div
              key={s.src}
              className="rounded-2xl overflow-hidden border border-white/10 cursor-pointer hover:border-red-500 active:border-red-500 transition-colors group relative"
              onClick={() => setLightbox(s.src)}
            >
              <Image
                src={s.src}
                alt={s.alt}
                width={800}
                height={500}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                  Click to Enlarge
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-20 md:py-32 px-6 bg-zinc-950">
        <div className="max-w-xl mx-auto text-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-600/20 border border-red-600/40 mx-auto mb-6">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">Stay in the Loop</h2>
          <p className="text-zinc-400 mb-10 text-base md:text-lg">
            Be the first to know when 1320 OverDrive launches. No spam — just launch news and big updates.
          </p>
          {newsletterSubmitted ? (
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-600/20 border border-green-600/40">
                <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-green-400 font-semibold text-lg">You're on the list!</p>
              <p className="text-zinc-500 text-sm">We'll reach out when launch day arrives.</p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1 text-base px-5 py-4 rounded-full bg-zinc-800 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                disabled={newsletterLoading}
                className="bg-red-600 hover:bg-red-500 active:bg-red-700 disabled:bg-red-900 text-white font-bold px-8 py-4 rounded-full uppercase tracking-widest text-sm transition-colors whitespace-nowrap touch-manipulation"
              >
                {newsletterLoading ? "Subscribing..." : "Notify Me"}
              </button>
            </form>
          )}
          {newsletterError && (
            <p className="mt-4 text-red-400 text-sm">{newsletterError}</p>
          )}
        </div>
      </section>

      {/* Community (Discord + Social Media) */}
      <section id="community" className="py-20 md:py-32 px-6 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">Join the Community</h2>
          <p className="text-zinc-400 mb-12 text-base md:text-lg">
            Follow along, connect with other racers, and get the latest updates across all our channels.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-4 bg-zinc-900 hover:bg-zinc-800 border border-white/5 hover:border-white/15 rounded-2xl p-8 transition-all duration-200 text-center"
              >
                <div className={`flex items-center justify-center w-14 h-14 rounded-full border ${social.iconBgClass}`}>
                  <span className={social.iconColorClass}>{social.icon}</span>
                </div>
                <div>
                  <p className="text-white font-bold text-lg uppercase tracking-wide mb-1">{social.name}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">{social.description}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-2 ${social.colorClass} text-white font-bold px-6 py-3 rounded-full uppercase tracking-widest text-xs transition-all duration-200 touch-manipulation mt-auto`}
                >
                  {social.buttonIcon}
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 md:py-32 px-6 bg-zinc-950">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">Contact Us</h2>
          <p className="text-zinc-400 mb-10 md:mb-12">Have a question or want to stay updated? Send us a message!</p>
          {submitted ? (
            <p className="text-green-400 font-semibold text-lg">
              ✅ Message sent! We'll get back to you soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="text-base px-5 py-4 rounded-xl bg-zinc-800 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-base px-5 py-4 rounded-xl bg-zinc-800 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
              />
              <div className="rounded-xl bg-zinc-800 border border-white/10 px-5 py-4 flex flex-col gap-3">
                <p className="text-zinc-300 text-sm font-semibold">Requesting early access? Select your platform(s):</p>
                <div className="flex flex-wrap gap-4">
                  {["iOS", "Android", "Steam"].map((platform) => (
                    <label key={platform} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedPlatforms.includes(platform)}
                        onChange={() => togglePlatform(platform)}
                        className="w-4 h-4 accent-red-500 cursor-pointer"
                      />
                      <span className="text-zinc-300 text-sm group-hover:text-white transition-colors">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>
              <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="text-base px-5 py-4 rounded-xl bg-zinc-800 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-red-600 hover:bg-red-500 active:bg-red-700 disabled:bg-red-900 text-white font-bold px-8 py-4 rounded-full uppercase tracking-widest text-sm transition-colors touch-manipulation"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-zinc-600 text-sm px-6">
        © 2026 1320 OverDrive. All rights reserved.
      </footer>
    </div>
  );
}