import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { RepoComponent } from './repo.component';
import { IRepo } from '@app/shared/interfaces/repo.interface';
import { RatingService } from '@app/core/services/rating.service';

describe('RepoComponent', () => {
  let component: RepoComponent;
  let fixture: ComponentFixture<RepoComponent>;
  let ratingService: jasmine.SpyObj<RatingService>;

  const mockRepo: IRepo = {
    id: 1,
    name: 'Test Repo',
    description: 'Test Description',
    stargazers_count: 100,
    created_at: '2024-01-01T00:00:00Z',
    owner: { login: 'testuser', avatar_url: 'http://example.com/avatar' },
  } as IRepo;

  beforeEach(async () => {
    ratingService = jasmine.createSpyObj('RatingService', ['ratedRepos']);

    TestBed.configureTestingModule({
      imports: [RepoComponent],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(),
        { provide: RatingService, useValue: ratingService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RepoComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('repo', mockRepo);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the repo name', () => {
    const repoNameElement = fixture.nativeElement.querySelector('.repo-title');
    expect(repoNameElement.textContent).toContain('Test Repo');
  });

  it('should display the repo description', () => {
    const repoDescriptionElement =
      fixture.nativeElement.querySelector('.repo-description');
    expect(repoDescriptionElement.textContent).toContain('Test Description');
  });

  it('should display the rating', () => {
    ratingService.ratedRepos.and.returnValue(new Map([[1, 5]]));
    fixture.detectChanges();
    expect(component.rating()).toBe(0);
  });
});
