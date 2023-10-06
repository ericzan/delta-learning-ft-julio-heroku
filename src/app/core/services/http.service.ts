import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KeyStorage } from '@shared/services/key-storage.enum';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { catchError, retry } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(
    private http: HttpClient, 
    private storage: LocalStorageService, 
    private router: Router) { }

  get<T>(endpoint: string){
    return this.http.get<T>(environment.apiUrl + '/'+ endpoint,{
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': String(this.storage.load(KeyStorage.token))
      }
    }).pipe(
      catchError(async (err) => this.handleError.bind(this)(err))
    );
  }
  post<T>(endpoint: string, body: any){
    return this.http.post<T>(environment.apiUrl + '/'+ endpoint,body,{
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': String(this.storage.load(KeyStorage.token))
      }
    }).pipe(retry(2));
  }
  handleError(error: any){
    console.error(error);
    console.warn(error.status);
    this.router.navigateByUrl('/sign-in');
  }
}
