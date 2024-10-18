import React from 'react'

import Header from './Header'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'


const page = () => {
  return (
    <div className=''>
      <SignedIn>
     <Header />
     </SignedIn>
     <SignedOut>
      <div>
        Welcome to G7 Admin
        <div>Please click here to <Link href="/sign-in">Login</Link></div>
      </div>
     </SignedOut>
    </div>
  )
}

export default page