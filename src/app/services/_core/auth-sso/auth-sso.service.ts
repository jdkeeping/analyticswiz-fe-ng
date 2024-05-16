import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthSsoService {
  env = environment;

  constructor(
    private http: HttpClient,
  ) { }

  validateUser(): Observable<any> {
    // Prepare request
    const url = environment.apiUrl + `/auth`;
    // Send request
    return this.http.get(url, { observe: 'response' }).pipe(
      map((res: any) => {
        const headers = res.headers;
        const cookies = document.cookie;

        // Example: Log all headers
        headers.keys().forEach(key => {
          console.log(`${key}: ${headers.get(key)}`);
        });

        console.log('validateUser', res, res.body, headers, cookies);
        console.log('validateUser: cookies', cookies);
        return res.body
      }),
      // catchError(err => of(err))
    );
  }

}
