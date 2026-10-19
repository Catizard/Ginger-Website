import request from "./client.ts";
import type { PageRequest, PageResponse } from "./page.ts";

export interface EventLog {
  id: number,
  eventType: string,
  payload: string,
  createTime: number,
  createUser: string,
}

export interface QueryEventLogVo {
  eventType?: string | null,
  createUser?: string | null,
  createTimeStart?: number | null,
  createTimeEnd?: number | null,
  pageRequest: PageRequest,
}

export interface InsertManualEventLogVo {
  message: string,
}

export interface QueryEventLogDaySectionsVo {
  beforeDate?: string | null,
  limitDays?: number,
}

export interface EventLogDaySectionSummaryDto {
  days: EventLogDaySection[],
  nextCursor: string | null,
  hasMore: boolean,
}

export interface EventLogDaySection {
  date: string,
  groups: AggregatedEventGroup[]
}

export interface AggregatedEventGroup {
  date: string,
  createUser: string,
  eventType: string,
  count: number,
  aggregatable: boolean,
  payload: string,
}

export const EventLogType = {
  UPLOAD_PACKAGE: "UPLOAD_PACKAGE",
  DELETE_PACKAGE: "DELETE_PACKAGE",
  MANUAL_NOTE: "MANUAL_NOTE",
} as const;

export type EventLogType = typeof EventLogType[keyof typeof EventLogType];

export function toEventLogType(eventType: string): EventLogType | null {
  const has = Object.values(EventLogType).includes(eventType as EventLogType);
  return has ? eventType as EventLogType : null;
}

export function publishEvent(insertVo: InsertManualEventLogVo): Promise<void> {
  return request.post("/admin/event/manual", insertVo);
}

export function selectEventLogs(query: QueryEventLogVo): Promise<PageResponse<EventLog[]>> {
  return request.post("/admin/event/selectList", query);
}

export function selectDaySections(query: QueryEventLogDaySectionsVo): Promise<EventLogDaySectionSummaryDto> {
  return request.post("/event/selectDaySections", query);
}
