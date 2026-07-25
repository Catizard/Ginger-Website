import request from "./client";
import type { PageRequest, PageResponse } from "./page";

export interface ReconcileRun {
  id: number,
  startAt: number,
  endAt: number,
  result: string,
  message: string | null,
  elapsedTime: number | null,
  type: string,
  triggerBy: string
}

export interface QueryReconcileRunVo {
  pageRequest: PageRequest
}

export function selectReconcileRunList(queryVo: QueryReconcileRunVo): Promise<PageResponse<ReconcileRun[]>> {
  return request.post("/admin/reconcile/selectList", queryVo);
}
