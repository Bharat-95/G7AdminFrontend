import {  useUser } from '@clerk/nextjs'
import Signin from '../app/sign-in/[[...sign-in]]/page'
import Header from './Header'

export default function Home() {
  const { user } = useUser()

  if (!user) {
    return <Signin />
  }

  return <div>
    <Header />
  </div>
}