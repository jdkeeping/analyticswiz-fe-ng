import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular'

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { InterceptorService } from './app/services/_core/interceptor/interceptor.service';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { SharedModule } from './app/shared/shared.module';
import { provideRedux } from '@reduxjs/angular-redux';
import { store } from './app/store';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    provideHttpClient(),
    provideIonicAngular(),
    importProvidersFrom(IonicStorageModule.forRoot()),
    importProvidersFrom(IonicModule),
    importProvidersFrom(SharedModule),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideEnvironmentNgxMask(),
    provideRedux({ store })
],
});
