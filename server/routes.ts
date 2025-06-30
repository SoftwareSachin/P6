import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertTransactionSchema, insertPaymentRequestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Temporary: Skip auth setup for now to get the app working
  // await setupAuth(app);

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
      res.json(mockUser);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
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

  const httpServer = createServer(app);
  return httpServer;
}
