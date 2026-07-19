// Table interfaces & types
import request from "./client";
import { type PageRequest, type PageResponse } from "./page";

export type TableType = "TABLE" | "EVENT";

export interface QueryTableHeaderVo {
  type?: TableType;
  headerIDs?: number[] | null;
}

export interface TableHeader {
  id: number,
  headerURL: string,
  dataURL: string,
  name: string,
  originalURL: string,
  symbol: string,
  levelOrders: string,
  dataCount: number,
  missingCount: number,
  type: "TABLE" | "EVENT",
  categoryID: number,
  categoryName: string,
  selfhostFlag: boolean,
  tagID: number,
  tagName: string,
  tagColor: string,
  tagTextColor: string,
  tagComment: string | null,
}

export interface QueryTableDataVo {
  pageRequest: PageRequest,
  headerID: number,
  level?: string | null,
  fuzzyKeyword?: string | null,
  titleLike?: string | null,
  artistLike?: string | null,
}

export interface TableLevelEntry {
  headerID: number,
  name: string,
  level: string,
}

export interface TableData {
  id: number,
  headerID: number,
  artist: string,
  comment: string,
  level: string,
  sha256: string,
  md5: string,
  title: string,
  url: string
}

export interface DownloadableTableDataDto {
  id: number,
  headerID: number,
  artist: string,
  comment: string,
  level: string,
  sha256: string,
  md5: string,
  title: string,
  url: string,
  shardMD5: string,
  fileName: string,
  fileSize: number,
  downloadURL: string,
}

export interface MissingTableData {
  id: number,
  headerName: string,
  headerSymbol: string,
  headerID: number,
  artist: string,
  comment: string,
  level: string,
  sha256: string,
  md5: string,
  title: string,
  url: string,
  urlDiff: string,
}

export interface UpdateTableHeaderVo {
  id: number,
  name: string,
  categoryID: number,
  symbol: String
}

export interface QueryMissingTableDataVo {
  pageRequest: PageRequest
}

export interface SwitchTableFlagsVo {
  id: number,
  type?: boolean,
  selfhostFlag?: boolean,
}

export function selectHeaderList(query: QueryTableHeaderVo): Promise<TableHeader[]> {
  return request.post('/table/selectHeaderList', query)
}

export function selectHeaderListWithFullInfo(query: QueryTableHeaderVo): Promise<TableHeader[]> {
  return request.post('/table/selectHeaderListWithFullInfo', query)
}

export function selectOneHeader(id: number): Promise<TableHeader> {
  return request.get(`/table/selectOneHeader/${id}`)
}

export function selectLevelEntries(id: number): Promise<TableLevelEntry[]> {
  return request.get(`/table/selectLevelEntries/${id}`)
}

export function selectDataList(query: QueryTableDataVo): Promise<PageResponse<DownloadableTableDataDto[]>> {
  return request.post('/table/selectDataList', query)
}

export function selectMissingSabunList(query: QueryMissingTableDataVo): Promise<PageResponse<MissingTableData[]>> {
  return request.post("/table/selectMissingDataList", query)
}

export function deleteTable(id: number): Promise<void> {
  return request.get(`/admin/table/delete/${id}`);
}

export function updateTableHeader(updateParam: UpdateTableHeaderVo): Promise<void> {
  return request.post("/admin/table/update/header", updateParam);
}

export function switchTableFlags(flags: SwitchTableFlagsVo): Promise<void> {
  return request.post("/admin/table/switchFlags", flags);
}
