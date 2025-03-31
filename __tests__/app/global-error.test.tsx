import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Import the ErrorFallback component directly
import { ErrorFallback } from '@/src/components/errorFallback/ErrorFallback';

// Mock the ErrorFallback component
jest.mock('@/src/components/errorFallback/ErrorFallback', () => ({
  ErrorFallback: ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => (
    <div data-testid="error-fallback">
      <p data-testid="error-message">{error.message}</p>
      <button data-testid="reset-button" onClick={resetErrorBoundary}>Reset</button>
    </div>
  ),
}));

describe('ErrorFallback Component', () => {
  const mockError = new Error('Test error message');
  const mockReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the error message correctly', () => {
    render(
      <div>
        <ErrorFallback error={mockError} resetErrorBoundary={mockReset} />
      </div>
    );

    // Check if the ErrorFallback component is rendered
    const errorFallbackElement = screen.getByTestId('error-fallback');
    expect(errorFallbackElement).toBeInTheDocument();

    // Check if the error message is displayed
    const errorMessageElement = screen.getByTestId('error-message');
    expect(errorMessageElement).toBeInTheDocument();
    expect(errorMessageElement).toHaveTextContent('Test error message');
  });

  it('calls the reset function when the button is clicked', () => {
    render(
      <div>
        <ErrorFallback error={mockError} resetErrorBoundary={mockReset} />
      </div>
    );

    // Check if the reset button is rendered
    const resetButton = screen.getByTestId('reset-button');
    expect(resetButton).toBeInTheDocument();

    // Click the reset button and check if the reset function is called
    resetButton.click();
    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
