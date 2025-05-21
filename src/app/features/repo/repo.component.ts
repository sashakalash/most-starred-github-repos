import { CommonModule } from '@angular/common';
import { Component, Inject, Input, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { IRepo } from '@app/shared/interfaces/repo.interface';
import { DaysSincePipe } from '@app/shared/pipes/daysSince.pipe';

@Component({
  selector: 'app-repo',
  imports: [MatListModule, CommonModule, DaysSincePipe],
  templateUrl: './repo.component.html',
  styleUrl: './repo.component.scss',
})
export class RepoComponent {
  private _repo: IRepo = {} as IRepo;

  @Input()
  set repo(value: IRepo) {
    this._repo = value;
  }
  get repo(): IRepo {
    return this.data?.repo ?? this._repo;
  }

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data?: { repo: IRepo }
  ) {}
}
