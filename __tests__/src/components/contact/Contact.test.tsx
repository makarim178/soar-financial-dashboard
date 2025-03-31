import { render, screen, fireEvent } from '@testing-library/react';
import Contact from '@/src/components/contact/Contact';
import '@testing-library/jest-dom';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }: { src: string, alt: string, width: number, height: number, className: string }) => (
    <img 
      src={src} 
      alt={alt} 
      width={width} 
      height={height} 
      className={className}
      data-testid="mock-image"
    />
  ),
}));

describe('Contact Component', () => {
  const mockContact = {
    id: 1,
    name: 'John Doe',
    position: 'Developer',
    avatar: '/avatar1.jpg'
  };
  
  const mockSetSelectedContact = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders contact information correctly', () => {
    render(
      <Contact 
        contact={mockContact} 
        selectedContactId={0} 
        setSelectedContact={mockSetSelectedContact} 
      />
    );
    
    // Check if the name and position are displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    
    // Check if the image is rendered with correct props
    const imageElement = screen.getByTestId('mock-image');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', '/avatar1.jpg');
    expect(imageElement).toHaveAttribute('alt', 'John Doe');
    expect(imageElement).toHaveAttribute('width', '70');
    expect(imageElement).toHaveAttribute('height', '70');
  });

  it('calls setSelectedContact when clicked', () => {
    render(
      <Contact 
        contact={mockContact} 
        selectedContactId={0} 
        setSelectedContact={mockSetSelectedContact} 
      />
    );
    
    // Click on the contact
    fireEvent.click(screen.getByText('John Doe'));
    
    // Check if setSelectedContact was called with the contact
    expect(mockSetSelectedContact).toHaveBeenCalledTimes(1);
    expect(mockSetSelectedContact).toHaveBeenCalledWith(mockContact);
  });

  it('applies selected styles when contact is selected', () => {
    render(
      <Contact 
        contact={mockContact} 
        selectedContactId={1} // Same as mockContact.id
        setSelectedContact={mockSetSelectedContact} 
      />
    );
    
    // Check if the container has the correct opacity
    const containerElement = screen.getByText('John Doe').closest('div');
    expect(containerElement).toHaveClass('opacity-100');
    expect(containerElement).not.toHaveClass('opacity-70');
    
    // Check if the image container has the ring style
    const imageContainer = screen.getByTestId('mock-image').closest('div');
    expect(imageContainer).toHaveClass('ring-2');
    expect(imageContainer).toHaveClass('ring-blue-500');
    
    // Check if the name has the bold font
    const nameElement = screen.getByText('John Doe');
    expect(nameElement).toHaveClass('font-bold');
    expect(nameElement).not.toHaveClass('font-normal');
  });

  it('applies non-selected styles when contact is not selected', () => {
    render(
      <Contact 
        contact={mockContact} 
        selectedContactId={2} // Different from mockContact.id
        setSelectedContact={mockSetSelectedContact} 
      />
    );
    
    // Check if the container has the correct opacity
    const containerElement = screen.getByText('John Doe').closest('div');
    expect(containerElement).toHaveClass('opacity-70');
    expect(containerElement).not.toHaveClass('opacity-100');
    
    // Check if the image container does not have the ring style
    const imageContainer = screen.getByTestId('mock-image').closest('div');
    expect(imageContainer).not.toHaveClass('ring-2');
    expect(imageContainer).not.toHaveClass('ring-blue-500');
    
    // Check if the name has the normal font
    const nameElement = screen.getByText('John Doe');
    expect(nameElement).toHaveClass('font-normal');
    expect(nameElement).not.toHaveClass('font-bold');
  });
});
