import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { BottomNavigation } from "@/components/BottomNavigation";
import { LogoutConfirmDialog } from "@/components/LogoutConfirmDialog";
import { useAuth } from "@/hooks/useAuth";
import { 
  ArrowLeft, 
  Lock, 
  Fingerprint, 
  Bell, 
  Megaphone, 
  Palette, 
  Globe, 
  HelpCircle, 
  Headphones, 
  Info,
  ChevronRight
} from "lucide-react";

export default function Settings() {
  const [, setLocation] = useLocation();
  const { user, logout, isLoggingOut } = useAuth();
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);
  const [promotionalNotifications, setPromotionalNotifications] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleBack = () => {
    setLocation("/");
  };

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    logout();
  };

  const handleLogoutCancel = () => {
    setShowLogoutDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200 mb-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-gray-100 btn-press"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Button>
          <h2 className="font-semibold text-lg">Settings</h2>
          <div className="w-10"></div>
        </div>
      </div>
      
      {/* Profile Section */}
      <div className="px-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <img 
                src={(user as any)?.profileImageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"}
                alt="Profile" 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{(user as any)?.firstName} {(user as any)?.lastName}</h3>
                <p className="text-gray-600">{(user as any)?.phoneNumber || "+91 98765 43210"}</p>
                <p className="text-sm text-gray-500">{(user as any)?.email}</p>
              </div>
              <Button variant="ghost" className="text-primary font-medium p-0 h-auto">
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Settings Options */}
      <div className="px-6 pb-24">
        {/* Security Section */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">Security</h3>
          <Card>
            <CardContent className="p-0">
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-between p-4 h-auto rounded-none">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Lock className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium">Change PIN</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Button>
                
                <div className="flex items-center justify-between p-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                      <Fingerprint className="w-4 h-4 text-success" />
                    </div>
                    <div>
                      <p className="font-medium">Biometric Authentication</p>
                      <p className="text-sm text-gray-500">Enabled</p>
                    </div>
                  </div>
                  <Switch 
                    checked={biometricEnabled}
                    onCheckedChange={setBiometricEnabled}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Notifications Section */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">Notifications</h3>
          <Card>
            <CardContent className="p-0">
              <div className="space-y-1">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                      <Bell className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">Payment Alerts</p>
                      <p className="text-sm text-gray-500">Get notified for all transactions</p>
                    </div>
                  </div>
                  <Switch 
                    checked={paymentAlerts}
                    onCheckedChange={setPaymentAlerts}
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                      <Megaphone className="w-4 h-4 text-warning" />
                    </div>
                    <div>
                      <p className="font-medium">Promotional</p>
                      <p className="text-sm text-gray-500">Offers and updates</p>
                    </div>
                  </div>
                  <Switch 
                    checked={promotionalNotifications}
                    onCheckedChange={setPromotionalNotifications}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* App Preferences */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">App Preferences</h3>
          <Card>
            <CardContent className="p-0">
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-between p-4 h-auto rounded-none">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-700/10 rounded-full flex items-center justify-center">
                      <Palette className="w-4 h-4 text-gray-700" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Theme</p>
                      <p className="text-sm text-gray-500">Light</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Button>
                
                <Button variant="ghost" className="w-full justify-between p-4 h-auto rounded-none border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                      <Globe className="w-4 h-4 text-success" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Language</p>
                      <p className="text-sm text-gray-500">English</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Support Section */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">Support</h3>
          <Card>
            <CardContent className="p-0">
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-between p-4 h-auto rounded-none">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <HelpCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium">Help Center</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Button>
                
                <Button variant="ghost" className="w-full justify-between p-4 h-auto rounded-none border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                      <Headphones className="w-4 h-4 text-accent" />
                    </div>
                    <span className="font-medium">Contact Support</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Button>
                
                <Button variant="ghost" className="w-full justify-between p-4 h-auto rounded-none border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                      <Info className="w-4 h-4 text-warning" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">About OPPB</p>
                      <p className="text-sm text-gray-500">Version 1.0.0</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Logout Button */}
        <Button 
          onClick={handleLogoutClick}
          variant="destructive"
          className="w-full py-3 btn-press"
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Signing out..." : "Logout"}
        </Button>
      </div>

      <BottomNavigation activeTab="settings" />
      
      {/* Logout Confirmation Dialog */}
      <LogoutConfirmDialog
        isOpen={showLogoutDialog}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        isLoggingOut={isLoggingOut}
      />
    </div>
  );
}