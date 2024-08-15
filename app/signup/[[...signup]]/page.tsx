import Navigation from "@/app/components/Nav";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex justify-center max-sm:mt-20 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 items-center h-screen">
      <Navigation />
      <SignUp signInUrl="/login" />
    </div>
  );
};

export default SignUpPage;
