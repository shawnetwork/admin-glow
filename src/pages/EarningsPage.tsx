import { motion } from "framer-motion";
import { DollarSign, TrendingUp, ArrowDownToLine, Percent, Download, FileText } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import { earningsData, dailyEarningsData, monthlyComparisonData, topEarners } from "@/lib/mock-data";

const EarningsPage = () => (
  <AdminLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Earnings & Reports</h1>
          <p className="text-muted-foreground text-sm mt-1">Revenue analytics and reporting</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 text-sm font-medium hover:bg-secondary transition-colors">
            <Download className="h-4 w-4" /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            <FileText className="h-4 w-4" /> Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value={earningsData.totalRevenue} prefix="Rs " icon={DollarSign} gradient="stat-gradient-1" delay={0} />
        <StatCard title="Commission Paid" value={earningsData.totalCommissionPaid} prefix="Rs " icon={Percent} gradient="stat-gradient-2" delay={0.1} />
        <StatCard title="Investment Volume" value={earningsData.investmentVolume} prefix="Rs " icon={TrendingUp} gradient="stat-gradient-3" delay={0.2} />
        <StatCard title="Withdrawals" value={earningsData.totalWithdrawals} prefix="Rs " icon={ArrowDownToLine} gradient="stat-gradient-4" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
          <h3 className="font-semibold mb-6">Daily Earnings</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={dailyEarningsData}>
              <defs>
                <linearGradient id="dailyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(190, 95%, 45%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(190, 95%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 15%, 16%)" />
              <XAxis dataKey="name" stroke="hsl(215, 15%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(215, 15%, 55%)" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(225, 25%, 9%)", border: "1px solid hsl(225, 15%, 16%)", borderRadius: "8px", color: "hsl(210, 40%, 93%)" }} />
              <Area type="monotone" dataKey="earnings" stroke="hsl(190, 95%, 45%)" fill="url(#dailyGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6">
          <h3 className="font-semibold mb-6">Monthly Comparison</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 15%, 16%)" />
              <XAxis dataKey="name" stroke="hsl(215, 15%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(215, 15%, 55%)" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(225, 25%, 9%)", border: "1px solid hsl(225, 15%, 16%)", borderRadius: "8px", color: "hsl(210, 40%, 93%)" }} />
              <Bar dataKey="thisYear" fill="hsl(190, 95%, 45%)" radius={[4, 4, 0, 0]} name="This Year" />
              <Bar dataKey="lastYear" fill="hsl(270, 75%, 58%)" radius={[4, 4, 0, 0]} opacity={0.5} name="Last Year" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card p-6">
        <h3 className="font-semibold mb-4">Top 10 Earners</h3>
        <div className="space-y-3">
          {topEarners.map((earner, i) => (
            <div key={earner.name} className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground font-mono w-6">#{i + 1}</span>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{earner.name}</span>
                  <span className="text-sm text-primary font-medium">Rs {earner.earnings.toLocaleString()}</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary/50 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(earner.earnings / topEarners[0].earnings) * 100}%` }}
                    transition={{ delay: 0.7 + i * 0.05, duration: 0.6 }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-neon-purple"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </AdminLayout>
);

export default EarningsPage;
