import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateRepoDialogComponent } from './rate-repo-dialog.component';

describe('RateRepoDialogComponent', () => {
  let component: RateRepoDialogComponent;
  let fixture: ComponentFixture<RateRepoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateRepoDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RateRepoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
