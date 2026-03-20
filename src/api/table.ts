// Table interfaces & types
import request from "./client";
import { type PageRequest, type PageResponse } from "./page";

export interface QueryTableHeaderVo {

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
  missingCount: number
}

export interface QueryTableDataVo {
  pageRequest: PageRequest,
  headerID: number,
  level: string
}

export interface TableLevelEntry {
  headerID: number,
  name: string,
  level: string
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

export function selectHeaderList(query: QueryTableHeaderVo): Promise<TableHeader[]> {
  return request.post('/table/selectHeaderList', query)
}

export function selectLevelEntries(id: number): Promise<TableLevelEntry[]> {
  return request.get(`/table/selectLevelEntries/${id}`)
}

export function selectDataList(query: QueryTableDataVo): Promise<PageResponse<TableData[]>> {
  return request.post('/table/selectDataList', query)
}

