import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationButtons } from './navigation-buttons';

describe('NavigationButtons', () => {
  let component: NavigationButtons;
  let fixture: ComponentFixture<NavigationButtons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationButtons],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationButtons);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
