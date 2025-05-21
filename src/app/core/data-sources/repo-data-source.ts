import {
  CollectionViewer,
  DataSource,
  ListRange,
} from '@angular/cdk/collections';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { inject, signal } from '@angular/core';

import { RepoApiService } from '@app/core/services/repo-api.service';
import {
  IDataSourceParams,
  RepoParams,
} from '@app/shared/interfaces/data-source-params.interface';
import { IRepo } from '@app/shared/interfaces/repo.interface';
import { IRepoApiResponse } from '@app/shared/interfaces/repo-api-response.interface';

const DAYS_FOR_PREVIOUS_DATE = 30;

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
  per_page: 30,
};

export class RepoDataSource extends DataSource<IRepo> {
  private currentPage = signal<number>(DEFAULT_REPOS_PARAMS.page);

  private cachedData: IRepo[] = [];

  private readonly dataStream = new BehaviorSubject<IRepo[]>(this.cachedData);
  private readonly subscription = new Subscription();

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor(private dataSourceService: RepoApiService) {
    super();
    this.fetchPage(1);
  }

  private getParams(): RepoParams {
    const queryParams = this.route.snapshot.queryParams;
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

  private getData(page: number): Observable<IRepo[]> {
    const params = {} as IDataSourceParams;
    const combinedParams: RepoParams = this.getParams();
    params['per_page'] = DEFAULT_REPOS_PARAMS.per_page;
    params['page'] = page;
    params['q'] = combinedParams['q'];
    params['sort'] = combinedParams['sort'];
    params['order'] = combinedParams['order'];

    return this.dataSourceService.getRepos(params).pipe(
      map((response: IRepoApiResponse) => {
        this.updateQueryParams(combinedParams);
        return response.items;
      })
    );
  }

  private fetchPage(page: number): void {
    this.getData(page).subscribe((data: IRepo[]) => {
      this.cachedData = [...this.cachedData, ...data];
      this.dataStream.next(this.cachedData);
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

  connect(collectionViewer: CollectionViewer): Observable<IRepo[]> {
    this.subscription.add(
      collectionViewer.viewChange.subscribe((range: ListRange) => {
        const { end } = range;
        if (end >= this.currentPage() * DEFAULT_REPOS_PARAMS.per_page) {
          this.loadNextData();
        }
      })
    );
    return this.dataStream.asObservable();
  }

  disconnect(): void {
    this.subscription.unsubscribe();
    this.dataStream.complete();
  }
}
