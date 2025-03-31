import { render, screen } from '@testing-library/react';
import TextInput from '@/src/components/forms/textInput/TextInput';
import '@testing-library/jest-dom';
import { useForm } from 'react-hook-form';

// Create a wrapper component that uses react-hook-form
const TestComponent = ({ 
  name = 'testField',
  label = 'Test Label',
  placeholder = 'Test Placeholder',
  type = 'text',
  options = {},
  hasError = false,
  errorMessage = 'This field is required'
}) => {
  const { register, formState: { errors } } = useForm<any>();
  
  // Create mock errors if hasError is true
  const mockErrors = hasError ? {
    [name]: {
      type: 'required',
      message: errorMessage
    }
  } : {};
  
  return (
    <TextInput
      name={name}
      label={label}
      placeholder={placeholder}
      type={type}
      register={register}
      options={options}
      errors={mockErrors}
    />
  );
};

describe('TextInput Component', () => {
  it('renders with default props', () => {
    render(<TestComponent />);
    
    // Check if the label is rendered
    const labelElement = screen.getByText('Test Label');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute('for', 'testField');
    
    // Check if the input is rendered
    const inputElement = screen.getByPlaceholderText('Test Placeholder');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('id', 'testField');
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  it('renders with custom props', () => {
    render(
      <TestComponent
        name="email"
        label="Email Address"
        placeholder="Enter your email"
        type="email"
      />
    );
    
    // Check if the label is rendered with custom text
    const labelElement = screen.getByText('Email Address');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute('for', 'email');
    
    // Check if the input is rendered with custom attributes
    const inputElement = screen.getByPlaceholderText('Enter your email');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('id', 'email');
    expect(inputElement).toHaveAttribute('type', 'email');
  });

  it('displays error message when there are errors', () => {
    render(
      <TestComponent
        hasError={true}
        errorMessage="Email is required"
      />
    );
    
    // Check if the error message is displayed
    const errorElement = screen.getByText('Email is required');
    expect(errorElement).toBeInTheDocument();
    
    // Check if the error indicator dot is displayed
    const errorDot = errorElement.previousElementSibling;
    expect(errorDot).toBeInTheDocument();
    expect(errorDot).toHaveClass('bg-red-500');
    expect(errorDot).toHaveClass('animate-pulse');
  });

  it('does not display error message when there are no errors', () => {
    render(<TestComponent hasError={false} />);
    
    // Check that no error message is displayed
    const errorElement = screen.queryByText('This field is required');
    expect(errorElement).not.toBeInTheDocument();
  });

  it('applies the correct styling classes', () => {
    render(<TestComponent />);
    
    // Check if the container has the correct classes
    const containerElement = screen.getByText('Test Label').closest('div');
    expect(containerElement).toHaveClass('w-full');
    expect(containerElement).toHaveClass('mb-4');
    
    // Check if the label has the correct classes
    const labelElement = screen.getByText('Test Label');
    expect(labelElement).toHaveClass('block');
    expect(labelElement).toHaveClass('mb-2');
    expect(labelElement).toHaveClass('text-base');
    expect(labelElement).toHaveClass('font-medium');
    expect(labelElement).toHaveClass('text-soar-dark');
    
    // Check if the input has the correct classes
    const inputElement = screen.getByPlaceholderText('Test Placeholder');
    expect(inputElement).toHaveClass('border');
    expect(inputElement).toHaveClass('border-soar-border-gray');
    expect(inputElement).toHaveClass('rounded-2xl');
    expect(inputElement).toHaveClass('text-trans-date');
    expect(inputElement).toHaveClass('block');
    expect(inputElement).toHaveClass('w-full');
    expect(inputElement).toHaveClass('p-2.5');
  });
});
