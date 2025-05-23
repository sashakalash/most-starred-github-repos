import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { RepoListComponent } from './repo-list.component';
import { RepoDataSource } from '@app/core/data-source/repo-data-source';
import { IRepo } from '@app/shared/interfaces/repo.interface';
import { RatingService } from '@app/core/services/rating.service';

describe('RepoListComponent', () => {
  let component: RepoListComponent;
  let fixture: ComponentFixture<RepoListComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let ratingService: jasmine.SpyObj<RatingService>;
  let repoDataSource: jasmine.SpyObj<RepoDataSource>;
  let activatedRoute: ActivatedRoute;

  const mockRepo: IRepo = { id: 1, name: 'Test Repo' } as IRepo;

  beforeEach(async () => {
    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    ratingService = jasmine.createSpyObj('RatingService', ['setRating']);
    repoDataSource = jasmine.createSpyObj('RepoDataSource', [
      'connect',
      'disconnect',
    ]);
    activatedRoute = {
      snapshot: {
        queryParams: {},
      },
      queryParams: of({}),
    } as ActivatedRoute;

    await TestBed.configureTestingModule({
      imports: [RepoListComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialog, useValue: dialog },
        { provide: RatingService, useValue: ratingService },
        { provide: RepoDataSource, useValue: repoDataSource },
        { provide: ActivatedRoute, useValue: activatedRoute },
        provideHttpClientTesting(),
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RepoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dialog and set the rating when onRepoClick is called', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialog.open.and.returnValue(dialogRefSpy);
    dialogRefSpy.afterClosed.and.returnValue(of(5));

    component.onRepoClick(mockRepo);

    expect(dialog.open).toHaveBeenCalled();
    expect(ratingService.setRating).toHaveBeenCalledWith(mockRepo.id, 5);
  });

  it('should track items by id', () => {
    const result = component.trackById(0, mockRepo);
    expect(result).toBe(mockRepo.id);
  });
});
