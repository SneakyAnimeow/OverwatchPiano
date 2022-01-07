import Song from "./Song";

export interface PassedData {
  song: Song | undefined;
  amount: number;
}

export default PassedData;
