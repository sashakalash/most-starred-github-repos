import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { RepoApiService } from './repo-api.service';
import { environment } from '@environments/environment.dev';
import { IRepoApiResponse } from '@app/shared/interfaces/repo-api-response.interface';
import { IRepo } from '@app/shared/interfaces/repo.interface';
import { IDataSourceParams } from '@app/shared/interfaces/data-source-params.interface';
import { provideHttpClient } from '@angular/common/http';

describe('RepoApiService', () => {
  let service: RepoApiService;
  let httpTestingController: HttpTestingController;

  const mockRepos: IRepo[] = [
    {
      id: 1,
      name: 'Repo 1',
      description: '',
      stargazers_count: 10,
      created_at: '2024-01-01',
      owner: { login: 'user1', avatar_url: '' },
    } as IRepo,
    {
      id: 2,
      name: 'Repo 2',
      description: '',
      stargazers_count: 20,
      created_at: '2024-01-02',
      owner: { login: 'user2', avatar_url: '' },
    } as IRepo,
  ];

  const mockApiResponse: IRepoApiResponse = {
    total_count: 2,
    incomplete_results: false,
    items: mockRepos,
  };

  const defaultParams: IDataSourceParams = {
    q: 'created:>2025-04-23',
    sort: 'stars',
    order: 'desc',
    page: 1,
    per_page: 30,
  };

  beforeEach(() => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      providers: [
        RepoApiService,
        provideHttpClientTesting(),
        provideHttpClient(),
      ],
    });

    service = TestBed.inject(RepoApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should make a GET request with correct URL, query params, and headers', fakeAsync(() => {
    service.getRepos(defaultParams).subscribe((response) => {
      expect(response).toEqual(mockApiResponse);
    });

    const expectedUrl = `${environment.apiBaseUrl}/${environment.apiEndpoints.repo}?q=${defaultParams.q}&sort=${defaultParams.sort}&order=${defaultParams.order}&page=${defaultParams.page}`;
    const req = httpTestingController.expectOne(expectedUrl); // TO DO find out what's wrong with expectOne method

    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Accept')).toBe(
      'application/vnd.github+json'
    );
    expect(req.request.headers.get('X-GitHub-Api-Version')).toBe('2022-11-28');

    req.flush(mockApiResponse);
    tick();
  }));

  xit('should handle API errors gracefully', fakeAsync(() => {
    service.getRepos(defaultParams).subscribe({
      next: () => fail('Expected error, but got success'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
      },
    });

    const expectedUrl = `${environment.apiBaseUrl}/${environment.apiEndpoints.repo}?q=${defaultParams.q}&sort=${defaultParams.sort}&order=${defaultParams.order}&page=${defaultParams.page}`;
    const req = httpTestingController.expectOne(expectedUrl); // TO DO find out what's wrong with expectOne method

    req.flush('Server Error', { status: 500, statusText: 'Server Error' });
    tick();
  }));

  xit('should encode query params to prevent injection', fakeAsync(() => {
    const maliciousParams: IDataSourceParams = {
      q: 'test malicious; DROP TABLE users',
      sort: 'stars',
      order: 'desc',
      page: 1,
      per_page: 30,
    };

    service.getRepos(maliciousParams).subscribe((response) => {
      expect(response).toEqual(mockApiResponse);
    });

    const encodedQ = encodeURIComponent(maliciousParams.q);
    const expectedUrl = `${environment.apiBaseUrl}/${environment.apiEndpoints.repo}?q=${encodedQ}&sort=${maliciousParams.sort}&order=${maliciousParams.order}&page=${maliciousParams.page}`;
    const req = httpTestingController.expectOne(expectedUrl); // TO DO find out what's wrong with expectOne method

    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);
    tick();
  }));
});
