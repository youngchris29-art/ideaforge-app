"use client";

import { STAGES } from "@/lib/conversation-framework";

interface StageProgressProps {
  currentStage: number;
  isCompleted: boolean;
}

export default function StageProgress({ currentStage, isCompleted }: StageProgressProps) {
  return (
    <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-border bg-bg-surface/50">
      {/* Stage indicators */}
      <div className="flex items-center gap-1 mb-1.5 sm:mb-2">
        {STAGES.map((stage) => {
          const isActive = stage.id === currentStage && !isCompleted;
          const isDone = stage.id < currentStage || isCompleted;

          return (
            <div key={stage.id} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`h-1.5 w-full rounded-full transition-all ${
                  isDone
                    ? "bg-primary"
                    : isActive
                      ? "bg-primary/50"
                      : "bg-border"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Current stage label */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-text-secondary">
          {isCompleted ? (
            <span className="text-primary">Session Complete</span>
          ) : (
            <>
              Stage {currentStage}/5
              <span className="hidden sm:inline">
                :{" "}
                <span className="text-text">
                  {STAGES.find((s) => s.id === currentStage)?.name}
                </span>
              </span>
            </>
          )}
        </span>
        <span className="text-xs text-text-muted">
          {isCompleted
            ? "100%"
            : `${Math.round(((currentStage - 1) / 5) * 100)}%`}
        </span>
      </div>
    </div>
  );
}
