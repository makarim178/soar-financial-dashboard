import { render, screen, renderHook, act } from '@testing-library/react';
import { UserContextProvider, useUser } from '@/src/context/UserContext';
import '@testing-library/jest-dom';

describe('UserContext', () => {
  describe('UserContextProvider', () => {
    it('renders children correctly', () => {
      render(
        <UserContextProvider>
          <div data-testid="test-child">Test Child</div>
        </UserContextProvider>
      );
      
      const childElement = screen.getByTestId('test-child');
      expect(childElement).toBeInTheDocument();
      expect(childElement).toHaveTextContent('Test Child');
    });
  });

  describe('useUser', () => {
    it('provides the context values', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <UserContextProvider>{children}</UserContextProvider>
      );
      
      const { result } = renderHook(() => useUser(), { wrapper });
      
      // Check initial state
      expect(result.current.userImageNumber).toBe(1);
      
      // Check that setter function is provided
      expect(typeof result.current.setUserImageNumber).toBe('function');
    });

    it('updates userImageNumber state when setUserImageNumber is called', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <UserContextProvider>{children}</UserContextProvider>
      );
      
      const { result } = renderHook(() => useUser(), { wrapper });
      
      // Update userImageNumber state
      act(() => {
        result.current.setUserImageNumber(2);
      });
      
      // Check that userImageNumber was updated
      expect(result.current.userImageNumber).toBe(2);
    });

    it('throws an error when used outside of UserContextProvider', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = jest.fn();
      
      // Expect the hook to throw an error when used outside of provider
      expect(() => {
        renderHook(() => useUser());
      }).toThrow('useSidebar must be used within a SidebarProvider');
      
      // Restore console.error
      console.error = originalError;
    });
  });
});
