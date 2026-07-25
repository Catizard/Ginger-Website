import request from "./client";
import type { PageResponse } from "./page";

export interface SongData {
  id: number,
  md5: string,
  sha256: string,
  entryID: number,
  title: string,
  subTitle: string,
  artist: string,
  subArtist: string,
  fileName: string,
}

export interface QuerySongDataVo {
}

export function querySongsByEntryID(id: number): Promise<SongData[]> {
  return request.get(`/song/querySongsByEntryID/${id}`)
}

export function selectSongsList(query: QuerySongDataVo): Promise<PageResponse<SongData[]>> {
  return request.post("/song/selectList", query);
}
