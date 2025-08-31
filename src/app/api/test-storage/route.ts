import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, STORAGE_BUCKET } from '@/lib/supabase';

export async function GET() {
  try {
    // Test storage connection by listing files
    const { data, error } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .list('', { limit: 1 });

    if (error) {
      return NextResponse.json(
        { error: 'Storage connection failed', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase storage connection working',
      bucket: STORAGE_BUCKET,
      files: data
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unexpected error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
