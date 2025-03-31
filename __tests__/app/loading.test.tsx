import { render, screen } from '@testing-library/react';
import Loading from '@/app/loading';
import '@testing-library/jest-dom';

// Mock the DefaultLoader component
jest.mock('@/src/components/defaultLoader/DefaultLoader', () => {
  return function MockDefaultLoader() {
    return <div data-testid="default-loader">Loading...</div>;
  };
});

describe('Loading Component', () => {
  it('renders the DefaultLoader component', () => {
    render(<Loading />);
    
    // Check if the DefaultLoader component is rendered
    const loaderElement = screen.getByTestId('default-loader');
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveTextContent('Loading...');
  });

  it('renders within a div container', () => {
    render(<Loading />);
    
    // Check if the loader is within a div container
    const containerElement = screen.getByTestId('default-loader').parentElement;
    expect(containerElement).toBeInTheDocument();
    expect(containerElement?.tagName).toBe('DIV');
  });
});
