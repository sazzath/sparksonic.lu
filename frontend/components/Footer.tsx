'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Projects', href: '/#projects' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  const services = [
    'Solar Panels',
    'EV Chargers',
    'Heat Pumps',
    'Energy Audits',
    'Electrician Services',
    'Air Conditioning',
    'Home Automation',
    'Security Systems',
    'Maintenance',
  ];

  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-bold text-xl">
                S
              </div>
              <div>
                <div className="text-xl font-bold">SparkSonic</div>
                <div className="text-xs text-gray-400">SARLS Luxembourg</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Luxembourg's premier electrical and energy services provider. Professional installations and maintenance.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.slice(0, 7).map((service) => (
                <li key={service}>
                  <span className="text-gray-400 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <a href="tel:+352661315657" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors group">
                <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone size={18} className="text-primary" />
                </div>
                <span className="text-sm">+352 661 315 657</span>
              </a>
              <a href="mailto:info@sparksonic.lu" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors group">
                <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail size={18} className="text-primary" />
                </div>
                <span className="text-sm break-all">info@sparksonic.lu</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg flex-shrink-0">
                  <MapPin size={18} className="text-primary" />
                </div>
                <span className="text-sm">Luxembourg City<br />Luxembourg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {currentYear} SparkSonic SARLS Luxembourg. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;