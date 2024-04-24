import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserCacheService {
  private cache: Map<number, any> = new Map<number, any>();

  constructor(private http: HttpClient) { }

  getUserDetails(userId: number): Observable<any> {
    if (this.cache.has(userId)) {
      return of(this.cache.get(userId));
    } else {
      return this.http.get<any>(`https://reqres.in/api/users/${userId}`).pipe(
        map(response => {
          this.cache.set(userId, response.data);
          return response.data;
        }),
        catchError(error => {
          throw 'Error fetching user details'; // Handle error appropriately
        })
      );
    }
  }
}
