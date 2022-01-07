import { useState } from "react";
import { useBetween } from "use-between";
import SongInfo from "../objects/SongInfo";
import Song from "../objects/Song";

const MutualData = () => {
  const [songs, setSongs] = useState(Array<SongInfo>());
  const [song, setSong] = useState<Song>();
  const [songId, setSongId] = useState(0);
  const [amountOfSymmetras, setAmountOfSymmetras] = useState(6);
  return {
    songs,
    setSongs,
    amountOfSymmetras,
    setAmountOfSymmetras,
    song,
    setSong,
    songId,
    setSongId,
  };
};

export const MutualSpace = () => useBetween(MutualData);

export default MutualSpace;
