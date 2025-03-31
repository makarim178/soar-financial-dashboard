import { render, screen, renderHook, act } from '@testing-library/react';
import { SidebarProvider, useSidebar } from '@/src/context/SidebarContext';
import '@testing-library/jest-dom';

describe('SidebarContext', () => {
  describe('SidebarProvider', () => {
    it('renders children correctly', () => {
      render(
        <SidebarProvider>
          <div data-testid="test-child">Test Child</div>
        </SidebarProvider>
      );
      
      const childElement = screen.getByTestId('test-child');
      expect(childElement).toBeInTheDocument();
      expect(childElement).toHaveTextContent('Test Child');
    });
  });

  describe('useSidebar', () => {
    it('provides the context values', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <SidebarProvider>{children}</SidebarProvider>
      );
      
      const { result } = renderHook(() => useSidebar(), { wrapper });
      
      // Check initial state
      expect(result.current.isOpen).toBe(false);
      expect(result.current.selectedLabel).toBe('');
      
      // Check that functions are provided
      expect(typeof result.current.setIsOpen).toBe('function');
      expect(typeof result.current.toggleSidebar).toBe('function');
      expect(typeof result.current.setSelectedLabel).toBe('function');
    });

    it('updates isOpen state when setIsOpen is called', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <SidebarProvider>{children}</SidebarProvider>
      );
      
      const { result } = renderHook(() => useSidebar(), { wrapper });
      
      // Update isOpen state
      act(() => {
        result.current.setIsOpen(true);
      });
      
      // Check that isOpen was updated
      expect(result.current.isOpen).toBe(true);
    });

    it('toggles isOpen state when toggleSidebar is called', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <SidebarProvider>{children}</SidebarProvider>
      );
      
      const { result } = renderHook(() => useSidebar(), { wrapper });
      
      // Initial state should be false
      expect(result.current.isOpen).toBe(false);
      
      // Toggle isOpen state
      act(() => {
        result.current.toggleSidebar();
      });
      
      // isOpen should now be true
      expect(result.current.isOpen).toBe(true);
      
      // Toggle isOpen state again
      act(() => {
        result.current.toggleSidebar();
      });
      
      // isOpen should now be false again
      expect(result.current.isOpen).toBe(false);
    });

    it('updates selectedLabel state when setSelectedLabel is called', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <SidebarProvider>{children}</SidebarProvider>
      );
      
      const { result } = renderHook(() => useSidebar(), { wrapper });
      
      // Update selectedLabel state
      act(() => {
        result.current.setSelectedLabel('Dashboard');
      });
      
      // Check that selectedLabel was updated
      expect(result.current.selectedLabel).toBe('Dashboard');
    });

    it('throws an error when used outside of SidebarProvider', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = jest.fn();
      
      // Expect the hook to throw an error when used outside of provider
      expect(() => {
        renderHook(() => useSidebar());
      }).toThrow('useSidebar must be used within a SidebarProvider');
      
      // Restore console.error
      console.error = originalError;
    });
  });
});
