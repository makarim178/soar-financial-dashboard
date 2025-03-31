import { render } from '@testing-library/react';
import AccountIcon from '@/src/components/svgIcons/AccountIcon';
import CreditCardIcon from '@/src/components/svgIcons/CreditCardIcon';
import InvestmentIcon from '@/src/components/svgIcons/InvestmentIcon';
import LoanIcon from '@/src/components/svgIcons/LoanIcon';
import PrivilegeIcon from '@/src/components/svgIcons/PrivilegeIcon';
import ServiceIcon from '@/src/components/svgIcons/ServiceIcon';
import SettingIcon from '@/src/components/svgIcons/SettingIcon';
import SoarIcon from '@/src/components/svgIcons/SoarIcon';
import TransactionIcon from '@/src/components/svgIcons/TransactionIcon';
import { fillIconColor } from '@/src/utils/helper';
import '@testing-library/jest-dom';

// Mock the helper function
jest.mock('@/src/utils/helper', () => ({
  fillIconColor: jest.fn((fill) => fill === 'light' ? 'var(--soar-light)' : 'var(--soar-dark)'),
}));

describe('SVG Icon Components', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('AccountIcon', () => {
    it('renders with default props', () => {
      const { container } = render(<AccountIcon />);

      // Check if the SVG is rendered
      const svgElement = container.querySelector('svg');
      expect(svgElement).toBeInTheDocument();

      // Check default dimensions
      expect(svgElement).toHaveAttribute('width', '17.5');
      expect(svgElement).toHaveAttribute('height', '17.5');

      // Check if fillIconColor was called with the default fill value
      expect(fillIconColor).toHaveBeenCalledWith('light');

      // Check if the path exists
      const pathElement = container.querySelector('path');
      expect(pathElement).toBeInTheDocument();
    });

    it('renders with custom props', () => {
      const { container } = render(<AccountIcon fill="dark" width={24} height={24} />);

      // Check if the SVG is rendered with custom dimensions
      const svgElement = container.querySelector('svg');
      expect(svgElement).toHaveAttribute('width', '24');
      expect(svgElement).toHaveAttribute('height', '24');

      // Check if fillIconColor was called with the custom fill value
      expect(fillIconColor).toHaveBeenCalledWith('dark');
    });
  });

  describe('CreditCardIcon', () => {
    it('renders with default props', () => {
      const { container } = render(<CreditCardIcon />);

      // Check if the SVG is rendered
      const svgElement = container.querySelector('svg');
      expect(svgElement).toBeInTheDocument();

      // Check default dimensions
      expect(svgElement).toHaveAttribute('width', '17.5');
      expect(svgElement).toHaveAttribute('height', '17.5');

      // Check if fillIconColor was called with the default fill value
      expect(fillIconColor).toHaveBeenCalledWith('light');
    });

    it('renders with custom props', () => {
      const { container } = render(<CreditCardIcon fill="dark" width={24} height={24} />);

      // Check if the SVG is rendered with custom dimensions
      const svgElement = container.querySelector('svg');
      expect(svgElement).toHaveAttribute('width', '24');
      expect(svgElement).toHaveAttribute('height', '24');

      // Check if fillIconColor was called with the custom fill value
      expect(fillIconColor).toHaveBeenCalledWith('dark');
    });
  });

  describe('InvestmentIcon', () => {
    it('renders with default props', () => {
      const { container } = render(<InvestmentIcon />);

      // Check if the SVG is rendered
      const svgElement = container.querySelector('svg');
      expect(svgElement).toBeInTheDocument();

      // Check default dimensions
      expect(svgElement).toHaveAttribute('width', '17.5');
      expect(svgElement).toHaveAttribute('height', '17.5');

      // Check if fillIconColor was called with the default fill value
      expect(fillIconColor).toHaveBeenCalledWith('light');
    });

    it('renders with custom props', () => {
      const { container } = render(<InvestmentIcon fill="dark" width={24} height={24} />);

      // Check if the SVG is rendered with custom dimensions
      const svgElement = container.querySelector('svg');
      expect(svgElement).toHaveAttribute('width', '24');
      expect(svgElement).toHaveAttribute('height', '24');

      // Check if fillIconColor was called with the custom fill value
      expect(fillIconColor).toHaveBeenCalledWith('dark');
    });
  });

  describe('LoanIcon', () => {
    it('renders with default props', () => {
      const { container } = render(<LoanIcon />);

      // Check if the SVG is rendered
      const svgElement = container.querySelector('svg');
      expect(svgElement).toBeInTheDocument();

      // Check default dimensions
      expect(svgElement).toHaveAttribute('width', '17.5');
      expect(svgElement).toHaveAttribute('height', '17.5');

      // Check if fillIconColor was called with the default fill value
      expect(fillIconColor).toHaveBeenCalledWith('light');
    });

    it('renders with custom props', () => {
      const { container } = render(<LoanIcon fill="dark" width={24} height={24} />);

      // Check if the SVG is rendered with custom dimensions
      const svgElement = container.querySelector('svg');
      expect(svgElement).toHaveAttribute('width', '24');
      expect(svgElement).toHaveAttribute('height', '24');

      // Check if fillIconColor was called with the custom fill value
      expect(fillIconColor).toHaveBeenCalledWith('dark');
    });
  });

  describe('PrivilegeIcon', () => {
    it('renders with default props', () => {
      const { container } = render(<PrivilegeIcon />);

      // Check if the SVG is rendered
      const svgElement = container.querySelector('svg');
      expect(svgElement).toBeInTheDocument();

      // Check default dimensions
      expect(svgElement).toHaveAttribute('width', '17.5');
      expect(svgElement).toHaveAttribute('height', '17.5');

      // Check if fillIconColor was called with the default fill value
      expect(fillIconColor).toHaveBeenCalledWith('light');
    });

    it('renders with custom props', () => {
      const { container } = render(<PrivilegeIcon fill="dark" width={24} height={24} />);

      // Check if the SVG is rendered with custom dimensions
      const svgElement = container.querySelector('svg');
      expect(svgElement).toHaveAttribute('width', '24');
      expect(svgElement).toHaveAttribute('height', '24');

      // Check if fillIconColor was called with the custom fill value
      expect(fillIconColor).toHaveBeenCalledWith('dark');
    });
  });

  describe('ServiceIcon', () => {
    it('renders with default props', () => {
      const { container } = render(<ServiceIcon />);

      // Check if the SVG is rendered
      const svgElement = container.querySelector('svg');
      expect(svgElement).toBeInTheDocument();

      // Check default dimensions
      expect(svgElement).toHaveAttribute('width', '17.5');
      expect(svgElement).toHaveAttribute('height', '17.5');

      // Check if fillIconColor was called with the default fill value
      expect(fillIconColor).toHaveBeenCalledWith('light');
    });

    it('renders with custom props', () => {
      const { container } = render(<ServiceIcon fill="dark" width={24} height={24} />);

      // Check if the SVG is rendered with custom dimensions
      const svgElement = container.querySelector('svg');
      expect(svgElement).toHaveAttribute('width', '24');
      expect(svgElement).toHaveAttribute('height', '24');

      // Check if fillIconColor was called with the custom fill value
      expect(fillIconColor).toHaveBeenCalledWith('dark');
    });
  });

  describe('SettingIcon', () => {
    it('renders with default props', () => {
      const { container } = render(<SettingIcon />);

      // Check if the SVG is rendered
      const svgElement = container.querySelector('svg');
      expect(svgElement).toBeInTheDocument();

      // Check default dimensions
      expect(svgElement).toHaveAttribute('width', '17.5');
      expect(svgElement).toHaveAttribute('height', '17.5');

      // Check if fillIconColor was called with the default fill value
      expect(fillIconColor).toHaveBeenCalledWith('light');
    });

    it('renders with custom props', () => {
      const { container } = render(<SettingIcon fill="dark" width={24} height={24} />);

      // Check if the SVG is rendered with custom dimensions
      const svgElement = container.querySelector('svg');
      expect(svgElement).toHaveAttribute('width', '24');
      expect(svgElement).toHaveAttribute('height', '24');

      // Check if fillIconColor was called with the custom fill value
      expect(fillIconColor).toHaveBeenCalledWith('dark');
    });
  });

  describe('SoarIcon', () => {
    it('renders correctly', () => {
      const { container } = render(<SoarIcon />);

      // Check if the SVG is rendered
      const svgElement = container.querySelector('svg');
      expect(svgElement).toBeInTheDocument();

      // Check if the paths exist
      const pathElements = container.querySelectorAll('path');
      expect(pathElements.length).toBeGreaterThan(0);
    });
  });

  describe('TransactionIcon', () => {
    it('renders with default props', () => {
      const { container } = render(<TransactionIcon />);

      // Check if the SVG is rendered
      const svgElement = container.querySelector('svg');
      expect(svgElement).toBeInTheDocument();

      // Check default dimensions
      expect(svgElement).toHaveAttribute('width', '17.5');
      expect(svgElement).toHaveAttribute('height', '17.5');

      // Check if fillIconColor was called with the default fill value
      expect(fillIconColor).toHaveBeenCalledWith('light');
    });

    it('renders with custom props', () => {
      const { container } = render(<TransactionIcon fill="dark" width={24} height={24} />);

      // Check if the SVG is rendered with custom dimensions
      const svgElement = container.querySelector('svg');
      expect(svgElement).toHaveAttribute('width', '24');
      expect(svgElement).toHaveAttribute('height', '24');

      // Check if fillIconColor was called with the custom fill value
      expect(fillIconColor).toHaveBeenCalledWith('dark');
    });
  });
});
