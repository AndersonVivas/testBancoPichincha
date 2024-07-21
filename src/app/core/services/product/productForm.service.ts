import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidationService } from 'src/app/core/services/validation.service';

@Injectable({ providedIn: 'root' })
export class ProductFormService {
    private fb = inject(FormBuilder);
    private _validationService = inject(ValidationService);

    createForm(): FormGroup {        
        return this.fb.group({
            id: ['', {
                validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
                asyncValidators: [this._validationService.validateProductExist()],
                updateOn: 'blur',
            }],
            name: ['', {
                validators: [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
            }],
            description: ['', {
                validators: [Validators.required, Validators.minLength(10), Validators.maxLength(200)],
            }],
            logo: ['', {
                validators: [Validators.required],
            }],
            date_release: ['', {
                validators: [Validators.required],
            }],
            date_revision: ['', {
                validators: [Validators.required],
            }]
        });
    }

    updateDateRevision(form: FormGroup, date: string): void {
        const releaseDate = new Date(date);
        const reviewDate = new Date(releaseDate);
        reviewDate.setFullYear(releaseDate.getFullYear() + 1);
        form.get('date_revision')?.setValue(reviewDate.toISOString().split('T')[0], { emitEvent: false });
    }
}