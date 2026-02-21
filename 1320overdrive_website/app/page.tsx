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

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        "service_qaoxsvm",
        "template_ncdlbo8",
        { from_name: name, from_email: email, message },
        "IO_JZYXks_N8dNh79"
      );
      setSubmitted(true);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
              <source src="/videos/gameplay1.mp4" type="video/mp4" />
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
            <a href="#media" className="hover:text-white transition-colors">Media</a>
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
            <a href="#media" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Media</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Contact</a>
          </div>
        )}
      </nav>

      {/* Hero with video background */}
      {/*
        Key mobile fixes:
        - min-h-[100svh] uses "small viewport height" which accounts for iOS Safari's
          collapsible browser chrome, preventing the section from being taller than the screen.
        - The video uses object-cover + object-center so it always fills the frame on any
          aspect ratio (portrait on phones, landscape on desktop).
        - A slightly stronger overlay (bg-black/65) improves text legibility on bright video frames.
      */}
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
          {/* Play button */}
          <button
            onClick={() => setVideoModalOpen(true)}
            className="mt-2 group flex items-center gap-3 bg-white/10 hover:bg-red-600 active:bg-red-700 border border-white/20 hover:border-red-600 backdrop-blur-sm text-white font-bold px-6 py-3 rounded-full uppercase tracking-widest text-sm transition-all duration-200 touch-manipulation"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white group-hover:border-white">
              {/* Triangle play icon */}
              <svg className="w-3 h-3 fill-white ml-0.5" viewBox="0 0 10 10">
                <polygon points="1,0 9,5 1,10" />
              </svg>
            </span>
            Watch Gameplay
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
          {/* Single column on mobile, 3 columns on md+ */}
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

      {/* Media */}
      <section id="media" className="py-20 md:py-32 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black uppercase mb-12 md:mb-16">Media</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Video — full width */}
          <div className="md:col-span-2 rounded-2xl overflow-hidden border border-white/10">
            <video controls className="w-full object-cover" playsInline>
              <source src="/videos/gameplay2.mp4" type="video/mp4" />
            </video>
          </div>
          {/* Screenshots — 1 col on mobile, 2 col on md+ */}
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
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                /* text-base prevents iOS from auto-zooming on focus (requires font-size >= 16px) */
                className="text-base px-5 py-4 rounded-xl bg-zinc-800 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-base px-5 py-4 rounded-xl bg-zinc-800 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
              />
              <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
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