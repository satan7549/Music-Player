import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import musicIcon from "../../assets/icons/music.svg";

const ItemType = "MUSIC_ITEM";

const SongRow = ({ song, index, moveItem, playSong, isPlaying }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleRowClick = (e) => {
    e.stopPropagation();
    playSong(song);
  };

  return (
    <tr
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isPlaying ? "#520000" : "transparent",
      }}
      onClick={handleRowClick}
      className="hover:bg-yellow-500 hover:text-white transition-colors duration-300"
    >
      {isPlaying ? (
        <img src={musicIcon} className="w-auto h-auto" alt="Music" />
      ) : (
        <td className="p-2">{index + 1}</td>
      )}

      <td className="p-2">{song.title}</td>
      <td className="p-2">{song.playing}</td>
      <td className="p-2">{song.time}</td>
      <td className="p-2">{song.album}</td>
    </tr>
  );
};

export default SongRow;
