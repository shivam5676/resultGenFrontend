import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { FaArrowCircleRight } from "react-icons/fa";
import axios from "axios";
const Homepage = () => {
  const [finalAnswers, setFinalAnswers] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const [mappedKey, setMappedKEy] = useState(null);
  const [keyHEaders, setKeyHeaders] = useState();
  const [dataHeaders, setDataHeaders] = useState(null);
  const [selectedOpen, setSelectedOpen] = useState(false);
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
    console.log(dataHeaders[0]);

    for (let i = 1; i < dataHeaders.length; i++) {
      let startpoint = 1;
      let endPoint = 100;
      let CorrectAnswer = 0;
      let WrongAnswer = 0;
      let NotAttempted = 0;
      for (let j = 1; j < keyHEaders.length; j++) {
        // console.log(dataHeaders[i].Paper_No, keyHEaders[j].Paper_No);
        if (dataHeaders[i].Paper_No == "12") {
          while (startpoint <= endPoint) {
            // console.log(
            //   keyHEaders[j][`Q${startpoint}`].toUpperCase() ==
            //     dataHeaders[i][`Q${startpoint}`].toUpperCase()
            // );
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
          // console.log(notAttempted, wrongAnswer, correctAnswer);
          setFinalAnswers((prev) => {
            return [
              ...prev,
              {
                notAttempted: NotAttempted,
                wrongAnswer: WrongAnswer,
                correctAnswer: CorrectAnswer,
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
      'notAttempted','wrongAnswer','correctAnswer'
      // { id: "notAttempted", title: "NotAttempted" },
      // { id: "wrongAnswer", title: "WrongAnswer" },
      // { id: "correctAnswer", title: "CorrectAnswer" },
    ];
    console.log(finalAnswers);
    const data=finalAnswers;
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
    <div className="h-screen   bg-orange-400">
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
      </div>
    </div>
  );
};

export default Homepage;
