import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Smartphone, Users, Globe, Zap, Star } from "lucide-react";
import { Link } from "wouter";
import { ApplePayContactlessSVG, ApplePaySecuritySVG, ApplePayNFCSVG, ApplePayBiometricSVG, ApplePayQRCodeSVG, ApplePaySendMoneySVG } from "@/components/ApplePaySVGs";
import { OPPBLogoSVG } from "@/components/PremiumSVGs";

export default function Landing() {
  const [isAnimating, setIsAnimating] = useState(false);

  const features = [
    {
      icon: ApplePaySecuritySVG,
      title: "Bank-Grade Security",
      description: "End-to-end encryption with biometric authentication",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      icon: ApplePayContactlessSVG,
      title: "Offline Payments",
      description: "Pay without internet using Bluetooth technology",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      icon: ApplePayQRCodeSVG,
      title: "Instant QR Payments",
      description: "Scan and pay in seconds with smart recognition",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
      icon: ApplePaySendMoneySVG,
      title: "Send Money Instantly",
      description: "Transfer to any UPI ID or mobile number",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Small Business Owner",
      content: "OPPB's offline payments saved my business during network outages. Incredible technology!",
      rating: 5,
      avatar: "PS"
    },
    {
      name: "Rohit Kumar",
      role: "Freelance Developer",
      content: "The most secure payment app I've used. Face ID integration is seamless.",
      rating: 5,
      avatar: "RK"
    },
    {
      name: "Sneha Patel",
      role: "College Student",
      content: "Love the Apple Pay-like interface. Makes payments feel premium and safe.",
      rating: 5,
      avatar: "SP"
    }
  ];

  const stats = [
    { value: "10M+", label: "Users" },
    { value: "₹500Cr+", label: "Transactions" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>

      {/* Navigation Header */}
      <nav className="relative z-10 flex items-center justify-between p-6 backdrop-blur-xl bg-black/30">
        <div className="flex items-center space-x-3">
          <OPPBLogoSVG className="w-10 h-10" animated={true} />
          <span className="text-2xl font-bold text-white">OPPB</span>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <Shield className="w-3 h-3 mr-1" />
            Secure
          </Badge>
          <Link href="/api/login">
            <Button className="apple-pay-gradient h-10 px-6 rounded-full text-white font-semibold">
              Sign In
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            Powered by Blockchain Technology
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            The Future of
            <br />
            Digital Payments
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience seamless, secure, and offline-capable payments with OPPB. 
            Pay anyone, anywhere, even without internet connection.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/api/login">
              <Button 
                className="apple-pay-gradient h-14 px-8 rounded-2xl text-white font-semibold text-lg w-full sm:w-auto hover:scale-105 transition-transform duration-300"
                onClick={() => setIsAnimating(true)}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              variant="outline"
              className="apple-pay-glass border-white/20 h-14 px-8 rounded-2xl text-white font-semibold text-lg w-full sm:w-auto"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Premium Features
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Built with the same attention to detail and security as Apple Pay
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="apple-pay-card border-0 hover:scale-105 transition-all duration-500 cursor-pointer group"
                style={{ background: feature.gradient }}
              >
                <CardContent className="p-8 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-8 h-8 text-white drop-shadow-sm" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-sm">{feature.title}</h3>
                    <p className="text-white/80 text-lg leading-relaxed">{feature.description}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="relative z-10 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white">
            Revolutionary Technology
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="apple-pay-glass rounded-3xl p-8 border border-white/20">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full apple-pay-gradient flex items-center justify-center">
                <ApplePayBiometricSVG className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Biometric Security</h3>
              <p className="text-gray-300">Face ID and fingerprint authentication for ultimate security</p>
            </div>
            
            <div className="apple-pay-glass rounded-3xl p-8 border border-white/20">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full apple-pay-gradient flex items-center justify-center">
                <ApplePayNFCSVG className="w-8 h-8 text-white" animated={true} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">NFC Technology</h3>
              <p className="text-gray-300">Tap-to-pay functionality for contactless transactions</p>
            </div>
            
            <div className="apple-pay-glass rounded-3xl p-8 border border-white/20">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full apple-pay-gradient flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Global Network</h3>
              <p className="text-gray-300">Connected to worldwide payment infrastructure</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Trusted by Millions
            </h2>
            <p className="text-xl text-gray-300">
              Join the community of users who love OPPB
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="apple-pay-card border-0">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full apple-pay-gradient flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="apple-pay-card border-0 overflow-hidden">
            <CardContent className="p-12 relative">
              <div className="absolute inset-0 apple-pay-gradient opacity-90"></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Ready to Transform Your Payments?
                </h2>
                <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                  Join millions of users who trust OPPB for secure, fast, and reliable payments.
                </p>
                <Link href="/api/login">
                  <Button className="bg-white text-gray-900 h-14 px-8 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300">
                    Start Using OPPB Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/10 backdrop-blur-xl bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <OPPBLogoSVG className="w-8 h-8" />
              <span className="text-xl font-bold text-white">OPPB</span>
            </div>
            
            <div className="flex items-center space-x-6 text-gray-400">
              <span className="text-sm">© 2025 OPPB. All rights reserved.</span>
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Bank-grade security</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}