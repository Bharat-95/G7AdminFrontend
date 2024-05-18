"use client";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import Image from "next/image";

const Form = () => {
  const [formdata, setFormData] = useState({
    Coverimage: null,
    OnwerName:"",
    OwnerAddress:"",
    MobileNumber:"",
    EmailAddress:"",
    Year:"",
    Color:"",
    Reading:"",
    AgreementPeriod:"",
    EngineNo:"",
    ChassisNumber:"",
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
    Insurance: "",
    InsuranceName:"",
    InsuranceNo:"",
    ExpiryDate:"",
    Bank:"",
    BankAccountNo:"",
    BankName:"",
    NameonBank:"",
    IFSC:"",
    Agreement:"",
    Pollution:"",
    Images:"",
    AccountNo:"",
    AgreementDoc:"",
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://r3ozb5mg9b.execute-api.us-east-1.amazonaws.com/cars");
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
    formDataToSend.append("OwnerName", formdata.OnwerName);
    formDataToSend.append("OwnerAddress", formdata.OwnerAddress);
    formDataToSend.append("MobileNumber", formdata.MobileNumber);
    formDataToSend.append("EmailAddress", formdata.EmailAddress);
    formDataToSend.append("Bank", formdata.Bank);
    formDataToSend.append("Agreement", formdata.Agreement);
    formDataToSend.append("Reading", formdata.Reading); 
    formDataToSend.append("AgreementPeriod", formdata.AgreementPeriod); 
    formDataToSend.append("EngineNo", formdata.EngineNo);
    formDataToSend.append("ChassisNumber", formdata.ChassisNumber);
    formDataToSend.append("Price", formdata.Price);
    formDataToSend.append("Coverimage", formdata.Coverimage);
    formDataToSend.append("Gear", formdata.Gear);
    formDataToSend.append("Fuel", formdata.Fuel);
    formDataToSend.append("Make", formdata.Make);
    formDataToSend.append("Seating", formdata.Seating);
    formDataToSend.append("RcFront", formdata.RcFront);
    formDataToSend.append("RcBack", formdata.RcBack);
    formDataToSend.append("AdhaarFront", formdata.AdhaarFront);
    formDataToSend.append("AdhaarBack", formdata.AdhaarBack);
    formDataToSend.append("Insurance", formdata.Insurance);
    formDataToSend.append("InsuranceName", formdata.InsuranceName);
    formDataToSend.append("InsuranceNo", formdata.InsuranceNo);
    formDataToSend.append("ExpiryDate", formdata.ExpiryDate);
    formDataToSend.append("Pollution", formdata.Pollution);
    formDataToSend.append("Images", formdata.Images);
    formDataToSend.append("Color", formdata.Color);
    formDataToSend.append("AccountNo", formdata.AccountNo);
    formDataToSend.append("BankName", formdata.BankName);
    formDataToSend.append("NameonBank", formdata.NameonBank);
    formDataToSend.append("IFSC", formdata.IFSC);
    formDataToSend.append("AgreementDoc", formdata.AgreementDoc);
    formDataToSend.append("Year", formdata.Year)

    try {
      const response = await fetch("https://r3ozb5mg9b.execute-api.us-east-1.amazonaws.com/cars", {
        method: "POST",
        body: formDataToSend,
      });
      alert("Data added successfully");
      window.location.reload();
    } catch (error) {
      console.error("Not able to add data", error);
    }

    setFormData({ 
      Coverimage: null,
      OnwerName:"",
      OwnerAddress:"",
      MobileNumber:"",
      EmailAddress:"",
      Color:"",
      Reading:"",
      AgreementPeriod:"",
      EngineNo:"",
      ChassisNumber:"",
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
      Insurance: "",
      InsuranceName:"",
      InsuranceNo:"",
      ExpiryDate:"",
      Bank:"",
      BankAccountNo:"",
      BankName:"",
      NameonBank:"",
      IFSC:"",
      Agreement:"",
      Pollution:"",
      Images:"",
      AccountNo:"",
      AgreementDoc:"",
      Year:"",
    });
  };

  const inputStyle = "w-96 h-10 text-black p-2 mx-2 rounded-md";

  if (data)
    return (
      <div className="">
        <Header />
        <div className="flex flex-col justify-center items-center py-10 text-white lg:text-lg text-sm">
          <div className="text-2xl text-center">
            Please Enter Details Of Your Car
          </div>

          <form className="space-y-6 my-10" onSubmit={handleSubmit}>
            <div className="flex flex-col items-start">
              <label>Cover Image:</label>
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formdata, Coverimage: e.target.files[0] })
                }
                name="Coverimage"
                required
                className="lg:mx-2"
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Owner Name:</label>
              <input
                type="text"
                value={formdata.OnwerName}
                onChange={(e) =>
                  setFormData({ ...formdata, OnwerName: e.target.value })
                }
                name="OnwerName"
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Owner Address:</label>
              <input
                type="text"
                value={formdata.OwnerAddress}
                onChange={(e) =>
                  setFormData({ ...formdata, OwnerAddress: e.target.value })
                }
                name="OwnerAddress"
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Phone Number:</label>
              <input
                type="number"
                value={formdata.MobileNumber}
                onChange={(e) =>
                  setFormData({ ...formdata, MobileNumber: e.target.value })
                }
                name="MobileNumber"
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Email Address:</label>
              <input
                type="email"
                value={formdata.EmailAddress}
                onChange={(e) =>
                  setFormData({ ...formdata, EmailAddress: e.target.value })
                }
                name="EmailAddress"
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Car Name:</label>
              <input
                type="text"
                value={formdata.Name}
                onChange={(e) =>
                  setFormData({ ...formdata, Name: e.target.value })
                }
                name="Name"
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Car Color:</label>
              <input
                type="text"
                value={formdata.Color}
                onChange={(e) =>
                  setFormData({ ...formdata, Color: e.target.value })
                }
                name="Color"
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Car Reading:</label>
              <input
                type="number"
                value={formdata.Reading}
                onChange={(e) =>
                  setFormData({ ...formdata, Reading: e.target.value })
                }
                name="Reading"
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Car Year:</label>
              <input
                type="number"
                value={formdata.Year}
                onChange={(e) =>
                  setFormData({ ...formdata, Year: e.target.value })
                }
                name="Year"
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Car Agreement Period:</label>
              <input
                type="Date"
                value={formdata.AgreementPeriod}
                onChange={(e) =>
                  setFormData({ ...formdata, AgreementPeriod: e.target.value })
                }
                name="AgreementPeriod"
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Car Engine:</label>
              <input
                type="text"
                value={formdata.EngineNo}
                onChange={(e) =>
                  setFormData({ ...formdata, EngineNo: e.target.value })
                }
                name="EngineNo"
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Car Chassis:</label>
              <input
                type="text"
                value={formdata.ChassisNumber}
                onChange={(e) =>
                  setFormData({ ...formdata, ChassisNumber: e.target.value })
                }
                name="ChassisNumber"
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Price:</label>
              <input
                type="number"
                value={formdata.Price}
                onChange={(e) =>
                  setFormData({ ...formdata, Price: e.target.value })
                }
                name="Price"
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Gear:</label>
              <select
                type="text"
                value={formdata.Gear}
                onChange={(e) =>
                  setFormData({ ...formdata, Gear: e.target.value })
                }
                name="Gear"
                className={inputStyle}
                required
              > 
               <option></option>
              <option>Automatic</option>
              <option>Manual</option>
              </select>
             
            </div>

            <div className="flex flex-col items-start">
              <label>Fuel:</label>
              <select
                type="text"
                value={formdata.Fuel}
                onChange={(e) =>
                  setFormData({ ...formdata, Fuel: e.target.value })
                }
                name="Fuel"
                className={inputStyle}
                required
              ><option></option>
              <option>Diesel</option>
              <option>Petrol</option></select>
            </div>

            <div className="flex flex-col items-start">
              <label>Seating:</label>
              <select
                type="number"
                value={formdata.Seating}
                onChange={(e) =>
                  setFormData({ ...formdata, Seating: e.target.value })
                }
                name="Seating"
                className={inputStyle}
                required
              ><option></option>
              <option>5 Seater</option>
              <option>7 Seater</option></select>
            </div>

            <div className="flex flex-col items-start">
              <label>Insurance:</label>
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formdata, Insurance: e.target.files[0] })
                }
                name="Insurance"
                required
                className="lg:mx-2"
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Insurance Name:</label>
              <input
                type="text"
                value={formdata.InsuranceName}
                onChange={(e) =>
                  setFormData({ ...formdata, InsuranceName: e.target.value })
                }
                name="InsuranceName"
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Insurance Number:</label>
              <input
                type="text"
                value={formdata.InsuranceNo}
                onChange={(e) =>
                  setFormData({ ...formdata, InsuranceNo: e.target.value })
                }
                name="InsuranceNo"
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Expiry Date:</label>
              <input
                type="date"
                value={formdata.ExpiryDate}
                onChange={(e) =>
                  setFormData({ ...formdata, ExpiryDate: e.target.value })
                }
                name="ExpiryDate"
                className={inputStyle}
                required
              />
            </div>


            <div className="flex flex-col items-start">
              <label>Bank Account Number:</label>
              <input
                type="number"
                value={formdata.BankAccountNo}
                onChange={(e) =>
                  setFormData({ ...formdata, BankAccountNo: e.target.value })
                }
                name="BankAccountNo"
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Bank Name:</label>
              <input
                type="text"
                value={formdata.BankName}
                onChange={(e) =>
                  setFormData({ ...formdata, BankName: e.target.value })
                }
                name="BankName"
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Name on Bank:</label>
              <input
                type="text"
                value={formdata.NameonBank}
                onChange={(e) =>
                  setFormData({ ...formdata, NameonBank: e.target.value })
                }
                name="NameonBank"
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col items-start">
              <label>IFSC:</label>
              <input
                type="text"
                value={formdata.IFSC}
                onChange={(e) =>
                  setFormData({ ...formdata, IFSC: e.target.value })
                }
                name="IFSC"
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col items-start">
              <label>RC Front:</label>
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formdata, RcFront: e.target.files[0] })
                }
                name="RcFront"
                required
                className="lg:mx-2"
              />
            </div>

            <div className="flex flex-col items-start">
              <label>RC Back:</label>
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formdata, RcBack: e.target.files[0] })
                }
                name="RcBack"
                required
                className="lg:mx-2"
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Adhaar Front:</label>
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formdata, AdhaarFront: e.target.files[0] })
                }
                name="AdhaarFront"
                required
                className="lg:mx-2"
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Adhaar Back:</label>
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formdata, AdhaarBack: e.target.files[0] })
                }
                name="AdhaarBack"
                required
                className="lg:mx-2"
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Pollution:</label>
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formdata, Pollution: e.target.files[0] })
                }
                name="Pollution"
                required
                className="lg:mx-2"
              />
            </div>

            <div className="flex flex-col items-start">
              <label>Car Images:</label>
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formdata, Images: e.target.files[0] })
                }
                name="Images"
                required
                multiple
                className="lg:mx-2"
              />
            </div>

            

            <div className="flex flex-col items-start">
              <label>Agreement Document:</label>
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formdata, AgreementDoc: e.target.files[0] })
                }
                name="AgreementDoc"
                required
                className="lg:mx-2"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  return <div>No Data Found</div>;
};

export default Form;
