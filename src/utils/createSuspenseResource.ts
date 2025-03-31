/**
 * Creates a resource that can be used with React Suspense for data fetching
 * @param fetchFn - The async function that fetches data
 * @param cacheKey - Optional key for caching the result
 * @returns A resource object with a read method
 */
export default function createSuspenseResource<T>(
  fetchFn: () => Promise<T>,
  cacheKey?: string
) {
  // Use a simple cache to avoid refetching
  const cache = new Map<string, T>();
  
  // Track the promise state
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: T;
  let error: Error;
  
  // Start the fetch immediately
  const promise = fetchFn().then(
    (data: T) => {
      status = 'success';
      result = data;
      if (cacheKey) {
        cache.set(cacheKey, data);
      }
    },
    (e: Error) => {
      status = 'error';
      error = e;
    }
  );
  
  // Return a resource object with a read method
  return {
    read(): T {
      // If we've already cached this data, return it immediately
      if (cacheKey && cache.has(cacheKey)) {
        return cache.get(cacheKey) as T;
      }
      
      // Handle the different states
      switch (status) {
        case 'pending':
          throw promise; // This tells React to suspend
        case 'error':
          throw error; // This tells React to show the error boundary
        case 'success':
          return result;
      }
    }
  };
}
