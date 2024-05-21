"use client";
import React from "react";
import Header from "../Header";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TbManualGearboxFilled } from "react-icons/tb";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import axios from "axios";

const page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://7u8pgn4fie.execute-api.us-east-1.amazonaws.com/cars");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://7u8pgn4fie.execute-api.us-east-1.amazonaws.com/cars/${id}`);
      alert("Car deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const formatYearAsDate = (year) => {
    const date = new Date(year, 0, 1); // January 1st of the given year
    return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="flex">
      <Header />

      <div className="w-[100%] lg:m-40  bg-white border-[2px] p-4 border-rose-900 rounded-xl">
        <div className="text-rose-900 font-extrabold underline underline-offset-4 flex justify-center">
          VEHICLE MANAGEMENT
        </div>
        <Link
          href="/Attach"
          className="absolute lg:right-52 right-2 m-2 text-white bg-rose-900 p-2 hover:opacity-90 rounded-md"
        >
          Attach a car
        </Link>
        <div className="min-h-[80%] lg:m-20 md:m-20 lg:ml-0 md:ml-0 ml-14 space-y-10 lg:p-20 md:p-20 p-4">
          {loading ? (
            <div className="flex justify-center">Loading...</div>
          ) : (
            data.map((car) => (
              <div
                key={car._id}
                className="h-80 rounded-xl shadow-lg bg-white text-rose-900"
              >
                <div className="border p-4 rounded-xl text-xl font-bold">
                  {car.Name}
                </div>
                <div className="flex justify-between lg:mx-24 md:mx-24 items-center">
                  <div className="flex items-center justify-center">
                    <Image
                      src={`data:image/jpeg;base64,${car.Coverimage}`}
                      width={0}
                      height={0}
                      alt="No Image Found"
                      className="lg:w-64 lg:h-40 md:w-64 md:h-40 w-20 h-20 m-4"
                    />
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex gap-10 items-center">
                      <TbManualGearboxFilled size={30} />
                      {car.Gear}
                    </div>
                    <div className="flex gap-10 items-center">
                      <BsFillFuelPumpFill size={30} />
                      {car.Fuel}
                    </div>
                    <div className="flex gap-10 items-center">
                      <MdOutlineAirlineSeatReclineNormal size={30} />
                      {car.Seating}
                    </div>
                    <div className="flex gap-10 items-center">
                      <SlCalender size={30} />
                      {formatYearAsDate(car.Year)}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <MdDelete
                      onClick={() => handleDelete(car._id)}
                      size={40}
                      className="text-rose-900 cursor-pointer"
                    />
                    <MdEdit size={40} className="text-rose-900 cursor-pointer" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default page;
