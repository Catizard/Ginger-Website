import request from "./client";

export interface SongData {
  id: number,
  md5: string,
  sha256: string,
  entryID: number,
  title: string,
  subTitle: string,
  artist: string,
  subArtist: string
}

export function querySongsByEntryID(id: number): Promise<SongData[]> {
  return request.get(`/song/querySongsByEntryID/${id}`)
}
