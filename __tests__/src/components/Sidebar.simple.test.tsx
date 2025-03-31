import { render, screen } from '@testing-library/react';
import Sidebar from '@/src/components/Sidebar';
import { navLinks } from '@/src/constants/navLinks';
import { SidebarProvider } from '@/src/context/SidebarContext';
import '@testing-library/jest-dom';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/'),
}));

// Mock the next/link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode, href: string }) => (
    <a href={href} data-testid="mock-link">
      {children}
    </a>
  );
});

// Mock the next/dynamic function
jest.mock('next/dynamic', () => {
  return () => {
    return function MockIcon({ fill }: { fill: string }) {
      return <div data-testid={`mock-icon-${fill}`}>Icon</div>;
    };
  };
});

// Mock the SoarIcon component
jest.mock('@/src/components/svgIcons/SoarIcon', () => {
  return function MockSoarIcon() {
    return <div data-testid="mock-soar-icon">Soar Icon</div>;
  };
});

describe('Sidebar Component', () => {
  it('renders the sidebar with logo and title', () => {
    render(
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
    );
    
    // Check if the logo is rendered
    const logoElement = screen.getByTestId('mock-soar-icon');
    expect(logoElement).toBeInTheDocument();
    
    // Check if the title is rendered
    const titleElement = screen.getByText('Soar Task');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('text-2xl');
    expect(titleElement).toHaveClass('text-title');
    expect(titleElement).toHaveClass('font-extrabold');
  });

  it('renders all navigation links', () => {
    render(
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
    );
    
    // Check if all links from navLinks are rendered
    navLinks.forEach(link => {
      const linkElement = screen.getByText(link.label);
      expect(linkElement).toBeInTheDocument();
      
      // Check if the link has the correct href
      const anchorElement = linkElement.closest('a');
      expect(anchorElement).toHaveAttribute('href', link.route);
    });
  });

  it('highlights the active link', () => {
    render(
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
    );
    
    // Find the active link's container
    const dashboardLink = screen.getByText('Dashboard');
    const dashboardLi = dashboardLink.closest('li');
    
    // Check if the active indicator is present
    const activeIndicator = dashboardLi?.querySelector('div');
    expect(activeIndicator).toHaveClass('bg-soar-dark');
    
    // Check if the active icon has the dark fill
    const darkIcon = screen.getByTestId('mock-icon-dark');
    expect(darkIcon).toBeInTheDocument();
  });

  it('does not highlight inactive links', () => {
    render(
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
    );
    
    // Find an inactive link
    const transactionsLink = screen.getByText('Transactions');
    const transactionsLi = transactionsLink.closest('li');
    
    // Check if the active indicator is not present
    const activeIndicator = transactionsLi?.querySelector('div');
    expect(activeIndicator).toHaveClass('bg-transparent');
    
    // Check if the inactive icon has the light fill
    const lightIcons = screen.getAllByTestId('mock-icon-light');
    expect(lightIcons.length).toBeGreaterThan(0);
  });
});
