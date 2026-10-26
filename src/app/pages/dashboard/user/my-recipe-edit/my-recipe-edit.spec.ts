import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyRecipeEdit } from './my-recipe-edit';

describe('MyRecipeEdit', () => {
  let component: MyRecipeEdit;
  let fixture: ComponentFixture<MyRecipeEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRecipeEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(MyRecipeEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
