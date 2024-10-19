import React from 'react'

import Header from './Header'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import Bg from '../public/1.png'


const page = () => {
  return (
    <div className='flex justify-center my-20 '>
 <div className='space-y-10 border p-20 rounded-xl text-white'>
      <Image
      src={Bg} 
      className='flex justify-center items-center h-40 w-80'/>
      <SignedIn>
     <Header />
     </SignedIn>
     <SignedOut>
      <div className='flex justify-center items-center text-2xl text-white'>
        Welcome to G7 Admin
      </div>
      <div className='flex justify-center text-xl'><Link href="/sign-in" className='bg-black p-4 rounded-xl'>Login</Link></div>
     </SignedOut>
     </div>
    </div>
  )
}

export default page