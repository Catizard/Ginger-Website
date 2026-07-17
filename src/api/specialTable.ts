import request from "./client";
import type { TableHeader } from "./table";

export interface InsertSpecialTableVo {
  headerID: number,
}

export interface SpecialTableDto {
  id: number,
  headerID: number,
  tableName: string,
  tableType: string,
}

export interface QuerySpecialTableVo {
}

export function insertSpecialTable(insertParam: InsertSpecialTableVo): Promise<void> {
  return request.post('/admin/table/special/insert', insertParam);
}

export function deleteSpecialTableByID(id: number): Promise<void> {
  return request.get(`/admin/table/delete/${id}`);
}

export function selectSpecialTableListWithFullInfo(query: QuerySpecialTableVo): Promise<TableHeader[]> {
  return request.post("/table/special/selectListWithFullInfo", query);
}
