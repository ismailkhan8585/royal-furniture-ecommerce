'use client';

import { useState } from 'react';
import { GalleryImage } from '@/lib/database.types';
import { Button } from '@/components/ui/button';
import { Image, MessageCircle, X } from 'lucide-react';
import { CATEGORY_LABELS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface GalleryClientProps {
  images: GalleryImage[];
}

const categories = ['ALL', 'OFFICE', 'LIVING_ROOM', 'BEDROOM', 'DINING', 'OUTDOOR'];

export function GalleryClient({ images }: GalleryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages =
    selectedCategory === 'ALL'
      ? images
      : images.filter((img) => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Header */}
      <div className="bg-gradient-to-br from-walnut-800 to-walnut-900 text-white py-12">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-2">
            <Image className="w-8 h-8 text-gold-400" />
            <h1 className="font-display text-4xl md:text-5xl font-bold">
              Gallery
            </h1>
          </div>
          <p className="text-walnut-300 text-lg max-w-2xl">
            Explore our showroom and see our furniture in real homes across Pakistan
          </p>
        </div>
      </div>

      <div className="container-wide py-8">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                selectedCategory === cat &&
                  'bg-walnut-700 text-white hover:bg-walnut-800'
              )}
            >
              {cat === 'ALL' ? 'All' : CATEGORY_LABELS[cat] || cat}
            </Button>
          ))}
        </div>

        {/* Masonry Grid */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-16">
            <Image className="w-16 h-16 text-walnut-300 mx-auto mb-4" />
            <p className="text-walnut-500">No images in this category yet</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="break-inside-avoid relative group cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.image_url}
                  alt={image.caption || 'Gallery image'}
                  className="w-full rounded-xl"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                  <span className="text-white text-sm font-medium">View</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-walnut-600 dark:text-walnut-400 mb-4">
            Like what you see? Let us help you find the perfect furniture
          </p>
          <Button asChild className="gap-2 bg-green-500 hover:bg-green-600 text-white">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '') || '923001234567'}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </Button>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedImage.image_url}
            alt={selectedImage.caption || 'Gallery image'}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          {selectedImage.caption && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center px-4 py-2 bg-black/50 rounded-lg">
              {selectedImage.caption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
