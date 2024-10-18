import { SignUp } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div>
        <SignUp 
         fallbackRedirectUrl="g7-admin-frontend.vercel.app" />
    </div>
  )
}

export default page