import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorClient } from './error-client';

describe('ErrorClient', () => {
  let component: ErrorClient;
  let fixture: ComponentFixture<ErrorClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorClient],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorClient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
