'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: string;
  name: string;
  city: string;
  product: string;
  rating: number;
  review: string;
}

// Sample testimonials - in production these would come from approved reviews
const sampleTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Muhammad Ali',
    city: 'Lahore',
    product: 'Executive Office Chair',
    rating: 5,
    review: 'Excellent quality! The leather is premium and very comfortable for long working hours. Delivery was on time and assembly was free. Highly recommend Royal Furniture.',
  },
  {
    id: '2',
    name: 'Fatima Khan',
    city: 'Karachi',
    product: '7-Seater Sofa Set',
    rating: 5,
    review: 'Beautiful sofa set that transformed our living room. The velvet quality is outstanding. Very satisfied with the purchase and the customer service.',
  },
  {
    id: '3',
    name: 'Ahmed Hassan',
    city: 'Islamabad',
    product: 'King Size Sheesham Bed',
    rating: 4,
    review: 'The bed is sturdy and the wood grain looks amazing. Storage drawers are very useful. Minor delay in delivery but the quality made it worth waiting.',
  },
  {
    id: '4',
    name: 'Sara Ahmed',
    city: 'Faisalabad',
    product: '6-Seater Dining Set',
    rating: 5,
    review: 'Exactly as pictured on the website. The chairs are comfortable and the table finish is premium. Royal Furniture exceeded my expectations.',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % sampleTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + sampleTestimonials.length) % sampleTestimonials.length);
  };

  const testimonial = sampleTestimonials[currentIndex];

  return (
    <section className="py-12 lg:py-16 bg-surface-secondary">
      <div className="container-wide">
        <div className="text-center mb-10">
          <h2 className="section-heading mb-2">What Our Customers Say</h2>
          <p className="section-subheading">
            Real reviews from our valued customers
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative bg-white dark:bg-walnut-950 rounded-2xl p-8 lg:p-12 shadow-lg border border-walnut-100 dark:border-walnut-800">
            {/* Rating Stars */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    'w-5 h-5',
                    star <= testimonial.rating
                      ? 'fill-gold-500 text-gold-500'
                      : 'text-walnut-300'
                  )}
                />
              ))}
            </div>

            {/* Review Text */}
            <blockquote className="text-center text-walnut-700 dark:text-walnut-300 text-lg leading-relaxed mb-8">
              &ldquo;{testimonial.review}&rdquo;
            </blockquote>

            {/* Customer Info */}
            <div className="text-center mb-8">
              <p className="font-semibold text-walnut-800 dark:text-walnut-200 text-lg">
                {testimonial.name}
              </p>
              <p className="text-walnut-500 dark:text-walnut-400">
                {testimonial.city} | Purchased: {testimonial.product}
              </p>
            </div>

            {/* Navigation */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2">
              {sampleTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'w-2.5 h-2.5 rounded-full transition-all',
                    index === currentIndex
                      ? 'bg-walnut-600 w-6'
                      : 'bg-walnut-300 hover:bg-walnut-400'
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
