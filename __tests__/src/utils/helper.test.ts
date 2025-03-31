import { fillIconColor, formatCurrency, formatColors } from '@/src/utils/helper';
import wrapPromise from '@/src/utils/helper';

describe('Helper Functions', () => {
  describe('fillIconColor', () => {
    it('should return light color variable when fill is "light"', () => {
      const result = fillIconColor('light');
      expect(result).toBe('var(--soar-light)');
    });

    it('should return dark color variable when fill is not "light"', () => {
      const result1 = fillIconColor('dark');
      const result2 = fillIconColor('');
      const result3 = fillIconColor('any-other-value');

      expect(result1).toBe('var(--soar-dark)');
      expect(result2).toBe('var(--soar-dark)');
      expect(result3).toBe('var(--soar-dark)');
    });
  });

  describe('formatCurrency', () => {
    it('should format positive numbers correctly', () => {
      const result1 = formatCurrency(1234.56, 'USD');
      const result2 = formatCurrency(1000, 'EUR');
      const result3 = formatCurrency(99.99, 'GBP');

      expect(result1).toBe('$1,234.56');
      expect(result2).toBe('€1,000.00');
      expect(result3).toBe('£99.99');
    });

    it('should format negative numbers correctly', () => {
      const result1 = formatCurrency(-1234.56, 'USD');
      const result2 = formatCurrency(-1000, 'EUR');
      const result3 = formatCurrency(-99.99, 'GBP');

      expect(result1).toBe('-$1,234.56');
      expect(result2).toBe('-€1,000.00');
      expect(result3).toBe('-£99.99');
    });

    it('should format zero correctly', () => {
      const result1 = formatCurrency(0, 'USD');
      const result2 = formatCurrency(0, 'EUR');
      const result3 = formatCurrency(0, 'GBP');

      expect(result1).toBe('$0.00');
      expect(result2).toBe('€0.00');
      expect(result3).toBe('£0.00');
    });

    it('should handle decimal places correctly', () => {
      const result1 = formatCurrency(1234.5, 'USD');
      const result2 = formatCurrency(1234.567, 'USD');
      const result3 = formatCurrency(1234, 'USD');

      expect(result1).toBe('$1,234.50');
      expect(result2).toBe('$1,234.57'); // Should round to 2 decimal places
      expect(result3).toBe('$1,234.00');
    });
  });

  describe('formatColors', () => {
    it('should return positive transaction color for positive amounts', () => {
      const result1 = formatColors(100);
      const result2 = formatColors(0.01);
      const result3 = formatColors(Number.MAX_SAFE_INTEGER);

      expect(result1).toBe('text-trans-pos');
      expect(result2).toBe('text-trans-pos');
      expect(result3).toBe('text-trans-pos');
    });

    it('should return negative transaction color for negative amounts', () => {
      const result1 = formatColors(-100);
      const result2 = formatColors(-0.01);
      const result3 = formatColors(Number.MIN_SAFE_INTEGER);

      expect(result1).toBe('text-trans-neg');
      expect(result2).toBe('text-trans-neg');
      expect(result3).toBe('text-trans-neg');
    });

    it('should return negative transaction color for zero', () => {
      const result = formatColors(0);
      expect(result).toBe('text-trans-neg');
    });
  });

  describe('wrapPromise', () => {
    it('should handle resolved promises', async () => {
      const mockData = { id: 1, name: 'Test' };
      const promise = Promise.resolve(mockData);
      const wrapped = wrapPromise(promise);

      // Wait for the promise to resolve
      await promise;

      // Now read should return the resolved value
      const result = wrapped.read();
      expect(result).toEqual(mockData);
    });

    it('should throw for pending promises', () => {
      // Create a promise that won't resolve immediately
      const promise = new Promise((resolve) => {
        setTimeout(() => resolve({ id: 1 }), 1000);
      });
      
      const wrapped = wrapPromise(promise);

      // Expect read to throw the promise itself
      expect(() => wrapped.read()).toThrow();
    });

    it('should throw for rejected promises', async () => {
      const error = new Error('Test error');
      const promise = Promise.reject(error);
      const wrapped = wrapPromise(promise);

      // Wait for the promise to reject (and suppress the unhandled rejection)
      try {
        await promise;
      } catch (e) {
        // Expected
      }

      // Now read should throw the error
      expect(() => wrapped.read()).toThrow(error);
    });

    it('should transition from pending to success state', async () => {
      let resolvePromise: (value: unknown) => void;
      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });
      
      const wrapped = wrapPromise(promise);

      // Initially in pending state
      expect(() => wrapped.read()).toThrow();

      // Resolve the promise
      resolvePromise!({ id: 2, name: 'Test 2' });
      
      // Wait for the promise to resolve
      await promise;

      // Now should be in success state
      const result = wrapped.read();
      expect(result).toEqual({ id: 2, name: 'Test 2' });
    });

    it('should transition from pending to error state', async () => {
      let rejectPromise: (reason: unknown) => void;
      const promise = new Promise((resolve, reject) => {
        rejectPromise = reject;
      });
      
      const wrapped = wrapPromise(promise);

      // Initially in pending state
      expect(() => wrapped.read()).toThrow();

      // Reject the promise
      const error = new Error('Test rejection');
      rejectPromise!(error);
      
      // Wait for the promise to reject (and suppress the unhandled rejection)
      try {
        await promise;
      } catch (e) {
        // Expected
      }

      // Now should be in error state
      expect(() => wrapped.read()).toThrow(error);
    });
  });
});
