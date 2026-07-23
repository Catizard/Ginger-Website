// Files interfaces & types
import request from './client';
import { type PageRequest, type PageResponse } from './page';

export interface QueryFileEntryVo {
  fuzzyKeyword?: string | null,
  fileNameLike?: string | null,
  titleLike?: string | null,
  artistLike?: string | null,
  md5?: string | null,
  tableID?: number | null,
  missingAnyAudio?: boolean | null,
  noSabunInside?: boolean | null,
  orderBy?: string | null,
  orderDirection?: "ASC" | "DESC" | null,
  pageRequest: PageRequest,
}

export interface FileEntryDto {
  id: number,
  shardMD5: string,
  fileName: string,
  fileSize: number,
  createTime: number,
  downloadURL: string,
  fileManifest: Map<string, number>,
  songCount: number;
  banned: number;
  bannedReason: string;
}

export interface FileLog {
  id: number,
  fileName: string,
  fileSize: number,
  createTime: number,
}

export interface QueryFileLogVo {
  pageRequest: PageRequest,
}

export interface BanPackageVo {
  id: number,
  bannedReason: string,
}

export function findFileEntries(query: QueryFileEntryVo): Promise<PageResponse<FileEntryDto[]>> {
  return request.post('/files/selectList', query);
}

export function selectFileLogs(query: QueryFileLogVo): Promise<PageResponse<FileLog[]>> {
  return request.post('/files/selectLogList', query);
}

export function fullDeleteFile(id: number): Promise<void> {
  return request.get(`/admin/files/fullDelete/${id}`);
}

export function banPackage(param: BanPackageVo): Promise<void> {
  return request.post("/admin/files/ban", param);
}

export function unbanPackage(id: number): Promise<void> {
  return request.get(`/admin/files/unban/${id}`);
}

