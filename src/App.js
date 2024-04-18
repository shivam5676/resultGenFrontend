import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Homepage from "./components/homepage";
import bgImg from "./components/images/back-img.jpg";

function App() {
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
      <Homepage></Homepage>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
