import { UserState } from './../../../models/_core/user-state';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../storage/storage.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError, from, firstValueFrom } from 'rxjs';
import { catchError, mergeMap, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { NotificationsService } from '../notifications/notifications.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

/**
 * ID: bh-interceptor-service
 * Name: BH Interceptor Service
 * Description: Service used to manage http requests and auth tokens
 * Version: 5
 *
 * ==============================
 * Change Log
 * ==============================
 * 2021-07-02 - MW - v1: Initial dev
 * 2021-07-13 - MW - v2: Implemented userState
 * 2021-07-27 - MW - v3: Added BH-DONT-BUMP-INACTIVITY-TIMER header handling; will ignore timer bump
 * 2021-10-11 - MW - v4: Fixed issue with stored token session management
 * 2022-05-19 - MW - v5: Fixed persisten token issue
 */
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  env = environment;
  // refreshLimit = 0; // Testing only

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private notifications: NotificationsService
  ) { }

  // Intercepts all HTTP requests!
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // for a bad un/pw in the login modal, we don't want to navigate from a hybrid guest/authenticated page
    // include this header to continue all login failure actions except redirection to login page
    const stayOnPageWithError = request.headers.get('BH-STAY-ON-PAGE-WITH-ERROR') === 'true';
    request.headers.delete('BH-STAY-ON-PAGE-WITH-ERROR');

    // Don't overwrite existing headers
    const dontAssignHeaders = request.headers.get('BH-DONT-ASSIGN-HEADERS') === 'true';
    request.headers.delete('BH-DONT-ASSIGN-HEADERS');

    // Skip for token refresh
    const isTokenRefresh = request.headers.get('BH-TOKEN-REFRESH') === 'true';
    request.headers.delete('BH-TOKEN-REFRESH');
    // console.log('BH-TOKEN-REFRESH', isTokenRefresh);

    // Don't bump activity timer; for interval-based checks
    const dontBumpActivityTimer = request.headers.get('BH-DONT-BUMP-INACTIVITY-TIMER') === 'true';
    request.headers.delete('BH-DONT-BUMP-INACTIVITY-TIMER');

    // Bump inactivity timer
    if (this.env.requireTimeout && !dontBumpActivityTimer) {
      this.authService.bumpInactivityTimer();
    }

    // Bump inactivity timer
    if (this.env.requireTimeout && !dontBumpActivityTimer) {
      this.authService.bumpInactivityTimer();
    }

    return from(this.getAuthToken(isTokenRefresh)).pipe(
      switchMap(token => {
        // console.log('will use token:', token);
        const clonedReq = this.addToken(request, token, dontAssignHeaders);
        return next.handle(clonedReq).pipe(
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              // console.log('event--->>>', event);
            }
            return event;
          }),
          catchError(error => {
            // Perhaps display an error for specific status codes here already?
            // console.log(error);
            if (error instanceof HttpErrorResponse) {
              const msg = error.message;
              if (error.status === 401) {
                if (!stayOnPageWithError) {
                  this.authService.logout(false);
                }
              } else {
                console.error('interceptor: error: ', error);
              }
            }
            // Pass the error to the caller of the function
            // return throwError(error);
            return throwError(() => error);
          })
        );
      })
    );
  }

  async getAuthToken(isTokenRefresh = false) {
    let user: User;
    const authUser = this.authService.getAuthUser();
    this.notifications.suppressErrors = true;
    if (!authUser && this.env.storeToken) {
      const userState = await this.storageService.getData('userState', false) as UserState;
      if (userState) {
        user = userState.authUser;
      }
    } else {
      user = authUser;
    }
    // console.log('Interceptor: isTokenRefresh', isTokenRefresh);
    let token = (user) ? user.token : ((authUser) ? authUser.token : null);
    if (token && !isTokenRefresh) {
      const isExpired = this.authService.isTokenExpired(token);
      // console.log('intercepter: isExpired: ', isExpired);
      // Refresh token if expired
      if (isExpired) {
        // console.log('token is expired', isExpired);
        token = await this.refreshToken();
        // if (!token) {
        //   this.authService.logout(true);
        // }
      }
    }
    this.notifications.suppressErrors = false;
    return token;
  }

  async refreshToken(): Promise<string> {
    try {
      // Use refresh token to get new access token
      let token = null;
      let refreshToken = await this.storageService.getData('refreshToken', true);
      // console.log('interceptor.refreshToken', refreshToken);
      if (refreshToken) {
        // console.log('**** refreshToken: Prepare refresh token request', refreshToken);
        const res = await firstValueFrom(this.authService.refreshSSOToken(refreshToken));
        // console.log('**** refreshToken: Received refresh payload', res);
        if (res) {
          token = res.access_token;
          // refreshToken = res.refresh_token;
          // this.storageService.saveData('refreshToken', refreshToken, true);
          // console.log('**** refreshToken: Saved new refresh token', refreshToken);
        }
      }
      return token;
    } catch (err) {
      console.error('interceptor: refreshToken: error: ', err);
      return null;
    }

  }

  // Adds the token to your headers if it exists
  private addToken(request: HttpRequest<any>, token: any, dontAssignHeaders = false) {
    if (!dontAssignHeaders) {
      if (token) {
        let clone: HttpRequest<any> = null;
        clone = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return clone;
      }
    }
    return request;
  }


  // redirectToLogin() {
  //     this.router.navigate(['login']);
  // }

}
