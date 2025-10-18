// SEO and Schema.org structured data utilities

export const generateLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'SparkSonic SARLS',
    image: 'https://sparksonic.lu/logo.png',
    '@id': 'https://sparksonic.lu',
    url: 'https://sparksonic.lu',
    telephone: '+352661315657',
    email: 'info@sparksonic.lu',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Luxembourg City',
      addressLocality: 'Luxembourg',
      postalCode: 'L-1234',
      addressCountry: 'LU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 49.6116,
      longitude: 6.1319,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '16:00',
      },
    ],
    priceRange: '€€',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '54',
    },
    sameAs: [
      'https://www.facebook.com/sparksonic',
      'https://www.linkedin.com/company/sparksonic',
      'https://www.instagram.com/sparksonic',
    ],
  };
};

export const generateServiceSchema = (service: any) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    provider: {
      '@type': 'LocalBusiness',
      name: 'SparkSonic SARLS',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Luxembourg',
    },
    description: service.description,
  };
};

export const generateReviewSchema = (reviews: any[]) => {
  return reviews.map((review) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author_name,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: '5',
    },
    reviewBody: review.text,
    datePublished: new Date(review.time * 1000).toISOString(),
  }));
};

export const injectStructuredData = (data: any) => {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }
};
