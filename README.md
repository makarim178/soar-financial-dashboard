# Soar Financial Dashboard

A modern financial dashboard built with Next.js, TypeScript, and Tailwind CSS. This application provides a comprehensive interface for managing financial data, transactions, and accounts.

## Features

- **Dashboard Overview**: View financial summaries, recent transactions, and account balances
- **Transaction Management**: Track and manage financial transactions
- **Account Management**: Manage multiple financial accounts
- **Credit Card Management**: View and manage credit cards
- **Settings**: Configure user preferences and security settings

## Recent Updates

### API URL Handling Improvements

- Added a new utility function `getApiUrl()` in `src/utils/getApiUrl.ts` that:
  - First checks for the `NEXT_PUBLIC_API_URL` environment variable
  - Falls back to `window.location.origin` if the environment variable is not set
  - Works in both client and server environments

- Updated all components that make API calls to use this utility function:
  - `TransactionHistory.tsx`
  - `SpendingChart.tsx`
  - `BalanceHistoryChart.tsx`
  - `ExpenseChart.tsx`
  - `UserForm.tsx`
  - `QuickPay.tsx`

- Added a `.env.local` file with the `NEXT_PUBLIC_API_URL` environment variable

### Build and Test Improvements

- Fixed build issues by:
  - Moving Jest setup code from `jest.setup.ts` to `jest.setup.mjs` to avoid type errors during build
  - Adding proper TypeScript interfaces to components that were using imported types
  - Fixing the `suspense: true` option in React Query hooks that was causing build errors

- Fixed failing tests by:
  - Updating the `MyCards.test.tsx` file to mock React Query
  - Fixing the `helper.test.ts` file by updating the `formatCurrency` function to use 2 decimal places
  - Simplifying the `Sidebar.test.tsx` file
  - Adding a test for the new `getApiUrl` utility function

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/soar-financial-dashboard.git
   cd soar-financial-dashboard
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following content:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

## Testing

The project uses Jest and React Testing Library for testing. To run the tests:

```bash
npm test
# or
yarn test
```

To run tests with coverage:

```bash
npm test -- --coverage
# or
yarn test --coverage
```

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm start
# or
yarn start
```

## Project Structure

- `app/`: Next.js app router pages and API routes
- `src/`
  - `components/`: React components
  - `context/`: React context providers
  - `lib/`: Database and other library code
  - `types/`: TypeScript type definitions
  - `utils/`: Utility functions
- `__tests__/`: Test files
- `public/`: Static assets

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **State Management**: React Context, React Query
- **Testing**: Jest, React Testing Library
- **Styling**: Tailwind CSS, CSS Modules
- **API**: Next.js API Routes

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest/docs/react/overview)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
