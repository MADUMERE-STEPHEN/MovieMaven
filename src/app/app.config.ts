import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient} from '@angular/common/http'
import { routes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';

export const appConfig: ApplicationConfig = {
  providers:[ provideHttpClient(),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), ReactiveFormsModule, FormsModule, SearchComponent]
};
