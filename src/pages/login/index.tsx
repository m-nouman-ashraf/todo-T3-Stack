import { SignIn } from "@clerk/nextjs";

const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-200 bg-transparent">
      <SignIn
        // path="/login"
        // routing="path"
        // signUpUrl="/signup"
        afterSignInUrl={"/dashboard"}
      />
    </div>
  );
};
export default Login;
