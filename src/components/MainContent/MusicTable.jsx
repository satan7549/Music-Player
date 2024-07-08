import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { musicData } from "../../assets/music/MusicData";
import { Howl } from "howler";
import SongRow from "./SongRow";
import PlayerControls from "../PlayerControls/PlayerControls";
import useIsMobileOrTablet from "../CheckScreen";

import { TouchBackend } from "react-dnd-touch-backend";
import DummyPlayerControls from "../PlayerControls/DummyPlayerControls";

const MusicTable = () => {
  const isMobileOrTablet = useIsMobileOrTablet();

  const [songs, setSongs] = useState(musicData);
  const [currentSong, setCurrentSong] = useState(null);
  const [howlInstance, setHowlInstance] = useState(null);

  const moveItem = useCallback(
    (dragIndex, hoverIndex) => {
      const items = [...songs];
      const [draggedItem] = items.splice(dragIndex, 1);
      items.splice(hoverIndex, 0, draggedItem);
      setSongs(items);
    },
    [songs]
  );

  const playSong = (song) => {
    if (howlInstance) {
      howlInstance.stop();
    }
    const newHowl = new Howl({
      src: [song.songSrc],
      html5: true,
    });
    newHowl.play();
    setCurrentSong(song);
    setHowlInstance(newHowl);
  };

  return (
    <DndProvider backend={isMobileOrTablet ? TouchBackend : HTML5Backend}>
      {isMobileOrTablet ? (
        <section className="max-w-full block mx-auto poppins-thin">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Popular</h3>
            <p>See All</p>
          </div>
          <div className="w-full text-sm shadow-md rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left">#</th>
                  <th className="p-2 text-left"></th>
                  <th className="p-2 text-left">TITLE</th>
                  <th className="p-2 text-right">TIME</th>
                </tr>
              </thead>
            </table>
            <div className="sm:h-auto overflow-y-scroll max-h-[62vh]">
              <table className="w-full">
                <tbody>
                  {songs.map((song, index) => (
                    <SongRow
                      key={song.id}
                      index={index}
                      song={song}
                      moveItem={moveItem}
                      playSong={playSong}
                      isPlaying={currentSong && currentSong.id === song.id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : (
        <section className="max-w-3xl mx-auto px-10 h-[40%] poppins-thin">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Popular</h3>
            <p>See All</p>
          </div>
          <div className="w-full text-sm shadow-md rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left">#</th>
                  <th className="p-2 "></th>
                  <th className="p-2 text-left">TITLE</th>
                  <th className="p-2 text-center">PLAYING</th>
                  <th className="p-2 text-left">TIME</th>
                  <th className="p-2 text-left">ALBUM</th>
                </tr>
              </thead>
            </table>
            <div className="max-h-64 overflow-y-auto">
              <table className="w-full">
                <tbody>
                  {songs.map((song, index) => (
                    <SongRow
                      key={song.id}
                      index={index}
                      song={song}
                      moveItem={moveItem}
                      playSong={playSong}
                      isPlaying={currentSong && currentSong.id === song.id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {currentSong ? (
        <PlayerControls
          currentSong={currentSong}
          howlInstance={howlInstance}
          setHowlInstance={setHowlInstance}
          setCurrentSong={setCurrentSong}
          songs={songs}
        />
      ) : (
        <DummyPlayerControls />
      )}
    </DndProvider>
  );
};

export default MusicTable;
