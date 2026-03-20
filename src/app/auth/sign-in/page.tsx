import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-display font-light text-primary mb-2">
          Welcome Back
        </h1>
        <p className="text-on-surface-variant">
          Continue building your ideas
        </p>
      </div>
      <SignIn
        routing="path"
        path="/auth/sign-in"
        signUpUrl="/auth/sign-up"
        forceRedirectUrl="/dashboard"
        appearance={{
          variables: {
            colorPrimary: "#f1c97d",
            colorBackground: "#1c1b1b",
            colorInputBackground: "#131313",
            colorText: "#e5e2e1",
            borderRadius: "4px",
          },
        }}
      />
    </div>
  );
}
