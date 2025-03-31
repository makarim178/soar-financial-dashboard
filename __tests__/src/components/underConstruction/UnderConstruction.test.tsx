import { render, screen } from '@testing-library/react';
import UnderConstruction from '@/src/components/underConstruction/UnderConstruction';
import '@testing-library/jest-dom';

describe('UnderConstruction Component', () => {
  it('renders the component with correct structure', () => {
    render(<UnderConstruction />);

    // Check if the section element is rendered
    const sectionElement = screen.getByText('Transaction Page').closest('section');
    expect(sectionElement).toBeInTheDocument();

    // Check if the heading is rendered
    const headingElement = screen.getByText('Transaction Page');
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H1');

    // Check if the message is rendered
    const messageElement = screen.getByText('Under Construction...');
    expect(messageElement).toBeInTheDocument();
    expect(messageElement.tagName).toBe('P');
  });

  it('applies the correct styling classes', () => {
    render(<UnderConstruction />);

    // Check if the section has the correct classes
    const sectionElement = screen.getByText('Transaction Page').closest('section');
    expect(sectionElement).toHaveClass('flex');
    expect(sectionElement).toHaveClass('flex-col');
    expect(sectionElement).toHaveClass('justify-center');
    expect(sectionElement).toHaveClass('items-center');
    expect(sectionElement).toHaveClass('p-6');

    // Check if the heading has the correct classes
    const headingElement = screen.getByText('Transaction Page');
    expect(headingElement).toHaveClass('text-3xl');
    expect(headingElement).toHaveClass('font-bold');
    expect(headingElement).toHaveClass('text-title');

    // Check if the message has the correct classes
    const messageElement = screen.getByText('Under Construction...');
    expect(messageElement).toHaveClass('animate-pulse');
    expect(messageElement).toHaveClass('text-soar-dark');
  });
});
