import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDialog } from '@angular/material/dialog';

import { IRepo } from '@app/shared/interfaces/repo.interface';
import { RepoComponent } from '@app/features/repo/repo.component';
import { RepoApiService } from '@app/core/services/repo-api.service';
import { RepoDataSource } from '@app/core/data-source/repo-data-source';
import { RatingService } from '@app/core/services/rating.service';
import { RateRepoDialogComponent } from '@app/shared/components/rate-repo-dialog/rate-repo-dialog.component';

@Component({
  selector: 'app-repo-list',
  imports: [CommonModule, ScrollingModule, RepoComponent],
  templateUrl: './repo-list.component.html',
  styleUrl: './repo-list.component.scss',
  providers: [RepoApiService],
})
export class RepoListComponent {
  private dialog = inject(MatDialog);
  private ratingService = inject(RatingService);

  data = new RepoDataSource();

  trackById(_index: number, item: IRepo): number {
    return item.id;
  }

  onRepoClick(repo: IRepo): void {
    const dialogRef = this.dialog.open(RateRepoDialogComponent, {
      data: { repo },
      width: '600px',
      maxWidth: '90vw',
    });
    dialogRef.afterClosed().subscribe((rating: number) => {
      if (rating !== undefined) {
        this.ratingService.setRating(repo.id, rating);
      }
    });
  }
}
