'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const serviceImages = [
  {
    url: 'https://images.unsplash.com/photo-1655300256486-4ec7251bf84e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHJvb2Z0b3B8ZW58MHx8fHwxNzYwNzg2ODYwfDA&ixlib=rb-4.1.0&q=85',
    title: 'Solar Panels',
    alt: 'Professional solar panel installation'
  },
  {
    url: 'https://images.unsplash.com/photo-1615829386703-e2bb66a7cb7d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHw0fHxlbGVjdHJpYyUyMHZlaGljbGUlMjBjaGFyZ2luZ3xlbnwwfHx8fDE3NjA3ODY4NTZ8MA&ixlib=rb-4.1.0&q=85',
    title: 'EV Chargers',
    alt: 'Electric vehicle charging station'
  },
  {
    url: 'https://images.unsplash.com/photo-1679356505858-bf4129177392?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBhdXRvbWF0aW9ufGVufDB8fHx8MTc2MDc4Njg2NXww&ixlib=rb-4.1.0&q=85',
    title: 'Smart Home',
    alt: 'Smart home automation technology'
  },
  {
    url: 'https://images.pexels.com/photos/8961701/pexels-photo-8961701.jpeg',
    title: 'Professional Service',
    alt: 'Professional electrical team working'
  },
  {
    url: 'https://images.unsplash.com/photo-1754620906571-9ba64bd3ffb4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHNvbGFyJTIwcGFuZWxzfGVufDB8fHx8MTc2MDc4Njg1MXww&ixlib=rb-4.1.0&q=85',
    title: 'Expert Electricians',
    alt: 'Expert electrician at work'
  }
];

export default function HeroSlider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-white/10 rounded-2xl animate-pulse" />
    );
  }

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-full"
      >
        {serviceImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-2xl font-bold">{image.title}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
