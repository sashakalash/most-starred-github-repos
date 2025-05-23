import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { RepoListService, DEFAULT_REPOS_PARAMS } from './repo-list.service';
import { RepoApiService } from './repo-api.service';
import { IRepoApiResponse } from '@app/shared/interfaces/repo-api-response.interface';
import { IRepo } from '@app/shared/interfaces/repo.interface';

describe('RepoListService', () => {
  let service: RepoListService;
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
        RepoListService,
        { provide: RepoApiService, useValue: repoApiService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRoute },
        provideHttpClientTesting(),
        provideHttpClient(),
      ],
    });

    service = TestBed.inject(RepoListService);
    repoApiService.getRepos.and.returnValue(of(mockApiResponse));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load initial data on creation', () => {
    expect(repoApiService.getRepos).toHaveBeenCalledWith({
      q: DEFAULT_REPOS_PARAMS.q,
      sort: DEFAULT_REPOS_PARAMS.sort,
      order: DEFAULT_REPOS_PARAMS.order,
      page: 1,
      per_page: 10,
    });
  });

  it('should load next data', () => {
    service.loadNextData();
    expect(repoApiService.getRepos).toHaveBeenCalledWith({
      q: DEFAULT_REPOS_PARAMS.q,
      sort: DEFAULT_REPOS_PARAMS.sort,
      order: DEFAULT_REPOS_PARAMS.order,
      page: 2,
      per_page: 10,
    });
  });

  it('should update query params', () => {
    const params = { q: 'test', sort: 'name', order: 'asc' };
    (service as any).updateQueryParams(params);
    expect(router.navigate).toHaveBeenCalledWith([], {
      relativeTo: activatedRoute,
      queryParams: { q: 'test', sort: 'name', order: 'asc' },
      queryParamsHandling: 'merge',
    });
  });

  it('should get data', () => {
    const page = 1;
    service.getData(page).subscribe((data) => {
      expect(data).toEqual(mockRepos);
    });
    expect(repoApiService.getRepos).toHaveBeenCalledWith({
      q: DEFAULT_REPOS_PARAMS.q,
      sort: DEFAULT_REPOS_PARAMS.sort,
      order: DEFAULT_REPOS_PARAMS.order,
      page: 1,
      per_page: 10,
    });
  });
});
