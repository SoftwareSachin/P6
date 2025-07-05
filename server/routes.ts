import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertTransactionSchema, insertPaymentRequestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up session support for logout functionality
  const { getSession } = await import("./replitAuth");
  app.use(getSession());

  // Global logout state for mock environment
  let userSignedOut = false;

  // Mock user for development
  const mockUser = {
    id: "dev-user-123",
    email: "dev@example.com",
    firstName: "Dev",
    lastName: "User",
    profileImageUrl: null,
    balance: "1000.00"
  };

  // Auth routes - temporary mock implementation
  app.get('/api/auth/user', async (req: any, res) => {
    try {
      // Check if user is signed out in session or global logout flag
      if (req.session?.signedOut || userSignedOut) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      res.json(mockUser);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Logout route
  app.post('/api/auth/logout', async (req: any, res) => {
    try {
      // Set global logout flag for mock environment
      userSignedOut = true;
      
      // Mark session as signed out
      if (req.session) {
        req.session.signedOut = true;
        req.session.user = null;
      }
      
      // Clear the session cookie
      res.clearCookie('connect.sid');
      res.json({ message: "Logged out successfully" });
      
    } catch (error) {
      console.error("Error during logout:", error);
      res.status(500).json({ message: "Failed to logout" });
    }
  });

  // Alternative logout route for GET requests (for simple redirects)
  app.get('/api/logout', async (req: any, res) => {
    try {
      // Set global logout flag for mock environment  
      userSignedOut = true;
      
      if (req.session) {
        req.session.signedOut = true;
        req.session.user = null;
      }
      
      res.clearCookie('connect.sid');
      res.redirect('/');
    } catch (error) {
      console.error("Error during logout:", error);
      res.redirect('/');
    }
  });

  // Login route to reset the logout state for development
  app.post('/api/auth/login', async (req: any, res) => {
    try {
      // Reset logout flag for mock environment
      userSignedOut = false;
      
      if (req.session) {
        req.session.signedOut = false;
        req.session.user = mockUser;
      }
      
      res.json(mockUser);
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Failed to login" });
    }
  });

  // User balance routes
  app.get('/api/user/balance', async (req: any, res) => {
    try {
      const userId = mockUser.id;
      const user = await storage.getUser(userId);
      res.json({ balance: user?.balance || mockUser.balance });
    } catch (error) {
      console.error("Error fetching balance:", error);
      res.status(500).json({ message: "Failed to fetch balance" });
    }
  });

  app.post('/api/user/balance/add', async (req: any, res) => {
    try {
      const userId = mockUser.id;
      const { amount } = req.body;
      
      if (!amount || parseFloat(amount) <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
      }

      await storage.addBalance(userId, parseFloat(amount));
      const user = await storage.getUser(userId);
      res.json({ balance: user?.balance || mockUser.balance });
    } catch (error) {
      console.error("Error adding balance:", error);
      res.status(500).json({ message: "Failed to add balance" });
    }
  });

  // Transaction routes
  app.get('/api/transactions', async (req: any, res) => {
    try {
      const userId = mockUser.id;
      const { limit = 20, offset = 0 } = req.query;
      const transactions = await storage.getUserTransactions(userId, parseInt(limit), parseInt(offset));
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  app.post('/api/transactions', async (req: any, res) => {
    try {
      const userId = mockUser.id;
      const transactionData = insertTransactionSchema.parse({
        ...req.body,
        userId,
        transactionId: `OPP${Date.now()}${Math.random().toString(36).substr(2, 9)}`.toUpperCase(),
      });

      // Validate user has sufficient balance for debit transactions
      if (transactionData.type === 'debit') {
        const user = await storage.getUser(userId);
        const currentBalance = parseFloat(user?.balance || "0");
        const transactionAmount = parseFloat(transactionData.amount);
        
        if (currentBalance < transactionAmount) {
          return res.status(400).json({ message: "Insufficient balance" });
        }

        // Deduct from balance
        await storage.updateBalance(userId, currentBalance - transactionAmount);
      } else if (transactionData.type === 'credit') {
        // Add to balance
        const user = await storage.getUser(userId);
        const currentBalance = parseFloat(user?.balance || "0");
        const transactionAmount = parseFloat(transactionData.amount);
        await storage.updateBalance(userId, currentBalance + transactionAmount);
      }

      const transaction = await storage.createTransaction(transactionData);
      res.json(transaction);
    } catch (error) {
      console.error("Error creating transaction:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid transaction data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create transaction" });
    }
  });

  app.get('/api/transactions/:id', async (req: any, res) => {
    try {
      const userId = mockUser.id;
      const transactionId = parseInt(req.params.id);
      const transaction = await storage.getTransaction(transactionId);
      
      if (!transaction || transaction.userId !== userId) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      
      res.json(transaction);
    } catch (error) {
      console.error("Error fetching transaction:", error);
      res.status(500).json({ message: "Failed to fetch transaction" });
    }
  });

  // Merchant routes
  app.get('/api/merchants', async (req: any, res) => {
    try {
      const merchants = await storage.getMerchants();
      res.json(merchants);
    } catch (error) {
      console.error("Error fetching merchants:", error);
      res.status(500).json({ message: "Failed to fetch merchants" });
    }
  });

  app.get('/api/merchants/:id', async (req: any, res) => {
    try {
      const merchantId = parseInt(req.params.id);
      const merchant = await storage.getMerchant(merchantId);
      
      if (!merchant) {
        return res.status(404).json({ message: "Merchant not found" });
      }
      
      res.json(merchant);
    } catch (error) {
      console.error("Error fetching merchant:", error);
      res.status(500).json({ message: "Failed to fetch merchant" });
    }
  });

  // Payment processing
  app.post('/api/payments/process', async (req: any, res) => {
    try {
      const userId = mockUser.id;
      const { merchantName, amount, note, isOffline = false } = req.body;

      if (!merchantName || !amount || parseFloat(amount) <= 0) {
        return res.status(400).json({ message: "Invalid payment data" });
      }

      // Check user balance
      const user = await storage.getUser(userId);
      const currentBalance = parseFloat(user?.balance || "0");
      const paymentAmount = parseFloat(amount);
      
      if (currentBalance < paymentAmount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }

      // Create transaction
      const transactionData = {
        userId,
        merchantName,
        amount: amount.toString(),
        type: 'debit' as const,
        category: isOffline ? 'offline_payment' as const : 'online_payment' as const,
        status: 'completed' as const,
        note,
        transactionId: `OPP${Date.now()}${Math.random().toString(36).substr(2, 9)}`.toUpperCase(),
        isOffline,
      };

      // Process payment
      await storage.updateBalance(userId, currentBalance - paymentAmount);
      const transaction = await storage.createTransaction(transactionData);

      res.json({
        success: true,
        transaction,
        message: "Payment processed successfully"
      });
    } catch (error) {
      console.error("Error processing payment:", error);
      res.status(500).json({ message: "Failed to process payment" });
    }
  });

  // Payment requests
  app.get('/api/payment-requests', async (req: any, res) => {
    try {
      const userId = mockUser.id;
      const requests = await storage.getPaymentRequests(userId);
      res.json(requests);
    } catch (error) {
      console.error("Error fetching payment requests:", error);
      res.status(500).json({ message: "Failed to fetch payment requests" });
    }
  });

  app.post('/api/payment-requests', async (req: any, res) => {
    try {
      const userId = mockUser.id;
      const requestData = insertPaymentRequestSchema.parse({
        ...req.body,
        fromUserId: userId,
      });

      const paymentRequest = await storage.createPaymentRequest(requestData);
      res.json(paymentRequest);
    } catch (error) {
      console.error("Error creating payment request:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create payment request" });
    }
  });

  // Offline payment API routes
  app.get('/api/offline/devices', async (req: any, res) => {
    try {
      const { limit = 50, offset = 0 } = req.query;
      const devices = await storage.getOfflineDevices(parseInt(limit), parseInt(offset));
      res.json(devices);
    } catch (error) {
      console.error("Error fetching offline devices:", error);
      res.status(500).json({ message: "Failed to fetch offline devices" });
    }
  });

  app.get('/api/offline/devices/:deviceId', async (req: any, res) => {
    try {
      const { deviceId } = req.params;
      const device = await storage.getOfflineDevice(deviceId);
      
      if (!device) {
        return res.status(404).json({ message: "Device not found" });
      }
      
      res.json(device);
    } catch (error) {
      console.error("Error fetching device:", error);
      res.status(500).json({ message: "Failed to fetch device" });
    }
  });

  app.get('/api/offline/devices/:deviceId/banks', async (req: any, res) => {
    try {
      const { deviceId } = req.params;
      const bankAccounts = await storage.getBankAccountsByDevice(deviceId);
      res.json(bankAccounts);
    } catch (error) {
      console.error("Error fetching bank accounts:", error);
      res.status(500).json({ message: "Failed to fetch bank accounts" });
    }
  });

  app.post('/api/offline/otp/send', async (req: any, res) => {
    try {
      const { fromDeviceId, toDeviceId, purpose, metadata } = req.body;
      
      if (!fromDeviceId || !toDeviceId || !purpose) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Generate 6-digit OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Set expiration time (5 minutes)
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
      
      const otpData = {
        fromDeviceId,
        toDeviceId,
        otpCode,
        purpose,
        expiresAt,
        metadata: metadata ? JSON.stringify(metadata) : null
      };

      const otp = await storage.createOtpVerification(otpData);
      
      // In a real app, send SMS/notification here
      console.log(`OTP ${otpCode} sent from ${fromDeviceId} to ${toDeviceId} for ${purpose}`);
      
      res.json({
        success: true,
        otpId: otp.id,
        expiresAt: otp.expiresAt,
        message: `OTP sent successfully for ${purpose}`
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ message: "Failed to send OTP" });
    }
  });

  app.post('/api/offline/otp/verify', async (req: any, res) => {
    try {
      const { fromDeviceId, toDeviceId, otpCode } = req.body;
      
      if (!fromDeviceId || !toDeviceId || !otpCode) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const isValid = await storage.verifyOtp(fromDeviceId, toDeviceId, otpCode);
      
      if (isValid) {
        res.json({
          success: true,
          verified: true,
          message: "OTP verified successfully"
        });
      } else {
        res.status(400).json({
          success: false,
          verified: false,
          message: "Invalid or expired OTP"
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ message: "Failed to verify OTP" });
    }
  });

  app.post('/api/offline/session/create', async (req: any, res) => {
    try {
      const { fromDeviceId, toDeviceId, connectionType = "bluetooth" } = req.body;
      
      if (!fromDeviceId || !toDeviceId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const sessionId = `SES${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      const sessionData = {
        sessionId,
        fromDeviceId,
        toDeviceId,
        connectionType,
        status: "initiated" as const,
        encryptionKey: Math.random().toString(36).substring(2, 15),
        connectionStrength: Math.floor(Math.random() * 40) + 60, // 60-100%
        metadata: JSON.stringify({ createdBy: "api" })
      };

      const session = await storage.createPaymentSession(sessionData);
      res.json(session);
    } catch (error) {
      console.error("Error creating payment session:", error);
      res.status(500).json({ message: "Failed to create payment session" });
    }
  });

  app.patch('/api/offline/session/:sessionId', async (req: any, res) => {
    try {
      const { sessionId } = req.params;
      const updates = req.body;
      
      await storage.updatePaymentSession(sessionId, updates);
      const session = await storage.getPaymentSession(sessionId);
      
      res.json(session);
    } catch (error) {
      console.error("Error updating payment session:", error);
      res.status(500).json({ message: "Failed to update payment session" });
    }
  });

  app.get('/api/offline/session/:sessionId', async (req: any, res) => {
    try {
      const { sessionId } = req.params;
      const session = await storage.getPaymentSession(sessionId);
      
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      
      res.json(session);
    } catch (error) {
      console.error("Error fetching payment session:", error);
      res.status(500).json({ message: "Failed to fetch payment session" });
    }
  });

  // Enhanced offline payment routes for new features
  app.post('/api/offline/sms/send', async (req: any, res) => {
    try {
      const { recipient, message, transactionId } = req.body;
      
      if (!recipient || !message || !transactionId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // In a real implementation, integrate with SMS API like Twilio
      console.log(`SMS Fallback: Sending to ${recipient}: ${message}`);
      
      res.json({
        success: true,
        messageId: `SMS_${Date.now()}`,
        message: "SMS sent successfully via fallback"
      });
    } catch (error) {
      console.error("Error sending SMS:", error);
      res.status(500).json({ message: "Failed to send SMS" });
    }
  });

  app.post('/api/offline/sync/transaction', async (req: any, res) => {
    try {
      const transactionData = req.body;
      
      if (!transactionData.id || !transactionData.amount || !transactionData.signature) {
        return res.status(400).json({ message: "Invalid transaction data" });
      }

      // Verify cryptographic signature (simplified verification)
      if (!transactionData.signature.startsWith('SIG_')) {
        return res.status(400).json({ message: "Invalid transaction signature" });
      }

      // Store the synchronized transaction
      const syncedTransaction = {
        userId: mockUser.id,
        merchantName: transactionData.recipient || "Offline Payment",
        amount: transactionData.amount.toString(),
        type: 'debit' as const,
        category: 'offline_payment' as const,
        status: 'completed' as const,
        note: `Synced from local ledger - ID: ${transactionData.id}`,
        transactionId: transactionData.id,
        isOffline: true,
      };

      const transaction = await storage.createTransaction(syncedTransaction);
      
      res.json({
        success: true,
        transaction,
        message: "Transaction synchronized successfully"
      });
    } catch (error) {
      console.error("Error syncing transaction:", error);
      res.status(500).json({ message: "Failed to sync transaction" });
    }
  });

  app.get('/api/offline/mesh/discover', async (req: any, res) => {
    try {
      // Simulate mesh network discovery
      const meshNodes = [
        {
          id: 'MESH_HUB_001',
          name: 'OPPB Payment Hub',
          type: 'hub',
          distance: '3m',
          signal_strength: 95,
          capabilities: ['relay', 'payment_processing', 'sync'],
          connected_devices: 12
        },
        {
          id: 'MESH_RELAY_001',
          name: 'Local Relay Node',
          type: 'relay',
          distance: '5m',
          signal_strength: 88,
          capabilities: ['relay', 'message_forwarding'],
          connected_devices: 8
        },
        {
          id: 'MESH_STORE_001',
          name: 'Merchant Terminal',
          type: 'merchant',
          distance: '2m',
          signal_strength: 92,
          capabilities: ['payment_acceptance', 'receipt_generation'],
          connected_devices: 3
        }
      ];

      res.json(meshNodes);
    } catch (error) {
      console.error("Error discovering mesh network:", error);
      res.status(500).json({ message: "Failed to discover mesh network" });
    }
  });

  app.post('/api/offline/fraud/report', async (req: any, res) => {
    try {
      const { deviceId, suspiciousActivity, transactionIds } = req.body;
      
      // Log fraud detection for review
      console.log(`Fraud Alert: Device ${deviceId} reported ${suspiciousActivity}`);
      console.log(`Related transactions: ${transactionIds?.join(', ')}`);
      
      res.json({
        success: true,
        alertId: `FRAUD_${Date.now()}`,
        message: "Fraud alert reported and will be reviewed"
      });
    } catch (error) {
      console.error("Error reporting fraud:", error);
      res.status(500).json({ message: "Failed to report fraud" });
    }
  });

  // DTH Recharge API endpoints
  app.post('/api/dth/recharge', async (req: any, res) => {
    try {
      const { provider, subscriberNumber, amount, plan, type } = req.body;
      const userId = mockUser.id; // Use mockUser for consistency

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!provider || !subscriberNumber || !amount) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Get user's current balance
      const user = await storage.getUser(userId);
      if (!user || parseFloat(user.balance) < parseFloat(amount)) {
        return res.status(400).json({ message: "Insufficient balance" });
      }

      // Generate unique transaction ID
      const transactionId = `DTH_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Create transaction record
      const transactionData = {
        userId: user.id,
        merchantName: provider,
        amount: amount.toString(),
        type: 'debit',
        category: 'dth_recharge',
        status: 'completed',
        note: `DTH Recharge for ${subscriberNumber}`,
        transactionId,
        isOffline: false
      };

      const transaction = await storage.createTransaction(transactionData);

      // Update user balance
      const newBalance = parseFloat(user.balance) - parseFloat(amount);
      await storage.updateBalance(user.id, newBalance);

      res.json({
        success: true,
        transactionId: transaction.id,
        message: "DTH recharge successful",
        newBalance: newBalance.toFixed(2)
      });
    } catch (error) {
      console.error("Error processing DTH recharge:", error);
      res.status(500).json({ message: "DTH recharge failed" });
    }
  });

  // Bill Payment API endpoints
  app.post('/api/bills/pay', async (req: any, res) => {
    try {
      const { category, provider, consumerNumber, amount, billDetails, type } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!category || !provider || !consumerNumber || !amount) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Get user's current balance
      const user = await storage.getUser(userId);
      if (!user || parseFloat(user.balance) < parseFloat(amount)) {
        return res.status(400).json({ message: "Insufficient balance" });
      }

      // Generate unique transaction ID
      const billTransactionId = `BILL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Create transaction record
      const transactionData = {
        userId: user.id,
        merchantName: `${category} - ${provider}`,
        amount: amount.toString(),
        type: 'debit',
        category: 'bill_payment',
        status: 'completed',
        note: `${category} bill payment for ${consumerNumber}`,
        transactionId: billTransactionId,
        isOffline: false
      };

      const transaction = await storage.createTransaction(transactionData);

      // Update user balance
      const newBalance = parseFloat(user.balance) - parseFloat(amount);
      await storage.updateBalance(user.id, newBalance);

      res.json({
        success: true,
        transactionId: transaction.id,
        message: "Bill payment successful",
        newBalance: newBalance.toFixed(2)
      });
    } catch (error) {
      console.error("Error processing bill payment:", error);
      res.status(500).json({ message: "Bill payment failed" });
    }
  });

  // PWA-specific routes
  app.get('/manifest.json', (req, res) => {
    res.setHeader('Content-Type', 'application/manifest+json');
    res.setHeader('Cache-Control', 'public, max-age=0');
    // The manifest.json file will be served from client/public by Vite
  });

  app.get('/sw.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('Cache-Control', 'public, max-age=0');
    res.setHeader('Service-Worker-Allowed', '/');
    // The sw.js file will be served from client/public by Vite
  });

  // Serve PWA icons
  app.get('/icons/*', (req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year cache for icons
    // Icons will be served from client/public/icons by Vite
  });

  // RWA Tokenization API routes
  app.get('/api/rwa/assets', async (req: any, res) => {
    try {
      const userId = mockUser.id;
      const assets = await storage.getRWAssets(userId);
      res.json(assets);
    } catch (error) {
      console.error("Error fetching RWA assets:", error);
      res.status(500).json({ message: "Failed to fetch RWA assets" });
    }
  });

  app.get('/api/rwa/tokens', async (req: any, res) => {
    try {
      const { limit = 50, offset = 0 } = req.query;
      const tokens = await storage.getRWATokens(Number(limit), Number(offset));
      res.json(tokens);
    } catch (error) {
      console.error("Error fetching RWA tokens:", error);
      res.status(500).json({ message: "Failed to fetch RWA tokens" });
    }
  });

  app.get('/api/rwa/token/:tokenId', async (req: any, res) => {
    try {
      const { tokenId } = req.params;
      const token = await storage.getRWAToken(Number(tokenId));
      
      if (!token) {
        return res.status(404).json({ message: "Token not found" });
      }
      
      // Get market data for the token
      const marketData = await storage.getRWAMarketData(Number(tokenId));
      
      res.json({ ...token, marketData });
    } catch (error) {
      console.error("Error fetching RWA token:", error);
      res.status(500).json({ message: "Failed to fetch RWA token" });
    }
  });

  app.get('/api/rwa/investments', async (req: any, res) => {
    try {
      const userId = mockUser.id;
      const investments = await storage.getRWAInvestments(userId);
      res.json(investments);
    } catch (error) {
      console.error("Error fetching RWA investments:", error);
      res.status(500).json({ message: "Failed to fetch RWA investments" });
    }
  });

  app.post('/api/rwa/invest', async (req: any, res) => {
    try {
      const { tokenId, amount } = req.body;
      const userId = mockUser.id;

      if (!tokenId || !amount || amount <= 0) {
        return res.status(400).json({ message: "Invalid investment parameters" });
      }

      // Get current user balance
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const currentBalance = parseFloat(user.balance);
      const investmentAmount = parseFloat(amount);

      if (currentBalance < investmentAmount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }

      // Get token details
      const token = await storage.getRWAToken(tokenId);
      if (!token) {
        return res.status(404).json({ message: "Token not found" });
      }

      const pricePerToken = parseFloat(token.pricePerToken);
      const tokensToReceive = investmentAmount / pricePerToken;

      // Check minimum investment
      if (investmentAmount < parseFloat(token.minimumInvestment)) {
        return res.status(400).json({ 
          message: `Minimum investment required: ₹${token.minimumInvestment}` 
        });
      }

      // Create investment record
      const investmentData = {
        userId,
        tokenId,
        tokensOwned: tokensToReceive.toString(),
        totalInvested: investmentAmount.toString(),
        currentValue: investmentAmount.toString(),
        yieldEarned: "0.00"
      };

      const investment = await storage.createRWAInvestment(investmentData);

      // Create transaction record
      const transactionData = {
        userId,
        merchantName: `RWA Investment - ${token.tokenName}`,
        merchantImage: "https://example.com/rwa-icon.png",
        amount: investmentAmount.toString(),
        type: 'debit' as const,
        category: 'investment' as const,
        status: 'completed' as const,
        note: `Purchased ${tokensToReceive.toFixed(2)} ${token.tokenSymbol} tokens`,
        transactionId: `RWA${Date.now()}${Math.random().toString(36).substr(2, 9)}`.toUpperCase(),
        isOffline: false
      };

      await storage.createTransaction(transactionData);

      // Update user balance
      await storage.updateBalance(userId, currentBalance - investmentAmount);

      // Create RWA transaction
      const rwaTransactionData = {
        userId,
        tokenId,
        type: 'buy' as const,
        quantity: tokensToReceive.toString(),
        price: pricePerToken.toString(),
        totalAmount: investmentAmount.toString(),
        status: 'completed' as const,
        transactionHash: `0x${Math.random().toString(16).substring(2, 66)}`
      };

      await storage.createRWATransaction(rwaTransactionData);

      res.json({
        success: true,
        investment,
        tokensReceived: tokensToReceive,
        message: "Investment completed successfully"
      });

    } catch (error) {
      console.error("Error processing RWA investment:", error);
      res.status(500).json({ message: "Failed to process investment" });
    }
  });

  app.get('/api/rwa/transactions', async (req: any, res) => {
    try {
      const userId = mockUser.id;
      const transactions = await storage.getRWATransactions(userId);
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching RWA transactions:", error);
      res.status(500).json({ message: "Failed to fetch RWA transactions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
