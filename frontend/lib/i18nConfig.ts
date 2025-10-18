'use client';

import { useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      'welcome': 'Welcome',
      'nav.home': 'Home',
      'nav.services': 'Services',
      'nav.projects': 'Projects',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'nav.portal': 'Customer Portal',
      'nav.getQuote': 'Get Quote',
      'hero.title': "Luxembourg's Trusted Electrical & Energy Experts",
      'hero.subtitle': 'Professional electrical services, solar panels, EV chargers, and energy solutions',
      'hero.ctaQuote': 'Get a Free Quote',
      'hero.ctaProjects': 'View Projects',
      'services.title': 'Our Services',
      'services.subtitle': 'Comprehensive electrical and energy solutions',
      'services.learnMore': 'Learn More',
      'projects.title': 'Our Projects',
      'projects.subtitle': 'Showcasing our quality installations across Luxembourg',
      'portal.welcomeBack': 'Welcome Back',
      'portal.signIn': 'Sign in to access your customer portal',
      'portal.emailAddress': 'Email Address',
      'portal.password': 'Password',
      'portal.signInBtn': 'Sign In',
      'portal.createAccount': 'Create Account',
      'portal.dashboard': 'Dashboard',
      'portal.logout': 'Logout',
    },
  },
  fr: {
    translation: {
      'welcome': 'Bienvenue',
      'nav.home': 'Accueil',
      'nav.services': 'Services',
      'nav.projects': 'Projets',
      'nav.about': 'À Propos',
      'nav.contact': 'Contact',
      'nav.portal': 'Portail Client',
      'nav.getQuote': 'Demander un Devis',
      'hero.title': 'Experts Électriques et Énergétiques de Confiance au Luxembourg',
      'hero.subtitle': 'Services électriques professionnels, panneaux solaires, chargeurs VE',
      'hero.ctaQuote': 'Obtenir un Devis Gratuit',
      'hero.ctaProjects': 'Voir les Projets',
      'services.title': 'Nos Services',
      'services.subtitle': 'Solutions électriques et énergétiques complètes',
      'services.learnMore': 'En Savoir Plus',
      'projects.title': 'Nos Projets',
      'projects.subtitle': 'Présentation de nos installations de qualité au Luxembourg',
      'portal.welcomeBack': 'Bon Retour',
      'portal.signIn': 'Connectez-vous pour accéder à votre portail client',
      'portal.emailAddress': 'Adresse Email',
      'portal.password': 'Mot de Passe',
      'portal.signInBtn': 'Se Connecter',
      'portal.createAccount': 'Créer un Compte',
      'portal.dashboard': 'Tableau de Bord',
      'portal.logout': 'Déconnexion',
    },
  },
  de: {
    translation: {
      'welcome': 'Willkommen',
      'nav.home': 'Startseite',
      'nav.services': 'Dienstleistungen',
      'nav.projects': 'Projekte',
      'nav.about': 'Über Uns',
      'nav.contact': 'Kontakt',
      'nav.portal': 'Kundenportal',
      'nav.getQuote': 'Angebot Anfordern',
      'hero.title': 'Luxemburgs Vertrauenswürdige Elektro- und Energieexperten',
      'hero.subtitle': 'Professionelle Elektrodienstleistungen, Solarmodule, EV-Ladegeräte',
      'hero.ctaQuote': 'Kostenloses Angebot',
      'hero.ctaProjects': 'Projekte Ansehen',
      'services.title': 'Unsere Dienstleistungen',
      'services.subtitle': 'Umfassende Elektro- und Energielösungen',
      'services.learnMore': 'Mehr Erfahren',
      'projects.title': 'Unsere Projekte',
      'projects.subtitle': 'Präsentation unserer hochwertigen Installationen in Luxemburg',
      'portal.welcomeBack': 'Willkommen Zurück',
      'portal.signIn': 'Melden Sie sich an, um auf Ihr Kundenportal zuzugreifen',
      'portal.emailAddress': 'E-Mail-Adresse',
      'portal.password': 'Passwort',
      'portal.signInBtn': 'Anmelden',
      'portal.createAccount': 'Konto Erstellen',
      'portal.dashboard': 'Dashboard',
      'portal.logout': 'Abmelden',
    },
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      lng: 'en',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },
    });
}

export function useI18nInit() {
  useEffect(() => {
    // Initialize on client side
    if (typeof window !== 'undefined' && !i18n.isInitialized) {
      i18n.init();
    }
  }, []);
}

export default i18n;
