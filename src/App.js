import React, { useEffect, useState } from "react";
import Header from "./components/MainContent/Header";
import MainContent from "./components/MainContent/MainContent";
import Sidebar from "./components/Sidebar/Sidebar";
import RightSide from "./components/RightSidebar/RightSide";
import "./App.css";
import MobileNavbar from "./components/mobileNavbar/mobileNavbar";
import MusicTable from "./components/mobileTable/MusicTable";

function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-b from-red-900 to-black text-white">
      {/* <MobileNavbar/> */}
      <div className="block sm:hidden ">
        <MobileNavbar />
      </div>

      <div className="hidden sm:block  w-[20%] h-full">
        <Sidebar />
      </div>

      {/* Main Content */}

      {isSmallScreen || window.innerWidth <= 768 ? (
        <div className="MobileView-Musiclist  px-4 m-auto mt-20 block sm:hidden">
          <MusicTable />
        </div>
      ) : (
        <div className="flex w-[60%] flex-grow flex-col bg-gradient-to-b from-red-900 to-black text-white">
          <Header />
          <MainContent />
        </div>
      )}

      {/* Player Controls */}
      <div className="w-[20%] hidden sm:block h-full bg-gradient-to-b from-black to-red-900 text-white overflow-y-auto">
        <div className="fixed bottom-0 right-0 mb-4 mr-4">
          <RightSide />
        </div>
      </div>
    </div>
  );
}

export default App;
