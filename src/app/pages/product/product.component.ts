import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product/product.service';
import { ProductInterface } from '../../core/models/product.interface';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SelectPaginatorComponent } from 'src/app/shared/components/select-paginator/select-paginator.component';
import { FormControl } from '@angular/forms';
import { FormInputComponent } from 'src/app/shared/components/form-input/form-input.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, SelectPaginatorComponent, RouterModule, FormInputComponent, ModalComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  private _productService = inject(ProductService);
  private _router = inject(Router)
  private _modal = inject(ModalService)
  public listProducts: ProductInterface[] = [];
  public dataArray: ProductInterface[] = [];

  activeMenu: string | null = null;
  pageSizeOptions: number[] = [5, 10, 20]
  sizeOfData: number = this.pageSizeOptions[0];
  searchControl = new FormControl('');
  lengthData: number = 0;


  ngOnInit(): void {
    this.getProducts();
    this.searchControl.valueChanges.subscribe(value => {
      this.listProducts = this.filterArray(value).slice(0, this.sizeOfData);
    });
  }
  toggleMenu(event: MouseEvent, id: string) {
    event.stopPropagation();
    this.activeMenu = this.activeMenu === id ? null : id;
  }

  getProducts() {
    this._productService.getProducts().subscribe(response => {
      this.dataArray = response.data;
      this.lengthData = this.dataArray.length;
      this.onPageSizeChange(this.sizeOfData);
    });
  }
  editProduct(productId: string) {
    this._router.navigate(['/products/edit', productId]);
  }
  deleteProduct(productId: string, productName: string | null) {
    this._modal.openModal(`Está seguro de eliminar el producto ${productName} ?`).subscribe(response => {
      if (response) {
        this._productService.deleteProduct(productId).subscribe(response => {
          this.getProducts();
        });
      }
    });
  }

  onPageSizeChange(sizeOfData: number): void {
    this.sizeOfData = sizeOfData;
    this.listProducts = [...this.dataArray.slice(0, sizeOfData)];
  }

  filterArray(query: string | null) {
    if (!query) {
      return [...this.dataArray];
    }
    query = query.toLowerCase();
    return this.dataArray.filter(item => {
      return Object.values(item).some(val =>
        val.toString().toLowerCase().includes(query)
      );
    });
  }
}
