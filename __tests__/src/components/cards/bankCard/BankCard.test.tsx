import { render, screen } from '@testing-library/react';
import BankCard from '@/src/components/cards/bankCard/BankCard';
import { CardDataType } from '@/src/types';
import '@testing-library/jest-dom';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height }: { src: string, alt: string, width: number, height: number }) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      data-testid="mock-image"
    />
  ),
}));

describe('BankCard Component', () => {
  const mockVisaCard: CardDataType = {
    id: '1',
    cardNumber: '**** **** **** 4567',
    cardHolder: 'John Doe',
    validThru: '12/25',
    balance: '$5,756.00',
    cardType: 'visa',
    isDark: true
  };

  const mockMastercardLight: CardDataType = {
    id: '2',
    cardNumber: '**** **** **** 8901',
    cardHolder: 'Jane Smith',
    validThru: '06/27',
    balance: '$3,412.00',
    cardType: 'mastercard',
    isDark: false
  };

  const mockMastercardDark: CardDataType = {
    id: '3',
    cardNumber: '**** **** **** 2345',
    cardHolder: 'Bob Johnson',
    validThru: '09/26',
    balance: '$7,890.00',
    cardType: 'mastercard',
    isDark: true
  };

  it('renders a dark Visa card correctly', () => {
    render(<BankCard card={mockVisaCard} />);

    // Check if the card holder is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();

    // Check if the card number is displayed
    expect(screen.getByText('**** **** **** 4567')).toBeInTheDocument();

    // Check if the valid thru date is displayed
    expect(screen.getByText('12/25')).toBeInTheDocument();

    // Check if the balance is displayed
    expect(screen.getByText('$5,756.00')).toBeInTheDocument();

    // Check if the card has dark background styles
    const cardElement = screen.getByText('John Doe').closest('div[class*="rounded-3xl"]');
    expect(cardElement).toHaveClass('bg-gradient-to-r');
    expect(cardElement).toHaveClass('from-[#5B5A6F]');
    expect(cardElement).toHaveClass('to-[#000000]');

    // Check if the correct card type icon is used
    const images = screen.getAllByTestId('mock-image');
    const cardTypeImage = images.find(img => img.getAttribute('src')?.includes('visa-icon'));
    expect(cardTypeImage).toBeInTheDocument();
  });

  it('renders a light Mastercard correctly', () => {
    render(<BankCard card={mockMastercardLight} />);

    // Check if the card holder is displayed
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();

    // Check if the card number is displayed
    expect(screen.getByText('**** **** **** 8901')).toBeInTheDocument();

    // Check if the valid thru date is displayed
    expect(screen.getByText('06/27')).toBeInTheDocument();

    // Check if the balance is displayed
    expect(screen.getByText('$3,412.00')).toBeInTheDocument();

    // Check if the card has light background styles
    const cardElement = screen.getByText('Jane Smith').closest('div[class*="rounded-3xl"]');
    expect(cardElement).toHaveClass('bg-white');
    expect(cardElement).toHaveClass('border-1');
    expect(cardElement).toHaveClass('border-soar-border-gray');

    // Check if the correct card type icon is used
    const images = screen.getAllByTestId('mock-image');
    const cardTypeImage = images.find(img => img.getAttribute('src')?.includes('master-card-icon-dark'));
    expect(cardTypeImage).toBeInTheDocument();
  });

  it('renders a dark Mastercard correctly', () => {
    render(<BankCard card={mockMastercardDark} />);

    // Check if the card holder is displayed
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();

    // Check if the card number is displayed
    expect(screen.getByText('**** **** **** 2345')).toBeInTheDocument();

    // Check if the valid thru date is displayed
    expect(screen.getByText('09/26')).toBeInTheDocument();

    // Check if the balance is displayed
    expect(screen.getByText('$7,890.00')).toBeInTheDocument();

    // Check if the card has dark background styles
    const cardElement = screen.getByText('Bob Johnson').closest('div[class*="rounded-3xl"]');
    expect(cardElement).toHaveClass('bg-gradient-to-r');
    expect(cardElement).toHaveClass('from-[#5B5A6F]');
    expect(cardElement).toHaveClass('to-[#000000]');

    // Check if the correct card type icon is used
    const images = screen.getAllByTestId('mock-image');
    const cardTypeImage = images.find(img => img.getAttribute('src')?.includes('master-card-icon.svg'));
    expect(cardTypeImage).toBeInTheDocument();
  });

  it('applies the correct text color based on isDark prop', () => {
    // Render dark card
    const { unmount } = render(<BankCard card={mockVisaCard} />);

    // Check if text elements have the light text color class
    const darkCardBalanceLabel = screen.getByText('Balance');
    expect(darkCardBalanceLabel).toHaveClass('text-white');

    // Cleanup
    unmount();

    // Render light card
    render(<BankCard card={mockMastercardLight} />);

    // Check if text elements have the dark text color class
    const lightCardBalanceLabel = screen.getByText('Balance');
    expect(lightCardBalanceLabel).toHaveClass('text-title');
  });

  it('uses the correct chip card image based on isDark prop', () => {
    // Render dark card
    const { unmount } = render(<BankCard card={mockVisaCard} />);

    // Check if the dark chip card image is used
    const images = screen.getAllByTestId('mock-image');
    const darkChipImage = images.find(img => img.getAttribute('src') === '/icons/chip-card.svg');
    expect(darkChipImage).toBeInTheDocument();

    // Cleanup
    unmount();

    // Render light card
    render(<BankCard card={mockMastercardLight} />);

    // Check if the light chip card image is used
    const lightImages = screen.getAllByTestId('mock-image');
    const lightChipImage = lightImages.find(img => img.getAttribute('src') === '/icons/chip-card-dark.svg');
    expect(lightChipImage).toBeInTheDocument();
  });
});
