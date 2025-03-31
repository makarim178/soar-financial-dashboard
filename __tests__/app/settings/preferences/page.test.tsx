import { render, screen } from '@testing-library/react';
import PreferencePage from '@/app/settings/preferences/page.tsx';
import '@testing-library/jest-dom';

// Mock the UnderConstruction component
jest.mock('@/src/components/underConstruction/UnderConstruction', () => {
  return function MockUnderConstruction() {
    return (
      <section data-testid="under-construction">
        <h1>Transaction Page</h1>
        <p>Under Construction... </p>
      </section>
    );
  };
});

describe('PreferencePage', () => {
  it('renders the UnderConstruction component', () => {
    render(<PreferencePage />);
    
    // Check if the UnderConstruction component is rendered
    const underConstructionElement = screen.getByTestId('under-construction');
    expect(underConstructionElement).toBeInTheDocument();
  });

  it('displays the correct heading and message', () => {
    render(<PreferencePage />);
    
    // Check if the heading is rendered
    const headingElement = screen.getByText('Transaction Page');
    expect(headingElement).toBeInTheDocument();
    
    // Check if the message is rendered
    const messageElement = screen.getByText('Under Construction...');
    expect(messageElement).toBeInTheDocument();
  });
});