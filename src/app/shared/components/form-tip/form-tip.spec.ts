import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTip } from './form-tip';

describe('FormTip', () => {
  let component: FormTip;
  let fixture: ComponentFixture<FormTip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTip],
    }).compileComponents();

    fixture = TestBed.createComponent(FormTip);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('categories', ['Salud', 'Cocina']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('no emite y muestra errores si el formulario está vacío', () => {
    let emitido = false;
    component.submitTip.subscribe(() => (emitido = true));

    component.onSubmit();
    fixture.detectChanges();

    expect(emitido).toBe(false);
    expect(component.errores().title).toBeTruthy();
    expect(component.errores().content).toBeTruthy();
  });

  it('no emite si la categoría no está en la lista', () => {
    let emitido = false;
    component.submitTip.subscribe(() => (emitido = true));

    component.form.setValue({
      title: 'Tomar agua seguido',
      content: 'Bebe agua a lo largo del día para mantenerte hidratado.',
      category: 'Deportes',
    });
    component.onSubmit();

    expect(emitido).toBe(false);
    expect(component.errores().category).toBeTruthy();
  });

  it('emite cuando los datos son válidos', () => {
    let emitido = false;
    component.submitTip.subscribe(() => (emitido = true));

    component.form.setValue({
      title: 'Tomar agua seguido',
      content: 'Bebe agua a lo largo del día para mantenerte hidratado.',
      category: 'Salud',
    });
    component.onSubmit();

    expect(emitido).toBe(true);
    expect(component.errores()).toEqual({});
  });
});
