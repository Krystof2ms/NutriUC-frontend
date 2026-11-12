import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { API_URL } from '@app/config/api.config';
import { MyTipCreate } from './my-tip-create';

describe('MyTipCreate', () => {
  let component: MyTipCreate;
  let fixture: ComponentFixture<MyTipCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTipCreate],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_URL, useValue: 'http://localhost:3000/api/v1' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MyTipCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
