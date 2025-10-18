import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        services: 'Services',
        projects: 'Projects',
        about: 'About',
        contact: 'Contact',
        portal: 'Customer Portal',
        getQuote: 'Get Quote',
      },
      hero: {
        title: "Luxembourg's Trusted Electrical & Energy Experts",
        subtitle: 'Professional electrical services, solar panels, EV chargers, and energy solutions across Luxembourg',
        ctaQuote: 'Get a Free Quote',
        ctaProjects: 'View Projects',
      },
      services: {
        title: 'Our Services',
        subtitle: 'Comprehensive electrical and energy solutions for residential and commercial properties',
        learnMore: 'Learn More',
      },
    },
  },
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        services: 'Services',
        projects: 'Projets',
        about: 'À Propos',
        contact: 'Contact',
        portal: 'Portail Client',
        getQuote: 'Demander un Devis',
      },
      hero: {
        title: 'Experts Électriques et Énergétiques de Confiance au Luxembourg',
        subtitle: 'Services électriques professionnels, panneaux solaires, chargeurs VE et solutions énergétiques',
        ctaQuote: 'Obtenir un Devis Gratuit',
        ctaProjects: 'Voir les Projets',
      },
      services: {
        title: 'Nos Services',
        subtitle: 'Solutions électriques et énergétiques complètes pour propriétés résidentielles et commerciales',
        learnMore: 'En Savoir Plus',
      },
    },
  },
  de: {
    translation: {
      nav: {
        home: 'Startseite',
        services: 'Dienstleistungen',
        projects: 'Projekte',
        about: 'Über Uns',
        contact: 'Kontakt',
        portal: 'Kundenportal',
        getQuote: 'Angebot Anfordern',
      },
      hero: {
        title: 'Luxemburgs Vertrauenswürdige Elektro- und Energieexperten',
        subtitle: 'Professionelle Elektrodienstleistungen, Solarmodule, EV-Ladegeräte und Energielösungen',
        ctaQuote: 'Kostenloses Angebot',
        ctaProjects: 'Projekte Ansehen',
      },
      services: {
        title: 'Unsere Dienstleistungen',
        subtitle: 'Umfassende Elektro- und Energielösungen für Wohn- und Gewerbeimmobilien',
        learnMore: 'Mehr Erfahren',
      },
    },
  },
  lb: {
    translation: {
      nav: {
        home: 'Doheem',
        services: 'Servicer',
        projects: 'Projeten',
        about: 'Iwwer Eis',
        contact: 'Kontakt',
        portal: 'Client Portal',
        getQuote: 'Devis Froen',
      },
      hero: {
        title: 'Lëtzebuergs Vertraute Elektresch & Energie Experten',
        subtitle: 'Professionell elektresch Servicer, Solarpanelen, EV Chargeren a Energielésungen',
        ctaQuote: 'Gratis Devis Kréien',
        ctaProjects: 'Projeten Kucken',
      },
      services: {
        title: 'Eis Servicer',
        subtitle: 'Komplett elektresch an Energielésungen fir privat a kommerziell Eegentuemer',
        learnMore: 'Méi Léieren',
      },
    },
  },
  es: {
    translation: {
      nav: {
        home: 'Inicio',
        services: 'Servicios',
        projects: 'Proyectos',
        about: 'Acerca De',
        contact: 'Contacto',
        portal: 'Portal del Cliente',
        getQuote: 'Solicitar Presupuesto',
      },
      hero: {
        title: 'Expertos de Confianza en Electricidad y Energía de Luxemburgo',
        subtitle: 'Servicios eléctricos profesionales, paneles solares, cargadores EV y soluciones energéticas',
        ctaQuote: 'Obtener Presupuesto Gratis',
        ctaProjects: 'Ver Proyectos',
      },
      services: {
        title: 'Nuestros Servicios',
        subtitle: 'Soluciones eléctricas y energéticas integrales para propiedades residenciales y comerciales',
        learnMore: 'Saber Más',
      },
    },
  },
  pt: {
    translation: {
      nav: {
        home: 'Início',
        services: 'Serviços',
        projects: 'Projetos',
        about: 'Sobre Nós',
        contact: 'Contato',
        portal: 'Portal do Cliente',
        getQuote: 'Solicitar Orçamento',
      },
      hero: {
        title: 'Especialistas de Confiança em Eletricidade e Energia do Luxemburgo',
        subtitle: 'Serviços elétricos profissionais, painéis solares, carregadores EV e soluções energéticas',
        ctaQuote: 'Obter Orçamento Gratuito',
        ctaProjects: 'Ver Projetos',
      },
      services: {
        title: 'Nossos Serviços',
        subtitle: 'Soluções elétricas e energéticas abrangentes para propriedades residenciais e comerciais',
        learnMore: 'Saiba Mais',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
