export interface ListaPaginada<T> {
  items: T[],
  page: number,
  pageSize: number,
  totalCount: number
}