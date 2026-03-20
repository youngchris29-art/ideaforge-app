"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Header from "@/components/Header";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  // Simple password auth — in production, use Clerk roles
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "ideaforge-admin-2026") {
      setAuthenticated(true);
    } else {
      alert("Wrong password");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-surface">
        <Header />
        <div className="max-w-md mx-auto px-6 py-24">
          <div className="p-8 rounded-md border border-hairline bg-surface-container-low space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-display font-bold">Admin Dashboard</h1>
              <p className="text-on-surface-variant text-sm mt-1">Enter the admin password to continue.</p>
            </div>
            <form onSubmit={handleAuth} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                className="w-full px-4 py-3 bg-surface-bright border border-hairline rounded-md text-on-surface text-sm placeholder:text-on-surface-variant focus:border-primary focus:border-primary focus:ring-0 outline-none transition-colors"
                autoFocus
              />
              <button
                type="submit"
                className="w-full py-3 bg-primary text-surface font-medium rounded-md hover:bg-primary-hover transition-colors text-sm"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <AdminDashboardContent />
    </div>
  );
}

function AdminDashboardContent() {
  const userCount = useQuery(api.admin.getUserCount);
  const sessionCount = useQuery(api.admin.getSessionCount);
  const documentCount = useQuery(api.admin.getDocumentCount);
  const waitlistCount = useQuery(api.waitlist.count);
  const recentSessions = useQuery(api.admin.getRecentSessions);
  const recentErrors = useQuery(api.admin.getRecentErrors);
  const allUsers = useQuery(api.admin.getAllUsers);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
        <p className="text-on-surface-variant mt-1">IdeaForge product health overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={userCount ?? "..."} />
        <StatCard label="Total Sessions" value={sessionCount ?? "..."} />
        <StatCard label="Documents Generated" value={documentCount ?? "..."} />
        <StatCard label="Waitlist Signups" value={waitlistCount ?? "..."} />
      </div>

      {/* ── Test Account Manager ── */}
      <GrantProSection allUsers={allUsers} />

      {/* Recent Sessions */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-semibold">Recent Sessions</h2>
        <div className="rounded-md border border-hairline bg-surface-container-low overflow-hidden">
          {recentSessions && recentSessions.length > 0 ? (
            <div className="divide-y divide-hairline">
              {recentSessions.map((session) => (
                <div key={session._id} className="px-5 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{session.ideaTitle}</p>
                    <p className="text-xs text-on-surface-variant">
                      Stage {session.currentStage}/5 · {session.status}
                    </p>
                  </div>
                  <span className="text-xs text-on-surface-variant">
                    {new Date(session.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="px-5 py-8 text-center text-on-surface-variant text-sm">No sessions yet</p>
          )}
        </div>
      </div>

      {/* Recent Errors */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-semibold">Recent Errors</h2>
        <div className="rounded-md border border-hairline bg-surface-container-low overflow-hidden">
          {recentErrors && recentErrors.length > 0 ? (
            <div className="divide-y divide-hairline">
              {recentErrors.map((error) => (
                <div key={error._id} className="px-5 py-3">
                  <p className="text-sm text-error font-mono">
                    {error.data ? JSON.parse(error.data).message : "Unknown error"}
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1">
                    {new Date(error.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="px-5 py-8 text-center text-on-surface-variant text-sm">No errors logged</p>
          )}
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GrantProSection({ allUsers }: { allUsers: any[] | undefined }) {
  const grantPro = useMutation(api.users.grantProAccess);
  const resetUser = useMutation(api.users.resetToFree);
  const [filter, setFilter] = useState("");
  const [status, setStatus] = useState<{ id: string; msg: string; ok: boolean } | null>(null);

  const filtered = (allUsers ?? []).filter(
    (u) =>
      u.email?.toLowerCase().includes(filter.toLowerCase()) ||
      u.name?.toLowerCase().includes(filter.toLowerCase()) ||
      u.clerkId?.includes(filter)
  );

  const handleGrant = async (clerkId: string) => {
    try {
      await grantPro({ clerkId });
      setStatus({ id: clerkId, msg: "✓ Pro access granted!", ok: true });
    } catch (e) {
      setStatus({ id: clerkId, msg: `✗ ${(e as Error).message}`, ok: false });
    }
  };

  const handleReset = async (clerkId: string) => {
    try {
      await resetUser({ clerkId });
      setStatus({ id: clerkId, msg: "✓ Reset to free tier.", ok: true });
    } catch (e) {
      setStatus({ id: clerkId, msg: `✗ ${(e as Error).message}`, ok: false });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-semibold">🧪 Test Account Manager</h2>
          <p className="text-on-surface-variant text-sm mt-0.5">
            Grant or revoke pro access for any user — no payment required.
          </p>
        </div>
      </div>

      <div className="rounded-md border border-hairline bg-surface-container-low overflow-hidden">
        <div className="p-4 border-b border-hairline">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by name, email or Clerk ID…"
            className="w-full px-3 py-2 bg-surface-bright border border-hairline rounded-md text-on-surface text-sm placeholder:text-on-surface-variant focus:border-primary focus:border-primary focus:ring-0 outline-none transition-colors"
          />
        </div>

        {!allUsers ? (
          <p className="px-5 py-8 text-center text-on-surface-variant text-sm">Loading users…</p>
        ) : filtered.length === 0 ? (
          <p className="px-5 py-8 text-center text-on-surface-variant text-sm">No users found</p>
        ) : (
          <div className="divide-y divide-hairline">
            {filtered.map((u) => (
              <div key={u._id} className="px-5 py-3 flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{u.name || "(no name)"}</p>
                  <p className="text-xs text-on-surface-variant truncate">{u.email}</p>
                  <p className="text-xs text-on-surface-variant font-mono truncate">{u.clerkId}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      u.subscriptionStatus === "paid"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {u.subscriptionStatus === "paid" ? "Pro" : "Free"}
                  </span>
                  {u.subscriptionStatus !== "paid" ? (
                    <button
                      onClick={() => handleGrant(u.clerkId)}
                      className="px-3 py-1.5 bg-primary text-surface text-xs font-medium rounded-md hover:bg-primary-hover transition-colors"
                    >
                      Grant Pro
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReset(u.clerkId)}
                      className="px-3 py-1.5 bg-surface-bright border border-hairline text-on-surface-variant text-xs font-medium rounded-md hover:border-primary hover:text-primary transition-colors"
                    >
                      Reset to Free
                    </button>
                  )}
                </div>
                {status?.id === u.clerkId && status && (
                  <p className={`text-xs ${status.ok ? "text-green-400" : "text-red-400"}`}>
                    {status.msg}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="p-5 rounded-md border border-hairline bg-surface-container-low">
      <p className="text-on-surface-variant text-sm">{label}</p>
      <p className="text-2xl font-display font-bold text-on-surface mt-1">{value}</p>
    </div>
  );
}
