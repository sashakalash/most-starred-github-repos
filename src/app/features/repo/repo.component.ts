import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
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
  repo = input<IRepo>();
}
