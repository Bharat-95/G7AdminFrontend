import React from 'react'

import Header from './Header'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import Signin from '../app/sign-in/[[...sign-in]]/page.js'


const page = () => {
  return (
    <div className=''>
      <SignedIn>
     <Header />
     </SignedIn>
     <SignedOut>
      <Signin/>
     </SignedOut>
    </div>
  )
}

export default page