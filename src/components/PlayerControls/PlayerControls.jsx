import React, { useEffect, useState } from "react";
import RepeatIcon from "../../assets/icons/repeat.svg";
import RewindIcon from "../../assets/icons/rewind.svg";
import PlayIcon from "../../assets/icons/play.svg";
import PauseIcon from "../../assets/icons/pause.svg";
import FastForwardIcon from "../../assets/icons/fastforward.svg";
import RandomIcon from "../../assets/icons/random.svg";
import { Howl } from "howler";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

function PlayerControls({
  currentSong,
  howlInstance,
  setHowlInstance,
  setCurrentSong,
  songs,
}) {
  const [playedTime, setPlayedTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (howlInstance) {
      setTotalTime(howlInstance.duration());

      const updateTime = () => {
        if (howlInstance.playing()) {
          setPlayedTime(howlInstance.seek());
        }
        requestAnimationFrame(updateTime);
      };

      howlInstance.on("play", () => {
        setIsPlaying(true);
        updateTime();
      });
      howlInstance.on("pause", () => setIsPlaying(false));
      howlInstance.on("end", () => {
        setPlayedTime(0);
        playNext();
      });

      return () => {
        howlInstance.off("play", updateTime);
        howlInstance.off("pause", () => setIsPlaying(false));
      };
    }
  }, [howlInstance]);

  const playOrPause = () => {
    if (howlInstance) {
      if (howlInstance.playing()) {
        howlInstance.pause();
      } else {
        howlInstance.play();
      }
    }
  };

  const playNext = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    playSong(songs[nextIndex]);
  };

  const playPrev = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
    playSong(songs[prevIndex]);
  };

  const playSong = (song) => {
    if (howlInstance) {
      howlInstance.stop();
    }
    const newHowl = new Howl({
      src: [song.songSrc],
      html5: true,
      onload: () => {
        setTotalTime(newHowl.duration());
        setPlayedTime(0);
      },
    });
    newHowl.play();
    setHowlInstance(newHowl);
    setIsPlaying(true);
  };

  const handleSeek = (e) => {
    const seekTime = (e.nativeEvent.offsetX / e.target.clientWidth) * totalTime;
    if (howlInstance) {
      howlInstance.seek(seekTime);
      setPlayedTime(seekTime);
    }
  };

  if (!currentSong) return null;

  return (
    <aside className="fixed bottom-2 right-0 w-64 bg-red-900 shadow-lg rounded-lg overflow-hidden">
      <div className="text-center py-2">Now Playing</div>

      <div className="p-2">
        <img
          src="https://t3.ftcdn.net/jpg/03/26/52/14/360_F_326521465_d3Lv3za5GEGqYAR3M8bem2mHY1vjvmJP.jpg"
          alt="Now Playing"
          className=" object-cover rounded-lg"
        />
      </div>
      <div className="p-4">
        <div className="text-center mb-2">
          <h4 className="text-lg font-bold">{currentSong.title}</h4>
          <p className="text-gray-300">{currentSong.album}</p>
        </div>
        <div
          className="flex justify-between items-center mb-2"
          onClick={handleSeek}
          style={{ cursor: "pointer" }}
        >
          <span className="text-xs text-[#F6F6F6]">
            {formatTime(playedTime)}
          </span>
          {/* <div className="relative flex-grow mx-2">
            <div className="bg-gray-300 h-1 rounded-full">
              <div
                className="bg-[#F6F6F6] h-full rounded-full"
                style={{ width: `${(playedTime / totalTime) * 100}%` }}
              >
                <div
                  className="absolute inset-0 m-auto bg-[#F6F6F6] rounded-full w-3 h-3"
                  style={{ left: `${(playedTime / totalTime) * 100}%` }}
                ></div>
              </div>
            </div>
          </div> */}
          <div className="relative flex-grow mx-2">
            <div
              className="bg-gray-300 h-1 rounded-full"
              style={{ width: `${(playedTime / totalTime) * 100}%` }}
            >
              <div className="bg-[#F6F6F6] h-full rounded-full"></div>
              <div
                className="absolute inset-0  left-0 w-3 h-3 bg-[#F6F6F6] rounded-full"
                style={{ left: `${(playedTime / totalTime) * 100}%` }}
              ></div>
            </div>
          </div>
          <span className="text-xs text-[#F6F6F6]">
            {formatTime(totalTime)}
          </span>
        </div>

        <div className="flex justify-center space-x-4 mt-2">
          <img src={RepeatIcon} className="control-icon" alt="Repeat" />
          <img
            src={RewindIcon}
            className="control-icon"
            alt="Rewind"
            onClick={playPrev}
          />
          <img
            src={howlInstance && howlInstance.playing() ? PauseIcon : PlayIcon}
            className="control-icon"
            alt="Play/Pause"
            onClick={playOrPause}
          />
          <img
            src={FastForwardIcon}
            className="control-icon"
            alt="Fast Forward"
            onClick={playNext}
          />
          <img src={RandomIcon} className="control-icon" alt="Random" />
        </div>
      </div>
    </aside>
  );
}

export default PlayerControls;
