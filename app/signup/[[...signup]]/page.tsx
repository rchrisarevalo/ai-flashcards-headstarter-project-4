import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
    return (
        <div className="flex justify-center bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 items-center h-screen">
            <SignUp />
        </div>
    )
}

export default SignUpPage;