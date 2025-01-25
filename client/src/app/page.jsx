"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// Navbar component
const Navbar = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold tracking-wide">
          <Link href="/">Kanban Lite</Link>
        </h1>
        <ul className="flex space-x-6">
          <li>
              Features
          </li>
          <li>
              Contact
          </li>
          <li>
              Pricing
          </li>
          <li>
              Dashboard
          </li>
          <li>
            <Link href="/kanban">
              <span className="bg-yellow-400 text-gray-800 py-2 px-4 rounded-lg font-bold hover:bg-yellow-300 transition">
                Go to Kanban
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

// Hero section
const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white py-24">
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
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; 2025 Kanban Lite. All rights reserved.</p>
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
