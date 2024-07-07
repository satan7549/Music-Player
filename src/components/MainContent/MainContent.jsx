import React from "react";
import ArtistInfo from "./ArtistInfo";
import "./MainContent.css";
import MusicTable from "./MusicTable";

function MainContent() {
  return (
    <main className=" w-full  overflow-y-auto ">
      <ArtistInfo />
      <MusicTable />
    </main>
  );
}

export default MainContent;
