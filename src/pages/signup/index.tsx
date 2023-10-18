import { SignUp } from "@clerk/nextjs";

const Signup = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-200 bg-transparent">
      <SignUp
        // path="/signup"
        // routing="path"
        // signInUrl="/login"
        afterSignUpUrl={"/login"}
      />
    </div>
  );
};
export default Signup;
