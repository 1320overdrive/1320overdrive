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
            className="absolute top-6 right-8 text-white text-4xl font-light hover:text-red-500 transition-colors"
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

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between">
        <Link href="/">
          <Image src="/images/logo.png" alt="1320 OverDrive Logo" width={120} height={40} />
        </Link>
        <div className="flex gap-8 text-sm text-zinc-400">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#media" className="hover:text-white transition-colors">Media</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero with video background */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-8 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/gameplay1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 flex flex-col items-center">
          <p className="text-red-500 text-sm font-semibold tracking-widest uppercase mb-6">
            Coming Soon
          </p>
          <p className="text-zinc-300 text-xl max-w-xl mb-10">
            The ultimate mobile drag racing experience. Full throttle. No limits.
          </p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32 px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-black uppercase mb-6">About the Game</h2>
        <p className="text-zinc-400 text-lg leading-relaxed">
          1320 OverDrive is a high-octane mobile drag racing game built for speed enthusiasts.
          Customize your ride, upgrade your engine, and race your way to the top.
          1320 feet. Every second counts. Take the competition online and go head-to-head against real racers from around the world.
          Climb the leaderboards, dominate live 1v1 matches, and cement your place at the top.
        </p>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-8 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black uppercase mb-16">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Custom Builds", desc: "Tune and upgrade your car to perfection." },
              { title: "Real Racing", desc: "Authentic drag racing physics and mechanics." },
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
      <section id="media" className="py-32 px-8 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-black uppercase mb-16">Media</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Videos */}
          <div className="md:col-span-2 rounded-2xl overflow-hidden border border-white/10">
            <video controls className="w-full object-cover">
              <source src="/videos/gameplay2.mp4" type="video/mp4" />
            </video>
          </div>
          {/* Screenshots */}
          {screenshots.map((s) => (
            <div
              key={s.src}
              className="rounded-2xl overflow-hidden border border-white/10 cursor-pointer hover:border-red-500 transition-colors group relative"
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
                <span className="text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                  Click to Enlarge
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-8 bg-zinc-950">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl font-black uppercase mb-4">Contact Us</h2>
          <p className="text-zinc-400 mb-12">Have a question or want to stay updated? Send us a message!</p>
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
                className="px-5 py-3 rounded-xl bg-zinc-800 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-5 py-3 rounded-xl bg-zinc-800 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
              />
              <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="px-5 py-3 rounded-xl bg-zinc-800 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-red-600 hover:bg-red-500 disabled:bg-red-900 text-white font-bold px-8 py-4 rounded-full uppercase tracking-widest text-sm transition-colors"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-zinc-600 text-sm">
        © 2025 1320 OverDrive. All rights reserved.
      </footer>
    </div>
  );
}