import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecetaId } from './receta-id';

describe('RecetaId', () => {
  let component: RecetaId;
  let fixture: ComponentFixture<RecetaId>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecetaId],
    }).compileComponents();

    fixture = TestBed.createComponent(RecetaId);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
