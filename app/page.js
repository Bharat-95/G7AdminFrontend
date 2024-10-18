import React from 'react'

import Header from './Header'
import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs'



const page = () => {
  return (
    <div className=''>
      <SignedIn>
     <Header />
     </SignedIn>
     <SignedOut>
 <SignIn />
     </SignedOut>
    </div>
  )
}

export default page