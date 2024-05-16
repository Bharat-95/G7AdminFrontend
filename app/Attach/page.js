"use client";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import Image from "next/image";

const Form = () => {
  const [formdata, setFormData] = useState({
    image: null,
    Name: "",
    Price: "",
    Gear: "",
    Fuel: "",
    Seating: "",
    RcFront: null,
    RcBack: null,
    AdhaarFront: null,
    AdhaarBack: null,
    Make: "",
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://3.110.186.6:4000/cars");
        const data = await response.json();

        setData(data);
      } catch (error) {
        console.error("Unable to fetch data from Mongodb", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("Name", formdata.Name);
    formDataToSend.append("Price", formdata.Price);
    formDataToSend.append("image", formdata.image);
    formDataToSend.append("Gear", formdata.Gear);
    formDataToSend.append("Fuel", formdata.Fuel);
    formDataToSend.append("Make", formdata.Make);
    formDataToSend.append("Seating", formdata.Seating);
    formDataToSend.append("RcFront", formdata.RcFront);
    formDataToSend.append("RcBack", formdata.RcBack);
    formDataToSend.append("AdhaarFront", formdata.AdhaarFront);
    formDataToSend.append("AdhaarBack", formdata.AdhaarBack);

    try {
      const response = await fetch("http://3.110.186.6:4000/cars", {
        method: "POST",
        body: formDataToSend,
      });
      alert("Data added successfully");
      window.location.reload();
    } catch (error) {
      console.error("Not able to add data", error);
    }

    setFormData({ Name: "", Price: "", image: "" });
  };



  if (data)
    return (
      <div className="">
        <Header />
        <div className="flex flex-col justify-center ml-20 lg:ml-0 md:ml-0 py-10 text-white lg:text-lg text-sm ">
          <div className="text-2xl text-center">
            Please Enter Details Of Your Car
          </div>

          <form
            className="justify-center space-y-12 my-20 text-center"
            onSubmit={handleSubmit}
          >
            <div className="">
              Car Image:
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formdata, image: e.target.files[0] })
                }
                name="image"
                required
                className="lg:mx-2"
              />
            </div>

            <div className="">
              Name:
              <input
                type="text"
                value={formdata.Name}
                onChange={(e) =>
                  setFormData({ ...formdata, Name: e.target.value })
                }
                name="Name"
                className="w-96  rounded-md h-10 text-black p-2 mx-2 "
                required

              />
            </div>

            <div className="">
              Make:
              <input
                type="text"
                value={formdata.Make}
                onChange={(e) =>
                  setFormData({ ...formdata, Make: e.target.value })
                }
                name="Make"
                className="w-96 h-10 text-black p-2 mx-2"
                required

              />
            </div>

            <div className="">
              Gear:
              <select
                value={formdata.Gear}
                onChange={(e) =>
                  setFormData({ ...formdata, Gear: e.target.value })
                }
                name="Gear"
                className="w-96 h-10 text-black p-2 mx-2"
                required

              >
                <option></option>
                <option>Automatic</option>
                <option>Manual</option>
              </select>
            </div>

            <div className="">
              Fuel:
              <select
                value={formdata.Fuel}
                onChange={(e) =>
                  setFormData({ ...formdata, Fuel: e.target.value })
                }
                name="Fuel"
                className="w-96 h-10 text-black p-2 mx-2"
                required

              >
                <option></option>
                <option>Petrol</option>
                <option>Diesel</option>
              </select>
            </div>

            <div className="">
             Seating:
              <select
                value={formdata.Seating}
                onChange={(e) =>
                  setFormData({ ...formdata, Seating: e.target.value })
                }
                name="Seating"
                className="w-96 h-10 text-black p-2 mx-2"
                required

              >
                <option></option>
                <option>5</option>
                <option>7</option>
              </select>
            </div>

            <div className="">
              Price:
              <input
                type="number"
                name="Price"
                onChange={(e) =>
                  setFormData({ ...formdata, Price: e.target.value })
                }
                value={formdata.Price}
                className="w-96 h-10 text-black p-2 mx-2"
                required

              />
            </div>

            <div className="">
              Rc Front:
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formdata, RcFront: e.target.files[0] })
                }
                name="RcFront"
                required
                className="mx-2"

              />
            </div>

            <div className="">
              Rc Back:
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formdata, RcBack: e.target.files[0] })
                }
                name="RcBack"
                required
                className="mx-2"

              />
            </div>

            <div className="">
              Adhaar Front:
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formdata, AdhaarFront: e.target.files[0] })
                }
                name="AdhaarFront"
                required
                className="mx-2"

              />
            </div>

            <div className="">
              Adhaar Back:
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formdata, AdhaarBack: e.target.files[0] })
                }
                name="AdhaarBack"
                required
                className="mx-2"

              />
            </div>

            <div className="">
              <button
                className="bg-white text-black items-center w-20 rounded-md"
                type="submit"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Form;
