import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NotificationsService } from '../_core/notifications/notifications.service';
import { ErrorHandlerService } from '../_core/error-handler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class HealthcheckService {

  constructor(
    private http: HttpClient,
    private notifications: NotificationsService,
    private errorHandler: ErrorHandlerService
  ) { }

  getHealthChecks() {
    const url = `${environment.apiUrl}/healthcheck`;
    return this.http.get(url).pipe(
      map((data: any) => data),
      catchError((err) => {
        this.errorHandler.handleError(
          err,
          'health-check-service.getHealthChecks(): ' + url
        );
        return of(err);
      })
    );
  }
}
