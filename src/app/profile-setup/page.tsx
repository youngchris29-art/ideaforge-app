"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileSetupPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const createOrUpdate = useMutation(api.users.createOrUpdate);
  const updateProfile = useMutation(api.users.updateProfile);

  const convexUser = useQuery(
    api.users.getByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill name from Clerk
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);

  // If profile already completed, skip to dashboard (returning users)
  useEffect(() => {
    if (convexUser?.profileCompleted) {
      router.replace("/dashboard");
    }
  }, [convexUser, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!firstName.trim()) {
      setError("First name is required.");
      return;
    }

    const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(" ");

    setSubmitting(true);
    setError("");

    try {
      await createOrUpdate({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
        name: fullName,
        avatarUrl: user.imageUrl || undefined,
      });

      await updateProfile({
        clerkId: user.id,
        name: fullName,
        phone: phone.trim() || undefined,
        addressLine1: addressLine1.trim() || undefined,
        city: city.trim() || undefined,
        country: country.trim() || undefined,
      });

      router.replace("/onboarding");
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  const handleSkip = async () => {
    if (!user) return;
    setSubmitting(true);
    const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(" ");
    try {
      await createOrUpdate({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
        name: fullName || user.fullName || "User",
        avatarUrl: user.imageUrl || undefined,
      });
      await updateProfile({
        clerkId: user.id,
        name: fullName || user.fullName || "User",
      });
    } catch {
      // ignore, still navigate
    }
    router.replace("/onboarding");
  };

  if (!isLoaded || convexUser?.profileCompleted) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-display font-light text-primary mb-1 italic">
          IdeaForge
        </h1>
        <p className="text-on-surface-variant text-sm">One last step before we begin</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-surface-container-low border border-hairline rounded-md p-8">
        <h2 className="text-xl font-display font-semibold mb-1">Complete your profile</h2>
        <p className="text-on-surface-variant text-sm mb-6">
          Help us personalise your experience. You can update these anytime.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-on-surface-variant uppercase tracking-wider mb-1">
                First name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Jane"
                className="w-full px-3 py-2 rounded bg-surface border border-outline-variant text-on-surface placeholder:text-on-surface-variant/50 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-on-surface-variant uppercase tracking-wider mb-1">
                Last name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Smith"
                className="w-full px-3 py-2 rounded bg-surface border border-outline-variant text-on-surface placeholder:text-on-surface-variant/50 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs text-on-surface-variant uppercase tracking-wider mb-1">
              Phone number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full px-3 py-2 rounded bg-surface border border-outline-variant text-on-surface placeholder:text-on-surface-variant/50 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs text-on-surface-variant uppercase tracking-wider mb-1">
              Address
            </label>
            <input
              type="text"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              placeholder="123 Main St"
              className="w-full px-3 py-2 rounded bg-surface border border-outline-variant text-on-surface placeholder:text-on-surface-variant/50 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* City & Country */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-on-surface-variant uppercase tracking-wider mb-1">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="New York"
                className="w-full px-3 py-2 rounded bg-surface border border-outline-variant text-on-surface placeholder:text-on-surface-variant/50 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-on-surface-variant uppercase tracking-wider mb-1">
                Country
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="United States"
                className="w-full px-3 py-2 rounded bg-surface border border-outline-variant text-on-surface placeholder:text-on-surface-variant/50 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <div className="flex flex-col gap-2 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full py-2.5 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Saving..." : "Complete setup"}
            </button>
            <button
              type="button"
              onClick={handleSkip}
              disabled={submitting}
              className="text-sm text-on-surface-variant hover:text-on-surface transition-colors py-1 disabled:opacity-50"
            >
              Skip for now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
