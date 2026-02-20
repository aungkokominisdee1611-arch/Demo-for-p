import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Product,
  ProductCreateUpdate,
  Category,
  CategoryResponse,
} from '../models/product.model';
import { ServiceUrl } from 'src/assets/app.config';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly products = ServiceUrl.products;
  private readonly create = ServiceUrl.create;
  private readonly edit = ServiceUrl.edit;
  private readonly deletes = ServiceUrl.delete;
  private readonly category = ServiceUrl.category;
  private readonly createC = ServiceUrl.cc;

  constructor(private _http: HttpClient) {}

  getProductsFunction() {
    return this._http.get<Product[]>(this.products);
  }

  getProductByIdFunction(params: any) {
    return this._http.get<Product>(`${this.products}/${params}`);
  }

  createProductFunction(body: ProductCreateUpdate) {
    return this._http.post<Product>(this.create, body);
  }

  updateProductFunction(params: any, body: ProductCreateUpdate) {
    return this._http.put<Product>(`${this.edit}/${params}`, body);
  }

  deleteProductFunction(params: any) {
    return this._http.delete(`${this.deletes}/${params}`);
  }
  getCategoriesFunction() {
    return this._http.get<Category[]>(this.category);
  }

  createCategory(body: { name: string }) {
    return this._http.post<CategoryResponse>(this.createC, body);
  }
}
