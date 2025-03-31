# Soar Financial Dashboard Tests

This directory contains unit tests for the Soar Financial Dashboard application.

## Test Structure

The tests are organized to mirror the application's directory structure:

- `__tests__/app/` - Tests for Next.js pages
- `__tests__/src/components/` - Tests for React components
- `__tests__/app/api/` - Tests for API routes

## Running Tests

To run all tests:

```bash
npm test
```

To run tests with coverage:

```bash
npm test -- --coverage
```

To run a specific test file:

```bash
npm test -- path/to/test/file.test.tsx
```

## Test Coverage

The tests aim to provide 100% coverage for all components and pages. The coverage report shows:

- Statement coverage
- Branch coverage
- Function coverage
- Line coverage

## Test Patterns

### Page Tests

Page tests verify that pages render correctly and display the expected content. For "under construction" pages, the tests verify that:

1. The `UnderConstruction` component is rendered
2. The correct heading and message are displayed

### Component Tests

Component tests verify that components render correctly, apply the correct styling, and behave as expected. For the `UnderConstruction` component, the tests verify that:

1. The component renders with the correct structure
2. The component applies the correct styling classes

### API Route Tests

API route tests verify that API routes handle requests correctly and return the expected responses. The tests cover:

1. Successful requests
2. Error handling
3. Edge cases

## Mocking

The tests use Jest's mocking capabilities to mock:

1. External dependencies
2. API calls
3. Database functions
4. File system operations

This allows the tests to run in isolation and focus on the behavior of the code being tested.
