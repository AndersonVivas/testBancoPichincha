import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductInterface, ProductUpdateInterface, ResponseAddProduct, ResponseGetAllProducts } from '../../models/product.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environment/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  

  private productsSubject = new BehaviorSubject<ProductInterface[]>([]);
  public products$ = this.productsSubject.asObservable();

  private _apiUrl=environment.apiUrl;

  constructor(private http:HttpClient) { }

  getProducts():Observable<ResponseGetAllProducts>{
    return this.http.get<ResponseGetAllProducts>(`${this._apiUrl}/bp/products`);
  }

  addProduct(newProduct:ProductInterface):Observable<ResponseAddProduct>{
    return this.http.post<ResponseAddProduct>(`${this._apiUrl}/bp/products`,newProduct,{headers:this.headers})
  }

  updateProduct(idProduct:string | null,updateProduct:ProductUpdateInterface):Observable<ResponseAddProduct>{
    return this.http.put<ResponseAddProduct>(`${this._apiUrl}/bp/products/${idProduct}`,updateProduct)
  }

  deleteProduct(idProduct:string):Observable<ResponseAddProduct>{
    return this.http.delete<ResponseAddProduct>(`${this._apiUrl}/bp/products/${idProduct}`)
  }
  getProduct(idProduct:string |null):Observable<ProductInterface>{
    return this.http.get<ProductInterface>(`${this._apiUrl}/bp/products/${idProduct}`)
  }
  verificationProduct(idProduct:string|null):Observable<boolean>{
    return this.http.get<boolean>(`${this._apiUrl}/bp/products/verification/${idProduct}`)
  }
}
