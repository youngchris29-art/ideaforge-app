import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-heading font-bold text-primary mb-2">
          Join IdeaForge
        </h1>
        <p className="text-text-secondary">
          Turn your ideas into launch-ready plans
        </p>
      </div>
      <SignUp
        routing="path"
        path="/auth/sign-up"
        signInUrl="/auth/sign-in"
        forceRedirectUrl="/dashboard"
      />
    </div>
  );
}
