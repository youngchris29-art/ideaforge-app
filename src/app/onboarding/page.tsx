"use client";

import { useRouter } from "next/navigation";
import Onboarding from "@/components/Onboarding";

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-bg">
      <Onboarding
        onComplete={() => {
          router.push("/dashboard/new-session");
        }}
      />
    </div>
  );
}
