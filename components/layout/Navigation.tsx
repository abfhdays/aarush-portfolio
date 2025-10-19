'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface NavLink {
  href: string;
  label: string;
}

interface NavigationProps {
  logo: string;
  navLinks: NavLink[];
  contactLinks: Array<{ href: string; label: string }>;
}

export default function Navigation({ 
  logo,
  navLinks, 
  contactLinks 
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect active section
      const sections = navLinks.map(link => link.href.replace('#', ''));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  // Map contact links to icons
  const getContactIcon = (href: string) => {
    if (href.includes('mailto')) {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      );
    }
    if (href.includes('github')) {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      );
    }
    if (href.includes('linkedin')) {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    }
    return null;
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#e6f7ec]/95 backdrop-blur-md shadow-md' 
          : 'bg-[#e6f7ec]'
      } border-b border-[#b7e2c6]`}
    >
      <div className="flex items-center justify-between px-8 py-4">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-center items-center">
          <Image
            src={logo}
            alt="Logo"
            width={50}
            height={50}
            className="rounded-lg object-cover ring-2 ring-[#b7e2c6] shadow-sm"
            priority
          />
        </div>

        {/* Center: Navigation links */}
        <div className="flex-1 flex justify-center items-center">
          <div className="hidden md:flex items-center gap-6 font-display text-[17px]">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              
              return (
                <a 
                  key={link.href} 
                  href={link.href}
                  className={`nav-link transition-all text-black ${
                    isActive ? 'bg-[var(--nav-hover)]' : ''
                  }`}
                  style={{ color: 'black' }}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>

        {/* Right: Contact icons */}
        <div className="flex-1 flex justify-center items-center">
          <div className="flex items-center gap-4">
            {contactLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-black hover:text-[var(--accent-ink)] transition-colors p-2 hover:bg-white/50 rounded-lg"
                aria-label={link.label}
              >
                {getContactIcon(link.href)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}