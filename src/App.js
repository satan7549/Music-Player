import React from "react";
import Header from "./components/MainContent/Header";
import MainContent from "./components/MainContent/MainContent";
import Sidebar from "./components/Sidebar/Sidebar";
import RightSide from "./components/RightSidebar/RightSide";
import "./App.css";

function App() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-[20%] h-full">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-[60%] flex-grow flex flex-col bg-gradient-to-b from-red-900 to-black text-white">
        <Header />
        <MainContent />
      </div>

      {/* Player Controls */}
      <div className="w-[20%] border-l-2 border-yellow-600 h-full bg-gradient-to-b from-black to-red-900 text-white overflow-y-auto">
        <div className="fixed bottom-0 right-0 mb-4 ">
          <RightSide />
        </div>
      </div>
    </div>
  );
}

export default App;
