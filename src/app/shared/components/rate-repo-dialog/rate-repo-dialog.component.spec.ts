import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RateRepoDialogComponent } from './rate-repo-dialog.component';
import { IRepo } from '@app/shared/interfaces/repo.interface';

describe('RateRepoDialogComponent', () => {
  let component: RateRepoDialogComponent;
  let fixture: ComponentFixture<RateRepoDialogComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close'),
  };
  const mockRepo: IRepo = { id: 1, name: 'Test Repo' } as IRepo;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateRepoDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { repo: mockRepo },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RateRepoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with a result', () => {
    component.onRepoRated(5);
    expect(mockDialogRef.close).toHaveBeenCalledWith(5);
  });
});
