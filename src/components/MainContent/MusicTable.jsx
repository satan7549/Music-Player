import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { musicData } from "../../assets/music/MusicData";
import { Howl } from "howler";
import SongRow from "./SongRow";
import PlayerControls from "../PlayerControls/PlayerControls";
import useIsMobileOrTablet from "../CheckScreen";

import RepeatIcon from "../../assets/icons/repeat.svg";
import RewindIcon from "../../assets/icons/rewind.svg";
import PlayIcon from "../../assets/icons/play.svg";
import PauseIcon from "../../assets/icons/pause.svg";
import FastForwardIcon from "../../assets/icons/fastforward.svg";
import RandomIcon from "../../assets/icons/random.svg";

import Poster from "../../assets/music/musicimage.png";
import { TouchBackend } from "react-dnd-touch-backend";

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
                  <th className="p-2 text-left"></th>
                  <th className="p-2 text-left">TITLE</th>
                  <th className="p-2 text-left">PLAYING</th>
                  <th className="p-2 text-left">TIME</th>
                  <th className="p-2 text-right">ALBUM</th>
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
        <>
          {isMobileOrTablet ? (
            <div className="fixed w-full h-auto left-0 p-1 bottom-0 bg-red-900 shadow-lg rounded-t-lg overflow-hidden ">
              <div className="flex items-center p-2 text-white">
                <img
                  src={Poster}
                  className="w-16 h-16 rounded-md mr-2"
                  alt=""
                />
                <div className="flex-1">
                  <h2 className="font-bold"> No song selected</h2>
                  <p>Please select a song.</p>
                </div>
                <div className="flex space-x-2">
                  <button>
                    <img src={RewindIcon} alt="Previous" className="w-8 h-8" />
                  </button>
                  <button>
                    <img
                      src={PlayIcon}
                      alt="Play/Pause"
                      className="w-10 h-10"
                    />
                  </button>
                  <button>
                    <img src={FastForwardIcon} alt="Next" className="w-8 h-8" />
                  </button>
                </div>
              </div>
              <div className="w-full bg-[#F6F6F6] h-1 cursor-pointer" />
              <div className="flex justify-between px-4 py-1 text-white text-xs">
                <span>0:00</span>
                <span>0:00</span>
              </div>
            </div>
          ) : (
            <div className="fixed bottom-2 right-6 w-56 bg-red-900 shadow-lg rounded-lg overflow-hidden">
              <div className="text-center py-2 text-white font-semibold">
                Now Playing
              </div>

              <div className="p-2">
                <img
                  src={Poster}
                  alt="Now Playing"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>

              <div className="p-2">
                <div className="text-center mb-2">
                  <h4 className="text-sm font-bold text-white">
                    No song selected
                  </h4>
                  <p className="text-xs text-gray-300">Please select a song.</p>
                </div>

                <div
                  className="flex items-center mb-2"
                  style={{ cursor: "pointer" }}
                >
                  <span className="text-xs text-[#F6F6F6]">0:00</span>

                  <div className="relative m-auto flex-grow mx-2">
                    <div className="bg-gray-300 h-1 m-auto rounded-full">
                      <div className="bg-[#F6F6F6] h-full rounded-full"></div>
                      <div className="absolute  bg-[#F6F6F6] w-3 h-3 -top-1 rounded-full"></div>
                    </div>
                  </div>

                  <span className="text-xs text-[#F6F6F6]">0:00</span>
                </div>

                <div className="flex justify-center space-x-3 mt-2">
                  <img
                    src={RepeatIcon}
                    className="control-icon w-5 h-5"
                    alt="Repeat"
                  />
                  <img
                    src={RewindIcon}
                    className="control-icon w-5 h-5"
                    alt="Rewind"
                  />
                  <img
                    src={
                      howlInstance && howlInstance.playing()
                        ? PauseIcon
                        : PlayIcon
                    }
                    className="control-icon w-6 h-6"
                    alt="Play/Pause"
                  />
                  <img
                    src={FastForwardIcon}
                    className="control-icon w-5 h-5"
                    alt="Fast Forward"
                  />
                  <img
                    src={RandomIcon}
                    className="control-icon w-5 h-5"
                    alt="Random"
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </DndProvider>
  );
};

export default MusicTable;
