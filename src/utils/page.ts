import type { PaginationProps } from "naive-ui";
import { reactive, type Reactive } from "vue";

export function createPagination(load: (() => void) | undefined = undefined): Reactive<PaginationProps> {
  const raw = {
    page: 1,
    pageSize: 10,
    pageCount: 0,
    showSizePicker: true,
    pageSizes: [10, 20, 50],
    onChange: {} as (page: number) => void,
    onUpdatePageSize: {} as (pageSize: number) => void,
  };

  const pagination = reactive(raw);

  pagination.onChange = (page: number) => {
    pagination.page = page;
    if (load != undefined) {
      load();
    }
  };

  pagination.onUpdatePageSize = (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
    if (load != undefined) {
      load();
    }
  }

  return pagination;
}
