import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () => import('./app/pages/list.component').then(m => m.ListComponent)
  },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), importProvidersFrom(BrowserAnimationsModule)]
}).catch(error => console.error(error))
