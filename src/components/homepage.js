import React, { useRef, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { FaArrowCircleRight } from "react-icons/fa";
import axios from "axios";
import { FaRegCircleCheck } from "react-icons/fa6";
import { ImFolderUpload } from "react-icons/im";
const Homepage = () => {
  let finalAnswers = [];
  const [csvFile, setCsvFile] = useState(null);
  const [mappedKey, setMappedKEy] = useState(null);
  const [mappedQue, setMappedQue] = useState(null);
  const [keyHEaders, setKeyHeaders] = useState(null);
  const [dataHeaders, setDataHeaders] = useState(null);
  const [selectedKeyOpen, setSelectedKeyOpen] = useState(false);
  const [selectedQueOpen, setSelectedQueOpen] = useState(false);
  const [keyVisible, setKeyVisble] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const startQue = useRef(1);
  const totalQue = useRef(100);
  const correctAnswerPoint = useRef(1);
  const wrongAnswerPoint = useRef(0);
  console.log(correctAnswerPoint.current.value);
  let headers = ["notAttempted", "wrongAnswer", "correctAnswer", "total_Score"];
  const handleCorrectPoints = (event) => {
    console.log(correctAnswerPoint.current.value);
  };
  const handleWrongPoints = () => {};
  const outPutHeadersHandler = (data) => {
    headers.push(data);
    console.log(headers);
  };
  const keyfileUploader = (e) => {
    const formData = new FormData();
    formData.append("keyFile", e.target.files[0]);
    console.log(e.target.files[0]);
    axios
      .post("http://localhost:2000/upload/key", formData)
      .then((res) => {
        setUploadFiles((prev) => {
          return [...prev, e.target.files[0].name];
        });
        setKeyHeaders(res.data.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const csvfileUploader = (e) => {
    console.log(e.target.files[0].name);
    const formData = new FormData();
    formData.append("dataFile", e.target.files[0]);
    axios
      .post("http://localhost:2000/upload/data", formData)
      .then((res) => {
        setUploadFiles((prev) => {
          return [...prev, e.target.files[0].name];
        });
        setDataHeaders(res.data.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const selectedKEyOptionOpen = () => {
    setSelectedKeyOpen(true);
  };
  const selectedOptionClose = () => {
    setSelectedKeyOpen(false);
  };
  const selectedQueOptionOpen = () => {
    setSelectedQueOpen(true);
  };
  const resultGenerator = () => {
    finalAnswers = [];
    setKeyVisble(true);
    console.log(startQue.current);
    for (let i = 1; i < dataHeaders.length; i++) {
      let startpoint = startQue.current;
      let endPoint = totalQue.current;
      let CorrectAnswer = 0;
      let WrongAnswer = 0;
      let NotAttempted = 0;

      let correctPoint = correctAnswerPoint.current.value;
      let wrongPoint = wrongAnswerPoint.current.value;

      console.log(correctPoint, wrongPoint, startpoint, endPoint);
      for (let j = 1; j < keyHEaders.length; j++) {
        console.log(dataHeaders[i].Paper_No, keyHEaders[j].Paper_No);
     
        if (dataHeaders[i].Paper_No == keyHEaders[j].Paper_No) {
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
          console.log(
            +CorrectAnswer * +correctPoint - +WrongAnswer * +wrongPoint
          );
          finalAnswers.push({
            notAttempted: NotAttempted,
            wrongAnswer: WrongAnswer,
            correctAnswer: CorrectAnswer,
            total_Score:
              CorrectAnswer * correctPoint - WrongAnswer * wrongPoint,
          });
          // setFinalAnswers((prev) => {
          //   return [
          //     ...prev,
          //     {
          //       notAttempted: NotAttempted,
          //       wrongAnswer: WrongAnswer,
          //       correctAnswer: CorrectAnswer,
          //       total_Score:
          //         CorrectAnswer * correctPoint - WrongAnswer * wrongPoint,
          //     },
          //   ];
          // });

          break;
        } else {
          // console.log("object");
          
        }
      }
    }

    console.log(finalAnswers);
    const data = finalAnswers;

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
  };
  console.log(finalAnswers);
  return (
    <div className="h-[100vh] flex  pt-[70px] overflow-y-hidden">
      {uploadFiles.length > 0 && (
        <div className="h-[100%] border-2 flex flex-col w-[20vw] min-w-[300px] overflow-y-scroll">
          {uploadFiles.map((current) => (
            <div
              className="m-2 animate__animated animate__backInDown"
              key={current}
            >
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-[100%] h-[150px] flex items-center  rounded-lg text-white font-bold text-[1.5rem] shadow-2xl shadow-grey-500">
                <div className="my-2">
                  <FaRegCircleCheck className="w-[80px] h-[80px] mx-2" />
                </div>
                <p className="my-2 h-[100%] flex items-center overflow-y-hidden p-2 font-bolder">
                  {current}
                </p>
              </div>
            </div>
          ))}

          {keyHEaders && dataHeaders && (
            <div className=" m-2 mt-5   ">
              <div className=" w-[100%]  animate__animated animate__backInDown animate__slow">
                {" "}
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 w-[100%] rounded-lg flex flex-col items-center py-4"
                  onClick={(event) => {
                    event.stopPropagation();
                    selectedKEyOptionOpen(false);
                  }}
                >
                  <div className="text-[1.2rem] font-bold">
                    Select Key value
                  </div>
                  <div
                    className="border w-[80%] ms-2 flex flex-col items-center"
                    // onClick={selectedKEyOptionOpen}
                  >
                    {!mappedKey ? (
                      <div className="font-semibold ">click here to select</div>
                    ) : (
                      <div className="font-semibold">{mappedKey}</div>
                    )}
                    {selectedKeyOpen && (
                      <div className="w-[200px] h-[100px] overflow-y-scroll">
                        {keyHEaders[0].map((currentKey) => (
                          <div
                            className="h-[50px]"
                            key={currentKey}
                            onClick={(event) => {
                              event.stopPropagation();
                              setMappedKEy(currentKey);
                              setSelectedKeyOpen(false); // Close the dropdown after selecting the key
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
              <div className=" m-2 mt-5  animate__animated animate__backInDown animate__slower ">
                <div
                  className=" w-[100%]   "
                  onClick={() => {
                    setSelectedQueOpen(false);
                  }}
                >
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-[100%] rounded-lg flex flex-col items-center py-4">
                    <div className="text-[1.2rem] font-bold">
                      start Question :
                    </div>
                    <div
                      className="border w-[80%] ms-2 flex flex-col items-center"
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedQueOpen(!selectedQueOpen); // open the dropdown after selecting the Question key
                      }}
                    >
                      {!mappedQue ? (
                        <div
                          className="font-semibold py-1"
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedQueOpen(true); // open the dropdown after selecting the Question key
                          }}
                        >
                          click here to select
                        </div>
                      ) : (
                        <div
                          className="font-semibold "
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedQueOpen(true); // open the dropdown after selecting the Question key
                          }}
                        >
                          {mappedQue}
                        </div>
                      )}
                      {selectedQueOpen && (
                        <div className="w-[200px] h-[100px] overflow-y-scroll">
                          {keyHEaders[0].map((currentKey) => (
                            <div
                              className="h-[50px]"
                              key={currentKey}
                              onClick={(event) => {
                                event.stopPropagation();
                                setMappedQue(currentKey);
                                setSelectedQueOpen(false); // Close the dropdown after selecting the key
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
              <div className=" m-2 mt-5  animate__animated animate__backInDown animate__slower ">
                <div
                  className=" w-[100%]   "
                  onClick={() => {
                    // setSelectedOpen(false);
                  }}
                >
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-[100%] rounded-lg flex flex-col items-center py-4">
                    <div className="text-[1.2rem] font-bold">
                      total question in paper :
                    </div>
                    <input></input>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      <div className="h-[100vh] w-[100%] flex max-[1020px]:flex-col overflow-y-scroll">
        <div className="h-[100%] border-2 flex w-[100%]">
          {!keyHEaders && (
            <div className=" flex flex-col items-center justify-center h-[100%] w-[100%]">
              {!dataHeaders && (
                <div
                  className="animate__animated animate__bounceInLeft bg-gradient-to-r from-green-400 to-blue-300 hover:from-pink-400 hover:to-yellow-600 w-[500px] rounded-lg py-4 font-semibold hover:font-bold shadow-2xl shadow-black"
                  onChange={csvfileUploader}
                >
                  <label
                    htmlFor="dataFile1"
                    className="block cursor-pointer mx-4 p-16 border-dashed border-white-500 border-4 hover:border-8"
                  >
                    <input type="file" id="dataFile1" className="hidden" />
                    <div className="flex flex-col justify-center items-center text-3xl">
                      <ImFolderUpload className="w-[80px] h-[80px] text-white" />{" "}
                      <p className="flex items-center mx-2  text-white ">
                        upload data file
                      </p>{" "}
                    </div>
                  </label>
                </div>
              )}
              {dataHeaders && !keyHEaders && (
                <div
                  className="animate__animated animate__bounceInRight animate__slow bg-gradient-to-r from-green-400 to-blue-300 hover:from-pink-400 hover:to-yellow-600 w-[500px] rounded-lg py-4 font-semibold hover:font-bold shadow-2xl shadow-black"
                  onChange={keyfileUploader}
                >
                  <label
                    htmlFor="dataFile2"
                    className="block cursor-pointer mx-4 p-16 border-dashed border-white-500 border-4 hover:border-8"
                  >
                    <input type="file" id="dataFile2" className="hidden" />
                    <div className="flex flex-col justify-center items-center text-3xl text-white">
                      <ImFolderUpload className="w-[80px] h-[80px]" />{" "}
                      <p className="flex items-center mx-2 ">upload key file</p>{" "}
                    </div>
                  </label>
                </div>
              )}
            </div>
          )}

          {dataHeaders && keyHEaders && (
            <div className="m-2 w-[100%] flex justify-center">
              <div className="animate__animated animate__zoomInDown animate__delay-2s w-[100%] max-w-[600px] h-fit bg-gradient-to-r from-red-600 to-yellow-500 pb-8 rounded-lg">
                <div className="flex justify-center">
                  <p className="font-bold pt-8 pb-2 text-2xl border-b-2 border-grey-500 text-white">
                    Marks to Apply
                  </p>
                </div>
                <div className="flex justify-around mt-2">
                  <div>
                    <div className="font-bold py-2 text-[1.1rem]">
                      correct answer
                    </div>
                    <div className="flex justify-center">
                      <input
                        className="w-[60px] text-center bg-transparent border-2 text-white focus:bg-white focus:text-black outline-0 font-bold"
                        ref={correctAnswerPoint}
                        type="number"
                        onChange={handleCorrectPoints}
                        defaultValue={correctAnswerPoint.current.value}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold py-2 text-[1.1rem]">
                      wrong answer
                    </div>
                    <div className="flex justify-center">
                      <input
                        className="w-[60px] text-center bg-transparent border-2 text-white focus:bg-white focus:text-black outline-0 font-bold"
                        ref={wrongAnswerPoint}
                        type="number"
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {dataHeaders && keyHEaders && (
          <div className="h-[100%] border-2 flex w-[20vw] min-w-[300px] max-[1020px]:w-[100%] mb-[70px]">
            <div className="mx-2 w-[100%]">
              <div className="animate__animated animate__bounceInDown animate__delay-3s">
                {" "}
                <div className=" w-[100%] bg-gradient-to-r from-red-600 to-yellow-500 shadow-2xl flex justify-center text-2xl font-bold border-4 border-2 border-white my-4">
                  <p className="bg-grey py-4 text-white "> OutPut Headers</p>
                </div>
                <div className="max-h-[50vh] min-h-[30vh] bg-gradient-to-r from-cyan-500 to-blue-500 border-2 overflow-y-scroll pb-[70px]">
                  {dataHeaders &&
                    dataHeaders[0].map((current) => {
                      return (
                        <div className="    hover:bg-yellow-500">
                          <input
                            type="checkbox"
                            id={current}
                            name={current}
                            onClick={() => outPutHeadersHandler(current)}
                            className="mx-2 h-[20px] w-[20px] my-2"
                          />
                          <label
                            for="scales"
                            className="mx-4 text-[1.1rem] font-bold text-white"
                          >
                            {current}
                          </label>
                          <hr className="mt-2"></hr>
                        </div>
                      );
                    })}
                </div>{" "}
              </div>
              <div className="text-center mt-2 flex flex-row min-[1020px]:flex-col  justify-center">
                <div className="text-center mt-2 ">
                  <a
                    class="animate__animated animate__bounceInLeft animate__delay-4s group inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75 mx-4"
                    href="#"
                    onClick={resultGenerator}
                  >
                    <span class="block rounded-full bg-white px-8 py-3 text-sm font-bold group-hover:bg-transparent hover:text-white text-black">
                      Generate Result
                    </span>
                  </a>
                </div>
                <div className="text-center mt-2 ">
                  <a
                    class="animate__animated animate__bounceInLeft animate__delay-5s group inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75 mx-4"
                    href="#"
                  >
                    <span class="block rounded-full bg-white px-8 py-3 text-sm font-bold group-hover:bg-transparent hover:text-white text-black">
                      cancel
                    </span>
                  </a>
                </div>
              </div>

              <div className="h-[100px]"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
