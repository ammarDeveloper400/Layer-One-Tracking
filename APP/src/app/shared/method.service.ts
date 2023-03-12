import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class MethodService {
  public headers = new HttpHeaders({
    // 'Content-Type': 'application/json',
    // Accept: 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  });
  options = { headers: this.headers };
  constructor(private http: HttpClient) {}

  Get(url: string): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}` + 'api' + url, this.options)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }
  Post(url: string, model?: any): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}` + 'api' + url, model, this.options)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }
  FormData(url: string, form: any): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}` + 'api' + url, form, {
        reportProgress: true,
      })
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }
}
