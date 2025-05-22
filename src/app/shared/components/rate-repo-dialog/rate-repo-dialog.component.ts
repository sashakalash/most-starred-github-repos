import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RepoComponent } from '@app/features/repo/repo.component';
import { IRepo } from '@app/shared/interfaces/repo.interface';

@Component({
  selector: 'app-rate-repo-dialog',
  imports: [RepoComponent],
  templateUrl: './rate-repo-dialog.component.html',
  styleUrl: './rate-repo-dialog.component.scss',
})
export class RateRepoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RateRepoDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { repo: IRepo }
  ) {}

  onRepoRated(data: number): void {
    this.dialogRef.close(data);
  }
}
