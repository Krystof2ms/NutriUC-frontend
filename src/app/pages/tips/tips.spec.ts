import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { API_URL } from '@app/config/api.config';
import { Tips } from './tips';

describe('Tips', () => {
  let component: Tips;
  let fixture: ComponentFixture<Tips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tips],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_URL, useValue: 'http://localhost:3000/api/v1' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Tips);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
