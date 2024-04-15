import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { FaArrowCircleRight } from "react-icons/fa";
import axios from "axios";
const Homepage = () => {
  const [csvFile, setCsvFile] = useState(null);
  const keyfileUploader = (e) => {
    const formData = new FormData();
  formData.append("keyFile", e.target.files[0]);
    console.log(e.target.files[0]);
    axios
      .post("http://localhost:2000/upload",formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const csvfileUploader = (e) => {
    console.log(e.target.files[0]);
  };
  return (
    <div className="h-screen   bg-orange-500">
      <div className=" flex flex-col items-center justify-center h-screen">
        <div
          className="bg-white w-[400px] rounded-lg py-4"
          onChange={csvfileUploader}
        >
          <label htmlFor="dataFile1" className="block cursor-pointer">
            <input type="file" id="dataFile1" className="hidden" />
            <div className="flex justify-center text-3xl">
              <p className="flex items-center mx-2 font-semibold">
                upload data file
              </p>{" "}
              <MdCloudUpload className="w-[80px] h-[80px]" />
            </div>
          </label>
        </div>
        <div className="bg-white mt-10 w-[400px] rounded-lg py-4">
          <label
            htmlFor="dataFile2"
            className="block cursor-pointer"
            onChange={keyfileUploader}
          >
            <input type="file" id="dataFile2" className="hidden" />
            <div className="flex justify-center text-3xl">
              <p className="flex items-center mx-2 font-semibold">
                upload key file
              </p>{" "}
              <MdCloudUpload className="w-[80px] h-[80px]" />
            </div>
          </label>
        </div>
        <div className="flex w-[400px] bg-white mt-5 rounded-lg p-2">
          <div className="font-bold">Select Key value</div>{" "}
          <div className="border w-[60%] ms-2 flex justify-center">
            click here to select
          </div>
        </div>
        <div className="flex  justify-center w-[400px] ">
          <div className=" flex bg-white mt-5 rounded-lg p-3 font-bold">
            <div className="flex items-center ">start</div>
            <div className="flex items-center mx-2">
              <FaArrowCircleRight className="w-[30px] h-[30px]" />
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
