'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from '@/lib/i18nConfig';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentLang(i18n.language || 'en');
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
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setCurrentLang(langCode);
    localStorage.setItem('i18nextLng', langCode);
    window.location.reload(); // Force reload to apply translations
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+352661315657" className="flex items-center gap-2 hover:underline">
              <Phone size={16} />
              +352 661 315 657
            </a>
            <a href="mailto:info@sparksonic.lu" className="flex items-center gap-2 hover:underline">
              <Mail size={16} />
              info@sparksonic.lu
            </a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center gap-2 hover:underline">
                <Globe size={16} />
                {languages.find(l => l.code === currentLang)?.flag} {languages.find(l => l.code === currentLang)?.name}
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 ${
                      currentLang === lang.code ? 'bg-gray-50 font-semibold' : ''
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <span className="text-white/50">|</span>
            <Link href="/portal" className="hover:underline">
              Customer Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <div>
              <div className="text-xl font-bold text-dark">SparkSonic</div>
              <div className="text-xs text-gray-500">Electrical Excellence</div>
            </div>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              {mounted ? t('nav.getQuote') : 'Get Quote'}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-700 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/portal"
              className="block py-2 text-primary font-medium"
              onClick={() => setIsOpen(false)}
            >
              Customer Portal
            </Link>
            <Link
              href="/#contact"
              className="block mt-2 bg-primary text-white px-6 py-2 rounded-lg text-center"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.getQuote')}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;