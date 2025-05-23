import { TestBed } from '@angular/core/testing';
import { RatingService } from './rating.service';

describe('RatingService', () => {
  let service: RatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get a rating', () => {
    const repoId = 123;
    const rating = 5;

    service.setRating(repoId, rating);

    const ratedRepos = service.ratedRepos();
    expect(ratedRepos.get(repoId)).toBe(rating);
  });

  it('should update an existing rating', () => {
    const repoId = 123;
    const initialRating = 3;
    const updatedRating = 5;

    service.setRating(repoId, initialRating);
    service.setRating(repoId, updatedRating);

    const ratedRepos = service.ratedRepos();
    expect(ratedRepos.get(repoId)).toBe(updatedRating);
  });
});
