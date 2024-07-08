import React from "react";
import ArtistInfo from "./ArtistInfo";
import "./MainContent.css";
import MusicTable from "./MusicTable";
import useIsMobileOrTablet from "../CheckScreen";

function MainContent() {
  const isMobileOrTablet = useIsMobileOrTablet();

  return (
    <>
      {isMobileOrTablet ? (
        <MusicTable />
      ) : (
        <main className="w-full  overflow-y-auto ">
          <ArtistInfo />
          <MusicTable />
        </main>
      )}
    </>
  );
}

export default MainContent;
