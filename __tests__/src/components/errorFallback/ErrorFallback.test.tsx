import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorFallback } from '@/src/components/errorFallback/ErrorFallback';
import '@testing-library/jest-dom';

describe('ErrorFallback Component', () => {
  const mockError = new Error('Test error message');
  const mockResetErrorBoundary = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the error message correctly', () => {
    render(
      <ErrorFallback 
        error={mockError} 
        resetErrorBoundary={mockResetErrorBoundary} 
      />
    );
    
    // Check if the component displays the error message
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('calls resetErrorBoundary when the button is clicked', () => {
    render(
      <ErrorFallback 
        error={mockError} 
        resetErrorBoundary={mockResetErrorBoundary} 
      />
    );
    
    // Find and click the button
    const button = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(button);
    
    // Check if resetErrorBoundary was called
    expect(mockResetErrorBoundary).toHaveBeenCalledTimes(1);
  });

  it('applies the correct styling', () => {
    render(
      <ErrorFallback 
        error={mockError} 
        resetErrorBoundary={mockResetErrorBoundary} 
      />
    );
    
    // Check if the container has the correct classes
    const container = screen.getByText('Something went wrong').closest('div');
    expect(container).toHaveClass('p-4');
    expect(container).toHaveClass('bg-red-50');
    expect(container).toHaveClass('rounded-lg');
    
    // Check if the heading has the correct classes
    const heading = screen.getByText('Something went wrong');
    expect(heading).toHaveClass('text-xl');
    expect(heading).toHaveClass('font-semibold');
    expect(heading).toHaveClass('mb-2');
    expect(heading).toHaveClass('text-soar-dark');
    
    // Check if the button has the correct classes
    const button = screen.getByRole('button', { name: /try again/i });
    expect(button).toHaveClass('bg-red-600');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('py-2');
    expect(button).toHaveClass('rounded-md');
  });
});
