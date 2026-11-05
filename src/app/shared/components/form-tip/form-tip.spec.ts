import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTip } from './form-tip';

describe('FormTip', () => {
  let component: FormTip;
  let fixture: ComponentFixture<FormTip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTip],
    }).compileComponents();

    fixture = TestBed.createComponent(FormTip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
