import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Edit, ToggleLeft, ToggleRight, Upload, Smartphone, Building2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { paymentMethods, PaymentMethod } from "@/lib/mock-data";

const typeIcons: Record<string, typeof Smartphone> = {
  mobile: Smartphone,
  bank: Building2,
};

const InvestmentsPage = () => {
  const [methods, setMethods] = useState(paymentMethods);

  const toggleMethod = (id: string) => {
    setMethods((prev) => prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m)));
  };

  const active = methods.filter((m) => m.enabled);
  const disabled = methods.filter((m) => !m.enabled);

  const MethodCard = ({ method, index }: { method: PaymentMethod; index: number }) => {
    const Icon = typeIcons[method.type] || CreditCard;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="glass-card-glow gradient-border p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{method.name}</h3>
              <p className="text-xs text-muted-foreground capitalize">{method.type} wallet</p>
            </div>
          </div>
          <button onClick={() => toggleMethod(method.id)}>
            {method.enabled ? (
              <ToggleRight className="h-7 w-7 text-success" />
            ) : (
              <ToggleLeft className="h-7 w-7 text-muted-foreground" />
            )}
          </button>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Account Title</span>
            <span className="font-medium">{method.accountTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Account No.</span>
            <span className="font-mono text-primary">{method.accountNumber}</span>
          </div>
          {method.bankName && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bank</span>
              <span>{method.bankName}</span>
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground border-t border-border/30 pt-3">{method.instructions}</p>

        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
            <Edit className="h-3.5 w-3.5" /> Edit
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
            <Upload className="h-3.5 w-3.5" /> QR Code
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Investment Methods</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage payment methods for investments</p>
        </div>

        {active.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Active Methods</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {active.map((m, i) => <MethodCard key={m.id} method={m} index={i} />)}
            </div>
          </div>
        )}

        {disabled.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Disabled Methods</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {disabled.map((m, i) => <MethodCard key={m.id} method={m} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default InvestmentsPage;
