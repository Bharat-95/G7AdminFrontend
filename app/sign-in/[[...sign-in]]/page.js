import { SignIn } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (

        <SignIn routing='path' path="/sign-in" />

  )
}

export default page