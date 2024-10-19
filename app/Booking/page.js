"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
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

  const activeBookings = data.filter((booking) => booking.status === "Active");

  return (
    <SignedIn>
      <div>
        <Header />
        <div className="flex justify-center py-10 text-xl text-white underline underline-offset-8">
          Active Bookings
        </div>

        {activeBookings.length === 0 ? (
          <div className="border bg-white text-sm py-4 px-2 m-20 font-bold rounded-xl space-y-4">
            No Active Bookings Found
          </div>
        ) : (
          activeBookings.map((booking) => (
            <div
              key={booking.G7cars123}
              className="grid grid-cols-4 content-center px-24 py-10"
            >
              <div className="border bg-white text-sm py-4 px-2 font-bold rounded-xl space-y-4">
                <div>Booking Id: {booking.bookingId}</div>
                <div>Order Id: {booking.orderId}</div>
                <div>
                  PickUp Date:{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  }).format(new Date(booking.pickupDateTime))}
                </div>
                <div>
                  DropOff Date:{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  }).format(new Date(booking.dropoffDateTime))}
                </div>
                <div>Phone Number: {booking.phoneNumber}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </SignedIn>
  );
};

export default Page;
