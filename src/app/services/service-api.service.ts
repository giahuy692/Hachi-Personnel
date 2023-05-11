import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

// DTO
import { ProductApi, ProductList } from 'src/app/share/DTO';
import {
  DataSourceRequestState,
  toDataSourceRequest,
} from '@progress/kendo-data-query';

@Injectable({
  providedIn: 'root',
})
export class ServiceAPIService {
  gridState: DataSourceRequestState = {};
  dataSourceRequest: any;
  Product = new Subject<any>();
  SearchShare = new Subject<any>();
  tempStatus = new Subject<number>();
  private apiUrl = 'http://test.lapson.vn/api/product/';
  private localERP = 'http://172.16.10.86:75/erp/';

  constructor(private http: HttpClient) {}
  ngOnInit() {}

  ngAfterViewInit() {}

  // Hàm lấy token từ API
  getToken(username: string, password: string): Observable<any> {
    const url = 'http://172.16.10.86:5001/connect/token';
    const data = `username=${username}&password=${password}&grant_type=password&scope=adminapi offline_access&client_id=admin&client_secret=adminsecret`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http
      .post(url, data, { headers })
      .pipe(map((response) => response));
  }

  // GET ProductList
  getDataApi() {
    return new Observable<any>((obs) => {
      this.http
        .post<ProductList>(this.apiUrl + 'GetListProduct', {
          sort: 'Code-desc',
        })
        .subscribe(
          (data) => {
            obs.next(data);
            obs.complete();
          },
          (error) => {
            console.log(error);
            obs.error(error);
          }
        );
    });
  }

  loaddData(v: any) {
    return new Observable<any>((obs) => {
      this.http
        .post<ProductList>(
          this.apiUrl + 'GetListProduct',
          toDataSourceRequest(v)
        )
        .subscribe(
          (data) => {
            obs.next(data);
            obs.complete();
          },
          (error) => {
            console.log(error);
            obs.error(error);
          }
        );
    });
  }

  // GET Product
  getProduct(id: any) {
    return new Observable<any>((obs) => {
      this.http
        .post<ProductList>(this.apiUrl + 'GetProduct', { Code: id })
        .subscribe(
          (data) => {
            obs.next(data);
            obs.complete();
            console.log('Get Product: ', data.ErrorString);
          },
          (error) => {
            console.log(error);
            obs.error(error);
          }
        );
    });
  }

  // Delete Product
  delteProduct(id: any) {
    return new Observable<any>((obs) => {
      this.http
        .post<ProductList>(this.apiUrl + 'GetProduct', { Code: id })
        .subscribe(
          (data) => {
            obs.next(data);
            obs.complete();
            console.log('Get Product: ', data.ErrorString);
          },
          (error) => {
            console.log(error);
            obs.error(error);
          }
        );
    });
  }

  // SEARCH Product
  SearchDataApi(search: any) {
    return new Observable<any>((obs) => {
      this.http
        .post<ProductList>(
          'http://test.lapson.vn/api/product/GetListProduct',
          toDataSourceRequest(search)
        )
        .subscribe(
          (data) => {
            console.log(data);
            obs.next(data);
            obs.complete();
          },
          (error) => {
            console.log(error);
            obs.error(error);
          }
        );
    });
  }

  // Update Product
  UpdateProduct(
    id: number,
    Barcode: string,
    Price: number,
    PriceBase: number,
    PriceVIP: number
  ) {
    return new Observable<any>((obs) => {
      this.http
        .post<ProductList>(this.apiUrl + 'UpdateProduct', {
          DTO: {
            Code: id,
            Barcode: Barcode,
            Price: Price,
            PriceBase: PriceBase,
            PriceVIP: PriceVIP,
          },
          Properties: ['Price', 'PriceBase', 'PriceVIP'],
        })
        .subscribe(
          (data) => {
            console.log(data);
            obs.next(data);
            obs.complete();
          },
          (error) => {
            console.log(error);
            obs.error(error);
          }
        );
    });
  }

  // Delete Product
  DeletedProduct(id: any) {
    return new Observable<any>((obs) => {
      this.http
        .post<ProductList>(this.apiUrl + 'DeleteListProduct', [
          {
            Code: id,
          },
        ])
        .subscribe(
          (data) => {
            console.log(data);
            obs.next(data);
            obs.complete();
          },
          (error) => {
            console.log(error);
            obs.error(error);
          }
        );
    });
  }

  AddProduct(barcode: string, Price: number, PriceBase: number) {
    return new Observable<any>((obs) => {
      this.http
        .post<ProductList>(this.apiUrl + 'UpdateProduct', {
          DTO: {
            Code: 0,
            Barcode: barcode,
            Price: Price,
            PriceBase: PriceBase,
          },
          Properties: ['Price', 'PriceBase'],
        })
        .subscribe(
          (data) => {
            console.log(data);
            obs.next(data);
            obs.complete();
          },
          (error) => {
            console.log(error);
            obs.error(error);
          }
        );
    });
  }

  GetProduct(barcode: string) {
    return new Observable((obs) => {
      this.http
        .post<ProductList>(this.apiUrl + 'GetProduct', {
          Code: 0,
          Barcode: barcode,
        })
        .subscribe(
          (data) => {
            console.log(data);
            obs.next(data);
            obs.complete();
          },
          (error) => {
            console.log(error);
            obs.error(error);
          }
        );
    });
  }
}
