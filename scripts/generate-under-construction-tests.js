const fs = require('fs');
const path = require('path');

// List of pages that use the UnderConstruction component
const pages = [
  { path: 'app/accounts/page.tsx', component: 'AccountsPage' },
  { path: 'app/credit-cards/page.tsx', component: 'CreditCardsPage' },
  { path: 'app/investments/page.tsx', component: 'InvestmentPage' },
  { path: 'app/loans/page.tsx', component: 'LoansPage' },
  { path: 'app/previleges/page.tsx', component: 'PrevilegesPage' },
  { path: 'app/services/page.tsx', component: 'ServicesPage' },
  { path: 'app/settings/preferences/page.tsx', component: 'PreferencePage' },
  { path: 'app/settings/security/page.tsx', component: 'SecurityPage' },
  { path: 'app/transactions/page.tsx', component: 'TransactionPage' },
];

// Template for the test file
const testTemplate = (pagePath, componentName) => `import { render, screen } from '@testing-library/react';
import ${componentName} from '@/${pagePath}';
import '@testing-library/jest-dom';

// Mock the UnderConstruction component
jest.mock('@/src/components/underConstruction/UnderConstruction', () => {
  return function MockUnderConstruction() {
    return (
      <section data-testid="under-construction">
        <h1>Transaction Page</h1>
        <p>Under Construction... </p>
      </section>
    );
  };
});

describe('${componentName}', () => {
  it('renders the UnderConstruction component', () => {
    render(<${componentName} />);
    
    // Check if the UnderConstruction component is rendered
    const underConstructionElement = screen.getByTestId('under-construction');
    expect(underConstructionElement).toBeInTheDocument();
  });

  it('displays the correct heading and message', () => {
    render(<${componentName} />);
    
    // Check if the heading is rendered
    const headingElement = screen.getByText('Transaction Page');
    expect(headingElement).toBeInTheDocument();
    
    // Check if the message is rendered
    const messageElement = screen.getByText('Under Construction...');
    expect(messageElement).toBeInTheDocument();
  });
});`;

// Generate test files for each page
pages.forEach(page => {
  const testDir = path.join('__tests__', path.dirname(page.path));
  const testPath = path.join(testDir, 'page.test.tsx');
  
  // Create the test directory if it doesn't exist
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
  
  // Write the test file
  fs.writeFileSync(testPath, testTemplate(page.path, page.component));
  
  console.log(`Generated test file: ${testPath}`);
});

console.log('All test files generated successfully!');
