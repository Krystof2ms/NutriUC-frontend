import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyRecipeCreate } from './my-recipe-create';

describe('MyRecipeCreate', () => {
  let component: MyRecipeCreate;
  let fixture: ComponentFixture<MyRecipeCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRecipeCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(MyRecipeCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
