import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

function TestApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">OPPB App Test</h1>
          <p className="text-gray-600">If you can see this, the basic app is working!</p>
          <div className="mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Test Button
            </button>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default TestApp;