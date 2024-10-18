import React from 'react'

import Header from './Header'
import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs'
import Signin from '../app/sign-in/[[...sign-in]]/page'


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