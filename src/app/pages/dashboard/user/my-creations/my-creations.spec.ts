import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyCreations } from './my-creations';

describe('MyCreations', () => {
  let component: MyCreations;
  let fixture: ComponentFixture<MyCreations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCreations],
    }).compileComponents();

    fixture = TestBed.createComponent(MyCreations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
