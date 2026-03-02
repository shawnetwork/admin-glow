export const dashboardStats = {
  totalUsers: 24853,
  activeUsers: 18420,
  referralEarnings: 342500,
  totalInvestments: 1250000,
  totalWithdrawals: 890000,
};

export const signupData = [
  { name: "Mon", daily: 45, weekly: 312, monthly: 1250 },
  { name: "Tue", daily: 52, weekly: 340, monthly: 1380 },
  { name: "Wed", daily: 38, weekly: 298, monthly: 1120 },
  { name: "Thu", daily: 65, weekly: 380, monthly: 1520 },
  { name: "Fri", daily: 72, weekly: 410, monthly: 1680 },
  { name: "Sat", daily: 48, weekly: 325, monthly: 1340 },
  { name: "Sun", daily: 55, weekly: 365, monthly: 1450 },
];

export const referralGrowthData = [
  { name: "Jan", earnings: 12500 },
  { name: "Feb", earnings: 18200 },
  { name: "Mar", earnings: 22400 },
  { name: "Apr", earnings: 28600 },
  { name: "May", earnings: 35100 },
  { name: "Jun", earnings: 42500 },
];

export const investmentGrowthData = [
  { name: "Jan", amount: 85000 },
  { name: "Feb", amount: 120000 },
  { name: "Mar", amount: 145000 },
  { name: "Apr", amount: 198000 },
  { name: "May", amount: 235000 },
  { name: "Jun", amount: 310000 },
];

export type UserStatus = "Active" | "Suspended";
export type UserRank = "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  totalReferrals: number;
  totalEarnings: number;
  investmentAmount: number;
  rank: UserRank;
  status: UserStatus;
  joinDate: string;
}

export const usersData: MockUser[] = [
  { id: "1", name: "Ahmed Khan", email: "ahmed@example.com", referralCode: "AHM-X4K9", totalReferrals: 45, totalEarnings: 12500, investmentAmount: 50000, rank: "Diamond", status: "Active", joinDate: "2024-01-15" },
  { id: "2", name: "Sara Ali", email: "sara@example.com", referralCode: "SAR-L2M7", totalReferrals: 32, totalEarnings: 8400, investmentAmount: 35000, rank: "Platinum", status: "Active", joinDate: "2024-02-20" },
  { id: "3", name: "Usman Raza", email: "usman@example.com", referralCode: "USM-P8N3", totalReferrals: 28, totalEarnings: 6800, investmentAmount: 28000, rank: "Gold", status: "Active", joinDate: "2024-03-10" },
  { id: "4", name: "Fatima Noor", email: "fatima@example.com", referralCode: "FAT-R5Q1", totalReferrals: 15, totalEarnings: 3200, investmentAmount: 15000, rank: "Silver", status: "Suspended", joinDate: "2024-04-05" },
  { id: "5", name: "Bilal Ahmed", email: "bilal@example.com", referralCode: "BIL-T9W6", totalReferrals: 8, totalEarnings: 1500, investmentAmount: 8000, rank: "Bronze", status: "Active", joinDate: "2024-05-18" },
  { id: "6", name: "Ayesha Malik", email: "ayesha@example.com", referralCode: "AYE-V3X2", totalReferrals: 52, totalEarnings: 15600, investmentAmount: 62000, rank: "Diamond", status: "Active", joinDate: "2024-01-08" },
  { id: "7", name: "Hassan Ali", email: "hassan@example.com", referralCode: "HAS-J7Y4", totalReferrals: 20, totalEarnings: 4800, investmentAmount: 22000, rank: "Gold", status: "Active", joinDate: "2024-06-12" },
  { id: "8", name: "Zainab Shah", email: "zainab@example.com", referralCode: "ZAI-K1Z8", totalReferrals: 5, totalEarnings: 900, investmentAmount: 5000, rank: "Bronze", status: "Suspended", joinDate: "2024-07-22" },
  { id: "9", name: "Omar Farooq", email: "omar@example.com", referralCode: "OMA-G6H5", totalReferrals: 38, totalEarnings: 9800, investmentAmount: 42000, rank: "Platinum", status: "Active", joinDate: "2024-02-14" },
  { id: "10", name: "Hira Bashir", email: "hira@example.com", referralCode: "HIR-D4F0", totalReferrals: 12, totalEarnings: 2600, investmentAmount: 12000, rank: "Silver", status: "Active", joinDate: "2024-08-01" },
];

export interface Referral {
  id: string;
  referrer: string;
  referred: string;
  commission: number;
  date: string;
  level: number;
}

export const referralsData: Referral[] = [
  { id: "1", referrer: "Ahmed Khan", referred: "Bilal Ahmed", commission: 500, date: "2024-05-18", level: 1 },
  { id: "2", referrer: "Ahmed Khan", referred: "Hassan Ali", commission: 250, date: "2024-06-12", level: 1 },
  { id: "3", referrer: "Sara Ali", referred: "Zainab Shah", commission: 400, date: "2024-07-22", level: 1 },
  { id: "4", referrer: "Ayesha Malik", referred: "Omar Farooq", commission: 600, date: "2024-02-14", level: 1 },
  { id: "5", referrer: "Ahmed Khan", referred: "Hira Bashir", commission: 125, date: "2024-08-01", level: 2 },
  { id: "6", referrer: "Usman Raza", referred: "Fatima Noor", commission: 350, date: "2024-04-05", level: 1 },
];

export interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  accountTitle: string;
  accountNumber: string;
  bankName?: string;
  instructions: string;
  enabled: boolean;
}

export const paymentMethods: PaymentMethod[] = [
  { id: "1", name: "EasyPaisa", type: "mobile", accountTitle: "Admin Account", accountNumber: "03001234567", instructions: "Send payment to the number above and share screenshot.", enabled: true },
  { id: "2", name: "JazzCash", type: "mobile", accountTitle: "Admin JazzCash", accountNumber: "03009876543", instructions: "Transfer via JazzCash app and submit receipt.", enabled: true },
  { id: "3", name: "Bank Transfer", type: "bank", accountTitle: "Admin Corp Ltd", accountNumber: "PK36SCBL0000001123456702", bankName: "Standard Chartered", instructions: "Use IBAN for transfer. Include reference ID.", enabled: false },
];

export interface RankConfig {
  id: string;
  name: string;
  requiredPoints: number;
  requiredReferrals: number;
  rewardAmount: number;
  bonusPercentage: number;
  active: boolean;
  color: string;
}

export const ranksData: RankConfig[] = [
  { id: "1", name: "Bronze", requiredPoints: 100, requiredReferrals: 5, rewardAmount: 500, bonusPercentage: 2, active: true, color: "185 30% 45%" },
  { id: "2", name: "Silver", requiredPoints: 500, requiredReferrals: 15, rewardAmount: 2000, bonusPercentage: 5, active: true, color: "210 10% 65%" },
  { id: "3", name: "Gold", requiredPoints: 2000, requiredReferrals: 30, rewardAmount: 8000, bonusPercentage: 8, active: true, color: "45 90% 50%" },
  { id: "4", name: "Platinum", requiredPoints: 5000, requiredReferrals: 50, rewardAmount: 20000, bonusPercentage: 12, active: true, color: "225 15% 70%" },
  { id: "5", name: "Diamond", requiredPoints: 15000, requiredReferrals: 100, rewardAmount: 50000, bonusPercentage: 18, active: true, color: "190 95% 45%" },
];

export const earningsData = {
  totalRevenue: 2450000,
  totalCommissionPaid: 342500,
  investmentVolume: 1250000,
  totalWithdrawals: 890000,
};

export const dailyEarningsData = [
  { name: "Mon", earnings: 12500 },
  { name: "Tue", earnings: 18200 },
  { name: "Wed", earnings: 15600 },
  { name: "Thu", earnings: 22400 },
  { name: "Fri", earnings: 28100 },
  { name: "Sat", earnings: 19800 },
  { name: "Sun", earnings: 16400 },
];

export const monthlyComparisonData = [
  { name: "Jan", thisYear: 85000, lastYear: 62000 },
  { name: "Feb", thisYear: 120000, lastYear: 78000 },
  { name: "Mar", thisYear: 145000, lastYear: 95000 },
  { name: "Apr", thisYear: 198000, lastYear: 112000 },
  { name: "May", thisYear: 235000, lastYear: 145000 },
  { name: "Jun", thisYear: 310000, lastYear: 178000 },
];

export const topEarners = [
  { name: "Ayesha Malik", earnings: 15600 },
  { name: "Ahmed Khan", earnings: 12500 },
  { name: "Omar Farooq", earnings: 9800 },
  { name: "Sara Ali", earnings: 8400 },
  { name: "Usman Raza", earnings: 6800 },
  { name: "Hassan Ali", earnings: 4800 },
  { name: "Fatima Noor", earnings: 3200 },
  { name: "Hira Bashir", earnings: 2600 },
  { name: "Bilal Ahmed", earnings: 1500 },
  { name: "Zainab Shah", earnings: 900 },
];
