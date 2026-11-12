import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipCard } from './tip-card';

describe('TipCard', () => {
  let component: TipCard;
  let fixture: ComponentFixture<TipCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TipCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 1);
    fixture.componentRef.setInput('category', 'Salud');
    fixture.componentRef.setInput('title', 'Come despacio');
    fixture.componentRef.setInput('content', 'Masticar bien ayuda a la digestión.');
    fixture.componentRef.setInput('ownerName', 'Ana');
    fixture.componentRef.setInput('createdAt', '2026-03-15T10:00:00Z');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('no muestra "Ver más" si el contenido es corto', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button')).toBeNull();
  });

  it('muestra "Ver más" si el contenido es largo', () => {
    fixture.componentRef.setInput('content', 'a'.repeat(200));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button')?.textContent.trim()).toBe('Ver más');
  });
});
