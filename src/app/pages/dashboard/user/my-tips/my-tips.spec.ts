import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { API_URL } from '@app/config/api.config';
import { MyTips } from './my-tips';

describe('MyTips', () => {
  let component: MyTips;
  let fixture: ComponentFixture<MyTips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTips],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_URL, useValue: 'http://localhost:3000/api/v1' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MyTips);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
