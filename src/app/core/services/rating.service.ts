import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  ratedRepos = signal<Map<number, number>>(new Map());

  setRating(id: number, rating: number): void {
    this.ratedRepos.update(repos => {
      const newRepos = new Map(repos);
      newRepos.set(id, rating);
      return newRepos;
    });
  }
}
