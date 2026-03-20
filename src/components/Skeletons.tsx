export function MessageSkeleton() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[75%] rounded-md px-4 py-3 bg-surface-container-low border border-hairline space-y-2">
        <div className="h-3 w-16 bg-surface-bright rounded-sm animate-pulse" />
        <div className="space-y-1.5">
          <div className="h-3 w-64 bg-surface-bright rounded-sm animate-pulse" />
          <div className="h-3 w-48 bg-surface-bright rounded-sm animate-pulse" />
          <div className="h-3 w-56 bg-surface-bright rounded-sm animate-pulse" />
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
        <div className="max-w-[75%] rounded-md px-4 py-3 bg-primary/10 border border-primary/15 space-y-2">
          <div className="h-3 w-12 bg-primary/20 rounded-sm animate-pulse" />
          <div className="h-3 w-40 bg-primary/20 rounded-sm animate-pulse" />
        </div>
      </div>
      <MessageSkeleton />
    </div>
  );
}

export function SessionCardSkeleton() {
  return (
    <div className="p-5 rounded-md border border-hairline bg-surface-container-low space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="h-5 w-48 bg-surface-bright rounded-sm animate-pulse" />
          <div className="flex items-center gap-3">
            <div className="h-5 w-20 bg-surface-bright rounded-full animate-pulse" />
            <div className="h-3 w-32 bg-surface-bright rounded-sm animate-pulse" />
          </div>
          <div className="h-0.5 bg-surface-bright overflow-hidden mt-1">
            <div className="h-full w-2/5 bg-primary/20 animate-pulse" />
          </div>
        </div>
        <div className="h-3 w-16 bg-surface-bright rounded-sm animate-pulse" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="h-8 w-64 bg-surface-bright rounded-sm animate-pulse" />
        <div className="h-4 w-40 bg-surface-bright rounded-sm animate-pulse" />
      </div>
      <div className="p-6 rounded-md border border-dashed border-hairline">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-sm bg-surface-bright animate-pulse" />
          <div className="space-y-2">
            <div className="h-5 w-36 bg-surface-bright rounded-sm animate-pulse" />
            <div className="h-3 w-48 bg-surface-bright rounded-sm animate-pulse" />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-6 w-32 bg-surface-bright rounded-sm animate-pulse" />
        <SessionCardSkeleton />
        <SessionCardSkeleton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-5 rounded-md border border-hairline bg-surface-container-low space-y-2">
            <div className="h-3 w-24 bg-surface-bright rounded-sm animate-pulse" />
            <div className="h-7 w-8 bg-surface-bright rounded-sm animate-pulse" />
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
        <div className="w-8 h-8 bg-surface-bright rounded-sm animate-pulse" />
        <div className="space-y-1.5">
          <div className="h-5 w-40 bg-surface-bright rounded-sm animate-pulse" />
          <div className="h-3 w-56 bg-surface-bright rounded-sm animate-pulse" />
        </div>
      </div>
      <div className="bg-surface-container-low rounded-md border border-hairline p-8 space-y-4">
        <div className="h-6 w-48 bg-surface-bright rounded-sm animate-pulse" />
        <div className="space-y-2">
          <div className="h-3 w-full bg-surface-bright rounded-sm animate-pulse" />
          <div className="h-3 w-full bg-surface-bright rounded-sm animate-pulse" />
          <div className="h-3 w-3/4 bg-surface-bright rounded-sm animate-pulse" />
        </div>
        <div className="h-5 w-36 bg-surface-bright rounded-sm animate-pulse mt-6" />
        <div className="space-y-2">
          <div className="h-3 w-full bg-surface-bright rounded-sm animate-pulse" />
          <div className="h-3 w-5/6 bg-surface-bright rounded-sm animate-pulse" />
        </div>
      </div>
    </div>
  );
}
