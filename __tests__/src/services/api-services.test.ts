import { fetchQuickTransferData } from '@/src/services/api-services';
import { QuickTransferDataType } from '@/src/types';
import { getApiUrl } from '@/src/utils/getApiUrl';

// Mock the global fetch function
global.fetch = jest.fn();

// Mock the getApiUrl function
jest.mock('@/src/utils/getApiUrl', () => ({
  getApiUrl: jest.fn().mockReturnValue('http://localhost')
}));

// Mock console.error to prevent test output pollution
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('API Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchQuickTransferData', () => {
    it('should fetch data with default parameters', async () => {
      // Mock data
      const mockData: QuickTransferDataType = {
        contacts: [
          { id: 1, name: 'John Doe', position: 'Developer', avatar: '/avatar1.jpg' }
        ],
        hasMore: false,
        total: 1
      };

      // Mock successful response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockData)
      });

      // Call the function with default parameters
      const result = await fetchQuickTransferData({});

      // Assertions
      expect(global.fetch).toHaveBeenCalledWith('http://localhost/api/quick-transfer?limit=3&offset=0');
      expect(result).toEqual(mockData);
    });

    it('should fetch data with custom parameters', async () => {
      // Mock data
      const mockData: QuickTransferDataType = {
        contacts: [
          { id: 2, name: 'Jane Smith', position: 'Designer', avatar: '/avatar2.jpg' },
          { id: 3, name: 'Bob Johnson', position: 'Manager', avatar: '/avatar3.jpg' }
        ],
        hasMore: true,
        total: 5
      };

      // Mock successful response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockData)
      });

      // Call the function with custom parameters
      const result = await fetchQuickTransferData({ limit: 2, offset: 1 });

      // Assertions
      expect(global.fetch).toHaveBeenCalledWith('http://localhost/api/quick-transfer?limit=2&offset=1');
      expect(result).toEqual(mockData);
    });

    it('should handle API errors', async () => {
      // Mock error response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      // Call the function
      const result = await fetchQuickTransferData({});

      // Assertions
      expect(global.fetch).toHaveBeenCalledWith('http://localhost/api/quick-transfer?limit=3&offset=0');
      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe('API returned 500: Internal Server Error');
      expect(console.error).toHaveBeenCalled();
    });

    it('should handle network errors', async () => {
      // Mock network error
      const networkError = new Error('Network error');
      (global.fetch as jest.Mock).mockRejectedValueOnce(networkError);

      // Call the function
      const result = await fetchQuickTransferData({});

      // Assertions
      expect(global.fetch).toHaveBeenCalledWith('http://localhost/api/quick-transfer?limit=3&offset=0');
      expect(result).toBe(networkError);
      expect(console.error).toHaveBeenCalled();
    });

    it('should handle JSON parsing errors', async () => {
      // Mock JSON parsing error
      const jsonError = new Error('Invalid JSON');
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockRejectedValueOnce(jsonError)
      });

      // Call the function
      const result = await fetchQuickTransferData({});

      // Assertions
      expect(global.fetch).toHaveBeenCalledWith('http://localhost/api/quick-transfer?limit=3&offset=0');
      expect(result).toBe(jsonError);
      expect(console.error).toHaveBeenCalled();
    });
  });
});
