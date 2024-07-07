import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { musicData } from "../../assets/music/MusicData";
import { Howl } from "howler";
import SongRow from "./SongRow";
import PlayerControls from "../PlayerControls/PlayerControls";

const MusicTable = () => {
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
    <DndProvider backend={HTML5Backend}>
      <section className="max-w-3xl mx-auto ">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Popular</h3>
          {/* <a href="#" className="text-gray-400 hover:underline"> */}
          <p>See All</p>
          {/* </a> */}
        </div>
        <table className=" w-full border border-yellow-600 text-sm shadow-md rounded-lg overflow-y-auto">
          <thead>
            <tr>
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">TITLE</th>
              <th className="p-2 text-left">PLAYING</th>
              <th className="p-2 text-left">TIME</th>
              <th className="p-2 text-left">ALBUM</th>
            </tr>
          </thead>
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
      </section>
      <PlayerControls
        currentSong={currentSong}
        howlInstance={howlInstance}
        setHowlInstance={setHowlInstance}
        setCurrentSong={setCurrentSong}
        songs={songs}
      />
    </DndProvider>
  );
};

export default MusicTable;
