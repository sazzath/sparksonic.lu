'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Star, ArrowRight, CheckCircle, Phone, Mail, MapPin, Send } from 'lucide-react';
import { services } from '@/lib/services';
import { reviewsAPI, contactAPI } from '@/lib/api';
import HeroSlider from '@/components/HeroSlider';
import { useTranslation } from 'react-i18next';
import '../lib/i18n';

export default function Home() {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<any>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: '',
  });
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    // Fetch Google reviews
    reviewsAPI.getGoogleReviews().then(res => {
      setReviews(res.data);
    }).catch(err => console.error('Reviews error:', err));
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');
    
    try {
      await contactAPI.submit(contactForm);
      setSubmitStatus('success');
      setContactForm({ name: '', email: '', phone: '', message: '', service: '' });
      setTimeout(() => setSubmitStatus(''), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 5000);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-blue-600 text-white">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1754620906571-9ba64bd3ffb4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHNvbGFyJTIwcGFuZWxzfGVufDB8fHx8MTc2MDc4Njg1MXww&ixlib=rb-4.1.0&q=85"
            alt="Professional electrical services"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-white/90 font-medium">
                {reviews ? `${reviews.rating} (${reviews.total_reviews} reviews)` : '5.0 Google Rating'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Luxembourg's Trusted Electrical & Energy Experts
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Professional electrical services, solar panels, EV chargers, and energy solutions across Luxembourg
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                data-testid="get-quote-btn"
              >
                Get a Free Quote
              </a>
              <a
                href="#projects"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors text-center"
              >
                View Projects
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50" data-testid="services-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive electrical and energy solutions for residential and commercial properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                data-testid={`service-${service.id}`}
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-dark">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle size={16} className="text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={`/services/${service.id}`}
                  className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
                >
                  Learn More <ArrowRight size={18} className="ml-2" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20" data-testid="projects-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark mb-4">Recent Projects</h2>
            <p className="text-xl text-gray-600">Showcasing our quality work across Luxembourg</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Residential Solar Installation',
                location: 'Luxembourg City',
                image: 'https://images.unsplash.com/photo-1655300256486-4ec7251bf84e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHJvb2Z0b3B8ZW58MHx8fHwxNzYwNzg2ODYwfDA&ixlib=rb-4.1.0&q=85',
                description: '150m² solar panel system with 20kW capacity',
              },
              {
                title: 'EV Charging Station',
                location: 'Esch-sur-Alzette',
                image: 'https://images.unsplash.com/photo-1615829386703-e2bb66a7cb7d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHw0fHxlbGVjdHJpYyUyMHZlaGljbGUlMjBjaGFyZ2luZ3xlbnwwfHx8fDE3NjA3ODY4NTZ8MA&ixlib=rb-4.1.0&q=85',
                description: 'Commercial EV charging infrastructure',
              },
              {
                title: 'Smart Home Automation',
                location: 'Differdange',
                image: 'https://images.unsplash.com/photo-1679356505858-bf4129177392?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBhdXRvbWF0aW9ufGVufDB8fHx8MTc2MDc4Njg2NXww&ixlib=rb-4.1.0&q=85',
                description: 'Complete home automation system integration',
              },
            ].map((project, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-xl shadow-lg">
                <div className="relative h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-white/90 mb-1">{project.location}</p>
                  <p className="text-sm text-white/80">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gray-50" data-testid="reviews-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark mb-4">What Our Clients Say</h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              {reviews && (
                <span className="text-2xl font-bold text-dark">
                  {reviews.rating} ({reviews.total_reviews} reviews)
                </span>
              )}
            </div>
            <p className="text-gray-600">Trusted by homeowners and businesses across Luxembourg</p>
          </div>

          {reviews && reviews.reviews && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.reviews.slice(0, 3).map((review: any, idx: number) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Image
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-semibold">{review.author_name}</div>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.text}</p>
                  <p className="text-sm text-gray-500 mt-3">{review.relative_time_description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20" data-testid="about-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-dark mb-6">About Sparksonic</h2>
              <p className="text-lg text-gray-700 mb-4">
                SparkSonic SARLS is Luxembourg's premier electrical and energy services provider, dedicated to delivering excellence in every project.
              </p>
              <p className="text-gray-700 mb-6">
                With years of experience and a commitment to sustainability, we specialize in solar panel installations, EV charging solutions, smart home automation, and comprehensive electrical services for both residential and commercial clients.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">5.0</div>
                  <div className="text-gray-600">Google Rating</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-gray-600">Emergency Support</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">Licensed</div>
                  <div className="text-gray-600">& Insured</div>
                </div>
              </div>
            </div>
            <div className="relative h-96 lg:h-full">
              <Image
                src="https://images.pexels.com/photos/8961701/pexels-photo-8961701.jpeg"
                alt="Professional electrical team"
                fill
                className="object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50" data-testid="contact-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">
              Need a licensed electrician in Luxembourg? Contact us today!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    data-testid="contact-name-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    data-testid="contact-email-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    data-testid="contact-phone-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Needed
                  </label>
                  <select
                    value={contactForm.service}
                    onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    data-testid="contact-service-select"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    data-testid="contact-message-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === 'sending'}
                  className="w-full bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  data-testid="contact-submit-btn"
                >
                  {submitStatus === 'sending' ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <Send size={20} />
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg" data-testid="contact-success-message">
                    Thank you! We'll contact you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    Sorry, something went wrong. Please try again or call us directly.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-dark mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <a href="tel:+352661315657" className="flex items-start gap-4 hover:text-primary transition-colors">
                    <Phone className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-gray-600">+352 661 315 657</div>
                    </div>
                  </a>

                  <a href="mailto:info@sparksonic.lu" className="flex items-start gap-4 hover:text-primary transition-colors">
                    <Mail className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-gray-600">info@sparksonic.lu</div>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <MapPin className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Location</div>
                      <div className="text-gray-600">Luxembourg City, Luxembourg</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold mb-2">Business Hours</h4>
                  <div className="text-gray-600 space-y-1">
                    <div>Mon - Fri: 8:00 AM - 6:00 PM</div>
                    <div>Sat: 9:00 AM - 4:00 PM</div>
                    <div>Sun: Closed (Emergency only)</div>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2583.2647707467545!2d6.129489315674802!3d49.61167507936024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDM2JzQyLjAiTiA2wrAwNyc1Mi4wIkU!5e0!3m2!1sen!2slu!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sparksonic Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
