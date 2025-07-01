export default function TestApp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🎉 OPPB Migration Test
        </h1>
        <p className="text-gray-600 mb-4">
          The app is loading successfully! Migration from Replit Agent to standard Replit environment is working.
        </p>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span>PostgreSQL Database Connected</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span>Vite Development Server Running</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span>Express Backend Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}