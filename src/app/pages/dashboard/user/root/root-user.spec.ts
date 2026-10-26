import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RootUser } from './root-user';

describe('RootUser', () => {
  let component: RootUser;
  let fixture: ComponentFixture<RootUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootUser],
    }).compileComponents();

    fixture = TestBed.createComponent(RootUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
