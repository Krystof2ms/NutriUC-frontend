import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { UserService } from '@app/services/user/user';
import { of } from 'rxjs';
import { Register } from './register';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  const userServiceMock = {
    create: () => of({ success: true, data: { message: 'User create' } }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [
        provideRouter([]),
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should keep submit disabled when form is empty', () => {
    expect(component.isSubmitDisabled()).toBe(true);
  });

  it('should enable submit when all fields are valid and passwords match', () => {
    component.model.set({
      name: 'Hector Sovero',
      email: 'hector@continental.edu.pe',
      password: 'Password123',
      confirmPassword: 'Password123',
    });

    expect(component.registerForm().valid()).toBe(true);
    expect(component.isSubmitDisabled()).toBe(false);
  });
});