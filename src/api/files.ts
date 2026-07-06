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
  pageRequest: PageRequest,
}

export interface FileEntryDto {
  id: number,
  shardMD5: string,
  fileName: string,
  fileSize: number,
  downloadURL: string,
}

export function findFileEntries(query: QueryFileEntryVo): Promise<PageResponse<FileEntryDto[]>> {
  return request.post('/files/selectList', query);
}
