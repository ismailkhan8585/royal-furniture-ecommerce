import { NextRequest, NextResponse } from 'next/server';
import { CLOUDINARY_FOLDERS, uploadImage, UploadType } from '@/lib/cloudinary';
import { validateImage } from '@/lib/cloudinary';

const validUploadTypes = new Set<UploadType>(
  Object.keys(CLOUDINARY_FOLDERS) as UploadType[]
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const typeValue = formData.get('type');
    const id = formData.get('id') as string | null;

    if (!file || typeof typeValue !== 'string') {
      return NextResponse.json(
        { success: false, error: 'File and type are required' },
        { status: 400 }
      );
    }

    const type = typeValue as UploadType;

    if (!validUploadTypes.has(type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid upload type' },
        { status: 400 }
      );
    }

    // Validate image
    const validation = validateImage(file);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const result = await uploadImage(base64, {
      type,
      id: id || undefined,
    });

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Failed to upload image' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      publicId: result.publicId,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
