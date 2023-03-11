import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { throwError } from 'rxjs';
import AppComponent from './app/app.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadComponent: () => import('./app/pages/list/list.component').then((m) => m.default),
  },
  {
    path: 'detail',
    loadComponent: () => import('./app/pages/detail/detail.component').then((m) => m.default),
  },
  {
    path: 'detail/:name',
    loadComponent: () => import('./app/pages/detail/detail.component').then((m) => m.default),
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(BrowserAnimationsModule),
  ],
}).catch((error) => throwError(() => new Error(error)));
