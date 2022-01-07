import MutualSpace from "./MutualSpace";
import { useEffect } from "react";
import SongPanel from "./SongPanel";
import UploadBar from "./UploadBar";
import axios from "axios";
import SongInfo from "../objects/SongInfo";
import "./Main.css";

export const MainComponent = () => {
  const { setSongs } = MutualSpace();

  useEffect(() => {
    let songs: Array<SongInfo> = [];
    const response = axios.get("Api/DownloadSongs").then((result) => {
      songs = result.data;
      setSongs(songs);
    });
  }, []);

  return (
    <>
      <div className="Main">
        <div className="Main">
          <SongPanel />
        </div>
        <div className="Main">
          <UploadBar />
        </div>
      </div>
    </>
  );
};

export default MainComponent;
