import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  input,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

const DEFAULT_STARS_COUNT = 5;

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  imports: [CommonModule, MatIconModule],
})
export class RatingComponent {
  rating = input<number>(0);
  disabled = input<boolean>(false);
  rated: OutputEmitterRef<number> = output<number>();

  stars = Array.from({ length: DEFAULT_STARS_COUNT });
  hovered = -1;
  selected!: number;

  constructor() {
    effect(() => {
      this.selected = this.rating();
    });
  }

  setRating(rating: number): void {
    this.selected = rating;
    this.rated.emit(rating);
  }

  onHover(index: number): void {
    this.hovered = index;
  }

  onLeave(): void {
    this.hovered = -1;
  }
}
