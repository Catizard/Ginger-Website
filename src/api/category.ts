import request from "./client.ts";

export interface TableCategory {
  id: number,
  name: string,
  orderIndex: number,
}

export interface QueryTableCategoryVo {

}

export interface BindCategoryToTable {
  headerID: number,
  categoryID: number
}

export interface UpdateTableCategoryVo {
  id: number,
  name: string,
  orderIndex: number
}

export interface InsertTableCategoryVo {
  name: string,
  orderIndex: number,
}

export interface UpdateSortsVo {
  id: number,
  orderIndex: number,
}

export function selectCategoryList(queryVo: QueryTableCategoryVo): Promise<TableCategory[]> {
  return request.post("/table/category/selectList", queryVo);
}

export function bindCategoryToTable(param: BindCategoryToTable): Promise<void> {
  return request.post("/admin/table/category/bind/table", param);
}

export function deleteCategory(id: number): Promise<void> {
  return request.get(`/admin/table/category/delete/${id}`);
}

export function updateCategory(param: UpdateTableCategoryVo): Promise<void> {
  return request.post("/admin/table/category/update", param);
}

export function updateCategorySorts(updates: UpdateSortsVo[]): Promise<void> {
  return request.post("/admin/table/category/update/sorts", updates);
}

export function findCategoryByID(id: number): Promise<TableCategory> {
  return request.get(`/table/category/findByID/${id}`);
}

export function insertTableCategory(param: InsertTableCategoryVo): Promise<void> {
  return request.post("/admin/table/category/insert", param);
}
