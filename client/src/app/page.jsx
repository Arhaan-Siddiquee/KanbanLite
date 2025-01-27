"use client";

import Link from "next/link";
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Menu, X } from 'lucide-react'; 
// Navbar component

const CodeBlock = () => (
  <div className="bg-[#1E1E1E] rounded-lg p-4 text-white font-mono text-sm">
    <div className="text-gray-400">// addNumbersToToken</div>
    <div>function addNumbersToToken(num1, num2) {'{'}</div>
    <div className="pl-4">let sum = num1 + num2;</div>
    <div className="pl-4">let token = {'{'}</div>
    <div className="pl-8">value: sum,</div>
    <div className="pl-8">value: sum,</div>
    <div className="pl-4">return token;</div>
    <div>{'};'}</div>
  </div>
);
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
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-br  from-indigo-950 to-purple-900 shadow-lg rounded-2xl border-2 border-blue-600 px-4 py-4 z-50 w-[1100px] h-[60px]">
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
    <section className="bg-gradient-to-br  from-indigo-950 to-purple-900 min-h-screen relative overflow-hidden">
      {/* Pink glow effect */}
      <div className="absolute top-0 right-0 w-96 h-96  bg-pink-500 rounded-full filter blur-[128px] opacity-20" />
      
      <div className="container mx-auto px-4 mt-[100px] pb-32">
        {/* Announcement banner */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white bg-opacity-10 mt-[100px] backdrop-blur-sm px-6 py-2 rounded-full">
            <p className="text-white text-sm">
              Lite Version of The Power Planer.
              <Link href="/learn-more" className="ml-2 underline">
                Learn more
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Hero content */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-semibold text-white mb-4 tracking-tight"
          >
            Modern analytics
            <br />
            <span className="text-gray-400">for the modern world</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Suspendisse varius enim in eros elementum tristique.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-4"
          >
            <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition">
              Download the app
            </button>
            <button className="bg-white bg-opacity-10 text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-20 transition">
              Try It Today
            </button>
          </motion.div>
        </div>

        {/* Video Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
            {/* Card Header */}
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between">
                
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"/>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                  <div className="w-3 h-3 rounded-full bg-green-500"/>
                </div>
              </div>
            </div>

            {/* Video Container */}
            <div className="relative aspect-video w-full">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/dummy.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Optional Overlay for better video contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none"/>
            </div>
          </div>

          {/* Optional Device Frame Effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 border border-white/10 rounded-xl"/>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"/>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Features section
const FeatureSection = () => {
  return (
    <section className="bg-gradient-to-bl  from-purple-900 to-indigo-950 min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Features that work for your future.
          </h2>
          <p className="text-gray-400">
            Check out our amazing features and experience the power for yourself.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#1A0B3D] p-8 rounded-2xl border border-purple-900"
          >
            <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Time Saving</h3>
            <p className="text-gray-400 mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur sunt quia id autem nisi ipsum placeat voluptatum illum maiores, molestias saepe. Quis ab rerum placeat, corporis ratione perspiciatis debitis. Laborum!
            </p>
            <button className="text-purple-400 hover:text-purple-300 transition-colors">
              View dashboard
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#1A0B3D] p-8 rounded-2xl border border-purple-900"
          >
            <div className="bg-pink-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">No Paywall and Freemium</h3>
            <p className="text-gray-400 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem error dicta ratione veniam accusamus ullam numquam modi? Iste ex quos cum perferendis dolor aut, nisi cupiditate accusamus in natus veniam.
            </p>
            <button className="text-purple-400 hover:text-purple-300 transition-colors">
              View tokens
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#1A0B3D] p-8 rounded-2xl border border-purple-900"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="bg-pink-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">All Usefull Services</h3>
              <p className="text-gray-400 mb-6">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, earum inventore voluptatum minus quod autem accusantium repudiandae quisquam qui similique ea nihil vero, nulla aut odio excepturi veniam error amet?
              </p>
              <button className="text-purple-400 hover:text-purple-300 transition-colors">
                View code collaboration
              </button>
            </div>
            <div className="flex items-center">
              <CodeBlock />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Our powerful analytics provides invaluable insights.
          </h2>
          <p className="text-gray-400 mb-8 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus modi, tempore consectetur doloribus necessitatibus labore sequi odio consequatur iure esse eius dolore, dolor quod, libero id ex aliquam? Ipsa, dolor.
          </p>
          <button className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors">
            Download the app
          </button>
        </motion.div>
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
