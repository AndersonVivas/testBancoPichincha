import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessageComponent } from './error-message.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMessageComponent,CommonModule, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería retornar false si control es null en shouldShowError', () => {
    component.control = null;
    component.errorType = 'required';
    expect(component.shouldShowError()).toBe(false);
  });

  it('debería retornar false si el control no tiene el error especificado', () => {
    const formControl = new FormControl();
    component.control = formControl;
    component.errorType = 'required';
    expect(component.shouldShowError()).toBe(false);
  });

  it('debería retornar false si el control no está tocado', () => {
    const formControl = new FormControl('', { validators: control => ({ required: true }) });
    component.control = formControl;
    component.errorType = 'required';
    formControl.markAsUntouched();
    expect(component.shouldShowError()).toBe(false);
  });

  it('debería retornar true si el control tiene el error especificado y está tocado', () => {
    const formControl = new FormControl('', { validators: control => ({ required: true }) });
    component.control = formControl;
    component.errorType = 'required';
    formControl.markAsTouched();
    expect(component.shouldShowError()).toBe(true);
  });
});
