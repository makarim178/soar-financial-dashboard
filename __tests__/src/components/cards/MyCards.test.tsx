import { render, screen } from '@testing-library/react';
import MyCards from '@/src/components/cards/MyCards';
import '@testing-library/jest-dom';
import { getApiUrl } from '@/src/utils/getApiUrl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the BankCard component
jest.mock('@/src/components/cards/bankCard/BankCard', () => {
  return function MockBankCard({ card }: { card: any }) {
    return (
      <div data-testid={`bank-card-${card.id}`} className="mock-bank-card">
        <p>Card Number: {card.cardNumber}</p>
        <p>Card Holder: {card.cardHolder}</p>
        <p>Card Type: {card.cardType}</p>
      </div>
    );
  };
});

// Mock the next/link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode, href: string }) => (
    <a href={href} data-testid="mock-link">
      {children}
    </a>
  );
});

// Mock the getApiUrl function
jest.mock('@/src/utils/getApiUrl', () => ({
  getApiUrl: jest.fn().mockReturnValue('http://localhost')
}));

// Mock the createSuspenseResource function
jest.mock('@/src/utils/createSuspenseResource', () => {
  return function mockCreateSuspenseResource() {
    return {
      read: () => [
        {
          id: 1,
          cardNumber: '**** **** **** 1234',
          cardHolder: 'John Doe',
          expiryDate: '12/25',
          cardType: 'visa',
          balance: 5000,
          currency: 'USD'
        },
        {
          id: 2,
          cardNumber: '**** **** **** 5678',
          cardHolder: 'Jane Smith',
          expiryDate: '06/24',
          cardType: 'mastercard',
          balance: 3500,
          currency: 'USD'
        }
      ]
    };
  };
});

// Mock the fetch function
global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      {
        id: 1,
        cardNumber: '**** **** **** 1234',
        cardHolder: 'John Doe',
        expiryDate: '12/25',
        cardType: 'visa',
        balance: 5000,
        currency: 'USD'
      },
      {
        id: 2,
        cardNumber: '**** **** **** 5678',
        cardHolder: 'Jane Smith',
        expiryDate: '06/24',
        cardType: 'mastercard',
        balance: 3500,
        currency: 'USD'
      }
    ])
  })
);

// Mock the DefaultLoader component
jest.mock('@/src/components/defaultLoader/DefaultLoader', () => {
  return function MockDefaultLoader() {
    return <div data-testid="mock-loader">Loading...</div>;
  };
});

// Mock the useQuery hook
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn().mockReturnValue({
    data: [
      {
        id: 1,
        cardNumber: '**** **** **** 1234',
        cardHolder: 'John Doe',
        expiryDate: '12/25',
        cardType: 'visa',
        balance: 5000,
        currency: 'USD'
      },
      {
        id: 2,
        cardNumber: '**** **** **** 5678',
        cardHolder: 'Jane Smith',
        expiryDate: '06/24',
        cardType: 'mastercard',
        balance: 3500,
        currency: 'USD'
      }
    ],
    isLoading: false,
    error: null
  }),
  QueryClient: jest.fn(),
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => children
}));

describe('MyCards Component', () => {
  it('renders the component title correctly', () => {
    render(<MyCards />);

    // Check if the title is rendered
    const titleElement = screen.getByText('My Cards');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('text-xl');
    expect(titleElement).toHaveClass('font-bold');
    expect(titleElement).toHaveClass('text-title');
  });

  it('renders the "See All" link correctly', () => {
    render(<MyCards />);

    // Check if the "See All" link is rendered
    const linkElement = screen.getByText('See All');
    expect(linkElement).toBeInTheDocument();

    // Check if the link has the correct href
    const anchorElement = screen.getByTestId('mock-link');
    expect(anchorElement).toHaveAttribute('href', '/credit-cards');
  });

  it('renders all cards from the sample data', () => {
    render(<MyCards />);

    // Check if all cards are rendered
    const card1 = screen.getByTestId('bank-card-1');
    expect(card1).toBeInTheDocument();

    const card2 = screen.getByTestId('bank-card-2');
    expect(card2).toBeInTheDocument();

    // Check if the card details are correct
    expect(card1).toHaveTextContent('Card Number: **** **** **** 1234');
    expect(card1).toHaveTextContent('Card Holder: John Doe');
    expect(card1).toHaveTextContent('Card Type: visa');

    expect(card2).toHaveTextContent('Card Number: **** **** **** 5678');
    expect(card2).toHaveTextContent('Card Holder: Jane Smith');
    expect(card2).toHaveTextContent('Card Type: mastercard');
  });
});
