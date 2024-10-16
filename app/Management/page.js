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
import Modal from "react-modal";
import { IoIosClose } from "react-icons/io";


const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/cars`
        );
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
    const confirmed = window.confirm(
      "Are you sure you want to delete this car?"
    );
    if (confirmed) {
      try {
        const response = await axios.delete(
          `https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/cars/${carNo}`
        );
        alert("Car deleted successfully");

        const updatedData = data.filter((car) => car.G7cars123 !== carNo);
        setData(updatedData);
      } catch (error) {
        console.error(
          "Error deleting car:",
          error.response?.data || error.message
        );
      }
    }
  };

  const handleEdit = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!selectedCar) return;

    console.log("Saving carNo:", selectedCar.CarNo);
    try {
      const { G7cars123, ...carUpdateData } = selectedCar;
      const response = await axios.put(
        `https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/cars/${selectedCar.CarNo}`,
        carUpdateData
      );
      console.log("Response:", response);
      alert("Car updated successfully");

      const updatedCarData = response.data;
      setData((prevData) =>
        prevData.map((car) =>
          car.CarNo === selectedCar.CarNo ? updatedCarData : car
        )
      );

      setIsModalOpen(false);
    } catch (error) {
      console.error(
        "Error updating car:",
        error.response?.data || error.message
      );
    }
  };

  const formatYearAsDate = (year) => {
    const currentYear = new Date().getFullYear();
    if (!/^\d{4}$/.test(year) || year < 1886 || year > currentYear) {
      return "Invalid Year";
    }
    const date = new Date(year, 0, 1);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
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
                    <MdEdit
                      onClick={() => handleEdit(car)}
                      size={40}
                      className="text-rose-900 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {isModalOpen && selectedCar && (
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Edit Car"
            className="modal-class flex justify-center my-10 w-'80%' border border-1 mx-20 bg-rose-950 text-white rounded-md overflow-auto max-h-[90%] relative z-auto "
          >

           <IoIosClose size={50}  className="absolute right-10 my-4 cursor-pointer" onClick={() => setIsModalOpen(false)}/>
            <form className="space-y-10 py-10">
              <div className="text-2xl font-bold underline underline-offset-8 flex justify-center">
                Edit Car Details
              </div>
              <div className="space-x-4 space-y-4">
                <label>Cover Image: </label>
                <Image
                  src={selectedCar.Coverimage[0]}
                  width="300"
                  height="200"
                />

                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const newImageUrl = URL.createObjectURL(file);
                      setSelectedCar({
                        ...selectedCar,
                        Coverimage: [newImageUrl],
                      });
                    }
                  }}
                />
              </div>
              <div className="space-x-4 flex flex-col space-y-2">
                <label>Name:</label>
                <input
                  type="text"
                  value={selectedCar.Name}
                  onChange={(e) =>
                    setSelectedCar({ ...selectedCar, Name: e.target.value })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                />
              </div>

              <div className="space-x-4 flex flex-col space-y-2">
                <label>Car No:</label>
                <input
                  type="text"
                  value={selectedCar.CarNo}
                  onChange={(e) =>
                    setSelectedCar({ ...selectedCar, CarNo: e.target.value })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                />
              </div>

              <div className="space-x-4 flex flex-col space-y-2">
                <label>Car Color:</label>
                <input
                  type="text"
                  value={selectedCar.Color}
                  onChange={(e) =>
                    setSelectedCar({ ...selectedCar, Color: e.target.value })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                />
              </div>

              <div className="space-x-4 flex flex-col space-y-2">
                <label>Gear Type :</label>
                <select
                  type="text"
                  value={selectedCar.Gear}
                  onChange={(e) =>
                    setSelectedCar({ ...selectedCar, Gear: e.target.value })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                >
                  <option>{selectedCar.Gear}</option>
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </div>
              <div className="space-x-4 flex flex-col space-y-2">
                <label>Fuel Type :</label>
                <select
                  type="text"
                  value={selectedCar.Fuel}
                  onChange={(e) =>
                    setSelectedCar({ ...selectedCar, Fuel: e.target.value })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                >
                  <option>{selectedCar.Fuel}</option>
                  <option>Diesel</option>
                  <option>Petrol</option>
                </select>
              </div>

              <div className="space-x-4 flex flex-col space-y-2">
                <label>Car Seating :</label>
                <select
                  type="number"
                  value={selectedCar.Seating}
                  onChange={(e) =>
                    setSelectedCar({ ...selectedCar, Seating: e.target.value })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                >
                  <option>{selectedCar.Seating}</option>
                  <option>5 Seater</option>
                  <option>7 Seater</option>
                </select>
              </div>

              <div className="space-x-4 flex flex-col space-y-2">
                <label>Make Year : </label>
                <input
                  type="text"
                  value={selectedCar.Year}
                  onChange={(e) =>
                    setSelectedCar({ ...selectedCar, Year: e.target.value })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                />
              </div>

              <div className="space-x-4 flex flex-col space-y-2">
                <label>Car Reading :</label>
                <input
                  type="text"
                  value={selectedCar.Reading}
                  onChange={(e) =>
                    setSelectedCar({ ...selectedCar, Reading: e.target.value })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                />
              </div>

              <div className="space-y-4">
                  <label>Car Pollution :</label>
                  <Image
                    src={selectedCar.Pollution[0]}
                    width="400"
                    height="200"
                    alt="No Pollution Image Found"
                  />
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const newImageUrl = URL.createObjectURL(file);
                        setSelectedCar({
                          ...selectedCar,
                          Pollution: [newImageUrl],
                        });
                      }
                    }}
                  />
                </div>


              <div className="space-x-4 flex flex-col space-y-2">
                <label>Car EngineNo :</label>
                <input
                  type="text"
                  value={selectedCar.EngineNo}
                  onChange={(e) =>
                    setSelectedCar({ ...selectedCar, EngineNo: e.target.value })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                />
              </div>


              <div className="space-x-4 flex flex-col space-y-2">
                <label>Car ChassisNo :</label>
                <input
                  type="text"
                  value={selectedCar.ChassisNumber}
                  onChange={(e) =>
                    setSelectedCar({
                      ...selectedCar,
                      ChassisNumber: e.target.value,
                    })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                />
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <label>Rc Front :</label>
                  <Image
                    src={selectedCar.RcFront[0]}
                    width="400"
                    height="200"
                    alt="No Rc Front Image Found"
                  />
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const newImageUrl = URL.createObjectURL(file);
                        setSelectedCar({
                          ...selectedCar,
                          RcFront: [newImageUrl],
                        });
                      }
                    }}
                  />
                </div>
                <div className="space-y-4">
                  <label>Rc Back :</label>
                  <Image
                    src={selectedCar.RcBack[0]}
                    width="400"
                    height="200"
                    alt="No Rc Back Image Found"
                  />
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const newImageUrl = URL.createObjectURL(file);
                        setSelectedCar({
                          ...selectedCar,
                          RcBack: [newImageUrl],
                        });
                      }
                    }}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label>Agreement Document:</label>
                {selectedCar.AgreementDoc &&
                selectedCar.AgreementDoc.length > 0 ? (
                  <div
                    src={selectedCar.AgreementDoc[0]}
                    width="400"
                    height="200"
                    title="Agreement Document"
                  >
                    This browser does not support PDFs. Please download the PDF
                    to view it:{" "}
                    <a href={selectedCar.AgreementDoc[0]}>Download PDF</a>
                  </div>
                ) : (
                  <div>No Agreement Document Available</div>
                )}

                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const newFileUrl = URL.createObjectURL(file);
                      setSelectedCar({
                        ...selectedCar,
                        AgreementDoc: [newFileUrl],
                      });
                    }
                  }}
                />
              </div>



              <div className="space-x-4 flex flex-col space-y-2">
                <label>Insurance Name :</label>
                <input
                  type="text"
                  value={selectedCar.InsuranceName}
                  onChange={(e) =>
                    setSelectedCar({
                      ...selectedCar,
                      InsuranceName: e.target.value,
                    })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                />
              </div>



              <div className="space-x-4 flex flex-col space-y-2">
                <label>Insurance No :</label>
                <input
                  type="text"
                  value={selectedCar.InsuranceNo}
                  onChange={(e) =>
                    setSelectedCar({
                      ...selectedCar,
                      InsuranceNo: e.target.value,
                    })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                />
              </div>


              <div className="space-x-4 flex flex-col space-y-2">
                <label>Insurance Expiry Date :</label>
                <input
                  type="text"
                  value={selectedCar.ExpiryDate}
                  onChange={(e) =>
                    setSelectedCar({
                      ...selectedCar,
                      ExpiryDate: e.target.value,
                    })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                />
              </div>



              <div className="space-y-4">
                <label>Insurance Document:</label>
                {selectedCar.InsuranceDoc &&
                selectedCar.InsuranceDoc.length > 0 ? (
                  <div
                    src={selectedCar.InsuranceDoc[0]}
                    width="400"
                    height="200"
                    title="Agreement Document"
                  >
                    This browser does not support PDFs. Please download the PDF
                    to view it:{" "}
                    <a href={selectedCar.InsuranceDoc[0]}>Download PDF</a>
                  </div>
                ) : (
                  <div>No Agreement Document Available</div>
                )}

                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const newFileUrl = URL.createObjectURL(file);
                      setSelectedCar({
                        ...selectedCar,
                        InsuranceDoc: [newFileUrl],
                      });
                    }
                  }}
                />
              </div>


              <div className="space-x-4 flex flex-col space-y-2">
                <label>Agreement Period :</label>
                <input
                  type="text"
                  value={selectedCar.AgreementPeriod}
                  onChange={(e) =>
                    setSelectedCar({
                      ...selectedCar,
                      AgreementPeriod: e.target.value,
                    })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                />
              </div>


              <div className="space-x-4 flex flex-col space-y-2">
                <label>Owner Name :</label>
                <input
                  type="text"
                  value={selectedCar.OwnerName}
                  onChange={(e) =>
                    setSelectedCar({
                      ...selectedCar,
                      OwnerName: e.target.value,
                    })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                />
              </div>


              <div className="space-x-4 flex flex-col space-y-2">
                <label>Owner Address :</label>
                <input
                  type="text"
                  value={selectedCar.OwnerAddress}
                  onChange={(e) =>
                    setSelectedCar({
                      ...selectedCar,
                      OwnerAddress: e.target.value,
                    })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                />
              </div>


              <div className="space-y-4">
                  <label>Owner Adhaarcard Front :</label>
                  <Image
                    src={selectedCar.AdhaarFront[0]}
                    width="400"
                    height="200"
                    alt="No Rc Back Image Found"
                  />
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const newImageUrl = URL.createObjectURL(file);
                        setSelectedCar({
                          ...selectedCar,
                          AdhaarFront: [newImageUrl],
                        });
                      }
                    }}
                  />
                </div>

                <div className="space-y-4">
                  <label>Owner Adhaarcard Back :</label>
                  <Image
                    src={selectedCar.AdhaarBack[0]}
                    width="400"
                    height="200"
                    alt="No Rc Back Image Found"
                  />
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const newImageUrl = URL.createObjectURL(file);
                        setSelectedCar({
                          ...selectedCar,
                          AdhaarBack: [newImageUrl],
                        });
                      }
                    }}
                  />
                </div>


                <div className="space-x-4 flex flex-col space-y-2">
                <label>Owner Phone Number :</label>
                <input
                  type="text"
                  value={selectedCar.MobileNumber}
                  onChange={(e) =>
                    setSelectedCar({
                      ...selectedCar,
                      MobileNumber: e.target.value,
                    })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                />
              </div>


              <div className="space-x-4 flex flex-col space-y-2">
                <label>Owner Alternate Phone Number :</label>
                <input
                  type="text"
                  value={selectedCar.AltNumber}
                  onChange={(e) =>
                    setSelectedCar({
                      ...selectedCar,
                      AltNumber: e.target.value,
                    })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                />
              </div>


              <div className="space-x-4 flex flex-col space-y-2">
                <label>Owner Email Address :</label>
                <input
                  type="text"
                  value={selectedCar.EmailAddress}
                  onChange={(e) =>
                    setSelectedCar({
                      ...selectedCar,
                      EmailAddress: e.target.value,
                    })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                />
              </div>


              <div className="space-x-4 flex flex-col space-y-2">
                <label>Name on the Bank:</label>
                <input
                  type="text"
                  value={selectedCar.NameonBank}
                  onChange={(e) =>
                    setSelectedCar({
                      ...selectedCar,
                      NameonBank: e.target.value,
                    })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                />
              </div>


              <div className="space-x-4 flex flex-col space-y-2">
                <label>Bank Name:</label>
                <input
                  type="text"
                  value={selectedCar.BankName}
                  onChange={(e) =>
                    setSelectedCar({
                      ...selectedCar,
                      BankName: e.target.value,
                    })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                />
              </div>

              <div className="space-x-4 flex flex-col space-y-2">
                <label>Bank Account Number:</label>
                <input
                  type="text"
                  value={selectedCar.BankAccountNo}
                  onChange={(e) =>
                    setSelectedCar({
                      ...selectedCar,
                      BankAccountNo: e.target.value,
                    })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                />
              </div>

              <div className="space-x-4 flex flex-col space-y-2">
                <label>Bank IFSC:</label>
                <input
                  type="text"
                  value={selectedCar.IFSC}
                  onChange={(e) =>
                    setSelectedCar({
                      ...selectedCar,
                      IFSC: e.target.value,
                    })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                />
              </div>


              <div className="space-x-4 flex flex-col space-y-2">
                <label>Comments</label>
                <input
                  type="text"
                  value={selectedCar.Comment}
                  onChange={(e) =>
                    setSelectedCar({
                      ...selectedCar,
                      Comment: e.target.value,
                    })
                  }
                  className="text-black p-2 rounded-md text-center w-[100%]"
                />
              </div>


              <div className="flex justify-between mx-20 ">

              <button type="button" onClick={handleSave} className="bg-white p-2 rounded-xl m-10 text-black hover:opacity-90">
                Save 
              </button>
              <button type="button" onClick={() => setIsModalOpen(false)} className="bg-white p-2 rounded-xl m-10 text-black hover:opacity-90">
                Close
              </button>

              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Page;
