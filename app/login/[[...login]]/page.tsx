import Navigation from '@/app/components/Nav'
import { SignIn } from '@clerk/nextjs'

export default function Login() {
  return (
    <div className="flex justify-center bg-gradient-to-t from-[#1476bc] via-[#9fbedb] to-[#ffffff] items-center h-screen">
      <Navigation />
      <SignIn path="/login" signUpUrl='/signup' fallbackRedirectUrl={'/dashboard'} />
    </div>
  )
}