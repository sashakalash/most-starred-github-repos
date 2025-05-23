import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { RatingComponent } from './rating.component';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RatingComponent,
        MatIconModule,
        CommonModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.rating()).toBe(0);
    expect(component.disabled()).toBe(false);
    expect(component.stars.length).toBe(5);
    expect(component.hovered).toBe(-1);
  });

  it('should set the rating and emit the rated event', () => {
    spyOn(component.rated, 'emit');
    component.setRating(3);
    expect(component.selected).toBe(3);
    expect(component.rated.emit).toHaveBeenCalledWith(3);
  });

  it('should set the hovered index', () => {
    component.onHover(2);
    expect(component.hovered).toBe(2);
  });

  it('should reset the hovered index on leave', () => {
    component.onHover(2);
    component.onLeave();
    expect(component.hovered).toBe(-1);
  });
});
