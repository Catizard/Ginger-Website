import type { DataTableSortState } from "naive-ui"

export interface Sorter {
  orderBy?: string,
  orderDirection?: OrderDirection | null,
}

export type OrderDirection = "ASC" | "DESC"

export function Convert(option: DataTableSortState): Sorter {
  let ret = {} as Sorter
  ret.orderBy = option.columnKey as string;
  if (option.order) {
    ret.orderDirection = option.order == "ascend" ? "ASC" : "DESC";
  }
  return ret;
}
