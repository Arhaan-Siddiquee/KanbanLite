"use client";

import Link from "next/link";
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Menu, X } from 'lucide-react'; 
// Navbar component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Features', href: '/#features' },
    { label: 'Contact', href: '/#contact' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Dashboard', href: '/dashboard' }
  ];

  return (
    <header className="fixed w-full z-50 top-4">
      <div className="container mx-auto px-4">
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-black to-black shadow-lg rounded-2xl border-2 border-blue-600 px-4 py-4 z-50 w-[1100px] h-[60px]">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <h1 className="text-xl font-bold tracking-wide">
              <Link href="/logo" className="text-white hover:text-blue-100 transition-colors">
                Kanban Lite
              </Link>
            </h1>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex space-x-6 items-center">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href} 
                    className="text-white hover:text-blue-100 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/kanban" 
                  className="bg-white text-blue-600 py-2 px-4 rounded-full font-bold hover:bg-blue-50 transition-colors"
                >
                  Go to Kanban
                </Link>
              </li>
            </ul>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-blue-100"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-20">
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl max-w-md mx-auto p-6 shadow-2xl">
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link 
                      href={item.href} 
                      className="block text-white hover:text-blue-100 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link 
                    href="/kanban" 
                    className="block bg-white text-blue-600 py-2 px-4 rounded-full font-bold hover:bg-blue-50 transition-colors text-center"
                  >
                    Go to Kanban
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero section
const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-black to-black text-white py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold mb-4"
        >
          Simplify Your Workflow with <span className="text-yellow-400">Kanban Lite</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg mb-8"
        >
          A clean, lightweight Kanban board that focuses on what matters the
          most—your productivity.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Link
            href="#features"
            scroll={false}
            className="bg-yellow-400 text-gray-800 py-3 px-6 rounded-lg font-bold shadow-md hover:bg-yellow-300 transition"
          >
            Explore Features
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// Features section
const FeatureSection = () => {
  return (
    <section id="features" className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold mb-2">Streamlined Tasks</h3>
            <p>
              Focus on your tasks with a minimal design that eliminates
              distractions.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold mb-2">Simple UI</h3>
            <p>
              Easy-to-use interface for quick updates and seamless task
              management.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold mb-2">Collaboration</h3>
            <p>
              Work with your team in real time for better coordination and
              efficiency.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Contact section
const ContactSection = () => {
  return (
    <section id="contact" className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
        <form className="max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none"
          ></textarea>
          <button
            type="submit"
            className="bg-purple-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-purple-500 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

// Footer component
const Footer = () => {
  return (
    <footer className="relative bg-black text-blue-400 py-12 overflow-hidden">
      {/* GIF Background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20 z-0" 
           style={{backgroundImage: 'url("/api/placeholder/1920/1080")'}}></div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo and Branding */}
          <div className="text-center md:text-left col-span-1">
            <h2 className="text-2xl font-bold text-blue-300">Your Brand</h2>
            <p className="text-blue-500 mt-2 hidden md:block">Innovative solutions for modern challenges</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-blue-200 mb-4">Quick Links</h3>
            <nav className="space-y-2 text-center md:text-left">
              {['Home', 'About', 'Services', 'Contact'].map((link) => (
                <a 
                  key={link} 
                  href="#" 
                  className="block hover:text-blue-200 transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-blue-200 mb-4">Contact Us</h3>
            <div className="space-y-2 text-center md:text-left">
              {[
                { icon: Mail, text: 'info@example.com' },
                { icon: Phone, text: '+1 (555) 123-4567' },
                { icon: MapPin, text: '123 Tech Lane, Innovation City' }
              ].map(({icon: Icon, text}) => (
                <div key={text} className="flex items-center space-x-2">
                  <Icon size={20} className="text-blue-400" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center md:items-end lg:items-center">
            <div className="flex space-x-4 mb-4">
              {[Github, Linkedin, Twitter].map((Icon) => (
                <a 
                  key={Icon.name} 
                  href="#" 
                  className="text-blue-400 hover:text-blue-200 transition-colors"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
            <p className="text-blue-600 text-sm text-center">Stay Connected</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-blue-800 mt-8 pt-4 text-center">
          <p className="text-blue-500">© 2024 KanBan. All rights reserved.</p>
          <p className="text-blue-600 text-sm mt-2">Designed with passion</p>
        </div>
      </div>
    </footer>
  );
};

// Home page
export default function Home() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
