export interface SongUploadRequest {
  secureCode: string;
  name: string;
  author: string | null;
  data: string;
  recommendedAmount: number | null;
}

export default SongUploadRequest;
