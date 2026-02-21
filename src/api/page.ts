// For pagination

export interface PageRequest {
  page: number,
  pageSize: number,
}

export interface PageResponse<T> {
  page: number,
  pageCount: number,
  data: T | null
  pageSize: number,
}
