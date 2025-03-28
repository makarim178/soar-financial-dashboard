import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/quickTransfer.json');

// Helper function to read data
function readData() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    return { contacts: [], transfers: [] };
  }
}

// Helper function to write data
function writeData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing data file:', error);
    return false;
  }
}

// GET handler to retrieve contacts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '3');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    const data = readData();
    
    // Sort contacts by last transfer date (most recent first)
    const sortedContacts = data.contacts.sort((a, b) => 
      new Date(b.lastTransfer).getTime() - new Date(a.lastTransfer).getTime()
    );
    
    // Paginate contacts
    const paginatedContacts = sortedContacts.slice(offset, offset + limit);
    const hasMore = offset + limit < sortedContacts.length;
    
    return NextResponse.json({
      contacts: paginatedContacts,
      hasMore,
      total: sortedContacts.length
    });
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
    
    const data = readData();
    
    // Find the contact
    const contactIndex = data.contacts.findIndex(c => c.id === contactId);
    if (contactIndex === -1) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }
    
    // Update the contact's last transfer date
    data.contacts[contactIndex].lastTransfer = new Date().toISOString().split('T')[0];
    
    // Add the transfer to the transfers array
    const newTransfer = {
      id: Date.now(),
      contactId,
      amount: parseFloat(amount),
      date: new Date().toISOString()
    };
    
    data.transfers.push(newTransfer);
    
    // Write the updated data back to the file
    if (writeData(data)) {
      return NextResponse.json({
        success: true,
        transfer: newTransfer,
        contact: data.contacts[contactIndex]
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to save transfer' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in quick-transfer POST API route:', error);
    return NextResponse.json(
      { error: 'Failed to process transfer' },
      { status: 500 }
    );
  }
}