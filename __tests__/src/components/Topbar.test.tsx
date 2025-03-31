import { render, screen } from '@testing-library/react';
import Topbar from '@/src/components/Topbar';
import '@testing-library/jest-dom';

// Mock the SidebarContext
jest.mock('@/src/context/SidebarContext', () => ({
  useSidebar: () => ({
    toggleSidebar: jest.fn(),
    selectedLabel: 'Dashboard'
  }),
  SidebarProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

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

// Mock the next/link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode, href: string }) => (
    <a href={href} data-testid="mock-link">
      {children}
    </a>
  );
});

// Mock the DefaultLoader component
jest.mock('@/src/components/defaultLoader/DefaultLoader', () => {
  return function MockDefaultLoader() {
    return <div data-testid="mock-loader">Loading...</div>;
  };
});

// Mock the ProfileImage component
jest.mock('@/src/components/profileImage/ProfileImage', () => {
  return function MockProfileImage() {
    return <div data-testid="mock-profile-image">Profile Image</div>;
  };
});

describe('Topbar Component', () => {
  it('renders the topbar with all elements', () => {
    render(<Topbar />);

    // Check if the mobile menu button is rendered
    const menuIcon = screen.getByTestId('mock-image-Menu');
    expect(menuIcon).toBeInTheDocument();
    expect(menuIcon).toHaveAttribute('src', '/icons/mobile-menu-icon.svg');

    // Check if the selected label is displayed
    const labelElement = screen.getByText('Dashboard');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass('text-2xl');
    expect(labelElement).toHaveClass('text-title');
    expect(labelElement).toHaveClass('font-extrabold');

    // Check if the search input is rendered
    const searchIcon = screen.getByTestId('mock-image-Search');
    expect(searchIcon).toBeInTheDocument();
    expect(searchIcon).toHaveAttribute('src', '/icons/magnifying-glass.svg');

    const searchInput = screen.getByPlaceholderText('Search for something...');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveClass('bg-transparent');
    expect(searchInput).toHaveClass('outline-none');

    // Check if the settings link is rendered
    const settingsIcon = screen.getByTestId('mock-image-Settings');
    expect(settingsIcon).toBeInTheDocument();
    expect(settingsIcon).toHaveAttribute('src', '/icons/settings-2.svg');

    const settingsLink = screen.getByTestId('mock-link');
    expect(settingsLink).toBeInTheDocument();
    expect(settingsLink).toHaveAttribute('href', '/settings');

    // Check if the notification icon is rendered
    const notificationIcon = screen.getByTestId('mock-image-Notifications');
    expect(notificationIcon).toBeInTheDocument();
    expect(notificationIcon).toHaveAttribute('src', '/icons/bell-icon.svg');

    // Check if the profile image is rendered
    const profileImage = screen.getByTestId('mock-profile-image');
    expect(profileImage).toBeInTheDocument();
  });

  it('renders the loader when no selected label is available', () => {
    // Override the mock for this test only
    jest.spyOn(require('@/src/context/SidebarContext'), 'useSidebar').mockReturnValueOnce({
      toggleSidebar: jest.fn(),
      selectedLabel: ''
    });

    render(<Topbar />);

    // Check if the loader is displayed
    const loaderElement = screen.getByTestId('mock-loader');
    expect(loaderElement).toBeInTheDocument();
  });
});
