import { NextRequest, NextResponse } from 'next/server';
import { generateImage } from '../../../lib/ai';
import { db } from '../../../lib/supabase';
import { auth } from '../../../lib/auth';
import { GenerationRequest } from '../../../types';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await auth.getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user has credits
    if (user.credits <= 0) {
      return NextResponse.json(
        { success: false, error: 'Insufficient credits. Please purchase more credits to continue.' },
        { status: 402 }
      );
    }

    const body: GenerationRequest = await request.json();
    const { image_url, era_theme } = body;

    if (!image_url || !era_theme) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: image_url and era_theme' },
        { status: 400 }
      );
    }

    // Generate AI image
    const generationResult = await generateImage({
      image_url,
      era_theme,
      user_id: user.id,
    });

    // Save to database
    const imageRecord = await db.createImage({
      user_id: user.id,
      original_url: image_url,
      generated_url: generationResult.generated_image_url,
      era_theme,
    });

    // Deduct credits
    const newCredits = user.credits - 1;
    await db.updateUserCredits(user.id, newCredits);

    return NextResponse.json({
      success: true,
      data: {
        image: imageRecord,
        generation_result: generationResult,
        remaining_credits: newCredits,
      },
    });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Image generation failed. Please try again.' },
      { status: 500 }
    );
  }
}
