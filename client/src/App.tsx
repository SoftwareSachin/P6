import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import Landing from "@/pages/Landing";
import Onboarding from "@/pages/Onboarding";
import PhoneRegistration from "@/pages/PhoneRegistration";
import ApplePayDashboard from "@/pages/ApplePayDashboard";
import QRScanner from "@/pages/QRScanner";
import SendMoney from "@/pages/SendMoney";
import OfflinePayments from "@/pages/OfflinePayments";
import PaymentScreen from "@/pages/PaymentScreen";
import TransactionHistory from "@/pages/TransactionHistory";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    // Check localStorage on every render to handle logout state changes
    return localStorage.getItem('oppb-onboarding-completed') === 'true';
  });
  const [phoneNumber, setPhoneNumber] = useState('');

  // Reset onboarding state when user is not authenticated
  useEffect(() => {
    if (!isAuthenticated && hasCompletedOnboarding) {
      setHasCompletedOnboarding(false);
    }
  }, [isAuthenticated, hasCompletedOnboarding]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('oppb-onboarding-completed', 'true');
    setHasCompletedOnboarding(true);
  };

  const handlePhoneRegistration = (phone: string) => {
    setPhoneNumber(phone);
    // In a real app, this would trigger OTP verification
    handleOnboardingComplete();
  };

  // Wrapper components for proper prop passing
  const OnboardingWrapper = () => <Onboarding onComplete={handleOnboardingComplete} />;
  const PhoneRegistrationWrapper = () => <PhoneRegistration onComplete={handlePhoneRegistration} />;

  if (isLoading) {
    return (
      <div className="mobile-container flex items-center justify-center">
        <div className="text-center">
          <div className="oppb-gradient w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center">
            <div className="spinner border-white/30 border-t-white"></div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-primary">OPPB</h1>
          <p className="text-gray-600">Payments Without Boundaries</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-container">
      <Switch>
        {!isAuthenticated ? (
          <>
            <Route path="/" component={Landing} />
            <Route path="/onboarding" component={OnboardingWrapper} />
            <Route path="/phone-registration" component={PhoneRegistrationWrapper} />
            <Route path="*" component={Landing} />
          </>
        ) : !hasCompletedOnboarding ? (
          <>
            <Route path="/" component={OnboardingWrapper} />
            <Route path="/onboarding" component={OnboardingWrapper} />
            <Route path="/phone-registration" component={PhoneRegistrationWrapper} />
            <Route path="*" component={OnboardingWrapper} />
          </>
        ) : (
          <>
            <Route path="/" component={ApplePayDashboard} />
            <Route path="/dashboard" component={ApplePayDashboard} />
            <Route path="/qr-scanner" component={QRScanner} />
            <Route path="/send-money" component={SendMoney} />
            <Route path="/offline-payments" component={OfflinePayments} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/transaction-history" component={TransactionHistory} />
            <Route path="/profile" component={Profile} />
            <Route path="/settings" component={Settings} />
            <Route path="*" component={ApplePayDashboard} />
          </>
        )}
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
