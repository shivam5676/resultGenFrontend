import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { FaArrowCircleRight } from "react-icons/fa";
import axios from "axios";
import { FaRegCircleCheck } from "react-icons/fa6";
import { ImFolderUpload } from "react-icons/im";
const Homepage = () => {
  const [finalAnswers, setFinalAnswers] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const [mappedKey, setMappedKEy] = useState(null);
  const [keyHEaders, setKeyHeaders] = useState(null);
  const [dataHeaders, setDataHeaders] = useState(null);
  const [selectedOpen, setSelectedOpen] = useState(false);
  const [keyVisible, setKeyVisble] = useState(false);
  const keyfileUploader = (e) => {
    const formData = new FormData();
    formData.append("keyFile", e.target.files[0]);
    console.log(e.target.files[0]);
    axios
      .post("http://localhost:2000/upload/key", formData)
      .then((res) => {
        setKeyHeaders(res.data.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const csvfileUploader = (e) => {
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("dataFile", e.target.files[0]);
    axios
      .post("http://localhost:2000/upload/data", formData)
      .then((res) => {
        setDataHeaders(res.data.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const selectedOptionOpen = () => {
    setSelectedOpen(true);
  };
  const selectedOptionClose = () => {
    setSelectedOpen(false);
  };
  const resultGenerator = () => {
    setKeyVisble(true);

    for (let i = 1; i < dataHeaders.length; i++) {
      let startpoint = 1;
      let endPoint = 100;
      let CorrectAnswer = 0;
      let WrongAnswer = 0;
      let NotAttempted = 0;

      let correctPoint = 2;
      let wrongPoint = 1;
      for (let j = 1; j < keyHEaders.length; j++) {
        if (dataHeaders[i].Paper_No == "12") {
          while (startpoint <= endPoint) {
            if (dataHeaders[i][`Q${startpoint}`].toUpperCase() == "") {
              NotAttempted++;
            } else if (
              keyHEaders[j][`Q${startpoint}`].toUpperCase() ==
              dataHeaders[i][`Q${startpoint}`].toUpperCase()
            ) {
              CorrectAnswer++;
            } else {
              WrongAnswer++;
            }
            startpoint++;
          }
          console.log(CorrectAnswer * correctPoint - WrongAnswer * wrongPoint);
          setFinalAnswers((prev) => {
            return [
              ...prev,
              {
                notAttempted: NotAttempted,
                wrongAnswer: WrongAnswer,
                correctAnswer: CorrectAnswer,
                total_Score:
                  CorrectAnswer * correctPoint - WrongAnswer * wrongPoint,
              },
            ];
          });

          break;
        } else {
          // console.log("object");
          break;
        }
      }
    }
    const headers = [
      "notAttempted",
      "wrongAnswer",
      "correctAnswer",
      "total_Score",
    ];
    console.log(finalAnswers);
    const data = finalAnswers;
    // const data = [
    //   { notAttempted: 23, wrongAnswer: 60, correctAnswer: 17 },

    //   { notAttempted: 5, wrongAnswer: 75, correctAnswer: 20 },

    //   { notAttempted: 34, wrongAnswer: 49, correctAnswer: 17 },

    //   { notAttempted: 0, wrongAnswer: 74, correctAnswer: 26 },

    //   { notAttempted: 0, wrongAnswer: 70, correctAnswer: 30 },

    //   { notAttempted: 5, wrongAnswer: 63, correctAnswer: 32 },
    // ];
    const csvData = convertArrayOfObjectsToCSV(data, headers);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const convertArrayOfObjectsToCSV = (data, headers) => {
    const headerLine = headers.join(",");
    const csv = data.map((item) => {
      return headers
        .map((header) => {
          return item[header];
        })
        .join(",");
    });
    return [headerLine, ...csv].join("\n");

    // axios
    //   .post("http://localhost:2000/generate/csv", { finalAnswers, headers })
    //   .then((res) => {
    //     // setDataHeaders(res.data.data);
    //     console.log(res.data);
    //     let data = res.data;
    //     const lines = data.trim().split("\n");
    //     // Extract the column headers
    //     const headers = lines.shift().split(",");
    //     // Parse each line and create an array of objects representing each row
    //     const csvData = lines.map((line) => {
    //       const values = line.split(",");
    //       return headers.reduce((obj, header, index) => {
    //         obj[header] = values[index];
    //         return obj;
    //       }, {});
    //     });
    //     // Convert the array of objects into a CSV string
    //     const csvContent = csvData
    //       .map((row) => Object.values(row).join(","))
    //       .join("\n");
    //     // Create a Blob object with the CSV content
    //     const blob = new Blob([csvContent], { type: "text/csv" });
    //     // Create a temporary URL for the Blob object
    //     const url = window.URL.createObjectURL(blob);
    //     // Create a temporary link element to trigger the download
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.download = "data.csv";
    //     // Trigger the download
    //     document.body.appendChild(link);
    //     link.click();
    //     // Cleanup
    //     document.body.removeChild(link);
    //     window.URL.revokeObjectURL(url);
    //   })
    //   .catch((err) => console.log(err));
  };
  console.log(finalAnswers);
  return (
    <div className="h-screen flex  mt-[70px]">
      {/* <div className=" flex flex-col items-center justify-center h-screen">
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
        <div
          className="bg-white mt-10 w-[400px] rounded-lg py-4"
          onChange={keyfileUploader}
        >
          <label
            htmlFor="dataFile2"
            className="block cursor-pointer"
            // onChange={keyfileUploader}
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
        <div className="flex w-[400px] bg-white mt-5 rounded-lg p-2 items-center">
          <div className="font-bold">Select Key value</div>{" "}
          <div
            className="border w-[60%] ms-2 flex flex-col items-center"
            onClick={selectedOptionOpen}
          >
            {!mappedKey ? (
              <div>click here to select</div>
            ) : (
              <div>{mappedKey}</div>
            )}
            {selectedOpen && (
              <div className="w-[200px] h-[100px] overflow-y-scroll">
                {keyHEaders[0].map((currentKey) => (
                  <div
                    className="h-[50px]"
                    key={currentKey}
                    onClick={(event) => {
                      event.stopPropagation();
                      setMappedKEy(currentKey);
                      setSelectedOpen(false); // Close the dropdown after selecting the key
                      console.log("selected key:", currentKey);
                    }}
                  >
                    {currentKey}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex  justify-center w-[400px] ">
          <div className=" flex bg-white mt-5 rounded-lg p-3 font-bold">
            <div className="flex items-center " onClick={resultGenerator}>
              generate
            </div>
            <div className="flex items-center mx-2">
              <FaArrowCircleRight className="w-[30px] h-[30px]" />
            </div>{" "}
          </div>
        </div>
      </div> */}
      <div className="h-[100%] border-2 flex flex-col w-[20vw] min-w-[300px]">
        <div className="m-2  ">
          <div className="bg-white w-[100%] h-[150px] flex items-center  rounded-lg">
            <div className="my-2">
              <FaRegCircleCheck className="w-[80px] h-[80px] mx-2" />
            </div>
            <p className="my-2 h-[100%] flex items-center overflow-y-hidden p-2 font-bolder">
              lorem lorem ipsumloremipsum
            </p>
          </div>
        </div>
        <div className="m-2  ">
          <div className="bg-white w-[100%] h-[150px] flex items-center  rounded-lg">
            <div className="my-2">
              <FaRegCircleCheck className="w-[80px] h-[80px] mx-2" />
            </div>
            <p className="my-2 h-[100%] flex items-center overflow-y-hidden p-2 font-bolder">
              lorem lorem ipsumloremipsum
            </p>
          </div>
        </div>
        {/* {!keyVisible && (
          <div className="w-[100%] flex justify-center">
            <div className=" flex bg-white mt-5 rounded-lg p-3 font-bold">
              <div className="flex items-center " onClick={resultGenerator}>
                generate
              </div>
              <div className="flex items-center mx-2">
                <FaArrowCircleRight className="w-[30px] h-[30px]" />
              </div>{" "}
            </div>
          </div>
        )} */}

        {keyHEaders && dataHeaders && (
          <div className=" m-2 mt-5   ">
            <div className=" w-[100%]   ">
              {" "}
              <div className="bg-white w-[100%] rounded-lg flex flex-col items-center py-4">
                <div className="font-bold">Select Key value</div>{" "}
                <div
                  className="border w-[80%] ms-2 flex flex-col items-center"
                  onClick={selectedOptionOpen}
                >
                  {!mappedKey ? (
                    <div>click here to select</div>
                  ) : (
                    <div>{mappedKey}</div>
                  )}
                  {selectedOpen && (
                    <div className="w-[200px] h-[100px] overflow-y-scroll">
                      {keyHEaders[0].map((currentKey) => (
                        <div
                          className="h-[50px]"
                          key={currentKey}
                          onClick={(event) => {
                            event.stopPropagation();
                            setMappedKEy(currentKey);
                            setSelectedOpen(false); // Close the dropdown after selecting the key
                            console.log("selected key:", currentKey);
                          }}
                        >
                          {currentKey}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {keyHEaders && dataHeaders && (
          <>
            <div className=" m-2 mt-5   ">
              <div
                className=" w-[100%]   "
                onClick={() => {
                  setSelectedOpen(!selectedOpen);
                }}
              >
                <div className="bg-white w-[100%] rounded-lg flex flex-col items-center py-4">
                  <div>start Question :</div>
                  <div
                    className="border w-[80%] ms-2 flex flex-col items-center"
                    onClick={selectedOptionOpen}
                  >
                    {!mappedKey ? (
                      <div>click here to select</div>
                    ) : (
                      <div>{mappedKey}</div>
                    )}
                    {selectedOpen && (
                      <div className="w-[200px] h-[100px] overflow-y-scroll">
                        {keyHEaders[0].map((currentKey) => (
                          <div
                            className="h-[50px]"
                            key={currentKey}
                            onClick={(event) => {
                              event.stopPropagation();
                              setMappedKEy(currentKey);
                              setSelectedOpen(false); // Close the dropdown after selecting the key
                              console.log("selected key:", currentKey);
                            }}
                          >
                            {currentKey}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className=" m-2 mt-5   ">
              <div
                className=" w-[100%]   "
                onClick={() => {
                  setSelectedOpen(false);
                }}
              >
                <div className="bg-white w-[100%] rounded-lg flex flex-col items-center py-4">
                  <div>total question in paper :</div>
                  <input></input>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="h-[100%] w-[100%] flex max-[1020px]:flex-col">
        <div className="h-[100%] border-2 flex w-[100%]">
          {!keyHEaders && (
            <div className=" flex flex-col items-center justify-center h-[100%] w-[100%]">
              {!dataHeaders && (
                <div
                  className="bg-white w-[400px] rounded-lg py-4 "
                  onChange={csvfileUploader}
                >
                  <label
                    htmlFor="dataFile1"
                    className="block cursor-pointer mx-4 p-10 border-dashed border-blue-500 border-4"
                  >
                    <input type="file" id="dataFile1" className="hidden" />
                    <div className="flex flex-col justify-center items-center text-3xl">
                      <ImFolderUpload className="w-[80px] h-[80px]" />{" "}
                      <p className="flex items-center mx-2 font-semibold">
                        upload data file
                      </p>{" "}
                    </div>
                  </label>
                </div>
              )}
              {dataHeaders && !keyHEaders && (
                <div
                  className="bg-white w-[400px] rounded-lg py-4 "
                  onChange={keyfileUploader}
                >
                  <label
                    htmlFor="dataFile2"
                    className="block cursor-pointer mx-4 p-10 border-dashed border-blue-500 border-4"
                  >
                    <input type="file" id="dataFile2" className="hidden" />
                    <div className="flex flex-col justify-center items-center text-3xl">
                      <ImFolderUpload className="w-[80px] h-[80px]" />{" "}
                      <p className="flex items-center mx-2 font-semibold">
                        upload key file
                      </p>{" "}
                    </div>
                  </label>
                </div>
              )}
              {/* <div
              className="bg-white mt-10 w-[400px] rounded-lg py-4"
              onChange={keyfileUploader}
            >
              <label
                htmlFor="dataFile2"
                className="block cursor-pointer"
                // onChange={keyfileUploader}
              >
                <input type="file" id="dataFile2" className="hidden" />
                <div className="flex justify-center text-3xl">
                  <p className="flex items-center mx-2 font-semibold">
                    upload key file
                  </p>{" "}
                  <MdCloudUpload className="w-[80px] h-[80px]" />
                </div>
              </label>
            </div> */}
              {/* <div className="flex w-[400px] bg-white mt-5 rounded-lg p-2 items-center">
              <div className="font-bold">Select Key value</div>{" "}
              <div
                className="border w-[60%] ms-2 flex flex-col items-center"
                onClick={selectedOptionOpen}
              >
                {!mappedKey ? (
                  <div>click here to select</div>
                ) : (
                  <div>{mappedKey}</div>
                )}
                {selectedOpen && (
                  <div className="w-[200px] h-[100px] overflow-y-scroll">
                    {keyHEaders[0].map((currentKey) => (
                      <div
                        className="h-[50px]"
                        key={currentKey}
                        onClick={(event) => {
                          event.stopPropagation();
                          setMappedKEy(currentKey);
                          setSelectedOpen(false); // Close the dropdown after selecting the key
                          console.log("selected key:", currentKey);
                        }}
                      >
                        {currentKey}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div> */}

              {/*<div className="flex  justify-center w-[400px] ">
               <div className=" flex bg-white mt-5 rounded-lg p-3 font-bold">
                <div className="flex items-center " onClick={resultGenerator}>
                  generate
                </div>
                <div className="flex items-center mx-2">
                  <FaArrowCircleRight className="w-[30px] h-[30px]" />
                </div>{" "}
              </div> 
            </div>*/}
            </div>
          )}

          {dataHeaders && keyHEaders && (
            <div className="m-2 w-[100%] flex justify-center">
              <div className="w-[100%] max-w-[600px] h-fit bg-white pb-8 rounded-lg">
                <div className="flex justify-center">
                  <p className="font-bold pt-8 pb-2 text-2xl border-b-2 border-grey-500">
                    Marks to Apply
                  </p>
                </div>
                <div className="flex justify-around mt-2">
                  <div>
                    <div className="font-bold">correct answer</div>
                    <div className="flex justify-center">
                      <div
                        contentEditable
                        className="border-2 w-[60px] text-center"
                      >
                        1
                      </div>
                    </div>

                    {/* <input className="border-2 w-[40px]"></input> */}
                  </div>
                  <div>
                    <div className="font-bold">wrong answer</div>
                    <div className="flex justify-center">
                      <div
                        contentEditable
                        className="border-2 w-[60px] text-center"
                      >
                        1
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {dataHeaders && keyHEaders && (
          <div className="h-[100%] border-2 flex w-[20vw] min-w-[300px] max-[1020px]:w-[100%]">
            <div className="mx-2 w-[100%]">
              <div className=" w-[100%] flex justify-center text-2xl border-2 border-black my-4">
                Result OutPut Headers
              </div>
              <div className="h-[50vh] bg-white border-2 overflow-y-scroll">
                {dataHeaders &&
                  dataHeaders[0].map((current) => {
                    return (
                      <div className=" mx-8 my-4  hover:bg-yellow-500">
                        <input
                          type="checkbox"
                          id={current}
                          name={current}
                          className="mx-2 h-[20px] w-[20px]"
                        />
                        <label
                          for="scales"
                          className="mx-4 text-[20px] font-bold"
                        >
                          {current}
                        </label>
                        <hr className="mt-2"></hr>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
