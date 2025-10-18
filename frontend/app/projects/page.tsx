'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

// Sample projects data - In production, this would come from your backend API
const allProjects = [
  {
    id: 1,
    title: 'Residential Solar Installation - 20kW System',
    location: 'Luxembourg City',
    date: '2025-01-15',
    category: 'Solar Panels',
    image: 'https://images.unsplash.com/photo-1655300256486-4ec7251bf84e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHJvb2Z0b3B8ZW58MHx8fHwxNzYwNzg2ODYwfDA&ixlib=rb-4.1.0&q=85',
    description: 'Complete solar panel system installation with 60 panels, covering 150m² of roof space. System generates approximately 18,000 kWh annually, reducing the client\'s electricity bills by 75%.',
    details: {
      systemSize: '20kW',
      panelCount: 60,
      annualProduction: '18,000 kWh',
      savings: '75% electricity cost reduction',
      subsidy: '€6,000 Creos subsidy',
      completion: '3 days'
    }
  },
  {
    id: 2,
    title: 'Commercial EV Charging Infrastructure',
    location: 'Esch-sur-Alzette',
    date: '2025-01-10',
    category: 'EV Charger',
    image: 'https://images.unsplash.com/photo-1615829386703-e2bb66a7cb7d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHw0fHxlbGVjdHJpYyUyMHZlaGljbGUlMjBjaGFyZ2luZ3xlbnwwfHx8fDE3NjA3ODY4NTZ8MA&ixlib=rb-4.1.0&q=85',
    description: 'Installation of 8 commercial EV charging stations for a business parking facility. Each station capable of 22kW charging with smart load management system.',
    details: {
      chargers: '8 units',
      power: '22kW per unit',
      features: 'Smart load management, mobile app, RFID access',
      users: 'Up to 50 employees',
      subsidy: 'Commercial EV infrastructure grant',
      completion: '5 days'
    }
  },
  {
    id: 3,
    title: 'Smart Home Automation System',
    location: 'Differdange',
    date: '2024-12-20',
    category: 'Home Automation',
    image: 'https://images.unsplash.com/photo-1679356505858-bf4129177392?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBhdXRvbWF0aW9ufGVufDB8fHx8MTc2MDc4Njg2NXww&ixlib=rb-4.1.0&q=85',
    description: 'Complete home automation installation including smart lighting, climate control, security system, and voice assistant integration throughout a 250m² residence.',
    details: {
      rooms: '12 rooms automated',
      devices: '45 smart devices',
      features: 'Voice control, scenes, scheduling',
      integration: 'Alexa & Google Home',
      energySavings: '30% reduction',
      completion: '4 days'
    }
  },
  {
    id: 4,
    title: 'Ground-Source Heat Pump Installation',
    location: 'Mersch',
    date: '2024-12-05',
    category: 'Heat Pump',
    image: 'https://images.unsplash.com/photo-1679356505858-bf4129177392?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBhdXRvbWF0aW9ufGVufDB8fHx8MTc2MDc4Njg2NXww&ixlib=rb-4.1.0&q=85',
    description: 'Installation of ground-source heat pump system for a 200m² residential property, including ground loop installation and integration with existing radiator system.',
    details: {
      type: 'Ground-source heat pump',
      capacity: '12kW',
      efficiency: '400% SCOP',
      heatingArea: '200m²',
      subsidy: '€8,000 renovation grant',
      completion: '7 days'
    }
  },
  {
    id: 5,
    title: 'Commercial Solar Carport',
    location: 'Bertrange',
    date: '2024-11-25',
    category: 'Solar Panels',
    image: 'https://images.unsplash.com/photo-1655300256486-4ec7251bf84e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHJvb2Z0b3B8ZW58MHx8fHwxNzYwNzg2ODYwfDA&ixlib=rb-4.1.0&q=85',
    description: 'Solar carport installation covering 20 parking spaces at a commercial facility. Dual purpose: weather protection and solar energy generation.',
    details: {
      capacity: '50kW',
      panels: '150 solar panels',
      parkingSpaces: '20 covered spaces',
      annualProduction: '45,000 kWh',
      evChargers: '4 EV chargers included',
      completion: '10 days'
    }
  },
  {
    id: 6,
    title: 'Residential EV Charger with Solar Integration',
    location: 'Strassen',
    date: '2024-11-10',
    category: 'EV Charger',
    image: 'https://images.unsplash.com/photo-1615829386703-e2bb66a7cb7d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHw0fHxlbGVjdHJpYyUyMHZlaGljbGUlMjBjaGFyZ2luZ3xlbnwwfHx8fDE3NjA3ODY4NTZ8MA&ixlib=rb-4.1.0&q=85',
    description: 'Smart EV charger installation with direct solar integration, allowing the homeowner to charge their vehicle primarily with solar energy.',
    details: {
      charger: 'Wallbox 22kW',
      solarIntegration: 'Yes',
      smartFeatures: 'Solar surplus charging',
      app: 'Remote control & monitoring',
      subsidy: '€600 Creos subsidy',
      completion: '1 day'
    }
  },
  {
    id: 7,
    title: 'Commercial Building Electrical Renovation',
    location: 'Luxembourg City',
    date: '2024-10-20',
    category: 'Electrician',
    image: 'https://images.pexels.com/photos/8961701/pexels-photo-8961701.jpeg',
    description: 'Complete electrical system renovation for a 500m² office building, including new distribution panels, LED lighting, and emergency systems.',
    details: {
      area: '500m² office space',
      work: 'Complete rewiring',
      lighting: 'LED upgrade (150 fixtures)',
      panels: '3 new distribution panels',
      emergency: 'Emergency lighting system',
      completion: '14 days'
    }
  },
  {
    id: 8,
    title: 'Apartment Complex Heat Pump System',
    location: 'Esch-sur-Alzette',
    date: '2024-10-05',
    category: 'Heat Pump',
    image: 'https://images.unsplash.com/photo-1679356505858-bf4129177392?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBhdXRvbWF0aW9ufGVufDB8fHx8MTc2MDc4Njg2NXww&ixlib=rb-4.1.0&q=85',
    description: 'Installation of centralized air-source heat pump system serving 12 apartment units in a residential building.',
    details: {
      type: 'Air-source heat pump',
      capacity: '80kW',
      units: '12 apartments',
      efficiency: '350% SCOP',
      subsidy: 'Collective renovation grant',
      completion: '12 days'
    }
  },
  {
    id: 9,
    title: 'Rooftop Solar Installation - 15kW',
    location: 'Dudelange',
    date: '2024-09-15',
    category: 'Solar Panels',
    image: 'https://images.unsplash.com/photo-1655300256486-4ec7251bf84e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHJvb2Z0b3B8ZW58MHx8fHwxNzYwNzg2ODYwfDA&ixlib=rb-4.1.0&q=85',
    description: 'Residential solar installation on a semi-detached house, optimized for south-facing roof orientation.',
    details: {
      systemSize: '15kW',
      panels: '45 panels',
      orientation: 'South-facing',
      annualProduction: '14,000 kWh',
      savings: '70% electricity reduction',
      completion: '2 days'
    }
  }
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(allProjects);

  const categories = ['All', 'Solar Panels', 'EV Charger', 'Heat Pump', 'Home Automation', 'Electrician'];

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProjects(allProjects);
    } else {
      setFilteredProjects(allProjects.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Projects</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Showcasing our quality electrical and energy installations across Luxembourg
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50 sticky top-[72px] z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="text-center mt-4 text-gray-600">
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Tag size={16} />
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-dark group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {new Date(project.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Project Details */}
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    {Object.entries(project.details).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="font-semibold text-dark">{value}</span>
                      </div>
                    ))}
                  </div>

                  <button className="mt-4 w-full bg-gray-100 hover:bg-primary hover:text-white text-dark px-4 py-2 rounded-lg font-medium transition-all">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want Your Project Here?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Let's discuss your electrical or energy project and bring it to life with professional expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+352661315657"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Call +352 661 315 657
            </a>
            <a
              href="/#contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              Get Free Quote
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
