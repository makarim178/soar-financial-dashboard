import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';

// Mock the Dashboard component
jest.mock('@/src/components/Dashboard', () => {
  return function MockDashboard() {
    return <div data-testid="dashboard-component">Dashboard Component</div>;
  };
});

describe('Home Page', () => {
  it('renders the Dashboard component', () => {
    render(<Home />);
    
    // Check if the Dashboard component is rendered
    const dashboardElement = screen.getByTestId('dashboard-component');
    expect(dashboardElement).toBeInTheDocument();
    expect(dashboardElement).toHaveTextContent('Dashboard Component');
  });
});
