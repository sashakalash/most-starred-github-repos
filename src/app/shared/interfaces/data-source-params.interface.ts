export type Order = 'asc' | 'desc';

export interface IDataSourceParams {
  sort: string;
  order: Order;
  page: number;
  q: string;
  per_page: number;
}

export type RepoParams = Omit<IDataSourceParams, 'per_page' | 'page'>;
