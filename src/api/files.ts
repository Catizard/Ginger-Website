// Files interfaces & types
import request from './client';
import { type PageRequest, type PageResponse } from './page';

export interface QueryFileEntryVo {
  fileNameLike: String,
  md5: String,
  pageRequest: PageRequest
}

export interface FileEntryDto {
  shardMD5: string,
  fileName: string,
  fileSize: number,
  downloadURL: string,
}

export function findFileEntries(query: QueryFileEntryVo): Promise<PageResponse<FileEntryDto[]>> {
  return request.post('/files/selectList', query);
}
