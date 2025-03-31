import { render, screen } from '@testing-library/react';
import UserForm from '@/src/components/forms/UserForm';
import '@testing-library/jest-dom';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string, alt: string }) => (
    <img
      src={src}
      alt={alt}
      data-testid={`mock-image-${alt}`}
    />
  ),
}));

// Mock the TextInput component
jest.mock('@/src/components/forms/textInput/TextInput', () => {
  return function MockTextInput({ name, label, placeholder }: any) {
    return (
      <div data-testid={`text-input-${name}`}>
        <label>{label}</label>
        <input
          name={name}
          placeholder={placeholder}
          data-testid={`input-${name}`}
        />
      </div>
    );
  };
});

// Mock the ProfileImage component
jest.mock('@/src/components/profileImage/ProfileImage', () => {
  return function MockProfileImage() {
    return <div data-testid="mock-profile-image">Profile Image</div>;
  };
});

// Mock dayjs
jest.mock('dayjs', () => {
  return () => ({
    format: jest.fn(),
    valueOf: jest.fn()
  });
});

// Mock the antd DatePicker component
jest.mock('antd', () => ({
  DatePicker: ({ style }: any) => (
    <input
      data-testid="mock-date-picker"
      style={style}
    />
  ),
  Space: ({ children }: any) => <div>{children}</div>,
}));

// Mock react-hook-form
jest.mock('react-hook-form', () => {
  const originalModule = jest.requireActual('react-hook-form');
  return {
  useForm: () => ({
    register: (name: string) => ({ name }),
    handleSubmit: (fn: any) => (e: any) => {
      e?.preventDefault?.();
      return fn({});
    },
    formState: { errors: {} },
    reset: jest.fn(),
    setValue: jest.fn(),
    watch: jest.fn(),
    control: {
      register: jest.fn(),
      unregister: jest.fn(),
      getFieldState: jest.fn(),
      _names: {
        array: new Set(),
        mount: new Set(),
        unMount: new Set(),
        watch: new Set(),
        focus: '',
        watchAll: false
      },
      _subjects: {
        watch: jest.fn(),
        array: jest.fn(),
        state: jest.fn()
      },
      _getWatch: jest.fn(),
      _formValues: [],
      _defaultValues: {}
    }
  }),
  Controller: ({ render }: any) => render({
    field: {
      onChange: jest.fn(),
      onBlur: jest.fn(),
      value: null,
      name: 'dob'
    },
    fieldState: { error: null }
  }),
  ...originalModule
};
});

describe('UserForm Component', () => {
  it('renders the form with all input fields', () => {
    render(<UserForm />);

    // Check if the profile image section is rendered
    const profileImage = screen.getByTestId('mock-profile-image');
    expect(profileImage).toBeInTheDocument();

    // Check if the edit icon is rendered
    const editIcon = screen.getByTestId('mock-image-Edit profile image');
    expect(editIcon).toBeInTheDocument();

    // Check if all text input fields are rendered
    const requiredFields = [
      'name', 'userName', 'email', 'password', 'presentAddress',
      'city', 'postalCode', 'country'
    ];

    requiredFields.forEach(field => {
      const inputField = screen.getByTestId(`text-input-${field}`);
      expect(inputField).toBeInTheDocument();
    });

    // Check if the date picker is rendered
    const datePicker = screen.getByTestId('mock-date-picker');
    expect(datePicker).toBeInTheDocument();

    // Check if the submit button is rendered
    const submitButton = screen.getByRole('button', { name: 'Save' });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveClass('bg-soar-dark');
    expect(submitButton).toHaveClass('text-white');
  });

  it('allows file selection for profile image', () => {
    render(<UserForm />);

    // Find the file input
    const fileInput = screen.getByLabelText('Select Image');
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute('type', 'file');
    expect(fileInput).toHaveAttribute('name', 'profileImage');
    expect(fileInput).toHaveAttribute('id', 'profileImage');
  });
});
