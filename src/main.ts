import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';

export const routes: Routes = [];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
}).catch(error => console.error(error))
