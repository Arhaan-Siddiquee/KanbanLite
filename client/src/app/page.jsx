"use client";

import Link from "next/link";
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Menu, X } from 'lucide-react'; 
// Navbar component

const CodeBlock = () => (
  <div className="bg-purple-900 rounded-lg p-4 text-white font-mono text-sm">
    <div className="text-gray-400">// Lite Kanban Features</div>
    <div>const KanbanLite = {'{'}</div>
    <div className="pl-4">dragAndDrop: true,</div>
    <div className="pl-4">minimalUI: true,</div>
    <div className="pl-4">realTimeSync: false,</div>
    <div className="pl-4">columns: ['To-Do', 'In Progress', 'Done'],</div>
    <div className="pl-4">customTags: true,</div>
    <div className="pl-4">userLimits: 'Unlimited',</div>
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
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-br  from-indigo-950 to-purple-900 shadow-lg rounded-2xl border-2 border-x-white px-4 py-2 z-50 w-[1100px] h-[60px]">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <h1 className="text-xl font-bold tracking-wide">
              <Link href="/logo" className="text-white hover:text-blue-100 transition-colors">
                <img src="/logo.svg" alt="Vaultflow Logo" className="w-36" />
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
            Try the Simplified Version of the Complex Kanban 
            in the Market Available there.
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
            Our lite Kanban version is designed for efficiency, offering a streamlined workflow without unnecessary complexity. With a minimalistic and intuitive interface, you can organize tasks quickly, focus on what matters, and boost productivity—all while saving time. No clutter, no distractions—just a fast and effective way to manage your work.
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
            We believe in providing unrestricted access to valuable content and services. With No Paywall, you can explore all features without any hidden fees or mandatory subscriptions. Our Freemium model ensures that essential tools and resources remain free, while optional premium upgrades offer enhanced functionality for those who need them. This approach allows everyone to benefit, whether they are casual users or professionals seeking advanced features.
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
              We provide a comprehensive suite of essential tools and features to enhance your workflow. From task management to productivity boosters, our platform ensures you have everything you need in one place. No unnecessary extras—just practical, efficient, and user-friendly services designed to make your life easier.
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
    <section className="bg-gradient-to-br  from-indigo-950 to-purple-900 py-24 relative overflow-hidden">
      {/* Background gradient circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-600/20 rounded-full filter blur-3xl" />
      <div className="absolute bottom-40 left-40 w-40 h-40 bg-blue-600/20 rounded-full filter blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-white text-center mb-12"
        >
          Any question or remarks? Just write us a message!
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-900/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-800"
        >
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center text-gray-300">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>kanban@serices.com</span>
                </div>
                <div className="flex items-start text-gray-300">
                  <svg className="w-6 h-6 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Skibidi House, Ohio Nagar,<br />Taiwan.</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/>
                  </svg>
                </a>
                <a href="#" className="text-pink-500 hover:text-pink-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Phone Number</label>
                  <div className="relative">
                    <span className="absolute left-4 top-2 text-gray-500">+91</span>
                    <input
                      type="tel"
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 pl-12 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Select Subject?</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['General Inquiry', 'UI', 'Packaging Design'].map((option) => (
                    <label key={option} className="flex items-center space-x-2 text-gray-300">
                      <input type="radio" name="subject" className="text-purple-500" />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <textarea
                  placeholder="Write your message.."
                  rows="4"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <span>Send Message</span>
                  <img src="/api/placeholder/20/20" alt="paper plane" className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer component
const Footer = () => {
  return (
    <footer className="bg-gradient-to-bl from-purple-900 to-indigo-950 text-gray-300 py-16">
      <div className="container ml-[100px] mr-[50px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Section */}
          <div>
            <h2 className="text-white text-xl font-medium mb-4">Contact</h2>
            <div className="space-y-2">
              <p>Work inquires: <a href="mailto:work@KanBanLite.com" className="hover:text-white">work@KanBanLite.com</a></p>
              <p>PR and speaking: <a href="mailto:press@KanBanLite.com" className="hover:text-white">press@KanBanLite.com</a></p>
              <p>New business: <a href="mailto:newbusiness@KanBanLite.com" className="hover:text-white">newbusiness@KanBanLite.com</a></p>
            </div>
          </div>

          {/* Careers Section */}
          <div>
            <h2 className="text-white text-xl font-medium mb-4">Careers</h2>
            <div>
              <a href="mailto:careers@vaultflow.com" className="hover:text-white">Careers@KanBanLite.com</a>
            </div>
          </div>

          {/* Address and Social Section */}
          <div>
            <h2 className="text-white text-xl font-medium mb-4">Address</h2>
            <p className="mb-8">
            Skibidi House, Ohio Nagar,<br />
            Taiwan.
            </p>

            <h2 className="text-white text-xl font-medium mb-4">Social</h2>
            <div className="space-y-2">
              <p><a href="#" className="hover:text-white">Twitter</a></p>
              <p><a href="#" className="hover:text-white">Instagram</a></p>
              <p><a href="#" className="hover:text-white">Tik Tok</a></p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex justify-between items-center mt-16">
          <p className="text-sm text-gray-500">© 2023 KanBanLite. All Rights Reserved.</p>
          <div className="w-32 mr-[330px]">
            <img 
              src="/logo.svg" 
              alt="Vaultflow Logo" 
              className="w-full"
            />
          </div>
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
