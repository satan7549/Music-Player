import React from "react";
import ArtistInfo from "./ArtistInfo";
import "./MainContent.css";
import MusicTable from "./MusicTable";

function MainContent() {
  return (
    <main className=" w-full  overflow-hidden">
      <ArtistInfo />
      <MusicTable />
    </main>
  );
}

export default MainContent;
