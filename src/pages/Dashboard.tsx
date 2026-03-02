import { useState } from "react";
import { motion } from "framer-motion";
import { Users, UserCheck, DollarSign, TrendingUp, ArrowDownToLine } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import { dashboardStats, signupData, referralGrowthData, investmentGrowthData } from "@/lib/mock-data";

type TimeRange = "daily" | "weekly" | "monthly";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("daily");

  const stats = [
    { title: "Total Users", value: dashboardStats.totalUsers, icon: Users, gradient: "stat-gradient-1", change: "+12.5% from last month" },
    { title: "Active Users", value: dashboardStats.activeUsers, icon: UserCheck, gradient: "stat-gradient-2", change: "+8.2% from last month" },
    { title: "Referral Earnings", value: dashboardStats.referralEarnings, prefix: "Rs ", icon: DollarSign, gradient: "stat-gradient-3", change: "+15.3% from last month" },
    { title: "Total Investments", value: dashboardStats.totalInvestments, prefix: "Rs ", icon: TrendingUp, gradient: "stat-gradient-4", change: "+22.1% from last month" },
    { title: "Total Withdrawals", value: dashboardStats.totalWithdrawals, prefix: "Rs ", icon: ArrowDownToLine, gradient: "stat-gradient-5", change: "+5.8% from last month" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground text-sm mt-1">Welcome back, Admin. Here's what's happening.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {stats.map((s, i) => (
            <StatCard key={s.title} {...s} delay={i * 0.1} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Signups */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">User Signups</h3>
              <div className="flex gap-1 bg-secondary/50 rounded-lg p-1">
                {(["daily", "weekly", "monthly"] as TimeRange[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeRange(t)}
                    className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                      timeRange === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={signupData}>
                <defs>
                  <linearGradient id="signupGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(190, 95%, 45%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(190, 95%, 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 15%, 16%)" />
                <XAxis dataKey="name" stroke="hsl(215, 15%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 15%, 55%)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: "hsl(225, 25%, 9%)", border: "1px solid hsl(225, 15%, 16%)", borderRadius: "8px", color: "hsl(210, 40%, 93%)" }}
                />
                <Area type="monotone" dataKey={timeRange} stroke="hsl(190, 95%, 45%)" fill="url(#signupGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Referral Earnings Growth */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-6"
          >
            <h3 className="font-semibold mb-6">Referral Earnings Growth</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={referralGrowthData}>
                <defs>
                  <linearGradient id="refGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(270, 75%, 58%)" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="hsl(270, 75%, 58%)" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 15%, 16%)" />
                <XAxis dataKey="name" stroke="hsl(215, 15%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 15%, 55%)" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(225, 25%, 9%)", border: "1px solid hsl(225, 15%, 16%)", borderRadius: "8px", color: "hsl(210, 40%, 93%)" }} />
                <Bar dataKey="earnings" fill="url(#refGrad)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Investment Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-6"
        >
          <h3 className="font-semibold mb-6">Investment Growth Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={investmentGrowthData}>
              <defs>
                <linearGradient id="investGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(152, 70%, 45%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(152, 70%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 15%, 16%)" />
              <XAxis dataKey="name" stroke="hsl(215, 15%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(215, 15%, 55%)" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(225, 25%, 9%)", border: "1px solid hsl(225, 15%, 16%)", borderRadius: "8px", color: "hsl(210, 40%, 93%)" }} />
              <Area type="monotone" dataKey="amount" stroke="hsl(152, 70%, 45%)" fill="url(#investGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
