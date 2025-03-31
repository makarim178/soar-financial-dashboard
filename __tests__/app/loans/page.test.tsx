import { render, screen } from '@testing-library/react';
import LoansPage from '@/app/loans/page.tsx';
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

describe('LoansPage', () => {
  it('renders the UnderConstruction component', () => {
    render(<LoansPage />);
    
    // Check if the UnderConstruction component is rendered
    const underConstructionElement = screen.getByTestId('under-construction');
    expect(underConstructionElement).toBeInTheDocument();
  });

  it('displays the correct heading and message', () => {
    render(<LoansPage />);
    
    // Check if the heading is rendered
    const headingElement = screen.getByText('Transaction Page');
    expect(headingElement).toBeInTheDocument();
    
    // Check if the message is rendered
    const messageElement = screen.getByText('Under Construction...');
    expect(messageElement).toBeInTheDocument();
  });
});