import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Edit, Trash2, ToggleLeft, ToggleRight, Plus, GripVertical } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { ranksData, RankConfig } from "@/lib/mock-data";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const defaultForm = { name: "", requiredPoints: 0, requiredReferrals: 0, rewardAmount: 0, bonusPercentage: 0, color: "185 80% 50%" };

const colorPresets = [
  { label: "Cyan", value: "185 80% 50%" },
  { label: "Gold", value: "45 90% 50%" },
  { label: "Purple", value: "270 70% 55%" },
  { label: "Rose", value: "340 75% 55%" },
  { label: "Green", value: "145 70% 40%" },
  { label: "Orange", value: "25 90% 50%" },
];

const RanksPage = () => {
  const [ranks, setRanks] = useState<RankConfig[]>(ranksData);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingRank, setEditingRank] = useState<RankConfig | null>(null);
  const [form, setForm] = useState(defaultForm);

  const toggleRank = (id: string) => {
    setRanks((prev) => prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  };

  const handleCreate = () => {
    if (!form.name.trim()) {
      toast({ title: "Validation Error", description: "Rank name is required.", variant: "destructive" });
      return;
    }
    const newRank: RankConfig = {
      id: Date.now().toString(),
      name: form.name,
      requiredPoints: form.requiredPoints,
      requiredReferrals: form.requiredReferrals,
      rewardAmount: form.rewardAmount,
      bonusPercentage: form.bonusPercentage,
      active: true,
      color: form.color,
    };
    setRanks((prev) => [...prev, newRank]);
    setForm(defaultForm);
    setCreateOpen(false);
    toast({ title: "Rank Created", description: `"${newRank.name}" has been added.` });
  };

  const openEdit = (rank: RankConfig) => {
    setEditingRank(rank);
    setForm({
      name: rank.name,
      requiredPoints: rank.requiredPoints,
      requiredReferrals: rank.requiredReferrals,
      rewardAmount: rank.rewardAmount,
      bonusPercentage: rank.bonusPercentage,
      color: rank.color,
    });
    setEditOpen(true);
  };

  const handleEdit = () => {
    if (!editingRank || !form.name.trim()) {
      toast({ title: "Validation Error", description: "Rank name is required.", variant: "destructive" });
      return;
    }
    setRanks((prev) =>
      prev.map((r) =>
        r.id === editingRank.id
          ? { ...r, name: form.name, requiredPoints: form.requiredPoints, requiredReferrals: form.requiredReferrals, rewardAmount: form.rewardAmount, bonusPercentage: form.bonusPercentage, color: form.color }
          : r
      )
    );
    toast({ title: "Rank Updated", description: `"${form.name}" has been updated.` });
    setEditOpen(false);
    setEditingRank(null);
    setForm(defaultForm);
  };

  const handleDelete = (id: string) => {
    const rank = ranks.find((r) => r.id === id);
    setRanks((prev) => prev.filter((r) => r.id !== id));
    toast({ title: "Rank Deleted", description: `"${rank?.name}" has been removed.` });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Ranks & Rewards</h1>
            <p className="text-muted-foreground text-sm mt-1">Configure rank tiers and rewards</p>
          </div>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
                <Plus className="h-4 w-4" /> Create Rank
              </button>
            </DialogTrigger>
            <DialogContent className="glass-card-glow sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Rank</DialogTitle>
                <DialogDescription>Fill in the details below to add a new rank tier.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Rank Name</Label>
                  <Input id="name" placeholder="e.g. Emerald" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="points">Required Points</Label>
                    <Input id="points" type="number" min={0} value={form.requiredPoints} onChange={(e) => setForm({ ...form, requiredPoints: +e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="referrals">Required Referrals</Label>
                    <Input id="referrals" type="number" min={0} value={form.requiredReferrals} onChange={(e) => setForm({ ...form, requiredReferrals: +e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="reward">Reward Amount (Rs)</Label>
                    <Input id="reward" type="number" min={0} value={form.rewardAmount} onChange={(e) => setForm({ ...form, rewardAmount: +e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="bonus">Bonus %</Label>
                    <Input id="bonus" type="number" min={0} max={100} value={form.bonusPercentage} onChange={(e) => setForm({ ...form, bonusPercentage: +e.target.value })} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Rank Color</Label>
                  <div className="flex gap-2 flex-wrap">
                    {colorPresets.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => setForm({ ...form, color: c.value })}
                        className={`h-8 w-8 rounded-full border-2 transition-all ${form.color === c.value ? "border-foreground scale-110" : "border-transparent"}`}
                        style={{ background: `hsl(${c.value})` }}
                        title={c.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <button onClick={() => setCreateOpen(false)} className="px-4 py-2 text-sm rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
                <button onClick={handleCreate} className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">Create Rank</button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ranks.map((rank, i) => (
            <motion.div
              key={rank.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.1 }}
              layout
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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="glass-card-glow">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete "{rank.name}" Rank?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently remove the "{rank.name}" rank and its associated rewards. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(rank.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default RanksPage;
