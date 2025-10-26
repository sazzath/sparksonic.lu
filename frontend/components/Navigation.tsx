'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n-unified';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState('en');
  const [mounted, setMounted] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentLang(i18n.language || 'en');
    
    // Handle scroll for navbar background
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: mounted ? t('nav.home') : 'Home', href: '/' },
    { name: mounted ? t('nav.services') : 'Services', href: '/#services' },
    { name: mounted ? t('nav.projects') : 'Projects', href: '/projects' },
    { name: mounted ? t('nav.about') : 'About', href: '/#about' },
    { name: mounted ? t('nav.contact') : 'Contact', href: '/#contact' },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'lb', name: 'Lëtzebuergesch', flag: '🇱🇺' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setCurrentLang(langCode);
    localStorage.setItem('i18nextLng', langCode);
    setShowLangDropdown(false);
    window.dispatchEvent(new Event('languageChanged'));
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      {/* Top Bar - Hidden on mobile */}
      <div className="hidden md:block bg-primary text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+352661315657" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                <Phone size={16} />
                <span>+352 661 315 657</span>
              </a>
              <a href="mailto:info@sparksonic.lu" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                <Mail size={16} />
                <span>info@sparksonic.lu</span>
              </a>
            </div>
            
            {/* Language Selector - Desktop */}
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-2 hover:text-white/80 transition-colors px-3 py-1 rounded"
              >
                <Globe size={16} />
                <span>{currentLanguage.flag} {currentLanguage.name}</span>
                <ChevronDown size={16} className={`transition-transform ${showLangDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showLangDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-white text-dark rounded-lg shadow-xl py-2 min-w-[200px] border border-gray-200">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-3 transition-colors ${
                        currentLang === lang.code ? 'bg-primary/10 text-primary font-semibold' : ''
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
              S
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-dark">SparkSonic</div>
              <div className="text-xs text-gray-600">Electrical Excellence</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary font-medium transition-colors relative group py-2"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            
            <Link
              href="/portal"
              className="text-primary hover:text-primary-dark font-medium transition-colors"
            >
              {mounted ? t('nav.portal') : 'Customer Portal'}
            </Link>
            
            <Link
              href="/#contact"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all hover:shadow-lg transform hover:scale-105"
            >
              {mounted ? t('nav.getQuote') : 'Get Quote'}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-xl">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {/* Mobile Contact Info */}
            <div className="pb-4 border-b border-gray-200 space-y-2">
              <a href="tel:+352661315657" className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors py-2">
                <Phone size={18} />
                <span>+352 661 315 657</span>
              </a>
              <a href="mailto:info@sparksonic.lu" className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors py-2">
                <Mail size={18} />
                <span>info@sparksonic.lu</span>
              </a>
            </div>
            
            {/* Mobile Navigation Links */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-lg font-medium text-gray-700 hover:text-primary transition-colors hover:bg-gray-50 px-4 rounded-lg"
              >
                {item.name}
              </Link>
            ))}
            
            <Link
              href="/portal"
              onClick={() => setIsOpen(false)}
              className="block py-3 text-lg font-medium text-primary hover:text-primary-dark transition-colors hover:bg-gray-50 px-4 rounded-lg"
            >
              {mounted ? t('nav.portal') : 'Customer Portal'}
            </Link>
            
            {/* Mobile Language Selector */}
            <div className="pt-4 border-t border-gray-200">
              <div className="text-sm font-semibold text-gray-600 mb-3 px-4">Language / Langue</div>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      handleLanguageChange(lang.code);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                      currentLang === lang.code 
                        ? 'bg-primary text-white font-semibold' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Mobile CTA */}
            <Link
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-primary text-white text-center px-6 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-all mt-4"
            >
              {mounted ? t('nav.getQuote') : 'Get Quote'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;