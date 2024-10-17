"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header';
import Image from 'next/image';

const Page = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/documents');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
        <Header />

        <div className='flex justify-center text-2xl font-bold text-white underline underline-offset-8 p-10'>Users</div>

        {data
       .filter((cxdocuments) => cxdocuments.status === "verified") 
        .map((cxdocuments) => (
            
            <div key={cxdocuments.G7cars123} className='flex justify-center'>
                <div className='bg-white p-10 rounded-xl shadow-lg space-y-4 font-bold my-10'>
                
                <div>Name: {cxdocuments.name}</div>
                <div>Phone Number: {cxdocuments.phoneNumber}</div>
                <div>User Id: {cxdocuments.userId}</div>
                <div>Document Status: {cxdocuments.status}</div>
                <div className='flex gap-10'>
                    <Image
                    src={`https://g7cars.s3.amazonaws.com/${cxdocuments.AadhaarFrontUrl}`} 
                    alt='No Documnet Found'
                    width='400'
                    height='300'
                    className='rounded-xl w-80 h-64 border'/>

                   <Image
                    src={`https://g7cars.s3.amazonaws.com/${cxdocuments.AadhaarBackUrl}`} 
                    alt='No Documnet Found'
                    width='400'
                    height='300'
                    className='rounded-xl w-80 h-64 border'/>
                </div>
                </div>

            </div>
        ))}
   
    </div>
  );
};

export default Page;
