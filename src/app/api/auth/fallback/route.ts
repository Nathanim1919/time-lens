import { NextRequest, NextResponse } from 'next/server';

// Temporary fallback for when database is down
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Simple validation
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }
    
    // For testing purposes, allow any email/password combination
    // In production, this would be removed
    if (email && password) {
      return NextResponse.json({
        success: true,
        user: {
          id: 'temp_user_id',
          email: email,
          name: email.split('@')[0],
          currentPlan: 'free',
          subscriptionStatus: 'active'
        },
        message: 'Fallback authentication successful (database unavailable)'
      });
    }
    
  } catch (error) {
    console.error('Fallback auth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
