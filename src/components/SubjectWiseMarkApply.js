import React, { useContext, useRef, useState } from "react";
import ResultGenerationContext from "../store/ResultGenerationContext";

const SubjectWiseMarkApply = () => {
  const SubjectStartKey = useRef(null);
  const SubjectEndKey = useRef(null);
  const correctSubjectPoint = useRef();
  const wrongSubjectPoint = useRef();
  const subjectName = useRef("");

  const [subjectEndDropDownOpen, setSubjectEndDropdownOpen] = useState(false);
  const [subjectStartDropDownOpen, setSubjectStartDropDownOpen] =
    useState(false);

  const ctx = useContext(ResultGenerationContext);
  const subjectWiseMarking = ctx.subjectMarkings;
  const keyHEaders = ctx.keyHeaders;
  const subjectMarkHandler = (start, end, subName, correctMark, wrongMark) => {
    console.log(start, end, subName, correctMark, wrongMark);
    console.log(subjectWiseMarking);
    const finditem = subjectWiseMarking.find(
      (current) => current.subject == subName
    );
    console.log(finditem);
    if (!finditem) {
      ctx.subjectMarkHandler({
        subject: subName,
        start: start,
        end: end,
        correct: correctMark,
        wrong: wrongMark,
      });
    } else {
      console.log("subject already present");
    }
  };
  return (
    <div className="m-2 mt-10 w-[100%]  pe-4">
      <div className="flex justify-center">
        <div className="animate__animated animate__zoomInDown animate__delay-2s w-[100%] max-w-[600px] h-fit bg-gradient-to-r from-red-600 to-yellow-500 pb-8 rounded-lg">
          <div className="flex justify-center">
            <p className="font-bold pt-8 pb-2 text-2xl border-b-2 border-grey-500 text-white">
              Subject Wise Marking
            </p>
          </div>
          <div className="flex mt-2">
            <div className="w-[60%]">
              <div className="flex justify-between mt-2 mx-4 text-center">
                <div
                  className="font-bold text-[1.1rem] "
                  onClick={() => {
                    setSubjectStartDropDownOpen(!subjectStartDropDownOpen);
                  }}
                >
                  Start que :
                  <div className="w-[120px]   mx-4 my-2  overflow-x-hidden font-medium border-white border-2">
                    {!SubjectStartKey.current ? (
                      <div className="text-white">select here</div>
                    ) : (
                      keyHEaders[0][SubjectStartKey.current]
                    )}
                    {subjectStartDropDownOpen && (
                      <div className="bg-blue-500  overflow-x-hidden overflow-y-scroll  h-[60px] ">
                        {keyHEaders[0].map((current, index) => {
                          return (
                            <div
                              className="border-b  whitespace-nowrap overflow-hidden overflow-ellipsis text-md mx-2 hover:bg-white hover:px-2"
                              onClick={() => {
                                setSubjectStartDropDownOpen(
                                  !subjectStartDropDownOpen
                                );

                                SubjectStartKey.current = index;
                              }}
                            >
                              {" "}
                              {current}
                            </div>
                          );
                        })}{" "}
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="font-bold text-[1.1rem]"
                  onClick={() => {
                    setSubjectEndDropdownOpen(!subjectEndDropDownOpen);
                  }}
                >
                  End que :
                  <div className="w-[120px]   mx-4 my-2  overflow-x-hidden font-medium border-white border-2">
                    {!SubjectEndKey.current ? (
                      <div className="text-white text-md">select here</div>
                    ) : (
                      keyHEaders[0][SubjectEndKey.current]
                    )}
                    {subjectEndDropDownOpen && (
                      <div className="bg-blue-500  overflow-x-hidden overflow-y-scroll  h-[60px] ">
                        {keyHEaders[0].map((current, index) => {
                          return (
                            <div
                              className="border-b whitespace-nowrap overflow-hidden overflow-ellipsis text-md mx-2 hover:bg-white hover:px-2"
                              onClick={() => {
                                setSubjectEndDropdownOpen(
                                  !subjectEndDropDownOpen
                                );

                                SubjectEndKey.current = index;
                              }}
                            >
                              {current}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-2 mx-4 text-center ">
                <div className="font-bold text-[1.1rem]">
                  Correct <span className="">(+)</span> :
                  <input
                    className="w-[50px] mx-4 my-2"
                    defaultValue={1}
                    type="number"
                    ref={correctSubjectPoint}
                  ></input>
                </div>
                <div className="font-bold text-[1.1rem]">
                  Wrong <span className="">(-)</span> :
                  <input
                    className="w-[50px] mx-4 my-2"
                    defaultValue={0}
                    type="number"
                    ref={wrongSubjectPoint}
                  ></input>
                </div>
              </div>
            </div>
            <div className=" mt-2 h-[120px] w-[40%] mx-2 flex flex-col items-center">
              <div className="bg-gray-200 w-[100%] text-center font-bold">
                selected subject
              </div>
              <div className="overflow-y-scroll h-[100px] w-[100%] text-center border-s border-2">
                <p className="font-bold  border-b border-blue-600 hover:bg-white hover:border-b-0">
                  Hindi
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between  mx-4 text-center w-[100%]">
            <div className="flex text-[1.1rem] font-bold justify-center  mx-8">
              Subject :{" "}
              <input
                className="text-center mx-2 max-w-[150px] min-w-[120px]"
                placeholder="type here... "
                ref={subjectName}
              ></input>
              <div
                className="mx-2 border-2 border-yellow-500 px-2 bg-blue-400 font-bold text-white rounded-md flex items-center justify-center"
                onClick={() => {
                  subjectMarkHandler(
                    SubjectStartKey.current,
                    SubjectEndKey.current,
                    subjectName.current.value,
                    correctSubjectPoint.current.value,
                    wrongSubjectPoint.current.value
                  );
                }}
              >
                Add
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectWiseMarkApply;
