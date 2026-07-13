import request from "./client.ts"

export interface AdminUser {
  account: string | null,
  password: string | null
}

export function login(adminUser: AdminUser): Promise<string> {
  return request.post("/admin/login", adminUser);
}

export function importTableFromURL(url: string): Promise<string> {
  return request.post("/admin/table/import/url", {
    url: url,
  });
}

export function recalculateTableCoverage(id: number): Promise<null> {
  return request.get(`/admin/table/recalculate/coverage/${id}`);
}

export function verify(): Promise<void> {
  return request.get("/admin/verify");
}
