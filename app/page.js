import React from 'react'
import Login from '../app/Login/page'
import { SignIn } from '@clerk/nextjs'
const page = () => {
  return (
    <div>
    <SignIn />
    </div>
  )
}

export default page