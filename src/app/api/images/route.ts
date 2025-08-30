import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/supabase';
import { auth } from '../../../lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = await auth.getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user images
    const images = await db.getUserImages(user.id);

    return NextResponse.json({
      success: true,
      data: images,
    });
  } catch (error) {
    console.error('Images fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}
