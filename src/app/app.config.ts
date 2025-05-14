import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import {MyPreset} from './mypreset';

import { withInterceptors } from "@angular/common/http";
import { authenticationInterceptor } from "./iam/services/authentication.interceptor";


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient( withInterceptors([authenticationInterceptor]) ),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset ,
      }
    })]
};
