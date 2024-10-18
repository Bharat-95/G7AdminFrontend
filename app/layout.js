import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import { SignIn } from "@clerk/clerk-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "G7Cars Admin",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
<ClerkProvider >
      <html lang="en">
        <body>
        <SignedIn>
          {children}
          </SignedIn>
          <SignedOut>
            <SignIn/>
          </SignedOut>
      
        </body>
      </html>
    </ClerkProvider>
  );
}
