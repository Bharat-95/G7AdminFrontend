"use client";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TbManualGearboxFilled } from "react-icons/tb";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import Image from "next/image";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/cars`);

        const data = await response.data;
        
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (carNo) => {
    const confirmed = window.confirm("Are you sure you want to delete this car?");
    if (confirmed) {
        try {
            const response = await axios.delete(`https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/cars/${carNo}`);
            console.log(response);
            alert("Car deleted successfully");

            const updatedData = data.filter(car => car.G7cars123 !== carNo);
            setData(updatedData);
        } catch (error) {
            console.error("Error deleting car:", error.response?.data || error.message);
        }
    }
};
  
  

  const formatYearAsDate = (year) => {
    const currentYear = new Date().getFullYear();
    if (!/^\d{4}$/.test(year) || year < 1886 || year > currentYear) {
      return "Invalid Year";
    }
    const date = new Date(year, 0, 1);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${month}/${day}/${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div className="flex">
      <Header />

      <div className="w-[100%] lg:m-40 bg-white border-[2px] p-4 border-rose-900 rounded-xl">
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
                key={car.G7cars123}
                className="h-80 rounded-xl shadow-lg bg-white text-rose-900"
              >
                <div className="border p-4 rounded-xl text-xl font-bold">
                  {car.Name}
                </div>
                <div className="flex justify-between lg:mx-24 md:mx-24 items-center">
                  <div className="flex items-center justify-center">
                  {car.Coverimage && car.Coverimage.length > 0 && (
          <Image
            src={car.Coverimage[0]}
            width={0}
            height={0}
            alt="No Image Found"
            className="lg:w-64 lg:h-40 md:w-64 md:h-40 w-20 h-20 m-4"
            unoptimized
          />
        )}
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
                      onClick={() => handleDelete(car.G7cars123)}
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
      </div>
    </div>
  );
};

export default Page;
