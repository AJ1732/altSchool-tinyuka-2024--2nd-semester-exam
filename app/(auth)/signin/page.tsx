import { SigninForm } from "@/features/auth/components";

export default function SigninPage() {
  return (
    <div className="grid h-full place-content-center space-y-4">
      <header className="text-center">
        <h1 className="text-xl font-medium md:text-3xl lg:text-4xl">
          Sign into Your Account
        </h1>
      </header>
      <SigninForm />
    </div>
  );
}
