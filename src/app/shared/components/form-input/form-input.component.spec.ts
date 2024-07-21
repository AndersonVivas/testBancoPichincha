import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputComponent } from './form-input.component';
import { DynamicClassesService } from 'src/app/core/services/dynamic-classes.service';
import {  FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from '../error-message/error-message.component';

describe('FormInputComponent', () => {
  let component: FormInputComponent;
  let fixture: ComponentFixture<FormInputComponent>;
  let dynamicClassesService: DynamicClassesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInputComponent, ReactiveFormsModule, CommonModule, ErrorMessageComponent],
      providers: [{ provide: DynamicClassesService}],
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormInputComponent);
    component = fixture.componentInstance;
    dynamicClassesService = TestBed.inject(DynamicClassesService);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería lanzar un error si getFormControl es llamado con un control que no es FormControl', () => {
    component.control = null;
    expect(() => component.getFormControl()).toThrow('El control proporcionado no es un FormControl');
  });
  it('debería retornar el FormControl si el control es un FormControl', () => {
    const formControl = new FormControl();
    component.control = formControl;
    expect(component.getFormControl()).toBe(formControl);
  });

  it('debería inicializar correctamente las propiedades de entrada', () => {
    component.label = 'Test Label';
    component.placeholder = 'Test Placeholder';
    component.type = 'text';
    component.errorTypes = ['required', 'minlength'];
    component.errorMessages = { required: 'Campo requerido', minlength: 'Debe tener al menos 3 caracteres' };

    expect(component.label).toBe('Test Label');
    expect(component.placeholder).toBe('Test Placeholder');
    expect(component.type).toBe('text');
    expect(component.errorTypes).toEqual(['required', 'minlength']);
    expect(component.errorMessages).toEqual({ required: 'Campo requerido', minlength: 'Debe tener al menos 3 caracteres' });
  });
  it('validar que mi componente devuelva los parametros de la directiva NgClass', () => {
    const formControl = new FormControl('', { validators: [], updateOn: 'blur' });
    formControl.markAsTouched();
    formControl.disable();

    component.control = formControl;
    const dynamicClasses = component.getDynamicClasses(formControl);

    expect(dynamicClasses).toEqual({
      'disabledFormSection': true,
      'errorFormSection': false
    });
  });

  it('validar cuando mi control es null', () => {
    const result = component.getDynamicClasses(null);
    expect(result).toEqual({});
  });

  it('validar que mi componente devuelva los parametros de la directiva NgClass', () => {
    const formControl = new FormControl('', { validators: [], updateOn: 'blur' });
    formControl.markAsTouched();
    formControl.disable();

    component.control = formControl;
    const dynamicClasses = dynamicClassesService.getDynamicClasses(formControl);

    expect(dynamicClasses).toEqual({
      'disabledFormSection': true,
      'errorFormSection': false
    });
  });
 
  it('Validamos si el formcontrol es invalid por los validators ', () => {
    const formControl = new FormControl('', { validators: [control => ({ required: true })] });
    formControl.markAsTouched();
    const result = dynamicClassesService.getDynamicClasses(formControl);
    expect(result).toEqual({
      'disabledFormSection': false,
      'errorFormSection': true
    });
  });
  
});
