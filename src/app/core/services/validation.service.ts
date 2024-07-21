import { inject, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { catchError, debounceTime, map, Observable, of, switchMap } from "rxjs";
import { ProductService } from "./product/product.service";

@Injectable({
    providedIn: 'root'
  })
  export class ValidationService {
    private _productService = inject(ProductService);
    validateProductExist(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {       
            if (!control.value) {
              return of(null);
            }
            return this._productService.verificationProduct(control.value).pipe(
              debounceTime(300),
              switchMap(id => this._productService.verificationProduct(control.value)),
              map(exists => (exists ? { idExists: true } : null)),
              catchError(() => of(null))
            );
          };
    }
  }