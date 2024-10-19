"use client";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Header from "../Header";
import { SignedIn } from "@clerk/nextjs";

const Page = () => {
  const [data, setData] = useState([]);


  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/bookings"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SignedIn>
    <div>
      <Header />
      <div className="flex justify-center py-10 text-xl text-white underline underline-offset-8">Active Bookings</div>
      {data .length === 0 ? (<div className="border bg-white text-sm py-4 px-2 font-bold rounded-xl space-y-4">
        No Active Bookings Found
      </div>) : ( data
        .filter((bookings) => bookings.status === "Active")
        .map((bookings) => (
          <div key={bookings.G7cars123} className="grid grid-cols-4 content-center px-24 py-10 ">
            <div className="border bg-white text-sm py-4 px-2 font-bold rounded-xl space-y-4">
              <div>Booking Id: {bookings.bookingId}</div>
              <div>Order Id: {bookings.orderId}</div>
              <div>
                PickUp Date:
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }).format(new Date(bookings.pickupDateTime))}
              </div>
              <div>DropOff Date: 
                {new Intl.DateTimeFormat("en-US", {
                  year:"numeric",
                  month:"long",
                  day:"numeric",
                  hour:"numeric",
                  minute:"numeric",
                  hour12:true,
                }).format(new Date(bookings.dropoffDateTime))}</div>
                 <div>Phone Number: {bookings.phoneNumber}</div>
            </div>
           
          </div>
        )))}
     
    </div>
    </SignedIn>
  );
};

export default Page;
