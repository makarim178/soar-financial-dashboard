import { render, screen } from '@testing-library/react';
import Settings from '@/src/components/Settings';
import '@testing-library/jest-dom';

// Mock the UserForm component
jest.mock('@/src/components/forms/UserForm', () => {
  return function MockUserForm() {
    return <div data-testid="mock-user-form">User Form</div>;
  };
});

describe('Settings Component', () => {
  it('renders the UserForm component', () => {
    render(<Settings />);
    
    // Check if the UserForm component is rendered
    const userFormElement = screen.getByTestId('mock-user-form');
    expect(userFormElement).toBeInTheDocument();
    expect(userFormElement).toHaveTextContent('User Form');
  });

  it('applies the correct styling classes', () => {
    const { container } = render(<Settings />);
    
    // Check if the container has the correct classes
    const containerElement = container.firstChild;
    expect(containerElement).toHaveClass('flex');
    expect(containerElement).toHaveClass('flex-col');
    expect(containerElement).toHaveClass('items-center');
    expect(containerElement).toHaveClass('md:items-start');
    expect(containerElement).toHaveClass('md:flex-row');
    expect(containerElement).toHaveClass('justify-center');
    expect(containerElement).toHaveClass('w-full');
  });
});
