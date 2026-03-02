import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
  gradient: string;
  delay?: number;
  change?: string;
}

const StatCard = ({ title, value, prefix = "", suffix = "", icon: Icon, gradient, delay = 0, change }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`glass-card-glow gradient-border p-6 ${gradient}`}
  >
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <p className="text-3xl font-bold tracking-tight">
          <AnimatedCounter end={value} prefix={prefix} />
          {suffix}
        </p>
        {change && (
          <p className="text-xs text-success font-medium">{change}</p>
        )}
      </div>
      <div className="p-3 rounded-xl bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
    </div>
  </motion.div>
);

export default StatCard;
