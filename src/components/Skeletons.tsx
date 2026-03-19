export function MessageSkeleton() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-bg-elevated border border-border space-y-2">
        <div className="h-3 w-16 bg-border rounded animate-pulse" />
        <div className="space-y-1.5">
          <div className="h-3 w-64 bg-border rounded animate-pulse" />
          <div className="h-3 w-48 bg-border rounded animate-pulse" />
          <div className="h-3 w-56 bg-border rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function ConversationSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <MessageSkeleton />
      <div className="flex justify-end">
        <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-primary/10 border border-primary/20 space-y-2">
          <div className="h-3 w-12 bg-primary/20 rounded animate-pulse" />
          <div className="h-3 w-40 bg-primary/20 rounded animate-pulse" />
        </div>
      </div>
      <MessageSkeleton />
    </div>
  );
}

export function SessionCardSkeleton() {
  return (
    <div className="p-5 rounded-xl border border-border bg-bg-surface space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="h-5 w-48 bg-border rounded animate-pulse" />
          <div className="flex items-center gap-3">
            <div className="h-5 w-20 bg-border rounded-full animate-pulse" />
            <div className="h-3 w-32 bg-border rounded animate-pulse" />
          </div>
          <div className="h-1.5 bg-border rounded-full overflow-hidden mt-1">
            <div className="h-full w-2/5 bg-primary/20 rounded-full animate-pulse" />
          </div>
        </div>
        <div className="h-3 w-16 bg-border rounded animate-pulse" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="h-8 w-64 bg-border rounded animate-pulse" />
        <div className="h-4 w-40 bg-border rounded animate-pulse" />
      </div>
      <div className="p-6 rounded-xl border-2 border-dashed border-border">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-border animate-pulse" />
          <div className="space-y-2">
            <div className="h-5 w-36 bg-border rounded animate-pulse" />
            <div className="h-3 w-48 bg-border rounded animate-pulse" />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-6 w-32 bg-border rounded animate-pulse" />
        <SessionCardSkeleton />
        <SessionCardSkeleton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-5 rounded-xl border border-border bg-bg-surface space-y-2">
            <div className="h-3 w-24 bg-border rounded animate-pulse" />
            <div className="h-7 w-8 bg-border rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DocumentSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-border rounded animate-pulse" />
        <div className="space-y-1.5">
          <div className="h-5 w-40 bg-border rounded animate-pulse" />
          <div className="h-3 w-56 bg-border rounded animate-pulse" />
        </div>
      </div>
      <div className="bg-bg-surface rounded-xl border border-border p-8 space-y-4">
        <div className="h-6 w-48 bg-border rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-3 w-full bg-border rounded animate-pulse" />
          <div className="h-3 w-full bg-border rounded animate-pulse" />
          <div className="h-3 w-3/4 bg-border rounded animate-pulse" />
        </div>
        <div className="h-5 w-36 bg-border rounded animate-pulse mt-6" />
        <div className="space-y-2">
          <div className="h-3 w-full bg-border rounded animate-pulse" />
          <div className="h-3 w-5/6 bg-border rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
