import React, { ChangeEvent, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Song from "../objects/Song";
import SongUploadRequest from "../objects/SongUploadRequest";

export const UploadBar = () => {
  const [uploadedSong, setUploadedSong] = useState("");
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [amount, setAmount] = useState(6);
  const [secureCode, setSecureCode] = useState("");

  const uploadButtonClickHandler = async () => {
    let song: SongUploadRequest = {
      secureCode: secureCode,
      name: name,
      recommendedAmount: amount,
      author: author,
      data: uploadedSong,
    };
    let json: string = JSON.stringify(song);
    const response = axios.post("Api/UploadSong", json, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
    });
    let data = (await response).data;
    console.log("Response from server:", data.response);
    if (data.response === "OK") {
      alert("Your song was successfully uploaded!\nReload the page to see it.");
    } else {
      alert(`Response from server:\n${data.response}`);
    }
  };

  const changeFileHandler = (event: any) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      let parsedData: string = reader.result!.toString() || "";
      if (parsedData === "") {
        alert("Something went wrong whilst tried to parse provided song file.");
      } else {
        setUploadedSong(parsedData);
      }
      return;
    };
    reader.onerror = function (error) {
      alert("Unknown error occured whilst tried to parse file.");
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }} style={{ backgroundColor: "#f8f8ff" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Upload your midi!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Name:{" "}
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Author:{" "}
            <input
              type="text"
              placeholder="(optional)"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Amount:{" "}
            <input
              type="number"
              defaultValue={6}
              value={amount}
              onChange={(event) => setAmount(+event.target.value)}
            />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Secure Code:{" "}
            <input
              type="text"
              placeholder="Secure Code"
              value={secureCode}
              onChange={(event) => setSecureCode(event.target.value)}
            />
          </Typography>
        </CardContent>
        <CardActions>
          <input
            type="file"
            accept=".midi, .mid"
            onChange={changeFileHandler}
          />
          <Button size="small" onClick={uploadButtonClickHandler}>
            Upload!
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default UploadBar;
