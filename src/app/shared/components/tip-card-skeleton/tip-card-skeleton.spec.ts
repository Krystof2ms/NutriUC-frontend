import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipCardSkeleton } from './tip-card-skeleton';

describe('TipCardSkeleton', () => {
  let component: TipCardSkeleton;
  let fixture: ComponentFixture<TipCardSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipCardSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(TipCardSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
