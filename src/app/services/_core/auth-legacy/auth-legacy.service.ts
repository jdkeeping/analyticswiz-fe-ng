import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthLegacyService {
  env = environment;

  constructor(
    private http: HttpClient,
  ) { }

  login(userId, password): Observable<any> {
    const url = `${this.env.apiUrl}/login`;
    const body = {
      userId,
      password,
      source: 'p'
    };
    return this.http.post(url, body, { observe: 'response' }).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  validateUser() {
    // Prepare request
    const url = environment.apiUrl + `/checkLogin`;
    // Send request
    return this.http.get(url, { observe: 'response' }).pipe(
      map((data: any) => data)
    );

  }
}
