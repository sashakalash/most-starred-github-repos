import { inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

import {
  IDataSourceParams,
  RepoParams,
} from '@app/shared/interfaces/data-source-params.interface';
import { IRepoApiResponse } from '@app/shared/interfaces/repo-api-response.interface';
import { IRepo } from '@app/shared/interfaces/repo.interface';
import { RepoApiService } from './repo-api.service';

const DAYS_FOR_PREVIOUS_DATE = 30;
const DEFAULT_TOTAL_COUNT = 1000;

function getPreviousDate(): string {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - DAYS_FOR_PREVIOUS_DATE);
  return `${thirtyDaysAgo.toISOString().split('T')[0]}`;
}

export const DEFAULT_REPOS_PARAMS: IDataSourceParams = {
  q: `created:>${getPreviousDate()}`,
  sort: 'stars',
  order: 'desc',
  page: 1,
  per_page: 10,
};

@Injectable()
export class RepoListService {
  private pageSize = signal(DEFAULT_TOTAL_COUNT);
  public data = signal<IRepo[]>([]);
  private currentPage = signal<number>(DEFAULT_REPOS_PARAMS.page);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor(private dataSourceService: RepoApiService) {
    this.fetchPage(1);
  }

  private getParams(): RepoParams {
    const queryParams = this.route.snapshot.queryParams;
    this.currentPage.set(queryParams['page'] || DEFAULT_REPOS_PARAMS.page);
    return {
      q: queryParams['q'] || DEFAULT_REPOS_PARAMS.q,
      sort: queryParams['sort'] || DEFAULT_REPOS_PARAMS.sort,
      order: queryParams['order'] || DEFAULT_REPOS_PARAMS.order,
    };
  }

  loadNextData(): void {
    this.currentPage.update(prev => prev + 1);
    this.fetchPage(this.currentPage());
  }

  getData(page: number): Observable<IRepo[]> {
    const params = {} as IDataSourceParams;
    const combinedParams: RepoParams = this.getParams();
    params['per_page'] = DEFAULT_REPOS_PARAMS.per_page;
    params['page'] = page;
    params['q'] = combinedParams['q'];
    params['sort'] = combinedParams['sort'];
    params['order'] = combinedParams['order'];

    return this.dataSourceService.getRepos(params).pipe(
      map((response: IRepoApiResponse) => {
        this.pageSize.set(response.total_count);
        this.updateQueryParams(combinedParams);
        return response.items;
      })
    );
  }

  private fetchPage(page: number): void {
    this.getData(page).subscribe((data: IRepo[]) => {
      this.data.update(curr => [...curr, ...data]);
    });
  }

  private updateQueryParams(params: Partial<IDataSourceParams>): void {
    const filteredParams: Partial<IDataSourceParams> = {
      q: params.q,
      sort: params.sort,
      order: params.order,
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filteredParams,
      queryParamsHandling: 'merge',
    });
  }
}
