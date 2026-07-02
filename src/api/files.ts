// Files interfaces & types
import request from './client';
import { type PageRequest, type PageResponse } from './page';

export interface QueryFileEntryVo {
  fileNameLike?: String | null,
  md5?: String | null,
  tableID?: number | null,
  pageRequest: PageRequest,
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
