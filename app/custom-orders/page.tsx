'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomOrderFormData, customOrderFormSchema } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Ruler,
  Upload,
  CheckCircle,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { ROOM_TYPES, BUDGET_RANGES, PAKISTANI_CITIES, WHATSAPP_URL } from '@/lib/constants';
import { toast } from 'sonner';

const steps = [
  { id: 1, name: 'Describe', description: 'Tell us about your furniture' },
  { id: 2, name: 'Details', description: 'Your contact information' },
  { id: 3, name: 'Submit', description: 'Review and send request' },
];

export default function CustomOrdersPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestRef, setRequestRef] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CustomOrderFormData>({
    resolver: zodResolver(customOrderFormSchema),
    defaultValues: {
      furnitureType: '',
      roomType: undefined,
      material: '',
      budgetRange: undefined,
      dimensions: '',
      description: '',
      referenceImages: [],
      customerName: '',
      customerPhone: '',
      city: 'Lahore',
    },
  });

  const generateRequestRef = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 90000) + 10000;
    return `CUS-${year}-${random}`;
  };

  const onSubmit = async (data: CustomOrderFormData) => {
    setIsSubmitting(true);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Configuration error');
      }

      const supabase = createClient(supabaseUrl, supabaseKey);
      const ref = generateRequestRef();

      const { error } = await supabase.from('custom_order_requests').insert({
        request_ref: ref,
        furniture_type: data.furnitureType,
        room_type: data.roomType || null,
        material: data.material || null,
        budget_range: data.budgetRange || null,
        dimensions: data.dimensions || null,
        description: data.description || null,
        reference_images: uploadedImages,
        customer_name: data.customerName,
        customer_phone: data.customerPhone,
        city: data.city,
        status: 'PENDING',
      });

      if (error) throw error;

      setRequestRef(ref);
      setStep(4); // Success step
      toast.success('Custom order request submitted successfully!');
    } catch (error) {
      console.error('Error submitting request:', error);
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('type', 'customOrders');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadedImages((prev) => [...prev, data.url]);
        setValue('referenceImages', [...uploadedImages, data.url]);
        toast.success('Image uploaded successfully');
      }
    } catch (error) {
      toast.error('Failed to upload image');
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  if (requestRef) {
    return (
      <div className="min-h-screen bg-surface-secondary py-16">
        <div className="container-narrow">
          <Card className="text-center">
            <CardContent className="pt-12 pb-8">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="font-display text-3xl font-bold text-walnut-800 mb-4">
                Request Submitted Successfully!
              </h1>
              <p className="text-walnut-600 mb-6 max-w-md mx-auto">
                Your custom order request has been submitted. Our team will review and contact you within 24 hours.
              </p>
              <div className="bg-walnut-50 dark:bg-walnut-900 rounded-lg p-4 mb-8 max-w-sm mx-auto">
                <p className="text-sm text-walnut-500 mb-1">Your Reference Number</p>
                <p className="font-mono text-2xl font-bold text-walnut-700 dark:text-gold-400">
                  {requestRef}
                </p>
              </div>
              <p className="text-walnut-600 text-sm mb-6">
                Save this reference number to track your request
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = '/')}
                >
                  Back to Home
                </Button>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2 bg-green-500 hover:bg-green-600">
                    <MessageCircle className="w-4 h-4" />
                    Follow Up on WhatsApp
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Header */}
      <div className="bg-gradient-to-br from-walnut-800 to-walnut-900 text-white py-12">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-2">
            <Ruler className="w-8 h-8 text-gold-400" />
            <h1 className="font-display text-4xl md:text-5xl font-bold">
              Custom Orders
            </h1>
          </div>
          <p className="text-walnut-300 text-lg max-w-2xl">
            Can&apos;t find what you&apos;re looking for? We build custom furniture
            to your exact specifications. Describe your dream piece and we&apos;ll
            make it a reality.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white dark:bg-walnut-950 border-b border-walnut-100 dark:border-walnut-800 py-8">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '1', title: 'Describe Your Furniture', desc: 'Tell us what you want' },
              { icon: '2', title: 'Get a Quote', desc: 'We respond within 24 hours' },
              { icon: '3', title: 'We Build & Deliver', desc: 'Your custom piece is created' },
            ].map((item) => (
              <div key={item.icon} className="text-center">
                <div className="w-12 h-12 rounded-full bg-walnut-100 dark:bg-walnut-800 text-walnut-700 dark:text-gold-400 font-bold text-xl flex items-center justify-center mx-auto mb-3">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-walnut-800 dark:text-walnut-200">
                  {item.title}
                </h3>
                <p className="text-walnut-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container-wide py-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {steps.map((s, idx) => (
              <div key={s.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s.id
                      ? 'bg-walnut-700 text-white'
                      : 'bg-walnut-100 text-walnut-400'
                  }`}
                >
                  {s.id}
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      step > s.id ? 'bg-walnut-700' : 'bg-walnut-100'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {steps[step - 1]?.name || 'Complete'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <Label>Furniture Type *</Label>
                      <Input
                        {...register('furnitureType')}
                        placeholder="e.g., King size bed with storage"
                      />
                      {errors.furnitureType && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.furnitureType.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Room Type</Label>
                        <Select onValueChange={(v) => setValue('roomType', v)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select room type" />
                          </SelectTrigger>
                          <SelectContent>
                            {ROOM_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Preferred Material</Label>
                        <Input
                          {...register('material')}
                          placeholder="e.g., Sheesham wood"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Budget Range</Label>
                        <Select onValueChange={(v) => setValue('budgetRange', v)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                          <SelectContent>
                            {BUDGET_RANGES.map((range) => (
                              <SelectItem key={range} value={range}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Dimensions (if known)</Label>
                        <Input
                          {...register('dimensions')}
                          placeholder="e.g., W180 x H100 x D200 cm"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Additional Details</Label>
                      <Textarea
                        {...register('description')}
                        placeholder="Describe your dream furniture piece in detail..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label className="flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Reference Images (optional)
                      </Label>
                      <div className="mt-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="cursor-pointer"
                        />
                      </div>
                      {uploadedImages.length > 0 && (
                        <div className="flex gap-2 mt-3 flex-wrap">
                          {uploadedImages.map((url, idx) => (
                            <img
                              key={idx}
                              src={url}
                              alt={`Reference ${idx + 1}`}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label>Your Name *</Label>
                      <Input {...register('customerName')} placeholder="Full name" />
                      {errors.customerName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.customerName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label>Phone Number *</Label>
                      <Input
                        {...register('customerPhone')}
                        placeholder="03XX-XXXXXXX"
                      />
                      {errors.customerPhone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.customerPhone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label>City *</Label>
                      <Select
                        defaultValue="Lahore"
                        onValueChange={(v) => setValue('city', v)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {PAKISTANI_CITIES.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="bg-walnut-50 dark:bg-walnut-900 rounded-lg p-6">
                      <h3 className="font-semibold text-walnut-800 dark:text-walnut-200 mb-4">
                        Review Your Request
                      </h3>
                      <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <dt className="text-walnut-500">Furniture Type</dt>
                          <dd className="font-medium text-walnut-800 dark:text-walnut-200">
                            {watch('furnitureType')}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-walnut-500">Room Type</dt>
                          <dd className="font-medium text-walnut-800 dark:text-walnut-200">
                            {watch('roomType') || 'Not specified'}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-walnut-500">Material</dt>
                          <dd className="font-medium text-walnut-800 dark:text-walnut-200">
                            {watch('material') || 'Not specified'}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-walnut-500">Budget</dt>
                          <dd className="font-medium text-walnut-800 dark:text-walnut-200">
                            {watch('budgetRange') || 'Not specified'}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-walnut-500">Name</dt>
                          <dd className="font-medium text-walnut-800 dark:text-walnut-200">
                            {watch('customerName')}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-walnut-500">Phone</dt>
                          <dd className="font-medium text-walnut-800 dark:text-walnut-200">
                            {watch('customerPhone')}
                          </dd>
                        </div>
                        <div className="md:col-span-2">
                          <dt className="text-walnut-500">City</dt>
                          <dd className="font-medium text-walnut-800 dark:text-walnut-200">
                            {watch('city')}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <p className="text-sm text-walnut-500 text-center">
                      By submitting, you agree to be contacted by Royal Furniture
                      regarding your custom order request.
                    </p>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-walnut-100 dark:border-walnut-800">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                    >
                      Previous
                    </Button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <Button type="button" onClick={nextStep} className="gap-2">
                      Next <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="gap-2"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* WhatsApp Alternative */}
          <div className="text-center mt-8">
            <p className="text-walnut-500 mb-3">Prefer to chat directly?</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
