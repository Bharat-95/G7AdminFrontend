import { SignIn } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div>
        <SignIn  fallbackRedirectUrl='https://www.g7admin.in/Management'/>
    </div>
  )
}

export default page