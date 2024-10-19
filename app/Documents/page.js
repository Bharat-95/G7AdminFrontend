"use client";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import axios from "axios";
import { SignedIn } from "@clerk/clerk-react";

const Page = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/documents/pending"
        );
        setData(response.data);

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const updateDocumentStatus = async (userId, status) => {
    try {
      await axios.put(
        "https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/documents/verify",
        {
          userId,
          status,
        }
      );

      setData((prevData) =>
        prevData.map((doc) =>
          doc.userId === userId ? { ...doc, status } : doc
        )
      );
    } catch (error) {
      console.error("Error updating document status:", error);
    }
  };

  const handleImageClick = (imageUrl) => {
    setCurrentImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentImage(null);
  };

  return (
    <SignedIn>
    <div className="flex">
   
      <Header />
 
  
      <div className="w-[100%] lg:m-40 bg-white border-[2px] p-4 border-rose-900 rounded-xl">
        <div className="text-rose-900  font-extrabold underline underline-offset-4 flex justify-center">
          VERIFY DOCUMENTS
        </div>

        {data.length === 0 ? (
          <div className="text-center  text-rose-900 font-semibold">
            No Documents Found to Verify
          </div>
        ) : (
          data.map((cxdocument, index) => (
            <div key={index} className="m-20 space-y-6 border p-10 rounded-lg">
              <div>Name: {cxdocument.name}</div>
              <div>Phone Number: {cxdocument.phoneNumber}</div>
              <div>Status: {cxdocument.status}</div>
              <h3>Driving License:</h3>
              <div className="document flex gap-10">
                {cxdocument.DrivingLicenseFrontUrl && (
                  <div className="border p-4 rounded-xl">
                    <h4>Front:</h4>
                    <img
                      src={`https://g7cars.s3.amazonaws.com/${cxdocument.DrivingLicenseFrontUrl}`}
                      alt="Driving License Front"
                      className="w-72 h-40 rounded-xl cursor-pointer"
                      onClick={() =>
                        handleImageClick(
                          `https://g7cars.s3.amazonaws.com/${cxdocument.DrivingLicenseFrontUrl}`
                        )
                      }
                    />
                  </div>
                )}
                {cxdocument.DrivingLicenseBackUrl && (
                  <div className="border p-4 rounded-xl">
                    <h4>Back:</h4>
                    <img
                      src={`https://g7cars.s3.amazonaws.com/${cxdocument.DrivingLicenseBackUrl}`}
                      alt="Driving License Back"
                      className="w-72 h-40 rounded-xl cursor-pointer"
                      onClick={() =>
                        handleImageClick(
                          `https://g7cars.s3.amazonaws.com/${cxdocument.DrivingLicenseBackUrl}`
                        )
                      }
                    />
                  </div>
                )}
              </div>

              <h3>Aadhaar:</h3>
              <div className="document flex gap-10">
                {cxdocument.AadhaarFrontUrl && (
                  <div className="border p-4 rounded-xl">
                    <h4>Front:</h4>
                    <img
                      src={`https://g7cars.s3.amazonaws.com/${cxdocument.AadhaarFrontUrl}`}
                      alt="Aadhaar Front"
                      className="w-72 h-40 rounded-xl cursor-pointer"
                      onClick={() =>
                        handleImageClick(
                          `https://g7cars.s3.amazonaws.com/${cxdocument.AadhaarFrontUrl}`
                        )
                      }
                    />
                  </div>
                )}
                {cxdocument.AadhaarBackUrl && (
                  <div className="border p-4 rounded-xl">
                    <h4>Back:</h4>
                    <img
                      src={`https://g7cars.s3.amazonaws.com/${cxdocument.AadhaarBackUrl}`}
                      alt="Aadhaar Back"
                      className="w-72 h-40 rounded-xl cursor-pointer"
                      onClick={() =>
                        handleImageClick(
                          `https://g7cars.s3.amazonaws.com/${cxdocument.AadhaarBackUrl}`
                        )
                      }
                    />
                  </div>
                )}
              </div>
              {cxdocument.status === "pending" && (
                <div className="flex justify-center gap-20">
                  <button
                    onClick={() =>
                      updateDocumentStatus(cxdocument.userId, "verified")
                    }
                    className="bg-rose-950 text-white p-2 rounded-xl"
                  >
                    Verify
                  </button>
                  <button
                    onClick={() =>
                      updateDocumentStatus(cxdocument.userId, "rejected")
                    }
                    className="bg-gray-500 text-white p-2 rounded-xl"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}

        {modalOpen && currentImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={closeModal}
          >
            <div className="bg-white p-4 rounded-lg">
              <img
                src={currentImage}
                alt="Document"
                className="max-w-full max-h-screen"
              />
            </div>
          </div>
        )}
      </div>
    </div>
    </SignedIn>
  );
};

export default Page;
