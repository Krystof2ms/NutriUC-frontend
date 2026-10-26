import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormRecipe } from './form-recipe';

describe('FormRecipe', () => {
  let component: FormRecipe;
  let fixture: ComponentFixture<FormRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRecipe],
    }).compileComponents();

    fixture = TestBed.createComponent(FormRecipe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
