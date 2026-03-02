import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Edit, Trash2, ToggleLeft, ToggleRight, Plus, GripVertical } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { ranksData, RankConfig } from "@/lib/mock-data";

const RanksPage = () => {
  const [ranks, setRanks] = useState(ranksData);

  const toggleRank = (id: string) => {
    setRanks((prev) => prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Ranks & Rewards</h1>
            <p className="text-muted-foreground text-sm mt-1">Configure rank tiers and rewards</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" /> Create Rank
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ranks.map((rank, i) => (
            <motion.div
              key={rank.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-glow gradient-border p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GripVertical className="h-4 w-4 text-muted-foreground/40 cursor-grab" />
                  <div className="p-2.5 rounded-xl" style={{ background: `hsl(${rank.color} / 0.15)` }}>
                    <Trophy className="h-5 w-5" style={{ color: `hsl(${rank.color})` }} />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ color: `hsl(${rank.color})` }}>{rank.name}</h3>
                    <p className="text-xs text-muted-foreground">Tier {i + 1}</p>
                  </div>
                </div>
                <button onClick={() => toggleRank(rank.id)}>
                  {rank.active ? <ToggleRight className="h-6 w-6 text-success" /> : <ToggleLeft className="h-6 w-6 text-muted-foreground" />}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Points Required</p>
                  <p className="font-semibold">{rank.requiredPoints.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Referrals Required</p>
                  <p className="font-semibold">{rank.requiredReferrals}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Reward Amount</p>
                  <p className="font-semibold text-success">Rs {rank.rewardAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Bonus %</p>
                  <p className="font-semibold text-primary">{rank.bonusPercentage}%</p>
                </div>
              </div>

              {/* Progress preview */}
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress Simulation</span>
                  <span>{Math.min(65 + i * 8, 95)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary/50 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(65 + i * 8, 95)}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                    className="h-full rounded-full"
                    style={{ background: `hsl(${rank.color})` }}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
                  <Edit className="h-3.5 w-3.5" /> Edit
                </button>
                <button className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default RanksPage;
