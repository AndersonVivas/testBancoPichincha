import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductInterface, ProductUpdateInterface } from 'src/app/core/models/product.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormInputComponent } from 'src/app/shared/components/form-input/form-input.component';
import { ProductService } from 'src/app/core/services/product/product.service';
import { ProductFormService } from 'src/app/core/services/product/productForm.service';


@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, FormInputComponent],
  providers: [DatePipe ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  private _activatedrouter = inject(ActivatedRoute);
  private _productService = inject(ProductService);
  private _productFormService = inject(ProductFormService);
  private _router = inject(Router);
  private datePipe = inject(DatePipe);

  public productId: string | null = '';
  public isEdit: boolean = false;
  public formProduct: FormGroup = this._productFormService.createForm();
  initialFormState: any;
  

  ngOnInit(): void {
    this.getAction();
    this.suscribeDateRealease();
  }

  suscribeDateRealease() {
    this.formProduct.get('date_revision')?.disable();
    this.formProduct.get('date_release')?.valueChanges.subscribe(date => {
      if (date) {
        this._productFormService.updateDateRevision(this.formProduct, date);
      }
    });
  }
  getAction() {
    this._activatedrouter.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId != null) {
        this.isEdit = true;
        this.getProduct();
      }
    });
  }

  getProduct() {
    this._productService.getProduct(this.productId).subscribe(response => {
      const formattedResponse = {
        ...response,
        date_revision: this.datePipe.transform(response.date_revision, 'yyyy-MM-dd'),
        date_release: this.datePipe.transform(response.date_release, 'yyyy-MM-dd')
      };
      this.formProduct.patchValue(formattedResponse);
      this.formProduct.get('id')?.disable();
    });
  }
  save() {
    if (!this.isEdit)
      this.addProduct()
    else
      this.updateProduct()

  }

  updateProduct() {
    const product: ProductUpdateInterface = this.formProduct.value;
    this._productService.updateProduct(this.productId, product).subscribe(response => {
      this._router.navigate(['/products']);
    });
  }

  addProduct() {
    const product: ProductInterface = this.formProduct.value;
    product.date_revision = this.formProduct.get('date_revision')?.value;
    this._productService.addProduct(product).subscribe(response => {
      if (response.message == 'Product added successfully') {
        this._router.navigate(['/products']);
      } else
        alert('A ocurrido un error!....')
    });
  }

  actionReiniciar() {
    if (this.isEdit)
      this.getProduct();
    else
      this.resetForm();
  }


  resetForm() {
    this.formProduct.get('id')?.enable();
    this.formProduct.reset();
  }



}
