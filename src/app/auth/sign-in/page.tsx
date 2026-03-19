import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-heading font-bold text-primary mb-2">
          Welcome Back
        </h1>
        <p className="text-text-secondary">
          Continue building your ideas
        </p>
      </div>
      <SignIn
        routing="path"
        path="/auth/sign-in"
        signUpUrl="/auth/sign-up"
        forceRedirectUrl="/dashboard"
      />
    </div>
  );
}
