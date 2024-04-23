import React, { useContext } from "react";
import ResultGenerationContext from "../store/ResultGenerationContext";

const GenerateResultCsv = (props) => {
  const ctx = useContext(ResultGenerationContext);
  const dataHeaders = ctx.dataHeaders;
  const keyHEaders = ctx.keyHeaders;
  const mappedKey = ctx.paperMappedKey;
  const subjectWiseMarking = ctx.subjectMarkings;
  let subjectHeaders = [{}];
  let finalAnswers = [];

  console.log(subjectWiseMarking);
  const resultGenerator = () => {
    subjectHeaders = [];
    finalAnswers = [];
    // setKeyVisble(true);

    for (let i = 1; i < dataHeaders.length; i++) {
      //   let startpoint = mappedQue;
      let startpoint = +ctx.paperMarkings.start;
      let endPoint = +startpoint + +ctx.paperMarkings.end - 1;
      let CorrectAnswer = 0;
      let WrongAnswer = 0;
      let NotAttempted = 0;

      let correctPoint = ctx.paperMarkings.correctPoint;
      let wrongPoint = ctx.paperMarkings.wrongPoint;

      for (let j = 1; j < keyHEaders.length; j++) {
        if (dataHeaders[i][mappedKey] == keyHEaders[j][mappedKey]) {
          let currentIndex = 0;
          let AllOutPutHeaders = {};

          //   while (currentIndex < keyHEaders[0].length) {
          //     let currentHeaders = keyHEaders[0][currentIndex];
          //     AllOutPutHeaders = {
          //       ...AllOutPutHeaders,
          //       [currentHeaders]: dataHeaders[i][currentHeaders],
          //     };

          //     currentIndex++;
          //   }
          //   console.log(AllOutPutHeaders);
          if (subjectWiseMarking.length > 0) {
            let studentData = {};
            for (let k = 0; k < subjectWiseMarking.length; k++) {
              if (i == 1) {
                subjectHeaders.push(
                  `${subjectWiseMarking[k].subject}_notAttempted`,
                  `${subjectWiseMarking[k].subject}_Attempted`,
                  `${subjectWiseMarking[k].subject}_wrongAnswer`
                );
              }

              startpoint = +subjectWiseMarking[k].start;
              endPoint = +subjectWiseMarking[k].end;
              CorrectAnswer = 0;
              WrongAnswer = 0;
              NotAttempted = 0;
              console.log(startpoint, endPoint);

              while (startpoint <= endPoint) {
                console.log("object");
                let currentHeaders = keyHEaders[0][startpoint];

                if (dataHeaders[i][currentHeaders] == "") {
                  NotAttempted++;
                } else if (
                  keyHEaders[j][currentHeaders] ==
                  dataHeaders[i][currentHeaders]
                ) {
                  CorrectAnswer++;
                } else if (
                  keyHEaders[j][currentHeaders] !=
                  dataHeaders[i][currentHeaders]
                ) {
                  WrongAnswer++;
                }
                // console.log(dataHeaders[0], dataHeaders[i][currentHeaders]);
                startpoint++;
              }

              console.log(subjectHeaders);
              studentData = {
                ...studentData,
                [`${subjectWiseMarking[k].subject}_notAttempted`]: NotAttempted,
                [`${subjectWiseMarking[k].subject}_Attempted`]: CorrectAnswer,
                [`${subjectWiseMarking[k].subject}_wrongAnswer`]: WrongAnswer,
              };
            }
            finalAnswers.push(studentData);
          } else {
            while (startpoint <= endPoint) {
              let currentHeaders = keyHEaders[0][startpoint];
              if (dataHeaders[i][currentHeaders] == "") {
                NotAttempted++;
              } else if (
                keyHEaders[j][currentHeaders] == dataHeaders[i][currentHeaders]
              ) {
                CorrectAnswer++;
              } else if (
                keyHEaders[j][currentHeaders] != dataHeaders[i][currentHeaders]
              ) {
                WrongAnswer++;
              }
              //     console.log(dataHeaders[0], dataHeaders[i][currentHeaders]);
              startpoint++;
            }
            // return;
            finalAnswers.push({
              ...AllOutPutHeaders,
              ROLL_NO: dataHeaders[i].ROLL_NO,
              Paper_No: dataHeaders[i].Paper_No,
              notAttempted: NotAttempted,
              wrongAnswer: WrongAnswer,
              correctAnswer: CorrectAnswer,
              total_Score:
                CorrectAnswer * correctPoint - WrongAnswer * wrongPoint,
            });
            //   console.log(finalAnswers);
            break;
          }
          //   console.log(finalAnswers);
          //   break;

          //working code
        } else {
        }
      }
    }
    // return;
    const data = finalAnswers;

    const csvData = convertArrayOfObjectsToCSV(
      data,
      subjectWiseMarking.length > 0 ? subjectHeaders : props.headers
    );
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
  return (
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
  );
};

export default GenerateResultCsv;
