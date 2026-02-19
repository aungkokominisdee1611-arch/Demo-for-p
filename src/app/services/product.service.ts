import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceUrl } from 'src/assets/app.config';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly products = ServiceUrl.products;
  private readonly create = ServiceUrl.create;
  private readonly edit = ServiceUrl.edit;
  private readonly deletes = ServiceUrl.delete;

  constructor(private _http: HttpClient) {}

  getProductsFunction() {
    return this._http.get<Product[]>(this.products);
  }

  getProductByIdFunction(params: any) {
    return this._http.get<Product>(`${this.products}/${params}`);
  }

  createProductFunction(body: any) {
    return this._http.post<Product>(this.create, body);
  }

  updateProductFunction(params: any, body: any) {
    return this._http.put<Product>(`${this.edit}/${params}`, body);
  }

  deleteProductFunction(params: any) {
    return this._http.delete(`${this.deletes}/${params}`);
  }
}
