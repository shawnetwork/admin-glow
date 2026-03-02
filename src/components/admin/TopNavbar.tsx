import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

const TopNavbar = () => (
  <header className="h-16 border-b border-border bg-card/40 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40">
    <div className="relative w-80">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search anything..."
        className="pl-10 bg-secondary/50 border-border/50 focus:border-primary/50 h-9"
      />
    </div>

    <div className="flex items-center gap-4">
      <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
        <Bell className="h-5 w-5 text-muted-foreground" />
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary animate-glow-pulse" />
      </button>

      <div className="flex items-center gap-3 pl-4 border-l border-border">
        <div className="text-right">
          <p className="text-sm font-medium">Admin User</p>
          <p className="text-xs text-muted-foreground">Super Admin</p>
        </div>
        <div className="h-9 w-9 rounded-full bg-primary/15 flex items-center justify-center">
          <User className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  </header>
);

export default TopNavbar;
