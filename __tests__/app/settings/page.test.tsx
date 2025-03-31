import { render, screen } from '@testing-library/react';
import SettingsPage from '@/app/settings/page';
import '@testing-library/jest-dom';

// Mock the Settings component
jest.mock('@/src/components/Settings', () => {
  return function MockSettings() {
    return <div data-testid="settings-component">Settings Component</div>;
  };
});

describe('SettingsPage', () => {
  it('renders the Settings component', () => {
    render(<SettingsPage />);

    // Check if the Settings component is rendered
    const settingsElement = screen.getByTestId('settings-component');
    expect(settingsElement).toBeInTheDocument();
    expect(settingsElement).toHaveTextContent('Settings Component');
  });
});
