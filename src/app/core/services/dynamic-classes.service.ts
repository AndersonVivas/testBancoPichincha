import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class DynamicClassesService {
    getDynamicClasses(control: AbstractControl | null): { [key: string]: boolean } {
        if (!control) return {};

        return {
            'disabledFormSection': control.disabled,
            'errorFormSection': control.invalid && control.touched
        };
    }
}