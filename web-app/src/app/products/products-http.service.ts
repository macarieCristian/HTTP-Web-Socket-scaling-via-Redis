import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Product} from '../domain/product.model';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {ProductsService} from './products.service';
import {Observable, throwError} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductsHttpService {

  constructor(private http: HttpClient,
              private productsService: ProductsService,
              private toastrService: ToastrService) {
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(`${environment.restApiBaseUrl}/products`,
      {
        observe: 'response'
      })
      .pipe(map(response => {
          console.log(`GET: (getAllProducts) successful from server: ${response.headers.get('ServerId')}`);
          return response.body.products;
        }),
        tap(products => {
          this.productsService.setProducts(products);
        }));
  }

  createProduct(product: Product): Observable<void> {
    return this.http.post<void>(`${environment.restApiBaseUrl}/products`, product,
      {
        observe: 'response'
      })
      .pipe(catchError(err => this.handleHttpError(err)),
        map(response =>
          console.log(`POST: (createProduct) successful from server: ${response.headers.get('ServerId')}`)));
  }

  updateProduct(id: string, product: Product): Observable<void> {
    return this.http.put<void>(`${environment.restApiBaseUrl}/products/${id}`, product,
      {
        observe: 'response'
      })
      .pipe(catchError(err => this.handleHttpError(err)),
        map(response =>
          console.log(`PUT: (updateProduct) successful from server: ${response.headers.get('ServerId')}`)));
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.restApiBaseUrl}/products/${id}`,
      {
        observe: 'response'
      })
      .pipe(catchError(err => this.handleHttpError(err)),
        map(response =>
          console.log(`DELETE: (deleteProduct) successful from server: ${response.headers.get('ServerId')}`)));
  }

  private handleHttpError(errorRes: HttpErrorResponse): Observable<never> {
    this.toastrService.error(errorRes.error.message || 'Error', `${errorRes.status || 500}`);
    return throwError(errorRes);
  }
}
