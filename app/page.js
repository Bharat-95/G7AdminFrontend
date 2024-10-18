import React from 'react'

import Header from './Header'
import Link from 'next/link'
const page = () => {
  return (
    <div className=''>
      Welcome to G7cars Admin
 <Link href='/sign-in'> Sign In</Link>
    </div>
  )
}

export default page