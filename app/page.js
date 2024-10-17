"use client";
import { useSearchParams } from 'next/navigation';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn />
    </div>
  );
};

export default SignInPage;
