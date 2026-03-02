import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, ToggleLeft, ToggleRight, Save } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Input } from "@/components/ui/input";

interface SettingToggle {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const SettingsPage = () => {
  const [toggles, setToggles] = useState<SettingToggle[]>([
    { id: "referral", label: "Referral System", description: "Enable or disable the referral program", enabled: true },
    { id: "investment", label: "Investment System", description: "Allow users to make investments", enabled: true },
    { id: "maintenance", label: "Maintenance Mode", description: "Put the platform in maintenance mode", enabled: false },
  ]);

  const [referralPct, setReferralPct] = useState("10");
  const [minInvestment, setMinInvestment] = useState("5000");
  const [withdrawalLimit, setWithdrawalLimit] = useState("50000");

  const toggle = (id: string) => {
    setToggles((prev) => prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t)));
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground text-sm mt-1">Configure platform settings</p>
        </div>

        {/* Toggles */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" /> System Controls
          </h3>
          {toggles.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-3 border-b border-border/30 last:border-0">
              <div>
                <p className="font-medium text-sm">{t.label}</p>
                <p className="text-xs text-muted-foreground">{t.description}</p>
              </div>
              <button onClick={() => toggle(t.id)}>
                {t.enabled ? <ToggleRight className="h-7 w-7 text-success" /> : <ToggleLeft className="h-7 w-7 text-muted-foreground" />}
              </button>
            </div>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 space-y-5">
          <h3 className="font-semibold">Configuration Values</h3>
          {[
            { label: "Default Referral Percentage", value: referralPct, setter: setReferralPct, suffix: "%" },
            { label: "Minimum Investment Amount", value: minInvestment, setter: setMinInvestment, prefix: "Rs " },
            { label: "Withdrawal Limit", value: withdrawalLimit, setter: setWithdrawalLimit, prefix: "Rs " },
          ].map((field) => (
            <div key={field.label} className="space-y-1.5">
              <label className="text-sm font-medium">{field.label}</label>
              <Input
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                className="bg-secondary/50 border-border/50"
              />
            </div>
          ))}
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
            <Save className="h-4 w-4" /> Save Changes
          </button>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
