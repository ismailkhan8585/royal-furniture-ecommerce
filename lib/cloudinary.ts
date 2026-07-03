import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Cloudinary folder paths
export const CLOUDINARY_FOLDERS = {
  products: 'royal-furniture/products',
  gallery: 'royal-furniture/gallery',
  customOrders: 'royal-furniture/custom-orders',
  paymentScreenshots: 'royal-furniture/payment-screenshots',
  logo: 'royal-furniture/logo',
} as const;

export type UploadType = keyof typeof CLOUDINARY_FOLDERS;

// Upload options
interface UploadOptions {
  type: UploadType;
  id?: string; // For subfolder organization (product ID, request ID, etc.)
}

/**
 * Upload an image to Cloudinary
 */
export async function uploadImage(
  file: string | Buffer,
  options: UploadOptions
): Promise<{ url: string; publicId: string } | null> {
  try {
    const folder = options.id
      ? `${CLOUDINARY_FOLDERS[options.type]}/${options.id}`
      : CLOUDINARY_FOLDERS[options.type];

    const uploadOptions = {
      folder,
      max_file_size: 5 * 1024 * 1024, // 5MB max
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: [
        { quality: 'auto' },
        { fetch_format: 'auto' },
      ],
    };

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadCallback = (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined
      ) => {
        if (error || !result) {
          reject(error || new Error('Upload failed'));
        } else {
          resolve(result);
        }
      };

      if (typeof file === 'string') {
        // Base64 or URL string
        cloudinary.uploader.upload(file, uploadOptions, uploadCallback);
      } else {
        // Buffer
        const dataUri = `data:image/jpeg;base64,${file.toString('base64')}`;
        cloudinary.uploader.upload(dataUri, uploadOptions, uploadCallback);
      }
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return null;
  }
}

/**
 * Upload multiple images to Cloudinary
 */
export async function uploadMultipleImages(
  files: (string | Buffer)[],
  options: UploadOptions
): Promise<{ url: string; publicId: string }[]> {
  const results = await Promise.all(
    files.map((file) => uploadImage(file, options))
  );
  return results.filter((r): r is { url: string; publicId: string } => r !== null);
}

/**
 * Delete an image from Cloudinary
 */
export async function deleteImage(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return false;
  }
}

/**
 * Generate optimized image URL with transformations
 */
export function getOptimizedUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string | number;
    format?: string;
  } = {}
): string {
  const { width, height, quality = 'auto', format = 'auto' } = options;

  const transformations: string[] = [];

  if (width || height) {
    transformations.push(`c_fill,w_${width || 'auto'},h_${height || 'auto'}`);
  } else {
    transformations.push('c_limit,w_1200');
  }

  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);

  return cloudinary.url(publicId, {
    secure: true,
    transformation: transformations.join(','),
  }) || publicId;
}

/**
 * Get placeholder/blur URL for loading states
 */
export function getPlaceholderUrl(publicId: string): string {
  return cloudinary.url(publicId, {
    secure: true,
    transformation: 't_placeholder',
  }) || '';
}

/**
 * Validate image before upload
 */
export function validateImage(file: File): { valid: boolean; error?: string } {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Only JPG, PNG, and WebP are allowed.',
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File too large. Maximum size is 5MB.',
    };
  }

  return { valid: true };
}

export { cloudinary };
