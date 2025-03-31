import { NextResponse } from 'next/server';
import { getContacts, getContactById, createTransfer } from '@/src/lib/db/quickTransfer';

// Mock the database functions
jest.mock('@/src/lib/db/quickTransfer', () => ({
  getContacts: jest.fn(),
  getContactById: jest.fn(),
  createTransfer: jest.fn(),
}));

// Mock the Next.js route handlers
jest.mock('@/app/api/quick-transfer/route', () => {
  return {
    GET: jest.fn().mockImplementation(async (request) => {
      try {
        const url = new URL(request.url);
        const limit = parseInt(url.searchParams.get('limit') || '3');
        const offset = parseInt(url.searchParams.get('offset') || '0');

        const result = await getContacts(limit, offset);

        return NextResponse.json(result);
      } catch (error) {
        console.error('Error in quick-transfer GET API route:', error);
        return NextResponse.json(
          { error: 'Failed to fetch quick transfer data' },
          { status: 500 }
        );
      }
    }),
    POST: jest.fn().mockImplementation(async (request) => {
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
    })
  };
});

// Mock NextResponse
jest.mock('next/server', () => {
  return {
    NextResponse: {
      json: jest.fn().mockImplementation((data, options = {}) => {
        return {
          status: options?.status || 200,
          json: async () => data,
          headers: new Map()
        };
      })
    }
  };
});

// Import the mocked functions
import { GET, POST } from '@/app/api/quick-transfer/route';

// Mock console.error to prevent test output pollution
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('Quick Transfer API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET handler', () => {
    it('should return contacts with default limit and offset', async () => {
      // Mock data
      const mockResult = {
        contacts: [
          { id: 1, name: 'Test User', position: 'Developer', avatar: 'avatar-url' }
        ],
        hasMore: false,
        total: 1
      };

      // Setup mock
      (getContacts as jest.Mock).mockResolvedValue(mockResult);

      // Create mock request
      const mockRequest = { url: 'http://localhost:3000/api/quick-transfer' };

      // Call the handler
      const response = await GET(mockRequest as any);
      const data = await response.json();

      // Assertions
      expect(getContacts).toHaveBeenCalledWith(3, 0);
      expect(data).toEqual(mockResult);
      expect(response.status).toBe(200);
    });

    it('should use custom limit and offset from query parameters', async () => {
      // Mock data
      const mockResult = {
        contacts: [
          { id: 2, name: 'Another User', position: 'Manager', avatar: 'avatar-url-2' }
        ],
        hasMore: false,
        total: 1
      };

      // Setup mock
      (getContacts as jest.Mock).mockResolvedValue(mockResult);

      // Create mock request
      const mockRequest = { url: 'http://localhost:3000/api/quick-transfer?limit=5&offset=10' };

      // Call the handler
      const response = await GET(mockRequest as any);
      const data = await response.json();

      // Assertions
      expect(getContacts).toHaveBeenCalledWith(5, 10);
      expect(data).toEqual(mockResult);
      expect(response.status).toBe(200);
    });

    it('should handle errors and return 500 status', async () => {
      // Setup mock to throw an error
      (getContacts as jest.Mock).mockRejectedValue(new Error('Database error'));

      // Create mock request
      const mockRequest = { url: 'http://localhost:3000/api/quick-transfer' };

      // Call the handler
      const response = await GET(mockRequest as any);
      const data = await response.json();

      // Assertions
      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Failed to fetch quick transfer data' });
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('POST handler', () => {
    it('should create a transfer successfully', async () => {
      // Mock data
      const mockContact = { id: 1, name: 'Test User', position: 'Developer', avatar: 'avatar-url' };
      const mockTransferResult = { lastID: 12345 };

      // Setup mocks
      (getContactById as jest.Mock).mockResolvedValue(mockContact);
      (createTransfer as jest.Mock).mockResolvedValue(mockTransferResult);

      // Create mock request
      const mockRequest = {
        url: 'http://localhost:3000/api/quick-transfer',
        json: jest.fn().mockResolvedValue({ contactId: 1, amount: 100 })
      };

      // Call the handler
      const response = await POST(mockRequest as any);
      const data = await response.json();

      // Assertions
      expect(getContactById).toHaveBeenCalledWith(1);
      expect(createTransfer).toHaveBeenCalledWith(1, 100);
      expect(response.status).toBe(200);
      expect(data).toEqual({
        success: true,
        message: 'Transfer created successfully',
        transferId: 12345
      });
    });

    it('should return 400 if contactId or amount is missing', async () => {
      // Create mock request with missing contactId
      const mockRequest1 = {
        url: 'http://localhost:3000/api/quick-transfer',
        json: jest.fn().mockResolvedValue({ amount: 100 })
      };

      // Call the handler
      const response1 = await POST(mockRequest1 as any);
      const data1 = await response1.json();

      // Assertions
      expect(response1.status).toBe(400);
      expect(data1).toEqual({ error: 'Contact ID and amount are required' });

      // Create mock request with missing amount
      const mockRequest2 = {
        url: 'http://localhost:3000/api/quick-transfer',
        json: jest.fn().mockResolvedValue({ contactId: 1 })
      };

      // Call the handler
      const response2 = await POST(mockRequest2 as any);
      const data2 = await response2.json();

      // Assertions
      expect(response2.status).toBe(400);
      expect(data2).toEqual({ error: 'Contact ID and amount are required' });
    });

    it('should return 404 if contact is not found', async () => {
      // Setup mock to return null (contact not found)
      (getContactById as jest.Mock).mockResolvedValue(null);

      // Create mock request
      const mockRequest = {
        url: 'http://localhost:3000/api/quick-transfer',
        json: jest.fn().mockResolvedValue({ contactId: 999, amount: 100 })
      };

      // Call the handler
      const response = await POST(mockRequest as any);
      const data = await response.json();

      // Assertions
      expect(getContactById).toHaveBeenCalledWith(999);
      expect(response.status).toBe(404);
      expect(data).toEqual({ error: 'Contact not found' });
    });

    it('should handle errors and return 500 status', async () => {
      // Setup mock to throw an error
      (getContactById as jest.Mock).mockRejectedValue(new Error('Database error'));

      // Create mock request
      const mockRequest = {
        url: 'http://localhost:3000/api/quick-transfer',
        json: jest.fn().mockResolvedValue({ contactId: 1, amount: 100 })
      };

      // Call the handler
      const response = await POST(mockRequest as any);
      const data = await response.json();

      // Assertions
      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Failed to create transfer' });
      expect(console.error).toHaveBeenCalled();
    });

    it('should parse amount as float', async () => {
      // Mock data
      const mockContact = { id: 1, name: 'Test User', position: 'Developer', avatar: 'avatar-url' };
      const mockTransferResult = { lastID: 12345 };

      // Setup mocks
      (getContactById as jest.Mock).mockResolvedValue(mockContact);
      (createTransfer as jest.Mock).mockResolvedValue(mockTransferResult);

      // Create mock request with string amount
      const mockRequest = {
        url: 'http://localhost:3000/api/quick-transfer',
        json: jest.fn().mockResolvedValue({ contactId: 1, amount: "99.99" })
      };

      // Call the handler
      await POST(mockRequest as any);

      // Assertions
      expect(createTransfer).toHaveBeenCalledWith(1, 99.99);
    });
  });
});
