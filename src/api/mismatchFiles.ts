import request from "./client";
import type { PageRequest, PageResponse } from "./page";

export interface FileMismatch {
  id: number,
  type: string,
  fileName: string,
  directoryID: string,
  entryID: string,
}

export interface QueryFileMismatchVo {
  pageRequest: PageRequest,
}

export function selectMismatchFilesList(query: QueryFileMismatchVo): Promise<PageResponse<FileMismatch[]>> {
  return request.post("/mismatchFiles/selectList", query);
}
