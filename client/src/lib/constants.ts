export const COLORS = {
  // OPPB Brand Colors
  primary: "#6739B7", // OPPB Purple
  primaryHsl: "hsl(262, 51%, 47%)",
  success: "#00C851", // Success Green
  successHsl: "hsl(142, 100%, 39%)",
  error: "#FF3547", // Error Red
  errorHsl: "hsl(355, 100%, 60%)",
  warning: "#FFB300", // Warning Amber
  warningHsl: "hsl(41, 100%, 50%)",
  offline: "#FF6900", // Offline Orange
  offlineHsl: "hsl(25, 100%, 50%)",
  secondary: "#8B5CF6", // Secondary Purple
  accent: "#3B82F6", // Accent Blue
  info: "#17A2B8", // Info Teal
  
  // Neutral Colors
  background: "#F8F9FA", // Light gray background
  cardWhite: "#FFFFFF", // Card backgrounds
  textPrimary: "#1C1C1E", // Main text
  textSecondary: "#8E8E93", // Secondary text
  border: "#E5E5E7", // Dividers and borders
  lightGray: "#F8FAFC",
  darkBg: "#1E293B",
} as const;

export const TRANSACTION_CATEGORIES = {
  FOOD: "food",
  TRANSPORT: "transport",
  SHOPPING: "shopping",
  BILLS: "bills",
  ENTERTAINMENT: "entertainment",
  HEALTH: "health",
  EDUCATION: "education",
  OFFLINE_PAYMENT: "offline_payment",
  ONLINE_PAYMENT: "online_payment",
  RECHARGE: "recharge",
  REQUEST: "request",
  OTHER: "other",
} as const;

export const TRANSACTION_TYPES = {
  DEBIT: "debit",
  CREDIT: "credit",
} as const;

export const TRANSACTION_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
} as const;

export const MOCK_MERCHANTS = [
  {
    id: 1,
    name: "Zomato",
    category: TRANSACTION_CATEGORIES.FOOD,
    icon: "🛒",
    upi: "zomato@paytm",
    location: "Food Delivery",
    rating: 4.5,
    verified: true,
    supportsOffline: true,
  },
  {
    id: 2,
    name: "Ramesh General Store",
    category: TRANSACTION_CATEGORIES.SHOPPING,
    icon: "store",
    upi: "ramesh@paytm",
    location: "Malviya Nagar, Jaipur",
    rating: 4.8,
    verified: true,
    supportsOffline: true,
  },
  {
    id: 3,
    name: "Electricity Board",
    category: TRANSACTION_CATEGORIES.BILLS,
    icon: "⚡",
    upi: "electricity@sbi",
    location: "Utility Payment",
    rating: 4.0,
    verified: true,
    supportsOffline: false,
  },
  {
    id: 4,
    name: "Coffee Corner",
    category: TRANSACTION_CATEGORIES.FOOD,
    icon: "coffee",
    upi: "coffee@oksbi",
    location: "New Merchant",
    rating: 4.2,
    verified: false,
    supportsOffline: true,
  },
] as const;

export const MOCK_CONTACTS = [
  {
    id: 1,
    name: "Rohit Kumar",
    phone: "+91 98765 43210",
    upi: "rohit.verma@paytm",
    avatar: "👤",
    isRecent: true,
    verified: true,
  },
  {
    id: 2,
    name: "Priya Sharma", 
    phone: "+91 99887 66655",
    upi: "priya@oksbi",
    avatar: "👤",
    isRecent: true,
    verified: true,
  },
  {
    id: 3,
    name: "Amit Singh",
    phone: "+91 98765 67890",
    upi: "amit.kumar@paytm",
    avatar: "👤",
    isRecent: true,
    verified: true,
  },
  {
    id: 4,
    name: "Aarav Kumar",
    phone: "+91 98765 43210",
    upi: "aarav@paytm",
    avatar: "👤",
    isRecent: false,
    verified: true,
  },
  {
    id: 5,
    name: "Divya Sharma",
    phone: "+91 99887 66655", 
    upi: "divya@oksbi",
    avatar: "👤",
    isRecent: false,
    verified: true,
  },
] as const;

export const QUICK_ACTIONS = [
  {
    id: "qr",
    label: "Scan QR",
    sublabel: "Scan & Pay",
    icon: "📱",
    route: "/qr-scanner",
    color: "#6739B7",
  },
  {
    id: "send",
    label: "Send Money",
    sublabel: "To Mobile",
    icon: "💸",
    route: "/send-money",
    color: "#00C851",
  },
  {
    id: "bills",
    label: "Pay Bills",
    sublabel: "Recharge & Bills",
    icon: "📄",
    route: "/bills",
    color: "#FFB300",
  },
  {
    id: "request",
    label: "Request",
    sublabel: "Request Money",
    icon: "🔄",
    route: "/request",
    color: "#FF3547",
  },
  {
    id: "upi",
    label: "My UPI",
    sublabel: "UPI ID",
    icon: "🎯",
    route: "/upi-id", 
    color: "#6739B7",
  },
  {
    id: "cards",
    label: "Link Card",
    sublabel: "Cards",
    icon: "💳",
    route: "/cards",
    color: "#00C851",
  },
  {
    id: "reports",
    label: "Reports",
    sublabel: "Transaction History",
    icon: "📊",
    route: "/transaction-history",
    color: "#FFB300",
  },
  {
    id: "offline",
    label: "Offline",
    sublabel: "Offline Payments",
    icon: "⚡",
    route: "/offline-payments",
    color: "#FF6900",
  },
] as const;
