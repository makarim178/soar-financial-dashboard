import { getApiUrl } from '@/src/utils/getApiUrl';

// Mock the process.env
const originalEnv = process.env;

describe('getApiUrl', () => {
  beforeEach(() => {
    // Clear all mocks
    jest.resetModules();
    
    // Reset process.env
    process.env = { ...originalEnv };
    
    // Mock window.location.origin
    Object.defineProperty(window, 'location', {
      value: {
        origin: 'http://localhost:3000'
      },
      writable: true
    });
  });

  afterAll(() => {
    // Restore process.env
    process.env = originalEnv;
  });

  it('returns the NEXT_PUBLIC_API_URL when it is set', () => {
    // Set the environment variable
    process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com';
    
    // Call the function
    const result = getApiUrl();
    
    // Check the result
    expect(result).toBe('https://api.example.com');
  });

  it('returns window.location.origin when NEXT_PUBLIC_API_URL is not set', () => {
    // Ensure the environment variable is not set
    delete process.env.NEXT_PUBLIC_API_URL;
    
    // Call the function
    const result = getApiUrl();
    
    // Check the result
    expect(result).toBe('http://localhost:3000');
  });

  it('returns an empty string when window is not defined and NEXT_PUBLIC_API_URL is not set', () => {
    // Ensure the environment variable is not set
    delete process.env.NEXT_PUBLIC_API_URL;
    
    // Mock window as undefined
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => undefined as any);
    
    // Call the function
    const result = getApiUrl();
    
    // Check the result
    expect(result).toBe('');
    
    // Restore window
    windowSpy.mockRestore();
  });
});
