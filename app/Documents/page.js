"use client";
import React, { useState, useEffect } from 'react';
import Header from '../Header';
import axios from 'axios';

const Page = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/documents/pending');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const verifyDocument = async (userId) => {
    try {
      await axios.put(`https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/documents/verify/${userId}`);
      setData(prevData =>
        prevData.map(doc =>
          doc.userId === userId ? { ...doc, status: 'verified' } : doc
        )
      );
    } catch (error) {
      console.error('Error verifying document:', error);
    }
  };

  return (
    <div className='flex'>
      <Header />
      <div className="w-[100%] lg:m-40 bg-white border-[2px] p-4 border-rose-900 rounded-xl">
        <div className="text-rose-900 font-extrabold underline underline-offset-4 flex justify-center">
          VERIFY DOCUMENTS
        </div>
        {data.map((cxdocument, index) => (
          <div key={index} className='m-20'>
            <div>Name: {cxdocument.name}</div>
            <div>{cxdocument.email}</div>
            <div>Phone Number: {cxdocument.phoneNumber}</div>
            <div>{cxdocument.status}</div>
            <div className=''>
            {cxdocument.DrivingLicenseUrl && (
              <img src={`https://g7cars.s3.amazonaws.com/${cxdocument.DrivingLicenseUrl}`} alt="Driving License"
              className='w-80 h-80 rounded-xl' />
            )}
            {cxdocument.AadhaarUrl && (
              <img src={`https://g7cars.s3.amazonaws.com/${cxdocument.AadhaarUrl}`} alt="Aadhaar"
              className='w-80 h-80' />
            )}
            </div>
            {cxdocument.status === 'pending' && (
              <button onClick={() => verifyDocument(cxdocument.userId)}>Verify</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page;
