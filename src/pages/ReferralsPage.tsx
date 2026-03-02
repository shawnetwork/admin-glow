import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, DollarSign, Users, ToggleLeft, ToggleRight } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import { referralsData } from "@/lib/mock-data";

const ReferralsPage = () => {
  const [systemEnabled, setSystemEnabled] = useState(true);
  const totalBonuses = referralsData.reduce((sum, r) => sum + r.commission, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Referrals Management</h1>
            <p className="text-muted-foreground text-sm mt-1">Track and manage referral relationships</p>
          </div>
          <button
            onClick={() => setSystemEnabled(!systemEnabled)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${systemEnabled ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}
          >
            {systemEnabled ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
            Referral System {systemEnabled ? "Enabled" : "Disabled"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Referrals" value={referralsData.length} icon={Users} gradient="stat-gradient-1" delay={0} />
          <StatCard title="Total Bonuses Paid" value={totalBonuses} prefix="Rs " icon={DollarSign} gradient="stat-gradient-2" delay={0.1} />
          <StatCard title="Active Referrers" value={4} icon={Share2} gradient="stat-gradient-3" delay={0.2} />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  {["Referrer", "Referred", "Level", "Commission", "Date", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {referralsData.map((ref, i) => (
                  <motion.tr
                    key={ref.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border/30 hover:bg-secondary/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium">{ref.referrer}</td>
                    <td className="px-4 py-3 text-sm">{ref.referred}</td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-md text-xs font-medium bg-primary/15 text-primary">Level {ref.level}</span></td>
                    <td className="px-4 py-3 text-sm font-medium text-success">Rs {ref.commission.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{ref.date}</td>
                    <td className="px-4 py-3">
                      <button className="px-3 py-1 text-xs rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">Adjust</button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default ReferralsPage;
