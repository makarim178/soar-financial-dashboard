// A cache to store resources by key
const resourceCache = new Map<string, unknown>();

/**
 * Creates a suspense-compatible resource for data fetching
 * @param fetchFn The async function that fetches data
 * @param cacheKey A unique key to identify this resource in the cache
 * @returns A resource with a read method that works with React Suspense
 */
export default function createSuspenseResource<T>(
  fetchFn: () => Promise<T>,
  cacheKey: string
) {
  // Return cached resource if it exists
  if (resourceCache.has(cacheKey)) {
    return resourceCache.get(cacheKey);
  }
  
  // Create a new resource
  let status = 'pending';
  let result: unknown;
  
  const promise = fetchFn()
    .then(data => {
      status = 'success';
      result = data;
    })
    .catch(error => {
      status = 'error';
      result = error;
    });
  
  const resource = {
    read(): T {
      if (status === 'pending') {
        throw promise;
      } else if (status === 'error') {
        throw result;
      } else {
        return result as T;
      }
    },
    // Optional method to invalidate the cache
    invalidate() {
      resourceCache.delete(cacheKey);
    }
  };
  
  // Store in cache
  resourceCache.set(cacheKey, resource);
  
  return resource;
}