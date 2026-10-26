import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyTips } from './my-tips';

describe('MyTips', () => {
  let component: MyTips;
  let fixture: ComponentFixture<MyTips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTips],
    }).compileComponents();

    fixture = TestBed.createComponent(MyTips);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
