import iosLogo from "./images/ios-logo.png";
const NavBar = () => {
  return (
    <div className="w-[100%] bg-gradient-to-r from-[#ffc324]  to-orange-400 text-white h-[70px] flex items-center fixed top-0">
      <div className="mx-10 flex justify-between w-[100%]">
        <div className="text-3xl font-bold flex items-center">
          <img src={iosLogo} className="h-[60px] mx-2"></img>R-Tool
        </div>
        <div className="flex items-center">
          {/* <div className="mx-4 font-semibold hover:border-2 border-white-500 text-[1.1rem]"><p className="hover:px-2 hover:font-semibold">result generation</p></div> */}
          <div className="mx-4 font-semibold hover:border-2 border-white-500 text-[1.1rem]">
            <p className="hover:px-2 hover:font-semibold">compare result</p>
          </div>
          <div className="mx-4 font-semibold hover:border-2 border-white-500 text-[1.1rem]">
            <p className="hover:px-2 hover:font-semibold">csv compare</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
