import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data for expense statistics
    const expenseData = {
      labels: ['Entertainment', 'Investment', 'Bill Expense', 'Others'],
      percentages: [30, 20, 15, 35],
      colors: ['#2D3B72', '#4361EE', '#FF8A00', '#1E1E1E']
    };

    return NextResponse.json(expenseData);
  } catch (error) {
    console.error('Error in expense-statistics API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch expense statistics data' },
      { status: 500 }
    );
  }
}