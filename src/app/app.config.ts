import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import {MyPreset} from './mypreset';

import { withInterceptors } from "@angular/common/http";
import { authenticationInterceptor } from "./iam/services/authentication.interceptor";

import {HttpClient, provideHttpClient} from "@angular/common/http";
import { importProvidersFrom } from '@angular/core';

//Import Stripe
import { provideNgxStripe } from 'ngx-stripe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideNgxStripe('pk_test_51RUZFxIEToX9rM9yY9wxdNWBtJAIOaPM8gCDngBIhwnKa6Sk5ZwrIagphpXEJkH7R901Pqa99nib0hVypBD4CAQZ00HcJHu3ps'),
    provideRouter(routes),
    provideHttpClient( withInterceptors([authenticationInterceptor]) ),
    provideAnimationsAsync(),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
      }
    })]
};
