import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import Landing from "@/pages/Landing";
import ApplePayDashboard from "@/pages/ApplePayDashboard";

function SimpleRouter() {
  // Simple auth check without complex logic
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  console.log("Auth state:", { user, isLoading, error });

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f3f4f6'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>OPPB</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // If user exists, show dashboard; otherwise show landing
  if (user) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <Switch>
          <Route path="/" component={ApplePayDashboard} />
          <Route path="/dashboard" component={ApplePayDashboard} />
          <Route path="*" component={ApplePayDashboard} />
        </Switch>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="*" component={Landing} />
      </Switch>
    </div>
  );
}

function SimpleApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <SimpleRouter />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default SimpleApp;