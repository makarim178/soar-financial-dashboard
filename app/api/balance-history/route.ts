import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data for balance history (monthly data from Jul to Jan)
    const balanceData = {
      labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
      balances: [120, 320, 250, 480, 780, 230, 580, 640]
    };

    return NextResponse.json(balanceData);
  } catch (error) {
    console.error('Error in balance-history API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch balance history data' },
      { status: 500 }
    );
  }
}