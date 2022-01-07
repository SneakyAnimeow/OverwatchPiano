import Button from "@mui/material/Button";
import axios from "axios";
import Song from "../objects/Song";
import MutualSpace from "./MutualSpace";
import { useEffect } from "react";
import PassedData from "../objects/PassedData";

export const Converter = () => {
  const { songId, setSong, song, amountOfSymmetras } = MutualSpace();

  useEffect(() => {
    if (song == null) return;
    let data: PassedData = {
      song: song,
      amount: amountOfSymmetras,
    };
    // @ts-ignore
    window["loadFile"](data);
  }, [song]);

  const copyPresetButtonHandler = () => {
    if (songId == 0) {
      alert("You didn't select the song!");
      return;
    }
    axios.get(`Api/DownloadSong?id=${songId}`).then((response) => {
      let song: Song = response.data;
      setSong(song);
    });
  };

  return (
    <Button
      variant="contained"
      color="success"
      onClick={copyPresetButtonHandler}
    >
      Convert!
    </Button>
  );
};

export default Converter;
