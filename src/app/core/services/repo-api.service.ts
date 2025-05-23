import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment.dev';
import { IRepoApiResponse } from '@app/shared/interfaces/repo-api-response.interface';
import { IDataSourceParams } from '@app/shared/interfaces/data-source-params.interface';

@Injectable()
export class RepoApiService {
  private http = inject(HttpClient);

  /**
   * Fetches repositories from the GitHub API based on the provided parameters.
   * @param params - The parameters for the API request.
   * @returns An observable of the API response containing repository data.
   */
  getRepos(params: IDataSourceParams): Observable<IRepoApiResponse> {
    return this.http.get<IRepoApiResponse>(
      `${environment.apiBaseUrl}/${environment.apiEndpoints.repo}?q=${params.q}&sort=${params.sort}&order=${params.order}&page=${params.page}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );
  }
}
