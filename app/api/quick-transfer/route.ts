import { NextResponse } from 'next/server';
import { getContacts, getContactById, createTransfer } from '@/src/lib/db/quickTransfer';

// GET handler to retrieve contacts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '3');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    const result = await getContacts(limit, offset);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in quick-transfer GET API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quick transfer data' },
      { status: 500 }
    );
  }
}

// POST handler to add a new transfer
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contactId, amount } = body;
    
    if (!contactId || !amount) {
      return NextResponse.json(
        { error: 'Contact ID and amount are required' },
        { status: 400 }
      );
    }
    
    // Find the contact
    const contact = await getContactById(contactId);
    
    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }
    
    // Add the transfer
    const result = await createTransfer(contactId, parseFloat(amount));
    
    return NextResponse.json({
      success: true,
      message: 'Transfer created successfully',
      transferId: result.lastID
    });
  } catch (error) {
    console.error('Error in quick-transfer POST API route:', error);
    return NextResponse.json(
      { error: 'Failed to create transfer' },
      { status: 500 }
    );
  }
}
