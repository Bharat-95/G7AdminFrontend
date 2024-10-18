import { SignIn } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (

        <SignIn path='https://accounts.g7admin.in/sign-in' />

  )
}

export default page