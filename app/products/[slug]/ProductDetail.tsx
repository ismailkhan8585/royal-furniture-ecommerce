'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Product, Review } from '@/lib/database.types';
import { CATEGORY_LABELS, CATEGORY_SLUGS } from '@/lib/constants';
import { formatPrice } from '@/lib/currency';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Heart,
  ShoppingCart,
  MessageCircle,
  Phone,
  Truck,
  Wrench,
  Shield,
  ChevronLeft,
  ChevronRight,
  Star,
  Package,
} from 'lucide-react';
import { toast } from 'sonner';
import { ProductCard } from '@/components/products/ProductCard';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  const isFixedPrice = product.price_type === 'FIXED';
  const isInStock = product.stock_type === 'IN_STOCK' && product.stock > 0;
  const isMadeToOrder = product.stock_type === 'MADE_TO_ORDER';

  const whatsappText = encodeURIComponent(
    `Hi, I'm interested in ${product.name}. Is this available?`
  );

  // Check wishlist status
  useEffect(() => {
    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsWishlisted(wishlist.some((item: { productId: string }) => item.productId === product.id));
    } catch {
      setIsWishlisted(false);
    }
  }, [product.id]);

  // Fetch reviews and similar products
  useEffect(() => {
    const fetchData = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

      if (!supabaseUrl || !supabaseKey) return;

      const supabase = createClient(supabaseUrl, supabaseKey);

      // Fetch approved reviews
      const { data: reviewsData } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', product.id)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      setReviews(reviewsData || []);

      // Fetch similar products from same category
      const { data: similarData } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .eq('category', product.category)
        .neq('id', product.id)
        .limit(6);

      setSimilarProducts(similarData || []);
    };

    fetchData();
  }, [product.id, product.category]);

  const toggleWishlist = () => {
    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      if (isWishlisted) {
        const newWishlist = wishlist.filter((item: { productId: string }) => item.productId !== product.id);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
        setIsWishlisted(false);
        toast.success('Removed from wishlist');
      } else {
        wishlist.push({
          productId: product.id,
          productName: product.name,
          productPhoto: product.photos[0],
          price: product.price,
          priceType: product.price_type,
          slug: product.slug,
          addedAt: new Date().toISOString(),
        });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setIsWishlisted(true);
        toast.success('Added to wishlist');
      }
      window.dispatchEvent(new Event('wishlistUpdated'));
    } catch {
      toast.error('Failed to update wishlist');
    }
  };

  const addToCart = () => {
    if (!isFixedPrice || !product.price) return;

    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find((item: { productId: string }) => item.productId === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({
          productId: product.id,
          productName: product.name,
          productPhoto: product.photos[0],
          quantity,
          unitPrice: product.price,
          slug: product.slug,
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success('Added to cart');
    } catch {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-walnut-950 border-b border-walnut-100 dark:border-walnut-800">
        <div className="container-wide py-4">
          <nav className="flex items-center gap-2 text-sm text-walnut-600 dark:text-walnut-400">
            <Link href="/" className="hover:text-gold-600">
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/${CATEGORY_SLUGS[product.category]}`}
              className="hover:text-gold-600"
            >
              {CATEGORY_LABELS[product.category]}
            </Link>
            <span>/</span>
            <span className="text-walnut-800 dark:text-walnut-200">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="container-wide py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white dark:bg-walnut-950 rounded-xl overflow-hidden border border-walnut-100 dark:border-walnut-800">
              <img
                src={product.photos[selectedImage] || '/placeholder.png'}
                alt={product.name}
                className="w-full h-full object-contain"
              />
              {/* Navigation Arrows */}
              {product.photos.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === 0 ? product.photos.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === product.photos.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              {/* Wishlist Button */}
              <button
                onClick={toggleWishlist}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow hover:bg-white transition-colors"
              >
                <Heart
                  className={cn(
                    'w-6 h-6',
                    isWishlisted ? 'fill-red-500 text-red-500' : 'text-walnut-600'
                  )}
                />
              </button>
            </div>

            {/* Thumbnails */}
            {product.photos.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.photos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors',
                      index === selectedImage
                        ? 'border-walnut-600'
                        : 'border-walnut-100 hover:border-walnut-300'
                    )}
                  >
                    <img
                      src={photo}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div>
              <Link
                href={`/${CATEGORY_SLUGS[product.category]}`}
                className="text-sm text-gold-600 hover:text-gold-700 font-medium"
              >
                {CATEGORY_LABELS[product.category]}
              </Link>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl font-bold text-walnut-800 dark:text-walnut-200">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        'w-5 h-5',
                        star <= Math.round(product.rating)
                          ? 'fill-gold-500 text-gold-500'
                          : 'text-walnut-300'
                      )}
                    />
                  ))}
                </div>
                <span className="text-walnut-600 dark:text-walnut-400">
                  {product.rating.toFixed(1)} ({product.review_count} reviews)
                </span>
              </div>
            )}

            {/* Price Section */}
            <div className="py-4 border-y border-walnut-100 dark:border-walnut-800">
              {isFixedPrice && product.price ? (
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-walnut-700 dark:text-gold-400">
                    {formatPrice(product.price)}
                  </span>
                  {product.compare_price && product.compare_price > product.price && (
                    <span className="text-xl text-walnut-400 line-through">
                      {formatPrice(product.compare_price)}
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="px-4 py-2 rounded-lg bg-gold-100 text-gold-700 font-semibold text-lg">
                    Price on Inquiry
                  </span>
                </div>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-3">
              {isInStock && (
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                  <Package className="w-4 h-4" />
                  In Stock — Ships in 3-5 days
                </span>
              )}
              {isMadeToOrder && (
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
                  <Wrench className="w-4 h-4" />
                  Made to Order — 2-3 weeks delivery
                </span>
              )}
              {product.stock_type === 'OUT_OF_STOCK' && (
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                  <Package className="w-4 h-4" />
                  Currently Out of Stock
                </span>
              )}
            </div>

            {/* Spec Tags */}
            {(product.material || product.dimensions || product.color) && (
              <div className="grid grid-cols-2 gap-4">
                {product.material && (
                  <div>
                    <p className="text-sm text-walnut-500">Material</p>
                    <p className="font-medium text-walnut-800 dark:text-walnut-200">
                      {product.material}
                    </p>
                  </div>
                )}
                {product.dimensions && (
                  <div>
                    <p className="text-sm text-walnut-500">Dimensions</p>
                    <p className="font-medium text-walnut-800 dark:text-walnut-200">
                      {product.dimensions}
                    </p>
                  </div>
                )}
                {product.color && (
                  <div>
                    <p className="text-sm text-walnut-500">Color</p>
                    <p className="font-medium text-walnut-800 dark:text-walnut-200">
                      {product.color}
                    </p>
                  </div>
                )}
                {product.warranty && (
                  <div>
                    <p className="text-sm text-walnut-500">Warranty</p>
                    <p className="font-medium text-walnut-800 dark:text-walnut-200">
                      {product.warranty}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-walnut-600 dark:text-walnut-400">
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4" />
                Free delivery in major cities
              </span>
              <span className="flex items-center gap-1">
                <Wrench className="w-4 h-4" />
                Free assembly
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Quality guaranteed
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {isFixedPrice && product.price ? (
                <>
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-3 mb-4">
                    <Label>Quantity:</Label>
                    <div className="flex items-center border border-walnut-200 rounded-lg">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3 py-2 hover:bg-walnut-50 dark:hover:bg-walnut-800 rounded-l-lg"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 font-medium">{quantity}</span>
                      <button
                        onClick={() =>
                          setQuantity((q) => Math.min(product.stock || 99, q + 1))
                        }
                        className="px-3 py-2 hover:bg-walnut-50 dark:hover:bg-walnut-800 rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={addToCart}
                      disabled={!isInStock && !isMadeToOrder}
                      size="lg"
                      className="flex-1 gap-2 bg-walnut-600 hover:bg-walnut-700 text-white"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <a
                        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '') || '923001234567'}?text=${whatsappText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gap-2"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Negotiate
                      </a>
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex gap-3">
                  <Button
                    size="lg"
                    asChild
                    className="flex-1 gap-2 bg-green-500 hover:bg-green-600 text-white"
                  >
                    <a
                      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '') || '923001234567'}?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp for Best Price
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER || '+923001234567'}`}>
                      <Phone className="w-5 h-5" />
                      Call
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b border-walnut-200 dark:border-walnut-700">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="py-6">
              {product.description ? (
                <div className="prose prose-walnut max-w-none">
                  <p className="text-walnut-700 dark:text-walnut-300 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              ) : (
                <p className="text-walnut-500 dark:text-walnut-400">
                  No description available for this product.
                </p>
              )}
            </TabsContent>

            <TabsContent value="specifications" className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                <SpecRow label="Material" value={product.material} />
                <SpecRow label="Dimensions" value={product.dimensions} />
                <SpecRow label="Color" value={product.color} />
                <SpecRow label="Warranty" value={product.warranty} />
                <SpecRow
                  label="Stock Status"
                  value={
                    isInStock ? 'In Stock' : isMadeToOrder ? 'Made to Order' : 'Out of Stock'
                  }
                />
                <SpecRow label="SKU" value={product.sku} />
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="py-6">
              {reviews.length === 0 ? (
                <p className="text-walnut-500 dark:text-walnut-400 text-center py-8">
                  No reviews yet. Be the first to review this product!
                </p>
              ) : (
                <div className="space-y-6 max-w-2xl">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-walnut-100 dark:border-walnut-800 pb-6"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium text-walnut-800 dark:text-walnut-200">
                            {review.customer_name}
                          </p>
                          <p className="text-sm text-walnut-500">
                            {new Date(review.created_at).toLocaleDateString('en-PK')}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={cn(
                                'w-4 h-4',
                                star <= review.rating
                                  ? 'fill-gold-500 text-gold-500'
                                  : 'text-walnut-300'
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-walnut-700 dark:text-walnut-300">{review.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="section-heading mb-6">Similar Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex justify-between py-2 border-b border-walnut-100 dark:border-walnut-800">
      <span className="text-walnut-500">{label}</span>
      <span className="font-medium text-walnut-800 dark:text-walnut-200">{value}</span>
    </div>
  );
}
