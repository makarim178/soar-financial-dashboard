import { render } from '@testing-library/react';
import HomeIcon from '@/src/components/svgIcons/HomeIcon';
import { fillIconColor } from '@/src/utils/helper';
import '@testing-library/jest-dom';

// Mock the helper function
jest.mock('@/src/utils/helper', () => ({
  fillIconColor: jest.fn((fill) => fill === 'light' ? 'var(--soar-light)' : 'var(--soar-dark)'),
}));

describe('HomeIcon Component', () => {
  it('renders with default props', () => {
    const { container } = render(<HomeIcon />);
    
    // Check if the SVG is rendered
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    
    // Check default dimensions
    expect(svgElement).toHaveAttribute('width', '17.5');
    expect(svgElement).toHaveAttribute('height', '17.5');
    
    // Check if fillIconColor was called with the default fill value
    expect(fillIconColor).toHaveBeenCalledWith('light');
    
    // Check if the path exists
    const pathElement = container.querySelector('path');
    expect(pathElement).toBeInTheDocument();
    expect(pathElement).toHaveAttribute('fill', 'var(--soar-light)');
  });

  it('renders with custom props', () => {
    const { container } = render(<HomeIcon fill="dark" width={24} height={24} />);
    
    // Check if the SVG is rendered with custom dimensions
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('width', '24');
    expect(svgElement).toHaveAttribute('height', '24');
    
    // Check if fillIconColor was called with the custom fill value
    expect(fillIconColor).toHaveBeenCalledWith('dark');
    
    // Check if the path has the correct fill
    const pathElement = container.querySelector('path');
    expect(pathElement).toHaveAttribute('fill', 'var(--soar-dark)');
  });
});
