import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Fingerprint } from "lucide-react";
import { COLORS } from "@/lib/constants";

interface PhoneRegistrationProps {
  onComplete: (phoneNumber: string) => void;
}

export default function PhoneRegistration({ onComplete }: PhoneRegistrationProps) {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(false);

  // Country codes with flag icons
  const countryCodes = [
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+1", country: "USA", flag: "🇺🇸" },
    { code: "+44", country: "UK", flag: "🇬🇧" },
    { code: "+65", country: "Singapore", flag: "🇸🇬" }
  ];

  const handlePhoneChange = (value: string) => {
    // Only allow digits
    const cleanValue = value.replace(/\D/g, '');
    setPhoneNumber(cleanValue);
    
    // Real-time validation - Indian phone numbers are 10 digits
    if (countryCode === "+91") {
      setIsValid(cleanValue.length === 10);
    } else {
      setIsValid(cleanValue.length >= 7 && cleanValue.length <= 15);
    }
  };

  const handleContinue = () => {
    if (isValid) {
      onComplete(`${countryCode}${phoneNumber}`);
    }
  };

  const handleBiometric = () => {
    // Simulate biometric login
    alert("Biometric authentication will be available after initial setup");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center" style={{ backgroundColor: COLORS.background }}>
      <div className="p-8 max-w-sm mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">OPPB</span>
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: COLORS.textPrimary }}>
            Enter Mobile Number
          </h1>
          <p className="text-sm" style={{ color: COLORS.textSecondary }}>
            We'll send you an OTP to verify your number
          </p>
        </div>

        {/* Phone Number Entry - Exact Specification */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Country Selector with Flag Icons */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.textPrimary }}>
                  Country
                </label>
                <Select value={countryCode} onValueChange={setCountryCode}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{country.flag}</span>
                          <span>{country.code}</span>
                          <span className="text-sm text-gray-500">{country.country}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Phone Number Input */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.textPrimary }}>
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="flex">
                    <div className="flex items-center px-3 bg-gray-50 border border-r-0 rounded-l-lg">
                      <span className="text-lg mr-2">🇮🇳</span>
                      <span className="font-medium">{countryCode}</span>
                    </div>
                    <Input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="9876543210"
                      className="h-12 text-lg border-l-0 rounded-l-none rounded-r-lg"
                      maxLength={10}
                    />
                  </div>
                  
                  {/* Real-time Validation with Green Checkmark */}
                  {isValid && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
                
                {/* Helper Text */}
                <p className="text-xs mt-2" style={{ color: COLORS.textSecondary }}>
                  {countryCode === "+91" ? "Enter 10-digit mobile number" : "Enter valid mobile number"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          disabled={!isValid}
          className="w-full h-14 text-lg font-semibold mb-6"
          style={{ backgroundColor: isValid ? COLORS.primary : '#ccc' }}
        >
          Continue
        </Button>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" style={{ borderColor: COLORS.border }}></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white" style={{ color: COLORS.textSecondary }}>
              OR
            </span>
          </div>
        </div>

        {/* Biometric Login Option */}
        <Button
          variant="outline"
          onClick={handleBiometric}
          className="w-full h-14 text-lg font-semibold"
        >
          <Fingerprint className="h-5 w-5 mr-2" />
          📱 Use Biometric Login
        </Button>

        {/* Terms */}
        <div className="text-center mt-6">
          <p className="text-xs" style={{ color: COLORS.textSecondary }}>
            By continuing, you agree to our{" "}
            <a href="#" className="text-purple-600 underline">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="text-purple-600 underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}