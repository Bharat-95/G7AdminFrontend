"use client"
import React, { useState } from 'react';
import Logo from '../public/1.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoMenu } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { IoDocumentsSharp } from "react-icons/io5";
import { SignOutButton } from '@clerk/nextjs';



const Header = () => {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);



    const handleClick = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <div className='bg-black w-20 h-[100%]  fixed'>
            {!menuOpen && (
                <div className='p-4 space-y-40'><IoMenu size={40} className='text-white cursor-pointer lg:block md:block hidden' onClick={handleClick} />
                <ul className='space-y-10'>
                  <li><Link href='/Management'><FaCar size={40} className='text-white'/></Link></li>
                  <li><Link href='/Documents'><IoDocumentsSharp size={40} className='text-white'/></Link></li>
                  <li><Link href='/Booking'><TbReportSearch size={40} className='text-white' /></Link></li>
                  <li><Link href='/User'><FaUser size={40} className='text-white' /></Link></li>
                  <li><Link href='/employee'><FaUsers size={40} className='text-white' /></Link></li>
                  <li><Link href='/reports'><FaBook size={40} className='text-white' /></Link></li>    
                  

                </ul>
                </div>
            )}

            {menuOpen && (
                <div className='bg-black h-screen lg:w-[25%] w-[40%] fixed shadow-xl'>
                    <div className='flex justify-center py-20'>
                        <Image
                            src={Logo}
                            alt='No Logo Found'
                            className='w-[50%]'
                        />
                    </div>

                    <ul className='text-white lg:mx-20 space-y-6'>
                        <li className='font-extrabold hover:text-rose-200'><Link href='/Management'>VEHICLE MANAGEMENT</Link></li>
                        <li className='font-extrabold hover:text-rose-200'><Link href='/Documents'>VERIFY DOCUMENTS</Link></li> 
                        <li className='font-extrabold hover:text-rose-200'><Link href='/'>BOOKING REQUESTS</Link></li>
                        <li className='font-extrabold hover:text-rose-200'><Link href='/'>USERS</Link></li>
                        <li className='font-extrabold hover:text-rose-200'><Link href='/'>EMPLOYEE</Link></li>
                        <li className='font-extrabold hover:text-rose-200'><Link href='/'>REPORTS</Link></li>
                    </ul>

                    <div className='flex m-20 '>
                       <SignOutButton className='text-white bg-rose-900 p-4 w-32 h-10 flex justify-center items-center rounded-md shadow-xl hover:bg-opacity-80 font-bold' /> 
                    </div>
                    <RxCross2 size={40} className='text-white absolute top-0 right-0 m-4 cursor-pointer' onClick={handleClick} />
                </div>
            )}

        </div>
    );
}

export default Header;
