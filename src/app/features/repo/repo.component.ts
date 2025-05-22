import { RatingComponent } from '@app/shared/components/rating/rating.component';
import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { IRepo } from '@app/shared/interfaces/repo.interface';
import { DaysSincePipe } from '@app/shared/pipes/daysSince.pipe';
import { RatingService } from '@app/core/services/rating.service';

@Component({
  selector: 'app-repo',
  imports: [MatListModule, CommonModule, DaysSincePipe, RatingComponent],
  templateUrl: './repo.component.html',
  styleUrl: './repo.component.scss',
})
export class RepoComponent {
  repo = input.required<IRepo>();
  isModal = input<boolean>(false);
  rating = computed(() => {
    const repos = this.ratingService.ratedRepos();
    if (repos) {
      return repos.get(this.repo().id) ?? 0;
    }
    return 0;
  });

  private ratingService = inject(RatingService);
  rated: OutputEmitterRef<number> = output();

  onRepoRated(rating: number): void {
    this.rated.emit(rating);
  }
}
