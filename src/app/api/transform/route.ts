import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { 
  supabaseAdmin, 
  STORAGE_BUCKET,
  getOriginalImagePath,
  getTransformedImagePath,
  uploadBase64Image,
  getImageUrl,
  deleteImage
} from '@/lib/supabase';
import { generateDecadeImage, getEraPrompt } from '@/services/AiService';
import { UsageService } from '@/services/UsageService';

export async function POST(request: NextRequest) {
  try {
    // Get user session
    const session = await auth.api.getSession({
        headers: request.headers,
    });
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Check usage limits before processing
    const usageCheck = await UsageService.canTransform(userId);
    if (!usageCheck.canTransform) {
      return NextResponse.json({
        error: 'Daily limit reached',
        details: `You have used ${usageCheck.limit - usageCheck.remaining} of ${usageCheck.limit} daily transformations. Please upgrade your plan for more transformations.`,
        usage: usageCheck
      }, { status: 429 });
    }

    // Parse request body
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const eraTheme = formData.get('eraTheme') as string;
    const customPrompt = formData.get('customPrompt') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    if (!eraTheme && !customPrompt) {
      return NextResponse.json(
        { error: 'No era theme or custom prompt provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload an image.' },
        { status: 400 }
      );
    }

    // Generate file paths
    const originalPath = getOriginalImagePath(userId, file.name);
    const transformedPath = getTransformedImagePath(userId, file.name);

    let originalUrl: string;
    let transformedUrl: string;

    try {
      // Step 1: Upload original image to Supabase
      const uploadResult = await supabaseAdmin.storage
        .from(STORAGE_BUCKET)
        .upload(originalPath, file, {
          contentType: file.type,
          cacheControl: '3600',
          upsert: false
        });

      if (uploadResult.error) {
        throw new Error(`Failed to upload original image: ${uploadResult.error.message}`);
      }

      originalUrl = getImageUrl(originalPath);

      // Step 2: Convert file to base64 for AI processing
      const arrayBuffer = await file.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      const mimeType = file.type;
      const imageDataUrl = `data:${mimeType};base64,${base64}`;

      // Step 3: Generate AI transformation
      let prompt: string;
      if (customPrompt) {
        // Use custom prompt if provided
        prompt = customPrompt;
      } else if (eraTheme) {
        // Use professional era prompt if era theme is selected
        prompt = getEraPrompt(eraTheme);
      } else {
        throw new Error('No era theme or custom prompt provided');
      }
      
      const transformedImageDataUrl = await generateDecadeImage(imageDataUrl, prompt);

      // Step 4: Upload transformed image to Supabase
      const transformedUploadResult = await uploadBase64Image(
        transformedImageDataUrl,
        transformedPath,
        mimeType
      );

      transformedUrl = getImageUrl(transformedPath);

      // Step 5: Save to database
      const imageRecord = await prisma.image.create({
        data: {
          userId,
          originalUrl,
          generatedUrl: transformedUrl,
          eraTheme: eraTheme || 'custom'
        }
      });

      // Step 6: Increment usage counter
      await UsageService.incrementUsage(userId);

      return NextResponse.json({
        success: true,
        image: {
          id: imageRecord.id,
          originalUrl,
          generatedUrl: transformedUrl,
          eraTheme: imageRecord.eraTheme,
          createdAt: imageRecord.createdAt
        },
        usage: {
          remaining: usageCheck.remaining - 1,
          limit: usageCheck.limit
        }
      });

    } catch (error) {
      // Cleanup: Delete uploaded files if any step fails
      try {
        await deleteImage(originalPath);
        await deleteImage(transformedPath);
      } catch (cleanupError) {
        console.error('Failed to cleanup files:', cleanupError);
      }

      throw error;
    }

  } catch (error) {
    console.error('Transform API error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        error: 'Transformation failed', 
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}
