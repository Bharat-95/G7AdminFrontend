"use client"
import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'

const Page = () => {
  const [data, setData] = useState([])  
  const [bookedCars, setBookedCars] = useState([]);
  const prevBookedCarsRef = useRef([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/cars");
      setData(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  useEffect(() => {
    const filteredBookedCars = data.filter((car) => car.Availability === 'Booked');
    
   
    if (filteredBookedCars.length > prevBookedCarsRef.current.length) {
      const audio = new Audio('/path/to/sound.mp3');  
      audio.play();
    }

   
    setBookedCars(filteredBookedCars);
    prevBookedCarsRef.current = filteredBookedCars;
  }, [data]);

  return (
    <div>
      {bookedCars.map((car) => (
        <div key={car.G7cars123}>{car.Name}</div>
      ))}
    </div>
  );
}

export default Page;
