/**
 * Returns the base API URL for the application.
 * Works in both client and server environments.
 * 
 * @returns {string} The base URL for API requests
 */
export function getApiUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL || 
    (typeof window !== 'undefined' ? window.location.origin : '');
}
