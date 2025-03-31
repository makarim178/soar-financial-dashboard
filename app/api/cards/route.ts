import { NextResponse } from 'next/server';
import { CardDataType } from '@/src/types';

export async function GET() {
  try {
    // Mock card data (could be replaced with database call)
    const cards: CardDataType[] = [
      {
        id: '1',
        cardNumber: '3778 **** **** 1234',
        cardHolder: 'Eddy Cusuma',
        validThru: '12/22',
        balance: '$5,756',
        cardType: 'mastercard',
        isDark: true
      },
      {
        id: '2',
        cardNumber: '3778 **** **** 1234',
        cardHolder: 'Eddy Cusuma',
        validThru: '12/22',
        balance: '$5,756',
        cardType: 'visa',
        isDark: false
      },
      {
        id: '3',
        cardNumber: '3778 **** **** 1234',
        cardHolder: 'Eddy Cusuma',
        validThru: '12/22',
        balance: '$5,756',
        cardType: 'mastercard',
        isDark: true
      }
    ];

    return NextResponse.json(cards);
  } catch (error) {
    console.error('Error in cards API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch card data' },
      { status: 500 }
    );
  }
}