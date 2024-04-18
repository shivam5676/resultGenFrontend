import React from "react";

const Footer = () => {
  return (
    <div className="w-[100%] bg-[#0C92DE] text-white h-[70px] flex items-center fixed bottom-0 justify-center ">
        <a
        class="group inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75 mx-4"
        href="#"
      >
        <span class="block rounded-full bg-white px-8 py-3 text-sm font-bold group-hover:bg-transparent hover:text-white text-black">
          Cancel
        </span>
      </a>
      <a
        class="group inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75 mx-4"
        href="#"
      >
        <span class="block rounded-full bg-white px-8 py-3 text-sm font-bold group-hover:bg-transparent hover:text-white text-black">
          Generate Result
        </span>
      </a>
    </div>
  );
};

export default Footer;
