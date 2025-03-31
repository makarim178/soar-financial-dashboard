interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
    return (
      <div className="p-4 bg-red-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-2 text-soar-dark">Something went wrong</h3>
        <p className="text-title mb-4">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Try again
        </button>
      </div>
    );
  }