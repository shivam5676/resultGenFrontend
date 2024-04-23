import React, { useContext, useState } from "react";
import ResultGenerationContext from "../store/ResultGenerationContext";

const OutPutHeaders = () => {
    
    const ctx=useContext(ResultGenerationContext)
    const dataHeaders=ctx.dataHeaders;
    let headers = ["notAttempted", "wrongAnswer", "correctAnswer", "total_Score"];
    const outPutHeadersHandler = (data) => {
        headers.push(data);
        // console.log(headers);
      };
  return (
    //  {/* outputheaders */}
    <div className="animate__animated animate__bounceInDown animate__delay-3s">
      {" "}
      <div className=" w-[100%] bg-gradient-to-r from-red-600 to-yellow-500 shadow-2xl flex justify-center text-2xl font-bold border-4 border-2 border-white my-4">
        <p className="bg-grey py-4 text-white "> OutPut Headers</p>
      </div>
      <div className="max-h-[50vh] min-h-[30vh] bg-gradient-to-r from-cyan-500 to-blue-500 border-2 overflow-y-scroll pb-[70px]">
        {dataHeaders &&
          dataHeaders[0].map((current,index) => {
            return (
              <div className="    hover:bg-yellow-500" key={index}>
                <input
                  type="checkbox"
                  id={current}
                  name={current}
                  onClick={() => outPutHeadersHandler(current)}
                  className="mx-2 h-[20px] w-[20px] my-2"
                />
                <label
                  htmlFor="scales"
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
  );
};

export default OutPutHeaders;
