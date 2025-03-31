import { render, screen } from '@testing-library/react';
import TransactionPage from '@/app/transactions/page.tsx';
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

describe('TransactionPage', () => {
  it('renders the UnderConstruction component', () => {
    render(<TransactionPage />);
    
    // Check if the UnderConstruction component is rendered
    const underConstructionElement = screen.getByTestId('under-construction');
    expect(underConstructionElement).toBeInTheDocument();
  });

  it('displays the correct heading and message', () => {
    render(<TransactionPage />);
    
    // Check if the heading is rendered
    const headingElement = screen.getByText('Transaction Page');
    expect(headingElement).toBeInTheDocument();
    
    // Check if the message is rendered
    const messageElement = screen.getByText('Under Construction...');
    expect(messageElement).toBeInTheDocument();
  });
});