import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';

import { IRepo } from '@app/shared/interfaces/repo.interface';
import { RepoComponent } from '@app/features/repo/repo.component';
import { RepoApiService } from '@app/core/services/repo-api.service';
import { RepoDataSource } from '@app/core/data-sources/repo-data-source';

@Component({
  selector: 'app-repo-list',
  imports: [CommonModule, ScrollingModule, RepoComponent, MatProgressBarModule],
  templateUrl: './repo-list.component.html',
  styleUrl: './repo-list.component.scss',
  providers: [RepoApiService],
})
export class RepoListComponent {
  private repoApiService = inject(RepoApiService);
  private dialog = inject(MatDialog);

  data = new RepoDataSource(this.repoApiService);

  trackById(index: number, item: IRepo): number {
    return item.id;
  }

  onRepoClick(repo: IRepo): void {
    this.dialog.open(RepoComponent, {
      data: { repo },
      width: '600px',
      maxWidth: '90vw',
    });
  }
}
