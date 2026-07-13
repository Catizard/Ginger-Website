import { type NotificationApiInjection } from "naive-ui/es/notification/src/NotificationProvider";

export { };

declare global {
  interface Window {
    $notification: NotificationApiInjection,
    $notifySuccess(content: string): void;
    $notifyDefault(content: string): void;
    $notifyInfo(content: string): void;
    $notifyWarning(content: string): void;
    $notifyError(content: string | Error): void;
  }
}
