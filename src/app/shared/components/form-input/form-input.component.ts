import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { DynamicClassesService } from 'src/app/core/services/dynamic-classes.service';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,ErrorMessageComponent],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.css'
})
export class FormInputComponent {

  private _dinamicServices = inject(DynamicClassesService)
  @Input() control: AbstractControl | null = null;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() errorTypes: string[] = [];
  @Input() errorMessages: { [key: string]: string } = {}; 

  getFormControl(): FormControl {
    if (this.control instanceof FormControl) {
      return this.control;      
    }
    throw new Error('El control proporcionado no es un FormControl');
      
  }
  getDynamicClasses(control: AbstractControl | null): { [key: string]: boolean }   
  {
    return this._dinamicServices.getDynamicClasses(control);
  }
  

}
