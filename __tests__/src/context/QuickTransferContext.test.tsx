import { render, screen, renderHook, act } from '@testing-library/react';
import { QuickTransferProvider, useQuickTransfer } from '@/src/context/QuickTransferContext';
import '@testing-library/jest-dom';

describe('QuickTransferContext', () => {
  describe('QuickTransferProvider', () => {
    it('renders children correctly', () => {
      render(
        <QuickTransferProvider>
          <div data-testid="test-child">Test Child</div>
        </QuickTransferProvider>
      );
      
      const childElement = screen.getByTestId('test-child');
      expect(childElement).toBeInTheDocument();
      expect(childElement).toHaveTextContent('Test Child');
    });
  });

  describe('useQuickTransfer', () => {
    it('provides the context values', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QuickTransferProvider>{children}</QuickTransferProvider>
      );
      
      const { result } = renderHook(() => useQuickTransfer(), { wrapper });
      
      // Check initial state
      expect(result.current.contacts).toEqual([]);
      expect(result.current.hasMore).toBe(true);
      expect(result.current.total).toBe(0);
      
      // Check that setter functions are provided
      expect(typeof result.current.setContacts).toBe('function');
      expect(typeof result.current.setHasMore).toBe('function');
      expect(typeof result.current.setTotal).toBe('function');
    });

    it('updates state when setters are called', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QuickTransferProvider>{children}</QuickTransferProvider>
      );
      
      const { result } = renderHook(() => useQuickTransfer(), { wrapper });
      
      // Mock contact data
      const mockContacts = [
        { id: 1, name: 'John Doe', position: 'Developer', avatar: '/avatar1.jpg' }
      ];
      
      // Update state using setters
      act(() => {
        result.current.setContacts(mockContacts);
        result.current.setHasMore(false);
        result.current.setTotal(1);
      });
      
      // Check that state was updated
      expect(result.current.contacts).toEqual(mockContacts);
      expect(result.current.hasMore).toBe(false);
      expect(result.current.total).toBe(1);
    });

    it('throws an error when used outside of QuickTransferProvider', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = jest.fn();
      
      // Expect the hook to throw an error when used outside of provider
      expect(() => {
        renderHook(() => useQuickTransfer());
      }).toThrow('useQuickTransfer must be used within a QuickTransferProvider');
      
      // Restore console.error
      console.error = originalError;
    });
  });
});
