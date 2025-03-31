import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock transaction data
    const transactions = [
      { 
        id: '5289e3d6-2b45-4f14-a2e1-ce9f16f2f568',
        description: 'Deposit from my Card',
        date: '28 January 2021', 
        amount: -850,
        currency: 'USD', 
        source: 'card' 
      },
      { 
        id: '70a3e2dc-fe97-44fd-87db-7ac3b5c45541', 
        description: 'Deposit Paypal', 
        date: '25 January 2021', 
        amount: 2500, 
        currency: 'USD', 
        source: 'paypal' 
      },
      { 
        id: 'b6470da3-9193-40a6-b4d2-7ac6f8c9cad5', 
        description: 'Jemi Wilson', 
        date: '21 January 2021',
        amount: 5400, 
        currency: 'CAD',
        source: 'money' 
      },
    ];

    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error in transactions API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transaction data' },
      { status: 500 }
    );
  }
}