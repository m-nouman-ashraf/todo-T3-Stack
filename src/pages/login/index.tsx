import { SignIn } from "@clerk/nextjs";

const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-200 bg-transparent">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-black text-sm normal-case",
          },
        }}
        // path="/login"
        // routing="path"
        signUpUrl="/signup"
        afterSignInUrl={"/dashboard"}
      />
    </div>
  );
};
export default Login;
