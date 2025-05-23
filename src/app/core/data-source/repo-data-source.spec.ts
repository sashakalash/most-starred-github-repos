import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { CollectionViewer, ListRange } from '@angular/cdk/collections';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { RepoDataSource, DEFAULT_REPOS_PARAMS } from './repo-data-source';
import { RepoApiService } from '@app/core/services/repo-api.service';
import { IRepo } from '@app/shared/interfaces/repo.interface';
import { IRepoApiResponse } from '@app/shared/interfaces/repo-api-response.interface';

describe('RepoDataSource', () => {
  let dataSource: RepoDataSource;
  let repoApiService: jasmine.SpyObj<RepoApiService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  const mockRepos: IRepo[] = [
    { id: 1, name: 'Repo 1' } as IRepo,
    { id: 2, name: 'Repo 2' } as IRepo,
  ];

  const mockApiResponse: IRepoApiResponse = {
    total_count: 2,
    incomplete_results: false,
    items: mockRepos,
  };

  beforeEach(() => {
    repoApiService = jasmine.createSpyObj('RepoApiService', ['getRepos']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    activatedRoute = {
      snapshot: {
        queryParams: {},
      },
      queryParams: of({}),
    } as ActivatedRoute;

    repoApiService.getRepos.and.returnValue(of(mockApiResponse));

    TestBed.configureTestingModule({
      providers: [
        { provide: RepoApiService, useValue: repoApiService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRoute },
        provideHttpClientTesting(),
        provideHttpClient(),
        RepoDataSource,
      ],
    });

    dataSource = TestBed.inject(RepoDataSource);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(dataSource).toBeTruthy();
  });

  it('should fetch the first page on initialization', () => {
    repoApiService.getRepos.and.returnValue(of(mockApiResponse));
    expect(repoApiService.getRepos).toHaveBeenCalledWith({
      q: DEFAULT_REPOS_PARAMS.q,
      sort: DEFAULT_REPOS_PARAMS.sort,
      order: DEFAULT_REPOS_PARAMS.order,
      page: 1,
      per_page: DEFAULT_REPOS_PARAMS.per_page,
    });
  });

  it('should load next data', () => {
    repoApiService.getRepos.and.returnValue(of(mockApiResponse));
    dataSource.loadNextData();
    expect(repoApiService.getRepos).toHaveBeenCalledWith({
      q: DEFAULT_REPOS_PARAMS.q,
      sort: DEFAULT_REPOS_PARAMS.sort,
      order: DEFAULT_REPOS_PARAMS.order,
      page: 2,
      per_page: DEFAULT_REPOS_PARAMS.per_page,
    });
  });

  it('should update query params', () => {
    repoApiService.getRepos.and.returnValue(of(mockApiResponse));
    const params = { q: 'test', sort: 'name', order: 'asc', page: 1 };
    (dataSource as any).updateQueryParams(params);
    expect(router.navigate).toHaveBeenCalledWith([], {
      relativeTo: activatedRoute,
      queryParams: { q: 'test', sort: 'name', order: 'asc', page: 1 },
      queryParamsHandling: 'merge',
    });
  });

  it('should connect and disconnect', () => {
    repoApiService.getRepos.and.returnValue(of(mockApiResponse));
    const viewChange = new BehaviorSubject<ListRange>({ start: 0, end: 10 });
    const collectionViewer: any = {
      viewChange: viewChange.asObservable(),
    };
    const connect$ = dataSource.connect(collectionViewer as CollectionViewer);
    connect$.subscribe((data) => {
      expect(data).toEqual(mockRepos);
    });
    dataSource.disconnect();
  });
});
