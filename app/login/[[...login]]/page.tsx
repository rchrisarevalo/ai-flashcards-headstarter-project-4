import { SignIn } from '@clerk/nextjs'

export default function Login() {
  return (
    <div className="flex justify-center bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 items-center h-screen">
      <SignIn path="/login" signUpUrl='/signup' />
    </div>
  )
}