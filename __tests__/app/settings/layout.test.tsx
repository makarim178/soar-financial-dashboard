import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/settings/layout';
import '@testing-library/jest-dom';

// Mock the SettingsNav component
jest.mock('@/src/components/settingsNav/SettingsNav', () => {
  return function MockSettingsNav() {
    return <nav data-testid="settings-nav">Settings Navigation</nav>;
  };
});

describe('Settings RootLayout', () => {
  it('renders the SettingsNav component', () => {
    render(
      <RootLayout>
        <div data-testid="child-content">Child Content</div>
      </RootLayout>
    );

    // Check if the SettingsNav component is rendered
    const navElement = screen.getByTestId('settings-nav');
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveTextContent('Settings Navigation');
  });

  it('renders the children', () => {
    render(
      <RootLayout>
        <div data-testid="child-content">Child Content</div>
      </RootLayout>
    );

    // Check if the children are rendered
    const childElement = screen.getByTestId('child-content');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Child Content');
  });

  it('applies the correct styling classes', () => {
    render(
      <RootLayout>
        <div>Child Content</div>
      </RootLayout>
    );

    // Check if the main element has the correct classes
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('space-y-4');
    expect(mainElement).toHaveClass('m-2');
    expect(mainElement).toHaveClass('bg-white');
    expect(mainElement).toHaveClass('w-full');
    expect(mainElement).toHaveClass('p-8');
    expect(mainElement).toHaveClass('rounded-3xl');
    expect(mainElement).toHaveClass('box-border');
  });
});
