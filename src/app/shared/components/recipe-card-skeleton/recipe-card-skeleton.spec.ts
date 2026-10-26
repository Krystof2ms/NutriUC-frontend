import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeCardSkeleton } from './recipe-card-skeleton';

describe('RecipeCardSkeleton', () => {
  let component: RecipeCardSkeleton;
  let fixture: ComponentFixture<RecipeCardSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCardSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeCardSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
