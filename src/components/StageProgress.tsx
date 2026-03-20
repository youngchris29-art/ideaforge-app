"use client";

import { STAGES } from "@/lib/conversation-framework";

interface StageProgressProps {
  currentStage: number;
  isCompleted: boolean;
}

export default function StageProgress({ currentStage, isCompleted }: StageProgressProps) {
  return (
    <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-hairline bg-surface-container-low">
      {/* Stage indicators — 2px hairline bars */}
      <div className="flex items-center gap-1 mb-1.5 sm:mb-2">
        {STAGES.map((stage) => {
          const isActive = stage.id === currentStage && !isCompleted;
          const isDone = stage.id < currentStage || isCompleted;

          return (
            <div key={stage.id} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`h-0.5 w-full transition-all ${
                  isDone
                    ? "bg-primary"
                    : isActive
                      ? "bg-primary/50"
                      : "bg-surface-bright"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Current stage label */}
      <div className="flex items-center justify-between">
        <span className="tag-intelligence text-on-surface-variant">
          {isCompleted ? (
            <span className="text-primary">Session Complete</span>
          ) : (
            <>
              Stage {currentStage}/5
              <span className="hidden sm:inline">
                :{" "}
                <span className="text-on-surface">
                  {STAGES.find((s) => s.id === currentStage)?.name}
                </span>
              </span>
            </>
          )}
        </span>
        <span className="tag-intelligence text-on-surface-variant">
          {isCompleted
            ? "100%"
            : `${Math.round(((currentStage - 1) / 5) * 100)}%`}
        </span>
      </div>
    </div>
  );
}
