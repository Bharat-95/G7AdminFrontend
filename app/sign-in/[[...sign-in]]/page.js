import { SignIn } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (

        <SignIn routing='https://accounts.g7admin.in/sign-in' path="/sign-in" />

  )
}

export default page