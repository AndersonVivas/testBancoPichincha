import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '',pathMatch:'full', redirectTo:'products'},
    {path: 'products',loadComponent:()=> import('./pages/product/product.component').then(comp=> comp.ProductComponent)},
    {path: 'products/add',loadComponent:()=> import('./pages/product/product-form/product-form.component').then(comp=> comp.ProductFormComponent)},
    {path: 'products/edit/:id',loadComponent:()=> import('./pages/product/product-form/product-form.component').then(comp=> comp.ProductFormComponent)}
];
