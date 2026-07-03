'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MEDIA } from '@/lib/media';
import { cn } from '@/lib/utils';

const slides = [
  {
    id: 1,
    title: 'Premium Office Furniture for Every Workspace',
    subtitle: 'Executive Chairs, Desks & More | Rs. 8,500 onwards',
    cta: 'Shop Office Furniture',
    href: '/office-furniture',
    image: MEDIA.officeWorkspace,
    textColor: 'text-white',
    accent: 'text-gold-400',
  },
  {
    id: 2,
    title: 'Sofas & Living Room Sets Built to Last',
    subtitle: '7-Seater Sets Starting Rs. 65,000',
    cta: 'Shop Living Room',
    href: '/living-room',
    image: MEDIA.livingRoom,
    textColor: 'text-white',
    accent: 'text-gold-400',
  },
  {
    id: 3,
    title: 'Design Your Dream Furniture',
    subtitle: 'Custom-Made, Delivered Across Pakistan',
    cta: 'Request Custom Order',
    href: '/custom-orders',
    image: MEDIA.receptionDesk,
    textColor: 'text-white',
    accent: 'text-gold-400',
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative h-[70vh] min-h-[520px] max-h-[820px] overflow-hidden bg-walnut-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 transition-all duration-700 ease-in-out',
            index === currentSlide
              ? 'opacity-100 translate-x-0'
              : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
          )}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-walnut-950/90 via-walnut-900/65 to-walnut-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-walnut-950/55 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-wide px-4">
              <div className="max-w-3xl">
                <p className={cn('mb-4 text-sm font-semibold uppercase tracking-[0.18em]', slide.accent)}>
                  Royal Furniture
                </p>
              <h1
                className={cn(
                  'font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in leading-tight',
                  slide.textColor
                )}
              >
                {slide.title}
              </h1>
              <p
                className={cn(
                  'text-lg md:text-xl mb-8 max-w-2xl',
                  slide.textColor,
                  'opacity-90'
                )}
              >
                {slide.subtitle}
              </p>
              <Button
                asChild
                size="lg"
                className={cn(
                  'gap-2 text-lg px-8 py-6',
                  'bg-gold-500 text-walnut-900 hover:bg-gold-400'
                )}
              >
                <Link href={slide.href}>
                  {slide.cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          prevSlide();
          setIsAutoPlaying(false);
        }}
        className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30 md:flex"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
        }}
        className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30 md:flex"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-300',
              index === currentSlide
                ? 'bg-gold-500 scale-110'
                : 'bg-white/50 hover:bg-white/70'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
