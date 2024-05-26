"use client";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import axios from "axios";

const Form = () => {
  const [formdata, setFormData] = useState({
    Coverimage: null,
    OwnerName: "",
    OwnerAddress: "",
    MobileNumber: "",
    EmailAddress: "",
    Year: "",
    Color: "",
    Reading: "",
    AgreementPeriod: "",
    EngineNo: "",
    ChassisNumber: "",
    Name: "",
    Price: "",
    Gear: "",
    Fuel: "",
    Seating: "",
    RcFront: null,
    RcBack: null,
    AdhaarFront: null,
    AdhaarBack: null,
    InsuranceName: "",
    InsuranceNo: "",
    ExpiryDate: "",
    BankAccountNo: "",
    BankName: "",
    NameonBank: "",
    IFSC: "",
    AgreementDoc: null,
    Pollution: null,
    Images: null,
    InsuranceDoc: null,
    Comment: "",
    AltNumber: "",
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://o57antkh6e.execute-api.us-east-1.amazonaws.com/cars"
        );
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setData(response.data);
      } catch (error) {
        console.error("Unable to fetch data from MongoDB", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    Object.keys(formdata).forEach((key) => {
      formDataToSend.append(key, formdata[key]);
    });

    try {
      const response = await axios.post(
        "https://o57antkh6e.execute-api.us-east-1.amazonaws.com/cars",
        formDataToSend
      );
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        window.location.reload();
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error("Not able to add data", error);
    }

    setFormData({
      Coverimage: null,
      OwnerName: "",
      OwnerAddress: "",
      MobileNumber: "",
      EmailAddress: "",
      Year: "",
      Color: "",
      Reading: "",
      AgreementPeriod: "",
      EngineNo: "",
      ChassisNumber: "",
      Name: "",
      Price: "",
      Gear: "",
      Fuel: "",
      Seating: "",
      RcFront: null,
      RcBack: null,
      AdhaarFront: null,
      AdhaarBack: null,
      InsuranceName: "",
      InsuranceNo: "",
      ExpiryDate: "",
      BankAccountNo: "",
      BankName: "",
      NameonBank: "",
      IFSC: "",
      AgreementDoc: null,
      Pollution: null,
      Images: null,
      InsuranceDoc: null,
      Comment: "",
      AltNumber: "",
    });
  };

  const formatPrice = (price) => {
    const numberPrice = Number(price);
    if (isNaN(numberPrice)) {
      return "";
    }
    return `₹${numberPrice.toLocaleString("en-IN")}`;
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    const formattedPrice = formatPrice(value.replace(/[^\d]/g, ""));
    setFormData({ ...formdata, Price: formattedPrice });
  };

  const inputStyle = "w-96 h-10 text-black p-2 mx-2 rounded-md";

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center py-10 text-white lg:text-lg text-sm">
        <div className="text-2xl text-center">
          Please Enter Details Of Your Car
        </div>

        {loading && <div className="text-center text-red-500">Uploading data, please wait...</div>}
        {success && <div className="text-center text-green-500">Data added successfully!</div>}

        <form className="space-y-6 my-10" onSubmit={handleSubmit}>
          <div className="flex flex-col items-start">
            <label htmlFor="coverimage">Cover Image:</label>
            <input
              id="coverimage"
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
            <label htmlFor="carname">Car Name:</label>
            <input
              id="carname"
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
            <label htmlFor="price">Price:</label>
            <input
              id="price"
              type="text"
              value={formdata.Price}
              onChange={handlePriceChange}
              name="Price"
              className={inputStyle}
              required
            />
          </div>

          <div className="flex flex-col items-start">
            <label htmlFor="carcolor">Car Color:</label>
            <input
              id="carcolor"
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
            <label htmlFor="carreading">Car Reading:</label>
            <input
              id="carreading"
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
            <label htmlFor="caryear">Car Year:</label>
            <input
              id="caryear"
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
            <label htmlFor="agreementperiod">Car Agreement Period:</label>
            <input
              id="agreementperiod"
              type="date"
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
            <label htmlFor="engineno">Engine Number:</label>
            <input
              id="engineno"
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
            <label htmlFor="chassisno">Chassis Number:</label>
            <input
              id="chassisno"
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
            <label htmlFor="gear">Gear Type:</label>
            <select
              id="gear"
              value={formdata.Gear}
              onChange={(e) =>
                setFormData({ ...formdata, Gear: e.target.value })
              }
              name="Gear"
              className={inputStyle}
              required
            >
              <option value=""></option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>

          <div className="flex flex-col items-start">
            <label htmlFor="fuel">Fuel Type:</label>
            <select
              id="fuel"
              value={formdata.Fuel}
              onChange={(e) =>
                setFormData({ ...formdata, Fuel: e.target.value })
              }
              name="Fuel"
              className={inputStyle}
              required
            >
              <option value=""></option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="flex flex-col items-start">
            <label htmlFor="seating">Seating Capacity:</label>
            <input
              id="seating"
              type="number"
              value={formdata.Seating}
              onChange={(e) =>
                setFormData({ ...formdata, Seating: e.target.value })
              }
              name="Seating"
              className={inputStyle}
              required
            />
          </div>

          <div className="flex flex-col items-start">
            <label htmlFor="rcfront">RC Front:</label>
            <input
              id="rcfront"
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
            <label htmlFor="rcback">RC Back:</label>
            <input
              id="rcback"
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
            <label htmlFor="adhaarfront">Adhaar Front:</label>
            <input
              id="adhaarfront"
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
            <label htmlFor="adhaarback">Adhaar Back:</label>
            <input
              id="adhaarback"
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
            <label htmlFor="insurancename">Insurance Name:</label>
            <input
              id="insurancename"
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
            <label htmlFor="insuranceno">Insurance Number:</label>
            <input
              id="insuranceno"
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
            <label htmlFor="expirydate">Insurance Expiry Date:</label>
            <input
              id="expirydate"
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
            <label htmlFor="bankaccountno">Bank Account Number:</label>
            <input
              id="bankaccountno"
              type="text"
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
            <label htmlFor="bankname">Bank Name:</label>
            <input
              id="bankname"
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
            <label htmlFor="nameonbank">Name on Bank Account:</label>
            <input
              id="nameonbank"
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
            <label htmlFor="ifsc">IFSC Code:</label>
            <input
              id="ifsc"
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
            <label htmlFor="agreementdoc">Agreement Document:</label>
            <input
              id="agreementdoc"
              type="file"
              onChange={(e) =>
                setFormData({ ...formdata, AgreementDoc: e.target.files[0] })
              }
              name="AgreementDoc"
              required
              className="lg:mx-2"
            />
          </div>

          <div className="flex flex-col items-start">
            <label htmlFor="pollution">Pollution Certificate:</label>
            <input
              id="pollution"
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
            <label htmlFor="images">Images:</label>
            <input
              id="images"
              type="file"
              multiple
              onChange={(e) =>
                setFormData({ ...formdata, Images: e.target.files })
              }
              name="Images"
              required
              className="lg:mx-2"
            />
          </div>

          <div className="flex flex-col items-start">
            <label htmlFor="insurancedoc">Insurance Document:</label>
            <input
              id="insurancedoc"
              type="file"
              onChange={(e) =>
                setFormData({ ...formdata, InsuranceDoc: e.target.files[0] })
              }
              name="InsuranceDoc"
              required
              className="lg:mx-2"
            />
          </div>

          <div className="flex flex-col items-start">
            <label htmlFor="comment">Additional Comments:</label>
            <textarea
              id="comment"
              value={formdata.Comment}
              onChange={(e) =>
                setFormData({ ...formdata, Comment: e.target.value })
              }
              name="Comment"
              className="w-96 h-32 text-black p-2 mx-2 rounded-md"
            />
          </div>

          <div className="flex flex-col items-start">
            <label htmlFor="altnumber">Alternate Mobile Number:</label>
            <input
              id="altnumber"
              type="text"
              value={formdata.AltNumber}
              onChange={(e) =>
                setFormData({ ...formdata, AltNumber: e.target.value })
              }
              name="AltNumber"
              className={inputStyle}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
