import { SignIn, useUser } from '@clerk/nextjs'
import Header from './Header'

export default function Home() {
  const { user } = useUser()

  if (!user) {
    return <SignIn />
  }

  return <div>
    <Header />
  </div>
}