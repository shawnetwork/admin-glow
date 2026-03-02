import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronLeft, ChevronRight, Eye, Ban, CheckCircle, Edit, X } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Input } from "@/components/ui/input";
import { usersData, MockUser, UserRank } from "@/lib/mock-data";

const rankColors: Record<UserRank, string> = {
  Bronze: "bg-orange-500/15 text-orange-400",
  Silver: "bg-gray-400/15 text-gray-300",
  Gold: "bg-yellow-500/15 text-yellow-400",
  Platinum: "bg-blue-400/15 text-blue-300",
  Diamond: "bg-primary/15 text-primary",
};

const UsersPage = () => {
  const [search, setSearch] = useState("");
  const [rankFilter, setRankFilter] = useState<UserRank | "All">("All");
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = usersData.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRank = rankFilter === "All" || u.rank === rankFilter;
    return matchesSearch && matchesRank;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Users Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage all registered users</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or email..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-10 bg-secondary/50 border-border/50" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {(["All", "Bronze", "Silver", "Gold", "Platinum", "Diamond"] as const).map((r) => (
              <button
                key={r}
                onClick={() => { setRankFilter(r); setPage(1); }}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${rankFilter === r ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground hover:text-foreground"}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  {["Name", "Email", "Referral Code", "Referrals", "Earnings", "Investment", "Rank", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border/30 hover:bg-secondary/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium">{user.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{user.email}</td>
                    <td className="px-4 py-3 text-sm font-mono text-primary">{user.referralCode}</td>
                    <td className="px-4 py-3 text-sm">{user.totalReferrals}</td>
                    <td className="px-4 py-3 text-sm">Rs {user.totalEarnings.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">Rs {user.investmentAmount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${rankColors[user.rank]}`}>{user.rank}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${user.status === "Active" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => setSelectedUser(user)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="View"><Eye className="h-4 w-4 text-muted-foreground" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="Edit"><Edit className="h-4 w-4 text-muted-foreground" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title={user.status === "Active" ? "Suspend" : "Activate"}>
                          {user.status === "Active" ? <Ban className="h-4 w-4 text-destructive" /> : <CheckCircle className="h-4 w-4 text-success" />}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border/30">
            <p className="text-sm text-muted-foreground">
              Showing {(page - 1) * perPage + 1}-{Math.min(page * perPage, filtered.length)} of {filtered.length}
            </p>
            <div className="flex gap-1">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="p-1.5 rounded-lg hover:bg-secondary disabled:opacity-30 transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${page === i + 1 ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-muted-foreground"}`}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg hover:bg-secondary disabled:opacity-30 transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* User Detail Modal */}
        <AnimatePresence>
          {selectedUser && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
              onClick={() => setSelectedUser(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card gradient-border p-6 max-w-md w-full space-y-4"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold">{selectedUser.name}</h3>
                  <button onClick={() => setSelectedUser(null)} className="p-1 rounded-lg hover:bg-secondary"><X className="h-4 w-4" /></button>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    ["Email", selectedUser.email],
                    ["Referral Code", selectedUser.referralCode],
                    ["Total Referrals", selectedUser.totalReferrals],
                    ["Total Earnings", `Rs ${selectedUser.totalEarnings.toLocaleString()}`],
                    ["Investment", `Rs ${selectedUser.investmentAmount.toLocaleString()}`],
                    ["Rank", selectedUser.rank],
                    ["Status", selectedUser.status],
                    ["Joined", selectedUser.joinDate],
                  ].map(([label, val]) => (
                    <div key={label as string}>
                      <p className="text-muted-foreground text-xs">{label}</p>
                      <p className="font-medium">{val}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-border/30">
                  <p className="text-xs text-muted-foreground">Network Tree: <span className="text-primary">UI Placeholder</span></p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
