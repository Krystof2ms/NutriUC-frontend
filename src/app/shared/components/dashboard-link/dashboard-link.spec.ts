import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardLink } from './dashboard-link';

describe('DashboardLink', () => {
  let component: DashboardLink;
  let fixture: ComponentFixture<DashboardLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLink],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardLink);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
