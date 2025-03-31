import { render, screen } from '@testing-library/react';
import LoadingSettings from '@/app/settings/loading';
import '@testing-library/jest-dom';

// Mock the DefaultLoader component
jest.mock('@/src/components/defaultLoader/DefaultLoader', () => {
  return function MockDefaultLoader() {
    return <div data-testid="default-loader">Loading...</div>;
  };
});

describe('LoadingSettings Component', () => {
  it('renders the DefaultLoader component', () => {
    render(<LoadingSettings />);

    // Check if the DefaultLoader component is rendered
    const loaderElement = screen.getByTestId('default-loader');
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveTextContent('Loading...');
  });

  it('renders within a div container', () => {
    render(<LoadingSettings />);

    // Check if the loader is within a div container
    const containerElement = screen.getByTestId('default-loader').parentElement;
    expect(containerElement).toBeInTheDocument();
    expect(containerElement?.tagName).toBe('DIV');
  });
});
