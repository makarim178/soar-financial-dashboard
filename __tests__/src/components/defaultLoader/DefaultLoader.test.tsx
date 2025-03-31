import { render, screen } from '@testing-library/react';
import DefaultLoader from '@/src/components/defaultLoader/DefaultLoader';
import '@testing-library/jest-dom';

describe('DefaultLoader Component', () => {
  it('renders the loader with correct structure', () => {
    render(<DefaultLoader />);
    
    // Check if the status role is present
    const statusElement = screen.getByRole('status');
    expect(statusElement).toBeInTheDocument();
    
    // Check if the SVG is rendered
    const svgElement = statusElement.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    
    // Check if the loading text is present (for screen readers)
    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
    expect(loadingText).toHaveClass('sr-only');
  });

  it('applies the correct styling to the SVG', () => {
    render(<DefaultLoader />);
    
    const svgElement = screen.getByRole('status').querySelector('svg');
    expect(svgElement).toHaveClass('w-4');
    expect(svgElement).toHaveClass('h-4');
    expect(svgElement).toHaveClass('text-gray-200');
    expect(svgElement).toHaveClass('animate-spin');
    expect(svgElement).toHaveClass('dark:text-gray-600');
    expect(svgElement).toHaveClass('fill-blue-600');
  });
});
