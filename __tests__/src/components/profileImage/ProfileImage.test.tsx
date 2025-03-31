import { render, screen } from '@testing-library/react';
import ProfileImage from '@/src/components/profileImage/ProfileImage';
import { UserContextProvider } from '@/src/context/UserContext';
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

// Mock the UserContext
jest.mock('@/src/context/UserContext', () => ({
  useUser: () => ({
    userImageNumber: 1,
    setUserImageNumber: jest.fn()
  }),
  UserContextProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

// Mock Math.random to return a predictable value
const mockRandom = jest.spyOn(global.Math, 'random');

describe('ProfileImage Component', () => {
  beforeEach(() => {
    mockRandom.mockReturnValue(0.5); // This will make Math.random() * 10 + 1 = 6
  });

  afterEach(() => {
    mockRandom.mockRestore();
  });

  it('renders the image with correct props', () => {
    render(
      <UserContextProvider>
        <ProfileImage size={50} />
      </UserContextProvider>
    );

    // Check if the image is rendered
    const imageElement = screen.getByTestId('mock-image');
    expect(imageElement).toBeInTheDocument();

    // Check image attributes
    expect(imageElement).toHaveAttribute('width', '50');
    expect(imageElement).toHaveAttribute('height', '50');
    expect(imageElement).toHaveAttribute('alt', 'user-icon');
  });

  it('uses the correct image URL based on userImageNumber', () => {
    // Update the mock to return a specific userImageNumber
    jest.spyOn(require('@/src/context/UserContext'), 'useUser').mockReturnValue({
      userImageNumber: 6,
      setUserImageNumber: jest.fn()
    });

    render(<ProfileImage size={50} />);

    // Check if the image has the correct src
    const imageElement = screen.getByTestId('mock-image');
    expect(imageElement).toHaveAttribute('src', 'https://avatar.iran.liara.run/public/6');
  });

  it('respects the size prop', () => {
    render(<ProfileImage size={100} />);

    // Check if the image has the correct width and height
    const imageElement = screen.getByTestId('mock-image');
    expect(imageElement).toHaveAttribute('width', '100');
    expect(imageElement).toHaveAttribute('height', '100');
  });
});
