'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { CheckCircle, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { quotesAPI } from '@/lib/api';

// Service data with detailed information
const serviceDetails: any = {
  'solar-panels': {
    name: 'Solar Panels Installation',
    slug: 'solar-panels',
    icon: '☀️',
    image: 'https://images.unsplash.com/photo-1655300256486-4ec7251bf84e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHJvb2Z0b3B8ZW58MHx8fHwxNzYwNzg2ODYwfDA&ixlib=rb-4.1.0&q=85',
    description: 'Professional solar panel installation services for residential and commercial properties across Luxembourg. Maximize your energy savings with our high-quality solar solutions.',
    longDescription: 'Our solar panel installation service provides comprehensive solutions for converting sunlight into clean, renewable energy. We work with top-tier manufacturers and ensure optimal panel placement for maximum energy generation. Our team handles everything from initial assessment to final installation and grid connection.',
    benefits: [
      'Significant reduction in electricity bills',
      'Creos subsidy support and assistance',
      'Increase property value',
      'Environmental sustainability',
      '25-year warranty on panels',
      'Professional installation by certified technicians',
      'Free energy audit and consultation',
      'Monitoring system included'
    ],
    process: [
      { step: 1, title: 'Initial Consultation', description: 'Free site assessment and energy needs analysis' },
      { step: 2, title: 'System Design', description: 'Custom solar system design optimized for your property' },
      { step: 3, title: 'Subsidy Application', description: 'We handle all Creos subsidy paperwork' },
      { step: 4, title: 'Installation', description: 'Professional installation by certified team' },
      { step: 5, title: 'Grid Connection', description: 'Connection to the electrical grid and system activation' },
      { step: 6, title: 'Monitoring Setup', description: 'Real-time monitoring system configuration' }
    ],
    faqs: [
      { q: 'How much can I save with solar panels?', a: 'Most homeowners save 50-70% on their electricity bills. The exact savings depend on your energy consumption and system size.' },
      { q: 'What subsidies are available in Luxembourg?', a: 'The Creos subsidy can cover up to 30% of installation costs. We help you apply and maximize your benefits.' },
      { q: 'How long does installation take?', a: 'Typical installation takes 2-3 days for residential properties, depending on system size.' },
      { q: 'What maintenance is required?', a: 'Minimal maintenance required. We recommend annual inspections which we provide as part of our service package.' }
    ],
    pricing: 'Starting from €8,000 for a 5kW system (after subsidies)',
  },
  'ev-chargers': {
    name: 'EV Charger Installation',
    slug: 'ev-chargers',
    icon: '🔌',
    image: 'https://images.unsplash.com/photo-1615829386703-e2bb66a7cb7d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHw0fHxlbGVjdHJpYyUyMHZlaGljbGUlMjBjaGFyZ2luZ3xlbnwwfHx8fDE3NjA3ODY4NTZ8MA&ixlib=rb-4.1.0&q=85',
    description: 'Expert electric vehicle charging station installation with full Creos subsidy compliance for homes and businesses.',
    longDescription: 'Install a professional EV charging station at your property and enjoy the convenience of charging your electric vehicle at home. We provide complete installation services including electrical upgrades, smart charging solutions, and subsidy application assistance.',
    benefits: [
      'Fast home charging (up to 22kW)',
      'Creos subsidy eligible (up to €600)',
      'Smart charging capabilities',
      'Energy cost optimization',
      'Weather-resistant outdoor units',
      'Mobile app control',
      'Load balancing with home electricity',
      'Future-proof installation'
    ],
    process: [
      { step: 1, title: 'Site Survey', description: 'Electrical capacity assessment and optimal location' },
      { step: 2, title: 'Charger Selection', description: 'Choose the right charger for your vehicle and needs' },
      { step: 3, title: 'Electrical Upgrade', description: 'If needed, upgrade electrical panel and wiring' },
      { step: 4, title: 'Installation', description: 'Professional charger installation and testing' },
      { step: 5, title: 'Smart Setup', description: 'Configure mobile app and smart features' },
      { step: 6, title: 'Subsidy Support', description: 'Complete subsidy application documentation' }
    ],
    faqs: [
      { q: 'Which EV chargers do you install?', a: 'We install all major brands including Wallbox, ABB, Schneider Electric, and others based on your preferences.' },
      { q: 'Can I get a subsidy for EV charger installation?', a: 'Yes, Luxembourg offers subsidies up to €600 for residential EV charger installations through Creos.' },
      { q: 'How long does installation take?', a: 'Most installations are completed in 1 day, unless electrical upgrades are needed.' },
      { q: 'Can I charge other electric vehicles?', a: 'Yes, all chargers we install use standard connectors compatible with all EVs in Europe.' }
    ],
    pricing: 'Starting from €1,200 (before subsidies)',
  },
  'heat-pumps': {
    name: 'Heat Pump Systems',
    slug: 'heat-pumps',
    icon: '🌡️',
    image: 'https://images.unsplash.com/photo-1679356505858-bf4129177392?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBhdXRvbWF0aW9ufGVufDB8fHx8MTc2MDc4Njg2NXww&ixlib=rb-4.1.0&q=85',
    description: 'Energy-efficient heat pump installation and maintenance for sustainable heating and cooling solutions.',
    longDescription: 'Heat pumps are one of the most efficient heating and cooling solutions available. They transfer heat rather than generate it, resulting in significant energy savings. Our expert team designs and installs heat pump systems tailored to your property.',
    benefits: [
      'Up to 400% energy efficiency',
      'Heating and cooling in one system',
      'Government subsidies available',
      'Low operating costs',
      'Environmentally friendly',
      'Quiet operation',
      'Long lifespan (15-20 years)',
      'Smart thermostat compatible'
    ],
    process: [
      { step: 1, title: 'Heat Loss Calculation', description: 'Detailed assessment of your heating requirements' },
      { step: 2, title: 'System Selection', description: 'Choose between air-source, ground-source, or hybrid' },
      { step: 3, title: 'Design & Planning', description: 'Complete system design and installation plan' },
      { step: 4, title: 'Installation', description: 'Professional installation by qualified technicians' },
      { step: 5, title: 'System Setup', description: 'Configuration and optimization for your home' },
      { step: 6, title: 'Training', description: 'User training and maintenance schedule' }
    ],
    faqs: [
      { q: 'How efficient are heat pumps?', a: 'Heat pumps can achieve 300-400% efficiency, meaning they produce 3-4 units of heat for every unit of electricity consumed.' },
      { q: 'Do heat pumps work in Luxembourg winters?', a: 'Yes, modern heat pumps work efficiently even at -20°C and are perfect for Luxembourg climate.' },
      { q: 'What subsidies are available?', a: 'Luxembourg offers substantial subsidies for heat pump installations, up to €10,000 depending on system type.' },
      { q: 'How much maintenance is required?', a: 'Minimal maintenance - annual service check recommended, which we provide.' }
    ],
    pricing: 'Starting from €12,000 (before subsidies)',
  },
  'energy-audits': {
    name: 'Energy Audits',
    slug: 'energy-audits',
    icon: '📊',
    image: 'https://images.unsplash.com/photo-1754620906571-9ba64bd3ffb4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHNvbGFyJTIwcGFuZWxzfGVufDB8fHx8MTc2MDc4Njg1MXww&ixlib=rb-4.1.0&q=85',
    description: 'Comprehensive energy assessments to identify savings opportunities and optimize your property efficiency.',
    longDescription: 'Our detailed energy audits analyze your property to identify inefficiencies and recommend cost-effective improvements. We use advanced diagnostic equipment and provide a comprehensive report with actionable recommendations.',
    benefits: [
      'Identify energy waste',
      'Reduce utility bills',
      'Prioritized improvement plan',
      'Subsidy eligibility assessment',
      'ROI calculations',
      'Thermal imaging',
      'Detailed written report',
      'Implementation support'
    ],
    process: [
      { step: 1, title: 'Initial Meeting', description: 'Discuss your energy concerns and goals' },
      { step: 2, title: 'On-Site Inspection', description: 'Thorough inspection of all energy systems' },
      { step: 3, title: 'Data Analysis', description: 'Review utility bills and usage patterns' },
      { step: 4, title: 'Testing', description: 'Thermal imaging and air leakage tests' },
      { step: 5, title: 'Report Generation', description: 'Comprehensive report with recommendations' },
      { step: 6, title: 'Consultation', description: 'Review findings and implementation plan' }
    ],
    faqs: [
      { q: 'How long does an energy audit take?', a: 'A typical residential audit takes 2-3 hours on-site, with a detailed report delivered within 5 business days.' },
      { q: 'What will the audit reveal?', a: 'Energy waste sources, insulation issues, HVAC efficiency, lighting improvements, and renewable energy opportunities.' },
      { q: 'Is an energy audit required for subsidies?', a: 'For some renovation subsidies in Luxembourg, an energy audit is required and can increase your subsidy amount.' },
      { q: 'What equipment do you use?', a: 'We use thermal cameras, blower doors, power meters, and other professional diagnostic equipment.' }
    ],
    pricing: '€350 for residential audit',
  },
  'electrician': {
    name: 'Electrician Services',
    slug: 'electrician',
    icon: '⚡',
    image: 'https://images.pexels.com/photos/8961701/pexels-photo-8961701.jpeg',
    description: 'Licensed electrical services for installations, repairs, maintenance, and emergency support.',
    longDescription: 'Our licensed electricians provide comprehensive electrical services for residential and commercial properties. From simple repairs to complete rewiring, we ensure safe and code-compliant work.',
    benefits: [
      'Licensed and insured',
      '24/7 emergency service',
      'Code-compliant work',
      'Free estimates',
      'Quality guarantee',
      'Prompt response',
      'Experienced team',
      'Transparent pricing'
    ],
    process: [
      { step: 1, title: 'Service Call', description: 'Contact us for service request' },
      { step: 2, title: 'Assessment', description: 'On-site evaluation and diagnosis' },
      { step: 3, title: 'Quote', description: 'Transparent pricing and timeline' },
      { step: 4, title: 'Approval', description: 'Your approval to proceed' },
      { step: 5, title: 'Work', description: 'Professional electrical work' },
      { step: 6, title: 'Inspection', description: 'Quality check and testing' }
    ],
    faqs: [
      { q: 'Do you offer emergency services?', a: 'Yes, we provide 24/7 emergency electrical services throughout Luxembourg.' },
      { q: 'Are your electricians licensed?', a: 'Yes, all our electricians are fully licensed and insured in Luxembourg.' },
      { q: 'Do you provide free quotes?', a: 'Yes, we provide free estimates for all electrical work.' },
      { q: 'What areas do you serve?', a: 'We serve all of Luxembourg and surrounding areas.' }
    ],
    pricing: 'From €95/hour + materials',
  },
  'air-conditioning': {
    name: 'Air Conditioning',
    slug: 'air-conditioning',
    icon: '❄️',
    image: 'https://images.unsplash.com/photo-1679356505858-bf4129177392?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBhdXRvbWF0aW9ufGVufDB8fHx8MTc2MDc4Njg2NXww&ixlib=rb-4.1.0&q=85',
    description: 'Professional air conditioning installation, maintenance, and repair services for optimal comfort.',
    longDescription: 'Stay comfortable year-round with our professional air conditioning services. We install, maintain, and repair all types of AC systems including split units, multi-split, and centralized systems.',
    benefits: [
      'Energy-efficient systems',
      'Quiet operation',
      'Smart climate control',
      'Air purification',
      'Professional installation',
      'Regular maintenance',
      'Quick repairs',
      'Warranty coverage'
    ],
    process: [
      { step: 1, title: 'Consultation', description: 'Assess cooling needs and space' },
      { step: 2, title: 'System Selection', description: 'Choose the right AC system' },
      { step: 3, title: 'Quote', description: 'Detailed pricing and timeline' },
      { step: 4, title: 'Installation', description: 'Professional installation' },
      { step: 5, title: 'Testing', description: 'System testing and optimization' },
      { step: 6, title: 'Training', description: 'User training and maintenance tips' }
    ],
    faqs: [
      { q: 'What size AC do I need?', a: 'We calculate the required capacity based on room size, insulation, and usage patterns during our consultation.' },
      { q: 'How often should AC be serviced?', a: 'Annual maintenance is recommended for optimal performance and longevity.' },
      { q: 'Do you repair all brands?', a: 'Yes, we service and repair all major AC brands.' },
      { q: 'How long does installation take?', a: 'Single split unit installation typically takes 4-6 hours.' }
    ],
    pricing: 'Starting from €2,500 per unit',
  },
  'home-automation': {
    name: 'Home Automation',
    slug: 'home-automation',
    icon: '🏠',
    image: 'https://images.unsplash.com/photo-1679356505858-bf4129177392?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBhdXRvbWF0aW9ufGVufDB8fHx8MTc2MDc4Njg2NXww&ixlib=rb-4.1.0&q=85',
    description: 'Smart home solutions for modern, connected living with voice control and automation.',
    longDescription: 'Transform your home into a smart home with our comprehensive automation solutions. Control lighting, heating, security, and more from your smartphone or voice commands.',
    benefits: [
      'Voice control integration',
      'Energy savings',
      'Enhanced security',
      'Remote access',
      'Scene automation',
      'Integration with existing systems',
      'User-friendly interface',
      'Expandable system'
    ],
    process: [
      { step: 1, title: 'Consultation', description: 'Discuss your automation needs and goals' },
      { step: 2, title: 'System Design', description: 'Create custom automation plan' },
      { step: 3, title: 'Equipment Selection', description: 'Choose devices and platforms' },
      { step: 4, title: 'Installation', description: 'Professional installation and wiring' },
      { step: 5, title: 'Configuration', description: 'Set up automation rules and scenes' },
      { step: 6, title: 'Training', description: 'Comprehensive user training' }
    ],
    faqs: [
      { q: 'What can be automated?', a: 'Lighting, heating, blinds, security systems, entertainment, and more.' },
      { q: 'Is it compatible with Alexa/Google?', a: 'Yes, we ensure compatibility with major voice assistants.' },
      { q: 'Can I expand the system later?', a: 'Yes, our systems are designed to be easily expandable.' },
      { q: 'What if I move house?', a: 'Most smart devices can be taken with you or transferred to new owners.' }
    ],
    pricing: 'Starting from €3,000',
  },
  'security-systems': {
    name: 'Security & Alarm Systems',
    slug: 'security-systems',
    icon: '🔒',
    image: 'https://images.unsplash.com/photo-1679356505858-bf4129177392?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBhdXRvbWF0aW9ufGVufDB8fHx8MTc2MDc4Njg2NXww&ixlib=rb-4.1.0&q=85',
    description: 'Advanced security and alarm systems for comprehensive property protection.',
    longDescription: 'Protect your property with our professional security systems. We install and maintain alarm systems, CCTV cameras, access control, and integrated security solutions.',
    benefits: [
      '24/7 monitoring available',
      'Mobile app alerts',
      'HD video surveillance',
      'Motion detection',
      'Remote access',
      'Professional monitoring',
      'Insurance discounts',
      'Deterrent effect'
    ],
    process: [
      { step: 1, title: 'Security Assessment', description: 'Evaluate your property security needs' },
      { step: 2, title: 'System Design', description: 'Design comprehensive security solution' },
      { step: 3, title: 'Equipment Selection', description: 'Choose cameras, sensors, and alarms' },
      { step: 4, title: 'Installation', description: 'Professional installation and wiring' },
      { step: 5, title: 'Configuration', description: 'Set up monitoring and alerts' },
      { step: 6, title: 'Training', description: 'User training and support' }
    ],
    faqs: [
      { q: 'Do I need professional monitoring?', a: 'Optional but recommended for comprehensive security. We offer monitoring packages.' },
      { q: 'Can I view cameras remotely?', a: 'Yes, all our systems include mobile app access for remote viewing.' },
      { q: 'What happens during power outage?', a: 'Systems include battery backup to maintain operation during outages.' },
      { q: 'Are cameras weather-resistant?', a: 'Yes, outdoor cameras are fully weatherproof.' }
    ],
    pricing: 'Starting from €2,000',
  },
  'maintenance': {
    name: 'Maintenance Services',
    slug: 'maintenance',
    icon: '🔧',
    image: 'https://images.pexels.com/photos/8961701/pexels-photo-8961701.jpeg',
    description: 'Regular maintenance and support services for all your electrical and energy systems.',
    longDescription: 'Keep your electrical and energy systems running at peak performance with our comprehensive maintenance services. Prevent costly breakdowns and extend the life of your equipment.',
    benefits: [
      'Preventive maintenance',
      'Priority service',
      'Cost savings',
      'Extended equipment life',
      'Safety inspections',
      'Performance optimization',
      'Detailed reports',
      'Service history tracking'
    ],
    process: [
      { step: 1, title: 'Service Agreement', description: 'Choose maintenance package' },
      { step: 2, title: 'Schedule', description: 'Set up maintenance schedule' },
      { step: 3, title: 'Inspection', description: 'Regular system inspections' },
      { step: 4, title: 'Testing', description: 'Performance testing and diagnostics' },
      { step: 5, title: 'Maintenance', description: 'Cleaning, adjustments, and repairs' },
      { step: 6, title: 'Report', description: 'Detailed service report' }
    ],
    faqs: [
      { q: 'How often should systems be maintained?', a: 'Annual maintenance is standard, but some systems may benefit from bi-annual service.' },
      { q: 'What is included in maintenance?', a: 'Inspection, cleaning, testing, minor adjustments, and detailed reporting.' },
      { q: 'Do you offer emergency support?', a: 'Yes, maintenance customers receive priority emergency support.' },
      { q: 'Can I get a maintenance contract?', a: 'Yes, we offer various maintenance packages tailored to your needs.' }
    ],
    pricing: 'From €200/year per system',
  },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = serviceDetails[slug];

  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');
    
    try {
      await quotesAPI.create({
        service: service.name,
        description: quoteForm.message,
        location: quoteForm.location,
        phone: quoteForm.phone,
        email: quoteForm.email,
      });
      setSubmitStatus('success');
      setQuoteForm({ name: '', email: '', phone: '', location: '', message: '' });
      setTimeout(() => setSubmitStatus(''), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 5000);
    }
  };

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
          <Link href="/#services" className="text-primary hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <Link href="/#services" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6">
            <ArrowLeft size={20} />
            Back to Services
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-6xl mb-4">{service.icon}</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.name}</h1>
              <p className="text-xl text-white/90 mb-6">{service.description}</p>
              <div className="flex gap-4">
                <a
                  href="#quote"
                  className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Get Free Quote
                </a>
                <a
                  href="tel:+352661315657"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
                >
                  Call Us
                </a>
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Description */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">About This Service</h2>
            <p className="text-lg text-gray-700 mb-8">{service.longDescription}</p>
            
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-lg mb-8">
              <div className="font-semibold text-xl text-primary mb-2">Pricing</div>
              <div className="text-lg">{service.pricing}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.benefits.map((benefit: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow">
                  <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Process</h2>
            <div className="space-y-6">
              {service.process.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {service.faqs.map((faq: any, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold mb-3 text-primary">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Get a Free Quote</h2>
            <p className="text-gray-600 text-center mb-8">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={quoteForm.name}
                  onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  required
                  value={quoteForm.location}
                  onChange={(e) => setQuoteForm({ ...quoteForm, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Luxembourg City"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Details *</label>
                <textarea
                  required
                  rows={5}
                  value={quoteForm.message}
                  onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={submitStatus === 'sending'}
                className="w-full bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitStatus === 'sending' ? (
                  'Sending...'
                ) : (
                  <>
                    Request Quote <Send size={20} />
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-center">
                  Thank you! We'll contact you within 24 hours with your quote.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-center">
                  Sorry, something went wrong. Please call us directly at +352 661 315 657.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Contact us today for a free consultation and quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+352661315657"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Call +352 661 315 657
            </a>
            <Link
              href="/#contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              Contact Form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
