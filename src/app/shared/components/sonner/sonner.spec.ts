import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sonner } from './sonner';

describe('Sonner', () => {
  let component: Sonner;
  let fixture: ComponentFixture<Sonner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sonner],
    }).compileComponents();

    fixture = TestBed.createComponent(Sonner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
