import React, { useContext, useState } from "react";
import ResultGenerationContext from "../store/ResultGenerationContext";

const PaperkeyMap = () => {
  const ctx = useContext(ResultGenerationContext);
  const [selectedKeyOpen, setSelectedKeyOpen] = useState(false);
  const [mappedKey, setMappedKEy] = useState(null);
  const [mappedQue, setMappedQue] = useState(null);
  // const [keyHEaders, setKeyHeaders] = useState(null);
  // const [dataHeaders, setDataHeaders] = useState(null);
  const keyHEaders = ctx.keyHeaders;
  const dataHeaders = ctx.dataHeaders;
  const selectedKEyOptionOpen = (mappedKeys) => {
    setSelectedKeyOpen(true);
    console.log(mappedKeys, mappedKey);
    ctx.paperKeyHandler(mappedKeys);
  };
  return (
    <>
      {keyHEaders && dataHeaders && (
        <div className=" m-2 mt-5   ">
          <div className=" w-[100%]  animate__animated animate__backInDown animate__slow">
            {" "}
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 w-[100%] rounded-lg flex flex-col items-center py-4"
              onClick={(event) => {
                event.stopPropagation();
                // setSelectedKeyOpen(!selectedKeyOpen)
              }}
            >
              <div className="text-[1.2rem] font-bold">Select Key value</div>
              <div
                className="border w-[80%] ms-2 flex flex-col items-center"
                // onClick={selectedKEyOptionOpen}
              >
                {!mappedKey ? (
                  <div
                    className="font-semibold "
                    onClick={() => setSelectedKeyOpen(!selectedKeyOpen)}
                  >
                    click here to select
                  </div>
                ) : (
                  <div
                    className="font-semibold"
                    onClick={() => setSelectedKeyOpen(!selectedKeyOpen)}
                  >
                    {mappedKey}
                  </div>
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
                          setSelectedKeyOpen(!selectedKeyOpen); // Close the dropdown after selecting the key
                          console.log("selected key:", currentKey);
                          selectedKEyOptionOpen(currentKey);
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
    </>
  );
};

export default PaperkeyMap;
