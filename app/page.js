      import React from 'react'
      import Signin from './sign-in/[[...sign-in]]/page'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import Management from '../app/Management/page'


      const page = () => {
        return (
          <div className='flex justify-center items-center h-screen'>
            <SignedIn>
              <Management />
            </SignedIn>
            <SignedOut>
            <Signin/>
            </SignedOut>
          
          </div>
        )
      }

      export default page