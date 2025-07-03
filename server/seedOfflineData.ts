import { db } from "./db";
import { offlineDevices, bankAccounts, offlinePaymentSessions, otpVerifications } from "@shared/schema";

// Generate realistic device data
const deviceTypes = ['iOS', 'Android', 'POS'];
const iosModels = ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro', 'iPhone 14', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 12 Pro'];
const androidModels = ['Samsung Galaxy S24 Ultra', 'Samsung Galaxy S24', 'Google Pixel 8 Pro', 'OnePlus 12', 'Xiaomi 14', 'Oppo Find X7', 'Vivo X100'];
const posModels = ['Square Terminal', 'Pine Labs POS', 'PayTM POS', 'SBI POS', 'HDFC POS', 'Axis Bank POS'];

const indianNames = [
  'Aarav Kumar', 'Vivaan Sharma', 'Aditya Singh', 'Vihaan Gupta', 'Arjun Patel', 'Sai Reddy', 'Reyansh Joshi',
  'Ayaan Khan', 'Krishna Yadav', 'Ishaan Verma', 'Shaurya Agarwal', 'Atharv Mishra', 'Advik Tiwari',
  'Priya Sharma', 'Ananya Singh', 'Diya Patel', 'Aadhya Gupta', 'Kavya Kumar', 'Arya Reddy', 'Myra Joshi',
  'Anika Khan', 'Sara Yadav', 'Ira Verma', 'Pihu Agarwal', 'Riya Mishra', 'Avni Tiwari', 'Shanaya Roy',
  'Rajesh Mehta', 'Suresh Nair', 'Ramesh Pillai', 'Mahesh Iyer', 'Dinesh Menon', 'Prakash Shetty',
  'Sunita Devi', 'Meera Bai', 'Lakshmi Nair', 'Radha Sharma', 'Gita Patel', 'Sita Gupta'
];

const indianCities = [
  'Mumbai, Maharashtra', 'Delhi, Delhi', 'Bangalore, Karnataka', 'Hyderabad, Telangana', 'Chennai, Tamil Nadu',
  'Kolkata, West Bengal', 'Pune, Maharashtra', 'Ahmedabad, Gujarat', 'Jaipur, Rajasthan', 'Surat, Gujarat',
  'Lucknow, Uttar Pradesh', 'Kanpur, Uttar Pradesh', 'Nagpur, Maharashtra', 'Patna, Bihar', 'Indore, Madhya Pradesh',
  'Thane, Maharashtra', 'Bhopal, Madhya Pradesh', 'Visakhapatnam, Andhra Pradesh', 'Vadodara, Gujarat',
  'Coimbatore, Tamil Nadu', 'Ludhiana, Punjab', 'Agra, Uttar Pradesh', 'Nashik, Maharashtra', 'Faridabad, Haryana',
  'Meerut, Uttar Pradesh', 'Rajkot, Gujarat', 'Kalyan-Dombivli, Maharashtra', 'Vasai-Virar, Maharashtra'
];

const banks = [
  { name: 'State Bank of India', code: 'SBIN', logo: 'sbi.png' },
  { name: 'HDFC Bank', code: 'HDFC', logo: 'hdfc.png' },
  { name: 'ICICI Bank', code: 'ICIC', logo: 'icici.png' },
  { name: 'Axis Bank', code: 'UTIB', logo: 'axis.png' },
  { name: 'Kotak Mahindra Bank', code: 'KKBK', logo: 'kotak.png' },
  { name: 'Punjab National Bank', code: 'PUNB', logo: 'pnb.png' },
  { name: 'Bank of Baroda', code: 'BARB', logo: 'bob.png' },
  { name: 'Canara Bank', code: 'CNRB', logo: 'canara.png' },
  { name: 'Union Bank of India', code: 'UBIN', logo: 'union.png' },
  { name: 'Bank of India', code: 'BKID', logo: 'boi.png' },
  { name: 'IndusInd Bank', code: 'INDB', logo: 'indusind.png' },
  { name: 'Yes Bank', code: 'YESB', logo: 'yes.png' },
  { name: 'IDFC First Bank', code: 'IDFB', logo: 'idfc.png' },
  { name: 'Federal Bank', code: 'FDRL', logo: 'federal.png' },
  { name: 'South Indian Bank', code: 'SIBL', logo: 'sib.png' }
];

const upiProviders = ['@paytm', '@phonepe', '@gpay', '@bharatpe', '@mobikwik', '@freecharge', '@amazonpay', '@ybl'];
const deviceColors = ['#1D4ED8', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];
const trustLevels = ['low', 'medium', 'high', 'verified'];

function generateRandomPhone(): string {
  const prefixes = ['90', '91', '92', '93', '94', '95', '96', '97', '98', '99'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = Math.floor(Math.random() * 90000000) + 10000000;
  return `${prefix}${number}`;
}

function generateMacAddress(): string {
  const chars = '0123456789ABCDEF';
  let mac = '';
  for (let i = 0; i < 6; i++) {
    if (i > 0) mac += ':';
    mac += chars[Math.floor(Math.random() * 16)] + chars[Math.floor(Math.random() * 16)];
  }
  return mac;
}

function generateAccountNumber(): string {
  return Math.floor(Math.random() * 900000000000000) + 100000000000000 + '';
}

function generateIFSC(bankCode: string): string {
  const branchCode = Math.floor(Math.random() * 9000) + 1000;
  return `${bankCode}0${branchCode}`;
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min: number, max: number, decimals: number = 2): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

async function seedOfflineDevicesAndBanks() {
  console.log('🚀 Starting offline devices and bank accounts seeding...');
  
  const deviceData = [];
  const bankData = [];

  // Generate 1000 realistic device records
  for (let i = 0; i < 1000; i++) {
    const deviceType = getRandomElement(deviceTypes);
    let model = '';
    
    switch (deviceType) {
      case 'iOS':
        model = getRandomElement(iosModels);
        break;
      case 'Android':
        model = getRandomElement(androidModels);
        break;
      case 'POS':
        model = getRandomElement(posModels);
        break;
    }

    const ownerName = getRandomElement(indianNames);
    const deviceId = `DEV${Date.now()}${i.toString().padStart(4, '0')}`;
    const phone = generateRandomPhone();
    const location = getRandomElement(indianCities);
    const trustLevel = getRandomElement(trustLevels);
    const transactionCount = getRandomNumber(0, 500);
    const totalVolume = getRandomFloat(0, 2500000);
    
    const device = {
      deviceId,
      name: deviceType === 'POS' ? `${model} - ${ownerName.split(' ')[1]} Store` : `${ownerName.split(' ')[0]}'s ${model}`,
      type: deviceType,
      model,
      macAddress: generateMacAddress(),
      bluetoothVersion: getRandomElement(['5.0', '5.1', '5.2', '5.3']),
      batteryLevel: getRandomNumber(10, 100),
      signalStrength: getRandomNumber(45, 95),
      distance: getRandomFloat(0.5, 50, 1).toString(),
      isOnline: Math.random() > 0.15, // 85% online
      trustLevel,
      transactionCount,
      totalVolume: totalVolume.toString(),
      encryption: getRandomElement(['AES-256', 'RSA-2048', 'ECC-P256']),
      location,
      ownerId: `USER${i.toString().padStart(6, '0')}`,
      ownerPhone: phone,
      ownerName,
      profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${ownerName.replace(' ', '')}`,
      rating: getRandomFloat(3.0, 5.0).toString(),
      reviewCount: getRandomNumber(0, 200),
      isVerified: trustLevel === 'verified' || Math.random() > 0.7,
      deviceColor: getRandomElement(deviceColors),
      lastSeen: new Date(Date.now() - getRandomNumber(0, 86400000)) // Within last 24 hours
    };
    
    deviceData.push(device);

    // Generate 1-3 bank accounts per device
    const bankCount = getRandomNumber(1, 3);
    for (let j = 0; j < bankCount; j++) {
      const bank = getRandomElement(banks);
      const accountType = getRandomElement(['savings', 'current', 'business']);
      const balance = getRandomFloat(1000, 500000);
      const upiProvider = getRandomElement(upiProviders);
      
      const bankAccount = {
        deviceId,
        bankName: bank.name,
        bankCode: bank.code,
        accountNumber: generateAccountNumber(),
        ifscCode: generateIFSC(bank.code),
        accountType,
        accountHolderName: ownerName,
        balance: balance.toString(),
        dailyLimit: getRandomFloat(25000, 200000).toString(),
        monthlyLimit: getRandomFloat(500000, 2000000).toString(),
        isActive: Math.random() > 0.05, // 95% active
        isPrimary: j === 0, // First account is primary
        upiId: `${phone}${upiProvider}`,
        bankLogo: bank.logo,
        lastTransactionAt: Math.random() > 0.3 ? new Date(Date.now() - getRandomNumber(0, 2592000000)) : null // Within last 30 days
      };
      
      bankData.push(bankAccount);
    }
  }

  // Insert devices in batches
  console.log('📱 Inserting devices...');
  for (let i = 0; i < deviceData.length; i += 100) {
    const batch = deviceData.slice(i, i + 100);
    await db.insert(offlineDevices).values(batch);
    console.log(`Inserted devices ${i + 1} to ${Math.min(i + 100, deviceData.length)}`);
  }

  // Insert bank accounts in batches
  console.log('🏦 Inserting bank accounts...');
  for (let i = 0; i < bankData.length; i += 100) {
    const batch = bankData.slice(i, i + 100);
    await db.insert(bankAccounts).values(batch);
    console.log(`Inserted bank accounts ${i + 1} to ${Math.min(i + 100, bankData.length)}`);
  }

  console.log(`✅ Successfully seeded ${deviceData.length} devices and ${bankData.length} bank accounts!`);
}

// Generate some sample OTP verifications and payment sessions
async function seedSampleSessions() {
  console.log('🔐 Creating sample OTP verifications and payment sessions...');
  
  // Get some device IDs for sample data
  const devices = await db.select({ deviceId: offlineDevices.deviceId }).from(offlineDevices).limit(20);
  
  if (devices.length < 2) {
    console.log('Not enough devices for sample sessions');
    return;
  }

  // Create sample OTP verifications
  const otpData = [];
  for (let i = 0; i < 50; i++) {
    const fromDevice = getRandomElement(devices);
    let toDevice = getRandomElement(devices);
    
    // Ensure different devices
    while (toDevice.deviceId === fromDevice.deviceId) {
      toDevice = getRandomElement(devices);
    }
    
    const otpCode = Math.floor(Math.random() * 900000) + 100000; // 6-digit OTP
    const purpose = getRandomElement(['connection', 'payment', 'verification']);
    const status = getRandomElement(['pending', 'verified', 'expired', 'failed']);
    
    otpData.push({
      fromDeviceId: fromDevice.deviceId,
      toDeviceId: toDevice.deviceId,
      otpCode: otpCode.toString(),
      purpose,
      status,
      attempts: status === 'failed' ? 3 : getRandomNumber(0, 2),
      maxAttempts: 3,
      expiresAt: new Date(Date.now() + 300000), // 5 minutes from now
      verifiedAt: status === 'verified' ? new Date() : null,
      metadata: { amount: purpose === 'payment' ? getRandomFloat(100, 50000) : null }
    });
  }

  await db.insert(otpVerifications).values(otpData);

  // Create sample payment sessions
  const sessionData = [];
  for (let i = 0; i < 30; i++) {
    const fromDevice = getRandomElement(devices);
    let toDevice = getRandomElement(devices);
    
    while (toDevice.deviceId === fromDevice.deviceId) {
      toDevice = getRandomElement(devices);
    }
    
    const sessionId = `SES${Date.now()}${i.toString().padStart(3, '0')}`;
    const status = getRandomElement(['initiated', 'connected', 'otp_sent', 'otp_verified', 'payment_ready', 'processing', 'completed', 'failed']);
    
    sessionData.push({
      sessionId,
      fromDeviceId: fromDevice.deviceId,
      toDeviceId: toDevice.deviceId,
      connectionType: getRandomElement(['bluetooth', 'nfc', 'wifi-direct']),
      status,
      encryptionKey: Math.random().toString(36).substring(2, 15),
      connectionStrength: getRandomNumber(60, 95),
      connectionEstablishedAt: status !== 'initiated' ? new Date() : null,
      otpVerifiedAt: ['otp_verified', 'payment_ready', 'processing', 'completed'].includes(status) ? new Date() : null,
      paymentCompletedAt: status === 'completed' ? new Date() : null,
      metadata: { amount: getRandomFloat(100, 25000), currency: 'INR' }
    });
  }

  await db.insert(offlinePaymentSessions).values(sessionData);
  
  console.log(`✅ Created ${otpData.length} OTP verifications and ${sessionData.length} payment sessions`);
}

export async function seedOfflinePaymentData() {
  try {
    console.log('🌱 Starting comprehensive offline payment data seeding...');
    
    await seedOfflineDevicesAndBanks();
    await seedSampleSessions();
    
    console.log('🎉 Offline payment data seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding offline payment data:', error);
    throw error;
  }
}

// Run seeding if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedOfflinePaymentData()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}