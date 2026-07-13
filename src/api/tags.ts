import request from "./client.ts"

export interface ColorTag {
  id: number,
  tagName: string,
  tagColor: string,
  tagTextColor: string,
  tagComment: string,
}

export interface QueryColorTagVo {

}

export interface BindTagToTableVo {
  headerID: number,
  tagID: number,
}

export interface UpdateColorTagVo {
  id: number,
  tagName: string,
  tagColor: string,
  tagTextColor: string,
  tagComment: string,
}

export interface InsertColorTagVo {
  tagName: string,
  tagColor: string,
  tagTextColor: string,
  tagComment: string,
}

export function selectColorTagList(queryVo: QueryColorTagVo): Promise<ColorTag[]> {
  return request.post("/tags/selectList", queryVo);
}

export function bindTagToTable(param: BindTagToTableVo): Promise<void> {
  return request.post("/admin/tags/bind/table", param);
}

export function deleteTag(id: number): Promise<void> {
  return request.get(`/admin/tags/delete/${id}`);
}

export function updateColorTag(updateParam: UpdateColorTagVo): Promise<void> {
  return request.post("/admin/tags/update", updateParam);
}

export function findColorTagByID(id: number): Promise<ColorTag> {
  return request.get(`/tags/findByID/${id}`)
}

export function insertColorTag(insertParam: InsertColorTagVo): Promise<void> {
  return request.post("/admin/tags/insert", insertParam);
}
