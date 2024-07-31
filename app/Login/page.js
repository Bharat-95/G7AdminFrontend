"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => {
        if (phoneNumber === "9640019664" && password === "G7cars") {
            router.push('/Management'); 
        } else {
            alert("Please enter valid PhoneNumber and Password");
        }
    }

    return (
        <div>
            <div className='text-white flex justify-center p-10 text-2xl font-bold underline underline-offset-4'>Welcome to G7Cars</div>
            <div className='lg:mx-80 md:mx-40 mx-10 my-20 py-14  space-y-16 border-[4px] border-rose-900 bg-white rounded-xl shadow-xl  '>
                <div className='flex justify-center text-2xl font-bold underline underline-offset-8 decoration-rose-950 decoration-4'>Login</div>
                <div>
                    <form className='flex flex-col justify-center items-center space-y-4'>
                        <input
                            type='text'
                            placeholder='Enter Your Phone Number'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className='w-[50%] h-12 flex text-center rounded-md border text-sm'
                        />
                        <input 
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-[50%] h-12 flex text-center rounded border text-sm'
                        />
                    </form>
                </div>
                <div className='flex justify-center'>
                    <button className='bg-rose-950 text-white mx-52 h-10 w-40 rounded-md hover:bg-opacity-90' onClick={handleClick}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Page;
