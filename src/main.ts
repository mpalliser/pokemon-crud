import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import AppComponent from './app/app.component';

const routes: Routes = [];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), importProvidersFrom(BrowserAnimationsModule)],
}).catch((error) => console.log(error));
