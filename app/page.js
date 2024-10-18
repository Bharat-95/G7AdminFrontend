import React from 'react'

import { SignIn } from '@clerk/nextjs'
import Header from './Header'
const page = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
     <Header />
    </div>
  )
}

export default page