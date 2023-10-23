import { SignUp } from "@clerk/nextjs";

const Signup = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-200 bg-transparent">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: "bg-black text-sm normal-case",
          },
        }}
        // path="/signup"
        // routing="path"
        signInUrl="/login"
        afterSignUpUrl={"/login"}
      />
    </div>
  );
};
export default Signup;
