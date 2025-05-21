import { IRepo } from './repo.interface';

export interface IRepoApiResponse {
  total_count: number;
  incomplete_results: boolean;
  items: IRepo[];
}
