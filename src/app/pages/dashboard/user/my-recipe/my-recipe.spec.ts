import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyRecipe } from './my-recipe';

describe('MyRecipe', () => {
  let component: MyRecipe;
  let fixture: ComponentFixture<MyRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRecipe],
    }).compileComponents();

    fixture = TestBed.createComponent(MyRecipe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
