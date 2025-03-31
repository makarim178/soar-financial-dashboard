import { NextResponse } from 'next/server';

export async function GET(): Promise<Response> {
  try {
    // Mock data for weekly activity
    const weeklyData = {
      labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      deposits: [230.0, 120.0, 260.0, 370.0, 240.0, 230.0, 340.0],
      withdrawals: [470.0, 340.0, 320.0, 470.0, 150.0, 380.0, 390.0] 
    };

    return NextResponse.json(weeklyData);
  } catch (error) {
    console.error('Error in weekly-activity API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weekly activity data' },
      { status: 500 }
    );
  }
}
