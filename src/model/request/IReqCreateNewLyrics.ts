export interface IReqCreateNewLyrics {
  title: string;
  description: string;
  notes: string;
  lyric: string;
  artist_slug: string;
  categories_id: number[];
  image: string;
}