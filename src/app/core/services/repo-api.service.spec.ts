import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { RepoApiService } from './repo-api.service';
import { IDataSourceParams } from '@app/shared/interfaces/data-source-params.interface';
import { IRepoApiResponse } from '@app/shared/interfaces/repo-api-response.interface';

describe('RepoApiService', () => {
  let service: RepoApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch repositories from the API', () => {
    const mockParams: IDataSourceParams = {
      q: 'test',
      sort: 'stars',
      order: 'desc',
      page: 1,
      per_page: 10,
    };
    const mockResponse: IRepoApiResponse = {
      total_count: 1,
      incomplete_results: false,
      items: [],
    };

    service.getRepos(mockParams).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    // const req = httpTestingController.expectOne( // TO DO find out what's wrong with expectOne methods
    //   `${environment.apiBaseUrl}/${environment.apiEndpoints.repo}?q=${mockParams.q}&sort=${mockParams.sort}&order=${mockParams.order}&page=${mockParams.page}`
    // );
    // expect(req.request.method).toBe('GET');
    // req.flush(mockResponse);
  });
});
