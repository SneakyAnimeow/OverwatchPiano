import { useEffect, useState } from "react";
import MutualSpace from "./MutualSpace";
import {
  Autocomplete,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";
import Converter from "./Converter";

export const SongPanel = () => {
  const {
    setAmountOfSymmetras,
    amountOfSymmetras,
    songs,
    setSongId,
    songId,
    setSong,
  } = MutualSpace();

  const setAmountOfSymmetrasProxy = (data: any) => {
    let json = JSON.stringify({ amount: data });
    let amountObject = JSON.parse(json);
    let amount: number = amountObject.amount;
    if (amount > 5) {
      setAmountOfSymmetras(amount);
    } else {
      setAmountOfSymmetras(6);
    }
  };

  useEffect(() => {}, [songs]);

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={songs.map((song) => {
            return {
              label:
                (song.author !== "" ? song.author + " - " : "") + song.name,
              id: song.id,
              symmAmount: song.recommendedAmount,
            };
          })}
          onChange={(event, values) => {
            if (values !== null) {
              if (values.id !== null) {
                let parsedValue = JSON.parse(JSON.stringify(values));
                setSongId(parsedValue!.id);
                setAmountOfSymmetras(parsedValue!.symmAmount);
              } else {
                setSongId(0);
              }
            } else {
              setSongId(0);
            }
          }}
          sx={{ width: 500 }}
          renderInput={(params) => (
            <TextField {...params} label="Select a song" />
          )}
        />
        <Converter />
      </Stack>
      <Typography component="legend">Amount of Symmetras</Typography>
      <StyledRating
        max={11}
        name="customized-color"
        defaultValue={6}
        value={amountOfSymmetras}
        getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
        precision={1}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        onChange={(event, newValue) => {
          setAmountOfSymmetrasProxy(newValue);
        }}
      />
    </>
  );
};

export default SongPanel;
