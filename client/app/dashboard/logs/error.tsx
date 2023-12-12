"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center text-xl text-white">Something went wrong!</h2>
      <button
        className="mt-4 w-50 h-50 rounded-md bg-gray-800 px-4 py-2 text-lg text-white transition-colors hover:bg-gray-600"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try Again
      </button>
    </main>
  );
}
