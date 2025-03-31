import { render, screen } from '@testing-library/react';
import SettingsNav from '@/src/components/settingsNav/SettingsNav';
import { settingsNavLinks } from '@/src/constants/navLinks';
import '@testing-library/jest-dom';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock the next/link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode, href: string }) => (
    <a href={href} data-testid="mock-link">
      {children}
    </a>
  );
});

describe('SettingsNav Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all navigation links', () => {
    // Mock the usePathname hook to return a non-matching path
    const usePathname = jest.requireMock('next/navigation').usePathname;
    usePathname.mockReturnValue('/some-other-path');

    render(<SettingsNav />);
    
    // Check if all links from settingsNavLinks are rendered
    settingsNavLinks.forEach(link => {
      const linkElement = screen.getByText(link.label);
      expect(linkElement).toBeInTheDocument();
      
      // Check if the link has the correct href
      const anchorElement = linkElement.closest('a');
      expect(anchorElement).toHaveAttribute('href', link.route);
    });
  });

  it('highlights the active link', () => {
    // Mock the usePathname hook to return a matching path
    const usePathname = jest.requireMock('next/navigation').usePathname;
    usePathname.mockReturnValue('/settings');

    render(<SettingsNav />);
    
    // Check if the active link has the correct styling
    const activeLink = screen.getByText('Edit Profile');
    expect(activeLink).toHaveClass('text-soar-dark');
    expect(activeLink).not.toHaveClass('text-trans-date');
    
    // Check if the active indicator is present
    const activeLinkContainer = activeLink.closest('a');
    const activeIndicator = activeLinkContainer?.querySelector('div');
    expect(activeIndicator).toBeInTheDocument();
    expect(activeIndicator).toHaveClass('bg-soar-dark');
  });

  it('does not highlight inactive links', () => {
    // Mock the usePathname hook to return a matching path
    const usePathname = jest.requireMock('next/navigation').usePathname;
    usePathname.mockReturnValue('/settings');

    render(<SettingsNav />);
    
    // Check if inactive links have the correct styling
    const inactiveLinks = ['Preferences', 'Security'];
    inactiveLinks.forEach(label => {
      const inactiveLink = screen.getByText(label);
      expect(inactiveLink).toHaveClass('text-trans-date');
      expect(inactiveLink).not.toHaveClass('text-soar-dark');
      
      // Check that inactive links don't have the active indicator
      const inactiveLinkContainer = inactiveLink.closest('a');
      const activeIndicator = inactiveLinkContainer?.querySelector('div');
      expect(activeIndicator).not.toBeInTheDocument();
    });
  });

  it('applies the correct styling to the navigation', () => {
    const usePathname = jest.requireMock('next/navigation').usePathname;
    usePathname.mockReturnValue('/settings');

    render(<SettingsNav />);
    
    // Check if the nav element is rendered
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
    
    // Check if the ul element has the correct classes
    const ulElement = navElement.querySelector('ul');
    expect(ulElement).toHaveClass('flex');
    expect(ulElement).toHaveClass('space-x-16');
    expect(ulElement).toHaveClass('border-b-1');
    expect(ulElement).toHaveClass('border-[#F4F5F7]');
    
    // Check if the li elements have the correct classes
    const liElements = navElement.querySelectorAll('li');
    liElements.forEach(li => {
      expect(li).toHaveClass('flex');
      expect(li).toHaveClass('flex-col');
      expect(li).toHaveClass('cursor-pointer');
    });
  });
});
