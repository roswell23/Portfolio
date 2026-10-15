import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-layout">
      {/* 1. Sticky Navbar */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {/* Main Page Content */}
      <main id="main-content">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. About Section */}
        <About />

        {/* 4. Skills Section */}
        <Skills />

        {/* 5. Projects Section (with Kapeniulit case study) */}
        <Projects />

        {/* 6. Contact Section */}
        <Contact />
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
