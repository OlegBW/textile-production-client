type Pagination = {
  first_page: number;
  last_page: number;
  next_page: number;
  page: number;
  total: number;
  total_pages: number;
};

export type PaginatedResponse<TBody> = {
  pagination: Pagination;
  result: TBody;
};
