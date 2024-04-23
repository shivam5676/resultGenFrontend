import { useContext } from "react";
import Footer from "./components/Footer";
import HomePageTest from "./components/HomePageTest";
import NavBar from "./components/NavBar";
import Homepage from "./components/homepage";
import bgImg from "./components/images/back-img.jpg";
import ResultGenerationContext from "./store/ResultGenerationContext";

function App() {
const ctx=useContext(ResultGenerationContext)

  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <NavBar></NavBar>
      {/* <Homepage></Homepage> */}
      {/* <Footer></Footer> */}
      <HomePageTest></HomePageTest>
    </div>
  );
}

export default App;
