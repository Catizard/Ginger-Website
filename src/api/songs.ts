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
  genre: string,
  backBMP: string,
  banner: string,
  bpm: number,
  minBPM: number,
  maxBPM: number,
  difficulty: string,
  judgeRank: number,
  judgeRankType: string,
  total: number,
  totalType: string,
  mode: string,
  playLevel: string,
  player: number,
  preview: string,
  stageFile: string,
  length: number,
  notes: number
}

export const PlayMode = {
  BEAT_5K: "BEAT_5K",
  BEAT_7K: "BEAT_7K",
  BEAT_10K: "BEAT_10K",
  BEAT_14K: "BEAT_14K",
  POPN_5K: "POPN_5K",
  POPN_9K: "POPN_9K",
  KEYBOARD_24K: "KEYBOARD_24K",
  KEYBOARD_24K_DOUBLE: "KEYBOARD_24K_DOUBLE"
} as const;

export type PlayModeType = typeof PlayMode[keyof typeof PlayMode]

export function toPlayModeType(mode: string): PlayModeType | null {
  const has = Object.values(PlayMode).includes(mode as PlayModeType);
  return has ? mode as PlayModeType : null;
}

export const JudgeRank = {
  BMS_RANK: "BMS_RANK",
  BMS_DEFEXRANK: "BMS_DEFEXRANK",
  BMSON_JUDGERANK: "BMSON_JUDGERANK"
}

export type JudgeRankType = typeof JudgeRank[keyof typeof JudgeRank];

export function toJudgeRankType(mode: string): JudgeRankType | null {
  const has = Object.values(JudgeRank).includes(mode as JudgeRankType);
  return has ? mode as JudgeRankType : null;
}

export interface QuerySongDataVo {
}

export function querySongsByEntryID(id: number): Promise<SongData[]> {
  return request.get(`/song/querySongsByEntryID/${id}`)
}

export function selectSongsList(query: QuerySongDataVo): Promise<PageResponse<SongData[]>> {
  return request.post("/song/selectList", query);
}
