export interface Song {
  id: number;
  name: string;
  author: string | null;
  data: string;
  recommendedAmount: number | null;
}

export default Song;
