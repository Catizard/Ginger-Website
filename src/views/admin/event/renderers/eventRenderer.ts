import { EventLogType, toEventLogType, type EventLog } from "@/api/event";
import type { Component } from "vue";
import UploadPackageRenderer from "./UploadPackageRenderer.vue";
import FallbackEventLogRenderer from "./FallbackEventLogRenderer.vue";
import DeletePackageRenderer from "./DeletePackageRenderer.vue";
import ManualNoteRenderer from "./ManualNoteRenderer.vue";

export function parsePayload<T>(event: EventLog): T {
  const eventType = toEventLogType(event.eventType);
  if (eventType == null) {
    return "" as T;
  }
  if (eventType == EventLogType.MANUAL_NOTE) {
    return event.payload as T;
  }
  return JSON.parse(event.payload) as T;
}

export const eventLogRenderers: Record<string, Component> = {
  UPLOAD_PACKAGE: UploadPackageRenderer,
  DELETE_PACKAGE: DeletePackageRenderer,
  MANUAL_NOTE: ManualNoteRenderer,
}

export function getRenderer(eventType: string): Component {
  return eventLogRenderers[eventType] ?? FallbackEventLogRenderer;
}

export interface PackageUploadEvent {
  actor: string,
  fileName: string,
}

export interface PackageDeleteEvent {
  actor: string,
  fileName: string,
}
