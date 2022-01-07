export interface SongInfo {
  id: number;
  name: string;
  author: string | null;
  recommendedAmount: number | null;
}

export default SongInfo;
