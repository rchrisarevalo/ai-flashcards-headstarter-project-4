import Navigation from '@/app/components/Nav'
import { SignIn } from '@clerk/nextjs'

export default function Login() {
  return (
    <div className="flex justify-center bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 items-center h-screen">
      <Navigation />
      <SignIn path="/login" signUpUrl='/signup' fallbackRedirectUrl={'/dashboard'} />
    </div>
  )
}